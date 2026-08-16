import { Config } from "@remotion/cli/config";

Config.setEntryPoint("src/index.ts");
Config.setOverwriteOutput(true);

// JPEG is faster; switch to "png" only if you need alpha in the output.
Config.setVideoImageFormat("jpeg");

// CRF 16 is visually lossless for flat colour and gradients. Do not ship 23.
Config.setCrf(16);

// ANGLE gives correct CSS filters, backdrop-filter and WebGL during render.
// Without it, blurs and 3D transforms can differ between preview and output.
Config.setChromiumOpenGlRenderer("angle");
