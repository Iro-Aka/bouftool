import { styled } from "@mui/material";

const Prefix = "AbilitiesCategory";

export const abilitiesCategoryClasses = {
  root: `${Prefix}-root`,
  header: `${Prefix}-header`,
  headerRight: `${Prefix}-headerRight`,
  availablePoints: `${Prefix}-availablePoints`,
  row: `${Prefix}-row`,
  rowLabel: `${Prefix}-rowLabel`,
  rowActions: `${Prefix}-rowActions`,
  rowActionsButton: `${Prefix}-rowActionsButton`,
  rowActionsInput: `${Prefix}-rowActionsInput`,
};

export const AbilitiesCategoryRoot = styled("div")(({ theme }) => ({
  [`&.${abilitiesCategoryClasses.root}`]: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
  },
  [`& .${abilitiesCategoryClasses.header}`]: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    [`& .${abilitiesCategoryClasses.headerRight}`]: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing(1),
      paddingRight: "42px",
    },
  },
  [`& .${abilitiesCategoryClasses.availablePoints}`]: {
    borderRadius: "8px",
    padding: theme.spacing(0.5, 1),
    backgroundColor: theme.palette.surface[150],
    width: "40px",
    textAlign: "center",
  },
  [`& .${abilitiesCategoryClasses.row}`]: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(1),
    justifyContent: "space-between",
    border: `1px solid ${theme.palette.border.light}`,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    "&:first-of-type": {
      borderTopWidth: "1px",
      borderTopLeftRadius: "8px",
      borderTopRightRadius: "8px",
    },
    "&:last-of-type": {
      borderBottomWidth: "1px",
      borderBottomLeftRadius: "8px",
      borderBottomRightRadius: "8px",
    },
    "&:nth-of-type(2n+1)": {
      backgroundColor: theme.palette.surface[150],
    },
    "&:nth-of-type(2n)": {
      backgroundColor: theme.palette.surface[250],
    },
    padding: theme.spacing(0.5, 1),
    [`& .${abilitiesCategoryClasses.rowLabel}`]: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing(0.5),
    },
    [`& .${abilitiesCategoryClasses.rowActions}`]: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing(1),
      [`& .${abilitiesCategoryClasses.rowActionsButton}`]: {
        aspectRatio: "1",
        minWidth: 0,
        padding: theme.spacing(0.25),
      },
      [`& .${abilitiesCategoryClasses.rowActionsInput}`]: {
        width: "40px",
        backgroundColor: theme.palette.background.default,
        "& input": {
          color: theme.palette.text.primary,
          padding: theme.spacing(0.25, 1),
          fontSize: "14px",
          textAlign: "center",
        },
      },
    },
  },
}));
