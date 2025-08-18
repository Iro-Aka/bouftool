import type { Components, Theme } from "@mui/material";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    push: true;
  }
  interface ButtonPropsColorOverrides {
    wakfu: true;
  }
}

export const themeButton = {
  styleOverrides: {
    root: {
      textTransform: "unset",
    },
  },
  variants: [
    {
      props: { variant: "push" },
      style: ({ theme }) => ({
        textTransform: "none",
        backgroundColor: theme.palette.surface[100],
        boxShadow: theme.palette.mode === "light" ? "inset 0 0 4px white" : "inset 0 0 4px black",
        border:
          theme.palette.mode === "light" ? "1px solid rgba(0, 0, 0, 0.12)" : "1px solid rgba(255, 255, 255, 0.12)",
        color: theme.palette.mode === "light" ? "black" : "white",
        transition: "none",
        padding: "8px",
        "&:hover": {
          backgroundColor: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.08)",
        },
        "&.Mui-selected": {
          backgroundColor: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.16)" : "rgba(255, 255, 255, 0.16)",
          "&:hover": {
            backgroundColor: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)",
          },
        },
      }),
    },
    {
      props: { variant: "text" },
      style: ({ theme }) => ({
        "&.Mui-selected": {
          backgroundColor: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.08)",
          "&:hover": {
            backgroundColor: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.12)",
          },
        },
      }),
    },
  ],
} satisfies Components<Theme>["MuiButton"];
