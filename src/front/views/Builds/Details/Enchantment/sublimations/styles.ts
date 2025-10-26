import { styled } from "@mui/material";

const Prefix = "ListSublimations";

export const listSublimationsClasses = {
  root: `${Prefix}-root`,
  scroll: `${Prefix}-scroll`,
  row: `${Prefix}-row`,
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
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
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
  },
}));
