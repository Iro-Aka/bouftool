import { stackClasses, styled } from "@mui/material";
import { StackGrid } from "src/front/components/Layout/StackGrid";

const StatsRowPrefix = "StatsRow";

export const statsRowClasses = {
  root: `${StatsRowPrefix}-root`,
};

export const StatsRow = styled(StackGrid)(({ theme }) => ({
  [`&.${statsRowClasses.root}`]: {
    [`& > .${stackClasses.root}`]: {
      border: `1px solid ${theme.palette.border.light}`,
      borderLeftWidth: "0px",
      borderRightWidth: "0px",
      "&:first-of-type": {
        borderTopLeftRadius: "8px",
        borderBottomLeftRadius: "8px",
        borderLeftWidth: "1px",
      },
      "&:last-of-type": {
        borderTopRightRadius: "8px",
        borderBottomRightRadius: "8px",
        borderRightWidth: "1px",
      },
      "&:nth-of-type(2n)": { backgroundColor: theme.palette.surface[250] },
      "&:nth-of-type(2n+1)": { backgroundColor: theme.palette.surface[150] },
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
    },
  },
}));

const StatsPanelPrefix = "StatsPanel";

export const statsPanelClasses = {
  root: `${StatsPanelPrefix}-root`,
  column: `${StatsPanelPrefix}-column`,
};

export const StatsPanel = styled(StackGrid)(({ theme }) => ({
  [`&.${statsPanelClasses.root}`]: {
    [`& .${statsPanelClasses.column}`]: {
      [`& > .${stackClasses.root}`]: {
        border: `0px solid ${theme.palette.border.light}`,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        "&:first-of-type": {
          borderTopWidth: "1px",
        },
        "&:last-of-type": {
          borderBottomWidth: "1px",
        },
        "&:nth-of-type(2n)": {
          backgroundColor: theme.palette.surface[250],
        },
        "&:nth-of-type(2n+1)": {
          backgroundColor: theme.palette.surface[150],
        },
      },
      [`&:first-of-type > .${stackClasses.root}`]: {
        borderLeftWidth: "1px",
        "&:first-of-type": {
          borderTopLeftRadius: "8px",
        },
        "&:last-of-type": {
          borderBottomLeftRadius: "8px",
        },
      },
      [`&:last-of-type > .${stackClasses.root}`]: {
        borderLeftWidth: "1px",
        borderRightWidth: "1px",
        "&:first-of-type": {
          borderTopRightRadius: "8px",
        },
        "&:last-of-type": {
          borderBottomRightRadius: "8px",
        },
      },
    },
  },
}));
