import type { HTMLProps } from "react";
import { WakfuStats } from "src/wakfu/types/action";

const StatsToIcon: Record<WakfuStats, string> = {
  [WakfuStats.PV]: "HP",
  [WakfuStats.PW]: "WP",
  [WakfuStats.PA]: "AP",
  [WakfuStats.PM]: "MP",
  [WakfuStats.Mastery]: "DMG_IN_PERCENT",
  [WakfuStats.MasteryFire]: "DMG_FIRE_PERCENT",
  [WakfuStats.MasteryEarth]: "DMG_EARTH_PERCENT",
  [WakfuStats.MasteryWater]: "DMG_WATER_PERCENT",
  [WakfuStats.MasteryAir]: "DMG_AIR_PERCENT",
  [WakfuStats.Resistance]: "RES_IN_PERCENT",
  [WakfuStats.ResistanceFire]: "RES_FIRE_PERCENT",
  [WakfuStats.ResistanceWater]: "RES_WATER_PERCENT",
  [WakfuStats.ResistanceEarth]: "RES_EARTH_PERCENT",
  [WakfuStats.ResistanceAir]: "RES_AIR_PERCENT",
  [WakfuStats.CriticalRate]: "CRITICAL_BONUS",
  [WakfuStats.Initiative]: "INIT",
  [WakfuStats.Dodge]: "DODGE",
  [WakfuStats.Control]: "LEADERSHIP",
  [WakfuStats.Block]: "BLOCK",
  [WakfuStats.Range]: "RANGE",
  [WakfuStats.Lock]: "TACKLE",
  [WakfuStats.Willpower]: "WILLPOWER",
  [WakfuStats.CriticalMastery]: "CRITICAL_BONUS",
  [WakfuStats.CriticalResistance]: "CRITICAL_RES",
  [WakfuStats.BackMastery]: "BACKSTAB_BONUS",
  [WakfuStats.BackResistance]: "RES_BACKSTAB",
  [WakfuStats.MeleeMastery]: "MELEE_DMG",
  [WakfuStats.DistanceMastery]: "RANGED_DMG",
  [WakfuStats.ArmorGiven]: "ARMOR_GIVEN",
  [WakfuStats.ArmorReceived]: "ARMOR_RECEIVED",
  [WakfuStats.HealingMastery]: "HEAL_IN_PERCENT",
  [WakfuStats.BerserkMastery]: "BERSERK_DMG",
  [WakfuStats.FinalDamage]: "FINAL_DMG_IN_PERCENT",
  [WakfuStats.FinalHealing]: "FINAL_HEAL_IN_PERCENT",
  [WakfuStats.Wisdom]: "WISDOM",
  [WakfuStats.Prospection]: "PROSPECTION",
  [WakfuStats.IndirectDamages]: "INDIRECT_DMG",
  [WakfuStats.HealingReceived]: "HEAL_IN_PERCENT",
  [WakfuStats.Armor]: "ARMOR",
};

export type TStatsIconProps = Omit<HTMLProps<HTMLImageElement>, "children" | "src" | "alt"> & {
  children: WakfuStats;
};

export const StatsIcon = ({ children, ...props }: TStatsIconProps) => {
  return <img src={`wakfu/charac/${StatsToIcon[children]}.png`} alt={StatsToIcon[children]} {...props} />;
};
