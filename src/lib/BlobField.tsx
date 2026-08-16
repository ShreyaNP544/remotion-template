import React, { useId } from "react";

/**
 * Solid base + gaussian-blurred solid ellipses, composited in order. Matches
 * the model in scripts/fit_bg.py 1:1, so fitted numbers paste straight in.
 *
 * SVG feGaussianBlur is used (not CSS blur) because stdDeviation is literally
 * the sigma, and sRGB interpolation matches the fitter's compositing.
 */
export type BlobSpec = {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  /** sigma in px (= fit_bg "blur" / 2) */
  sigma: number;
  fill: string;
  opacity?: number;
};

type Props = {
  base: string;
  blobs: BlobSpec[];
  width?: number;
  height?: number;
};

export const BlobField: React.FC<Props> = ({
  base,
  blobs,
  width = 736,
  height = 414,
}) => {
  const uid = useId();
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ position: "absolute", inset: 0 }}
    >
      <rect x={0} y={0} width={width} height={height} fill={base} />
      {blobs.map((b, i) => (
        <g key={i}>
          <filter
            id={`bf${uid}${i}`}
            x="-150%"
            y="-150%"
            width="400%"
            height="400%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation={b.sigma} />
          </filter>
          <ellipse
            cx={b.cx}
            cy={b.cy}
            rx={b.rx}
            ry={b.ry}
            fill={b.fill}
            fillOpacity={b.opacity ?? 1}
            filter={`url(#bf${uid}${i})`}
          />
        </g>
      ))}
    </svg>
  );
};
