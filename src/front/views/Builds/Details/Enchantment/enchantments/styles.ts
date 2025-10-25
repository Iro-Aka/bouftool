import { styled } from "@mui/material";

const Prefix = "ListEnchantments";

export const listEnchantmentsClasses = {
  root: `${Prefix}-root`,
  scroll: `${Prefix}-scroll`,
  row: `${Prefix}-row`,
};

export const ListEnchantmentsRoot = styled("div")(({ theme }) => ({
  [`&.${listEnchantmentsClasses.root}`]: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.surface[100],
    padding: theme.spacing(1),
    gap: theme.spacing(1),
    borderRadius: "8px",
  },
  [`& .${listEnchantmentsClasses.scroll}`]: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    overflow: "auto",
    marginRight: theme.spacing(-1),
    paddingRight: theme.spacing(1),
  },
  [`& .${listEnchantmentsClasses.row}`]: {
    flex: "0 0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing(2),
    padding: theme.spacing(1),
    borderRadius: "8px",
    position: "relative",
    overflow: "hidden",
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
