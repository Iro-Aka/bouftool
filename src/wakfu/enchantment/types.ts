import type { EnumWakfuStat } from "../stats/types";

export enum EnumWakfuEnchantmentColor {
  Red = 1,
  Green = 2,
  Blue = 3,
  Yellow = 4,
}

export type TWakfuEnchantmentEffect = {
  stat: EnumWakfuStat;
  baseValue: number;
  perLevelValue: number;
};

export const isWakfuEnchantmentColor = (value: number): value is EnumWakfuEnchantmentColor => {
  return (
    value === EnumWakfuEnchantmentColor.Red ||
    value === EnumWakfuEnchantmentColor.Green ||
    value === EnumWakfuEnchantmentColor.Blue ||
    value === EnumWakfuEnchantmentColor.Yellow
  );
};
