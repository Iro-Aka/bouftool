import { type Components, type Theme, toggleButtonClasses, toggleButtonGroupClasses } from "@mui/material";

declare module "@mui/material/ToggleButtonGroup" {
  interface ToggleButtonGroupProps {
    variant?: "push";
  }
}

export const themeToggleButtonGroup = {
  variants: [
    {
      props: { variant: "push", orientation: "vertical" },
      style: ({ theme }) => ({
        [`&.${toggleButtonGroupClasses.root}`]: {
          backgroundColor: theme.palette.surface[100],
        },
        [`& .${toggleButtonClasses.root}`]: {
          paddingLeft: "12px",
          paddingRight: "12px",
          boxShadow: theme.palette.mode === "light" ? "inset 0 0 4px white" : "inset 0 0 4px black",
          height: 40,
          maxHeight: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          gap: 8,
        },
        [`& .${toggleButtonGroupClasses.grouped}.${toggleButtonGroupClasses.selected}+.${toggleButtonGroupClasses.grouped}.${toggleButtonGroupClasses.selected}`]:
          {
            border:
              theme.palette.mode === "light"
                ? "1px solid rgba(255, 255, 255, 0.12) !important"
                : "1px solid rgba(255, 255, 255, 0.12) !important",
          },
        [`& .${toggleButtonGroupClasses.middleButton}, & .${toggleButtonGroupClasses.firstButton}, & .${toggleButtonGroupClasses.lastButton}`]:
          {
            marginTop: "unset",
            border:
              theme.palette.mode === "light"
                ? "1px solid rgba(255, 255, 255, 0.12) !important"
                : "1px solid rgba(255, 255, 255, 0.12) !important",
          },
      }),
    },
    {
      props: { variant: "push", orientation: "horizontal" },
      style: ({ theme }) => ({
        [`&.${toggleButtonGroupClasses.root}`]: {
          backgroundColor: theme.palette.surface[100],
          border: "1px solid rgba(255, 255, 255, 0.12) !important",
        },
        [`& .${toggleButtonClasses.root}`]: {
          paddingLeft: "12px",
          paddingRight: "12px",
          boxShadow: theme.palette.mode === "light" ? "inset 0 0 4px white" : "inset 0 0 4px black",
          height: 40,
          maxHeight: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          gap: 8,
          border: "none !important",
          marginLeft: "unset !important",
        },
        [`& .${toggleButtonGroupClasses.middleButton}, & .${toggleButtonGroupClasses.firstButton}`]: {
          borderRight:
            theme.palette.mode === "light"
              ? "1px solid rgba(255, 255, 255, 0.12) !important"
              : "1px solid rgba(255, 255, 255, 0.12) !important",
        },
      }),
    },
  ],
} satisfies Components<Theme>["MuiToggleButtonGroup"];
