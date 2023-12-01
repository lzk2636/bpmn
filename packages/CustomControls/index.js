import CustomContextPad from "./CustomContextPad";
import CustomPalette from "./CustomPalette";
import CustomRenderer from "./CustomRenderer.js";

export default {
  __init__: ["customContextPad", "customPalette", "CustomRenderer"],
  customContextPad: ["type", CustomContextPad],
  customPalette: ["type", CustomPalette],
  CustomRenderer: ["type", CustomRenderer],
};
