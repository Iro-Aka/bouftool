import { styled } from "@mui/material";

const Prefix = "EquipmentsEnchantments";

export const equipmentsEnchantmentsClasses = {
  root: `${Prefix}-root`,
  scroll: `${Prefix}-scroll`,
  row: `${Prefix}-row`,
  rowRedSelected: `${Prefix}-rowRedSelected`,
  rowBlueSelected: `${Prefix}-rowBlueSelected`,
  rowGreenSelected: `${Prefix}-rowGreenSelected`,
  rowSubmlimation: `${Prefix}-rowSublimation`,
  slotHover: `${Prefix}-slotHover`,
};

export const EquipmentsEnchantmentsRoot = styled("div")(({ theme }) => ({
  [`&.${equipmentsEnchantmentsClasses.root}`]: {
    flex: "0 1 auto",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.surface[100],
    borderRadius: "8px",
    overflow: "hidden",
  },
  [`& .${equipmentsEnchantmentsClasses.scroll}`]: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    overflow: "auto",
    margin: theme.spacing(-1),
    padding: theme.spacing(1),
  },
  [`& .${equipmentsEnchantmentsClasses.row}`]: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    border: `1px solid ${theme.palette.border.light}`,
    borderRadius: "8px",
    "& > div": {
      padding: theme.spacing(1),
    },
    "& > div:first-of-type": {
      borderTopLeftRadius: "8px",
      borderBottomLeftRadius: "8px",
      borderRight: `1px solid ${theme.palette.border.light}`,
    },
    "& > div:last-of-type": {
      borderTopRightRadius: "8px",
      borderBottomRightRadius: "8px",
    },
    [`&.${equipmentsEnchantmentsClasses.rowRedSelected}`]: {
      boxShadow: `0 0 4px rgba(255, 0, 0, 1)`,
    },
    [`&.${equipmentsEnchantmentsClasses.rowBlueSelected}`]: {
      boxShadow: `0 0 4px rgba(0, 150, 255, 1)`,
    },
    [`&.${equipmentsEnchantmentsClasses.rowGreenSelected}`]: {
      boxShadow: `0 0 4px rgba(0, 255, 0, 1)`,
    },
    [`& .${equipmentsEnchantmentsClasses.rowSubmlimation}`]: {
      backgroundColor: theme.palette.surface[200],
      flex: "0 1 240px",
      overflow: "hidden",
    },
  },
  [`& .${equipmentsEnchantmentsClasses.slotHover}`]: {
    "&:hover": {
      filter: "drop-shadow(0 0 3px rgba(255, 255, 255, 0.8))",
      cursor: "pointer",
    },
  },
}));
