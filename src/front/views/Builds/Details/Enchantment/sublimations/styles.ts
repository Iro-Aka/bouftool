import { styled } from "@mui/material";

const Prefix = "ListSublimations";

export const listSublimationsClasses = {
  root: `${Prefix}-root`,
  scroll: `${Prefix}-scroll`,
  row: `${Prefix}-row`,
};

export const ListSublimationsRoot = styled("div")(({ theme }) => ({
  [`&.${listSublimationsClasses.root}`]: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    backgroundColor: theme.palette.surface[100],
    padding: theme.spacing(1),
    borderRadius: "8px",
  },
  [`& .${listSublimationsClasses.row}`]: {
    flex: "0 0 auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    backgroundColor: theme.palette.surface[150],
    borderRadius: "8px",
    overflow: "hidden",
  },
}));
