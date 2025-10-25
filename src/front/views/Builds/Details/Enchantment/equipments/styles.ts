import { styled } from "@mui/material";

const Prefix = "EquipmentsEnchantments";

export const equipmentsEnchantmentsClasses = {
  root: `${Prefix}-root`,
  scroll: `${Prefix}-scroll`,
  row: `${Prefix}-row`,
  rowRedSelected: `${Prefix}-rowRedSelected`,
  rowBlueSelected: `${Prefix}-rowBlueSelected`,
  rowGreenSelected: `${Prefix}-rowGreenSelected`,
  slotHover: `${Prefix}-slotHover`,
};

export const EquipmentsEnchantmentsRoot = styled("div")(({ theme }) => ({
  [`&.${equipmentsEnchantmentsClasses.root}`]: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.surface[100],
    borderRadius: "8px",
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
    alignItems: "center",
    gap: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.surface[150],
    borderRadius: "8px",
    [`&.${equipmentsEnchantmentsClasses.rowRedSelected}`]: {
      boxShadow: `0 0 4px rgba(255, 0, 0, 1)`,
    },
    [`&.${equipmentsEnchantmentsClasses.rowBlueSelected}`]: {
      boxShadow: `0 0 4px rgba(0, 150, 255, 1)`,
    },
    [`&.${equipmentsEnchantmentsClasses.rowGreenSelected}`]: {
      boxShadow: `0 0 4px rgba(0, 255, 0, 1)`,
    },
  },
  [`& .${equipmentsEnchantmentsClasses.slotHover}`]: {
    "&:hover": {
      filter: "drop-shadow(0 0 3px rgba(255, 255, 255, 0.8))",
      cursor: "pointer",
    },
  },
}));
