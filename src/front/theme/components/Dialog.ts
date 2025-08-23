import {
  type Components,
  dialogActionsClasses,
  dialogContentClasses,
  dialogTitleClasses,
  type Theme,
} from "@mui/material";

export const themeDialog = {
  styleOverrides: {
    paper: ({ theme }) => ({
      borderRadius: "8px",
      [`& .${dialogTitleClasses.root}`]: {
        padding: theme.spacing(1.5, 1.5, 0, 1.5),
      },
      [`& .${dialogContentClasses.root}`]: {
        paddingTop: `${theme.spacing(1.5)} !important`,
        padding: theme.spacing(1.5, 1.5, 0, 1.5),
      },
      [`& .${dialogActionsClasses.root}`]: {
        padding: theme.spacing(1.5),
      },
    }),
  },
} satisfies Components<Theme>["MuiDialog"];
