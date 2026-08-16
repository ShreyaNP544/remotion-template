# Portfolio intro — Remotion recreation

Recreation of the motion-designer portfolio intro template
(<https://in.pinterest.com/pin/1125125919704254375/>). The reference video is
included as `reference.mp4`, the final render is `out/video.mp4`.

## Run

```bash
npm install
npm run dev        # opens Remotion Studio
npm run render     # renders out/video.mp4 (h264, CRF 16)
```

Main composition: [src/template.tsx](src/template.tsx). Each scene lives in
[src/scenes/](src/scenes/). Output matches the source spec exactly:
736 × 414, 30 fps, 649 frames (21.6 s).

The `name` prop (Studio props panel) swaps out the "I'm Prince" title without
touching any timing.

## Structure

| Scene | Frames | What happens |
| --- | --- | --- |
| 1 | 0–79 | "Hiiiiiiiiiii" bar, then the name with a tracking settle |
| 2 | 80–160 | input box types "A video editor,", camera pull-back and pan, then "A motion designer" |
| 3 | 161–194 | seven cards slide up and stack, with motion blur |
| 4 | 195–288 | paper card: ikigai → scroll → "a japanese concept" → 3D float pair + checklist |
| 5 | 289–334 | aurora, "I'm looking to work on your projects." |
| 6 | 335–397 | "I've worked with over" → 100+ Clients counter |
| 7 | 398–503 | word zoom: Proficient with / 5 / Editing / Softwares |
| 8 | 504–570 | ripple rings, "Future of work? You're in." |
| 9 | 571–648 | outro, Get in touch button, circle wipe to black |

All timings, positions, sizes and colours were measured from the reference
frame by frame rather than eyeballed. Backgrounds are gaussian-blurred
ellipse fields (see `src/lib/BlobField.tsx`) with parameters fitted against
sampled reference frames.

## Fonts

| Face | Used for | Licence |
| --- | --- | --- |
| Baloo 2 (500/600/700) | all sans text | OFL 1.1 |
| Playfair Display (500/600) | "ikigai", "a japanese concept", the counter | OFL 1.1 |

Loaded from `public/fonts/` and awaited before the first frame renders.
