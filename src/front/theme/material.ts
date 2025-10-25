import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme } from "@mui/material/styles";
import { themeButton } from "./components/Button";
import { themeButtonGroup } from "./components/ButtonGroup";
import { themeDialog } from "./components/Dialog";
import { themeSlider } from "./components/Slider";
import { themeToggleButtonGroup } from "./components/ToggleButtonGroup";
import { themeTooltip } from "./components/Tooltip";
import { darkThemePalette, lightThemePalette } from "./palette";

declare module "@mui/material/styles" {
  interface Color {
    150?: string;
    250?: string;
    350?: string;
    450?: string;
    550?: string;
    650?: string;
    750?: string;
    850?: string;
    950?: string;
  }
}

export const theme = createTheme({
  breakpoints: {},
  colorSchemes: {
    dark: {
      palette: darkThemePalette,
    },
    light: {
      palette: lightThemePalette,
    },
  },
  components: {
    MuiToggleButtonGroup: themeToggleButtonGroup,
    MuiButtonGroup: themeButtonGroup,
    MuiButton: themeButton,
    MuiDialog: themeDialog,
    MuiSlider: themeSlider,
    MuiTooltip: themeTooltip,
  },
});
