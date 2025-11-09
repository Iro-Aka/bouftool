import { List, listItemButtonClasses, listItemClasses, styled } from "@mui/material";

const Prefix = "BuildItemMenuList";

export const buildItemMenuListClasses = {
  root: `${Prefix}-root`,
};

export const BuildItemMenuList = styled(List)(({ theme }) => ({
  [`&.${buildItemMenuListClasses.root}`]: {
    overflow: "hidden",
    paddingTop: 0,
  },
  [`& .${listItemClasses.root}, & .${listItemButtonClasses.root}`]: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    gap: theme.spacing(1),
  },
  [`& .${listItemButtonClasses.root}`]: {
    position: "relative",
    backgroundColor: theme.palette.surface[100],
    borderTop: `1px solid ${theme.palette.border.main}`,
    "&:last-of-type": {
      borderBottom: `1px solid ${theme.palette.border.main}`,
    },
    "&:hover:before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: theme.palette.action.hover,
    },
  },
}));
