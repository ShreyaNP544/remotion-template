import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// sans is Baloo 2 (hooked t-foot, round dots — it's not Poppins, checked
// against 3x crops of the reference). serif is Playfair Display. both OFL.
export const BODY = '"Baloo 2", sans-serif';
export const SERIF = '"Playfair Display", serif';

export const fontsLoaded = Promise.all([
  loadFont({ family: "Baloo 2", url: staticFile("fonts/Baloo2-500.woff2"), weight: "500" }),
  loadFont({ family: "Baloo 2", url: staticFile("fonts/Baloo2-600.woff2"), weight: "600" }),
  loadFont({ family: "Baloo 2", url: staticFile("fonts/Baloo2-700.woff2"), weight: "700" }),
  loadFont({ family: "Playfair Display", url: staticFile("fonts/PlayfairDisplay-500.woff2"), weight: "500" }),
  loadFont({ family: "Playfair Display", url: staticFile("fonts/PlayfairDisplay-600.woff2"), weight: "600" }),
]);
