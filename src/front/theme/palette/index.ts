import type { PaletteColor, PaletteOptions } from "@mui/material";
import { themePaletteBorder } from "./border";
import { themePaletteGrey } from "./grey";
import { themePaletteSurface } from "./surface";
import { themeWakfu } from "./wakfu";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    border: PaletteColor;
    wakfu: PaletteColor;
    surface: Color;
  }
  interface Palette {
    border: PaletteColor;
    wakfu: PaletteColor;
    surface: Color;
  }
}

export const lightThemePalette = {
  grey: themePaletteGrey,
  border: themePaletteBorder,
  wakfu: themeWakfu.light,
  surface: themePaletteSurface.light,
} satisfies PaletteOptions;

export const darkThemePalette = {
  grey: themePaletteGrey,
  border: themePaletteBorder,
  wakfu: themeWakfu.dark,
  surface: themePaletteSurface.dark,
  text: {
    primary: "#E0E0E0",
  },
  background: {
    default: "#161616",
  },
} satisfies PaletteOptions;
