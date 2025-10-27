import type { ElectronEvents, ElectronEventsRenderer } from "src/electron/types";
import type { EnumWakfuEnchantmentColor } from "src/wakfu/enchantment/types";
import type { EnumWakfuEquipmentPosition } from "src/wakfu/itemTypes/types";
import type { TWakfuI18n } from "src/wakfu/utils/types";

export type TWakfuEnchantment = {
  id: number;
  color: EnumWakfuEnchantmentColor;
  label: TWakfuI18n;
  doubleBonusPositions: EnumWakfuEquipmentPosition[];
  effects: number[];
};

export type TWakfuSublimation = ElectronEventsRenderer[ElectronEvents.GetEnchantments]["sublimations"][number];
