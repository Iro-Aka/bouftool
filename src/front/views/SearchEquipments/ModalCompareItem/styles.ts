import { styled } from "@mui/material";

const Prefix = "CompareItemStats";

export const compareItemStatsClasses = {
  root: `${Prefix}-root`,
  column: `${Prefix}-column`,
  row: `${Prefix}-row`,
  placeholder: `${Prefix}-placeholder`,
};

export const CompareItemStats = styled("div")(({ theme }) => ({
  [`&.${compareItemStatsClasses.root}`]: {
    display: "flex",
    flexDirection: "row",
  },
  [`& .${compareItemStatsClasses.column}`]: {
    flex: "1 1 0",
    display: "flex",
    flexDirection: "column",
    "&:first-of-type": {
      [`& .${compareItemStatsClasses.row}`]: {
        borderRightWidth: 0,
      },
      [`& .${compareItemStatsClasses.row}:first-of-type`]: {
        borderTopLeftRadius: "8px",
      },
      [`& .${compareItemStatsClasses.row}:last-of-type`]: {
        borderBottomLeftRadius: "8px",
      },
    },
    "&:last-of-type": {
      [`& .${compareItemStatsClasses.row}:first-of-type`]: {
        borderTopRightRadius: "8px",
      },
      [`& .${compareItemStatsClasses.row}:last-of-type`]: {
        borderBottomRightRadius: "8px",
      },
    },
  },
  [`& .${compareItemStatsClasses.row}`]: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(1),
    padding: theme.spacing(0.25, 1),
    border: `1px solid ${theme.palette.border.main}`,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    "&:first-of-type": {
      borderTopWidth: 1,
    },
    "&:last-of-type": {
      borderBottomWidth: 1,
    },
    "&:nth-of-type(2n+1)": {
      backgroundColor: theme.palette.surface[150],
    },
    "&:nth-of-type(2n)": {
      backgroundColor: theme.palette.surface[250],
    },
  },
  [`& .${compareItemStatsClasses.placeholder}`]: {
    flex: 1,
  },
}));
