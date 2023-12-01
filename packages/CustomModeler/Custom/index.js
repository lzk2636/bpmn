import CustomPalette from './CustomPalette';
import CustomContextPadProvider from './CustomContextPadProvider';
import CustomPaletteProvider from './CustomPaletteProvider';
import CustomRenderer from "./CustomRenderer.js";
export default {
  __init__: [
    'paletteProvider',
    'contextPadProvider',
    'CustomPaletteProvider',
    'CustomRenderer'
  ],
  paletteProvider: [ 'type', CustomPalette ],
  contextPadProvider: ['type', CustomContextPadProvider],
  CustomPaletteProvider:['type',CustomPaletteProvider],
  CustomRenderer:['type',CustomRenderer],
};
