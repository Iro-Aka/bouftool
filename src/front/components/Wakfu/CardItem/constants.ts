import { EnumWakfuRarity } from "src/wakfu/items/rarity";

export const CardItemDisplayedRarity = new Set([EnumWakfuRarity.Epic, EnumWakfuRarity.Relic]);

export const RarityBorders: Record<number, string> = {
  0: "Tooltip-Borders-Old",
  1: "Tooltip-Borders-Common",
  2: "Tooltip-Borders-Rare",
  3: "Tooltip-Borders-Mythic",
  4: "Tooltip-Borders-Legendary",
  5: "Tooltip-Borders-Relic",
  6: "Tooltip-Borders-Memory",
  7: "Tooltip-Borders-Epic",
};
