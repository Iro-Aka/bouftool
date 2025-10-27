import { styled } from "@mui/material";

const Prefix = "ListSublimations";

export const listSublimationsClasses = {
  root: `${Prefix}-root`,
  scroll: `${Prefix}-scroll`,
  row: `${Prefix}-row`,
  rowSelected: `${Prefix}-rowSelected`,
};

export const ListSublimationsRoot = styled("div")(({ theme }) => ({
  [`&.${listSublimationsClasses.root}`]: {
    flex: "0 1 432px",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    backgroundColor: theme.palette.surface[100],
    padding: theme.spacing(1),
    borderRadius: "8px",
    overflow: "hidden",
  },
  [`& .${listSublimationsClasses.row}`]: {
    position: "relative",
    width: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "start",
    backgroundColor: theme.palette.surface[150],
    borderRadius: "8px",
    overflow: "hidden",
    border: `1px solid ${theme.palette.border.light}`,
    "& > div:first-of-type": {
      borderRight: `1px solid ${theme.palette.border.light}`,
    },
    "& > div:last-of-type": {
      borderLeft: `1px solid ${theme.palette.border.light}`,
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
    [`&.${listSublimationsClasses.rowSelected}`]: {
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
    },
  },
}));
