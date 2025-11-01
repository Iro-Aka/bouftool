import { styled } from "@mui/material";
import { RarityBorders } from "src/front/components/Wakfu/CardItem/constants";
import { EnumWakfuRarity } from "src/wakfu/items/rarity";

const Prefix = "EquipmentsEnchantments";

export const equipmentsEnchantmentsClasses = {
  root: `${Prefix}-root`,
  scroll: `${Prefix}-scroll`,
  row: `${Prefix}-row`,
  rowRedSelected: `${Prefix}-rowRedSelected`,
  rowBlueSelected: `${Prefix}-rowBlueSelected`,
  rowGreenSelected: `${Prefix}-rowGreenSelected`,
  rowEnchantments: `${Prefix}-rowEnchantments`,
  rowEnchantmentsRedSelected: `${Prefix}-rowEnchantmentsRedSelected`,
  rowEnchantmentsBlueSelected: `${Prefix}-rowEnchantmentsBlueSelected`,
  rowEnchantmentsGreenSelected: `${Prefix}-rowEnchantmentsGreenSelected`,
  rowSublimation: `${Prefix}-rowSublimation`,
  rowSublimationHover: `${Prefix}-rowSublimationHover`,
  rowSublimationEpic: `${Prefix}-rowSublimationEpic`,
  rowSublimationEpicHover: `${Prefix}-rowSublimationEpicHover`,
  rowSublimationRelic: `${Prefix}-rowSublimationRelic`,
  rowSublimationRelicHover: `${Prefix}-rowSublimationRelicHover`,
  sublimationIconDisabled: `${Prefix}-sublimationIconDisabled`,
  slotHover: `${Prefix}-slotHover`,
};

export const EquipmentsEnchantmentsRoot = styled("div")(({ theme }) => ({
  [`&.${equipmentsEnchantmentsClasses.root}`]: {
    flex: "1 1 560px",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "start",
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
    alignItems: "stretch",
    justifyContent: "start",
    gap: theme.spacing(1),
    padding: theme.spacing(1),
    margin: theme.spacing(-1),
    overflow: "auto",
  },
  [`& .${equipmentsEnchantmentsClasses.row}`]: {
    flex: "0 0 auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "start",
    border: `1px solid ${theme.palette.border.light}`,
    borderRadius: "8px",
    "& > div": {
      padding: theme.spacing(1),
      "&:first-of-type": {
        borderTopLeftRadius: "8px",
        borderBottomLeftRadius: "8px",
        borderRight: `1px solid ${theme.palette.border.light}`,
      },
      "&:last-of-type": {
        borderTopRightRadius: "8px",
        borderBottomRightRadius: "8px",
      },
    },
    [`&.${equipmentsEnchantmentsClasses.rowRedSelected}`]: {
      boxShadow: `0 0 4px rgba(255, 0, 0, 1)`,
      transform: "scale(1.01)",
    },
    [`&.${equipmentsEnchantmentsClasses.rowBlueSelected}`]: {
      boxShadow: `0 0 4px rgba(0, 150, 255, 1)`,
      transform: "scale(1.01)",
    },
    [`&.${equipmentsEnchantmentsClasses.rowGreenSelected}`]: {
      boxShadow: `0 0 4px rgba(0, 255, 0, 1)`,
      transform: "scale(1.01)",
    },
    [`& .${equipmentsEnchantmentsClasses.rowEnchantments}`]: {
      backgroundColor: theme.palette.surface[150],
      flex: "0 0 auto",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "start",
      gap: theme.spacing(1),
      [`&.${equipmentsEnchantmentsClasses.rowEnchantmentsRedSelected}`]: {
        background: "linear-gradient(90deg, rgba(255, 0, 0, 0.3) 0%, rgba(255, 0, 0, 0) 80%)",
      },
      [`&.${equipmentsEnchantmentsClasses.rowEnchantmentsBlueSelected}`]: {
        background: "linear-gradient(90deg, rgba(0, 150, 255, 0.3) 0%, rgba(255, 0, 0, 0) 80%)",
      },
      [`&.${equipmentsEnchantmentsClasses.rowEnchantmentsGreenSelected}`]: {
        background: "linear-gradient(90deg, rgba(0, 255, 0, 0.3) 0%, rgba(255, 0, 0, 0) 80%)",
      },
    },
    [`& .${equipmentsEnchantmentsClasses.rowSublimation}`]: {
      backgroundColor: theme.palette.surface[200],
      flex: 1,
      overflow: "hidden",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      [`&.${equipmentsEnchantmentsClasses.rowSublimationHover}`]: {
        "&:hover": {
          boxShadow: `0 0 4px rgba(255, 255, 255, 0.8)`,
          cursor: "pointer",
        },
      },
    },
  },
  [`& .${equipmentsEnchantmentsClasses.rowSublimationEpic}, & .${equipmentsEnchantmentsClasses.rowSublimationRelic}`]: {
    padding: theme.spacing(1),
    gap: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    [`&.${equipmentsEnchantmentsClasses.rowSublimationEpicHover}, &.${equipmentsEnchantmentsClasses.rowSublimationRelicHover}`]:
      {
        "&:hover": {
          cursor: "pointer",
        },
      },
  },
  [`& .${equipmentsEnchantmentsClasses.rowSublimationEpic}`]: {
    borderImageSource: `url(wakfu/${RarityBorders[EnumWakfuRarity.Epic]}.png)`,
    borderImageSlice: "26",
    borderImageWidth: "26px",
    borderImageOutset: "8px",
    borderImageRepeat: "round",
    backgroundColor: "rgba(204, 57, 144, 0.3)",
    [`&.${equipmentsEnchantmentsClasses.rowSublimationEpicHover}`]: {
      "&:hover": {
        backgroundColor: "rgba(204, 57, 144, 0.4)",
      },
    },
  },
  [`& .${equipmentsEnchantmentsClasses.rowSublimationRelic}`]: {
    borderImageSource: `url(wakfu/${RarityBorders[EnumWakfuRarity.Relic]}.png)`,
    borderImageSlice: "26",
    borderImageWidth: "26px",
    borderImageOutset: "8px",
    borderImageRepeat: "round",
    backgroundColor: "rgba(87, 32, 137, 0.3)",
    [`&.${equipmentsEnchantmentsClasses.rowSublimationRelicHover}`]: {
      "&:hover": {
        backgroundColor: "rgba(87, 32, 137, 0.4)",
      },
    },
  },
  [`& .${equipmentsEnchantmentsClasses.sublimationIconDisabled}`]: {
    filter: "grayscale(100%) opacity(50%)",
  },
  [`& .${equipmentsEnchantmentsClasses.slotHover}`]: {
    "&:hover": {
      filter: "drop-shadow(0 0 3px rgba(255, 255, 255, 0.8))",
      cursor: "pointer",
    },
  },
}));
