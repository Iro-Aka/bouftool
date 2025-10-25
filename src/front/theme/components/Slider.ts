import type { Components, Theme } from "@mui/material";

export const themeSlider = {
  styleOverrides: {
    thumb: {
      backgroundColor: "#F0F0F0",
    },
    valueLabel: ({ theme }) => ({
      backgroundColor: theme.palette.surface[200],
      color: theme.palette.text.primary,
      border: `1px solid ${theme.palette.border.light}`,
      "&:before": {
        border: `1px solid ${theme.palette.border.light}`,
        borderTopWidth: 0,
        borderLeftWidth: 0,
      },
    }),
  },
} satisfies Components<Theme>["MuiSlider"];
