import type { PaletteColor, PaletteOptions } from "@mui/material";
import { themePaletteBorder } from "./border";
import { themePaletteGrey } from "./grey";
import { themeWakfu } from "./wakfu";
import { themePaletteSurface } from "./surface";

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
} satisfies PaletteOptions;
