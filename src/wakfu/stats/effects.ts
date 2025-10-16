import type { WakfuStats } from "./index";
import { EnumWakfuStat } from "./types";

const ElementalMasteryPreferencesToResistance = {
  [EnumWakfuStat.FireMastery]: EnumWakfuStat.FireResistance,
  [EnumWakfuStat.WaterMastery]: EnumWakfuStat.WaterResistance,
  [EnumWakfuStat.EarthMastery]: EnumWakfuStat.EarthResistance,
  [EnumWakfuStat.AirMastery]: EnumWakfuStat.AirResistance,
} as const;

export const ElementOnXStats = [
  { stat: EnumWakfuStat.MasteryOneElement, count: 1 },
  { stat: EnumWakfuStat.MasteryTwoElements, count: 2 },
  { stat: EnumWakfuStat.MasteryThreeElements, count: 3 },
  { stat: EnumWakfuStat.ResistanceOneElement, count: 1, mapping: ElementalMasteryPreferencesToResistance },
  { stat: EnumWakfuStat.ResistanceTwoElements, count: 2, mapping: ElementalMasteryPreferencesToResistance },
  { stat: EnumWakfuStat.ResistanceThreeElements, count: 3, mapping: ElementalMasteryPreferencesToResistance },
];

/**
 * ORDER IS IMPORTANT
 */

export const WakfuStatEffects: Partial<Record<EnumWakfuStat, (stat: WakfuStats) => void>> = {
  [EnumWakfuStat.PercentHealthPoint]: (stat) => {
    const percentHp = stat.get(EnumWakfuStat.PercentHealthPoint);
    const baseHp = stat.get(EnumWakfuStat.HealthPoint);
    stat.add(EnumWakfuStat.HealthPoint, Math.floor((baseHp * percentHp) / 100));
    stat.delete(EnumWakfuStat.PercentHealthPoint);
  },
  [EnumWakfuStat.PercentHealthPointToArmor]: (stat) => {
    const percentHp = stat.get(EnumWakfuStat.PercentHealthPointToArmor);
    const healthPoint = stat.get(EnumWakfuStat.HealthPoint);
    stat.add(EnumWakfuStat.Armor, Math.floor((healthPoint * percentHp) / 100));
    stat.delete(EnumWakfuStat.PercentHealthPointToArmor);
  },
  [EnumWakfuStat.ElementalResistance]: (stat) => {
    const elementalResistance = stat.get(EnumWakfuStat.ElementalResistance);
    stat.add(EnumWakfuStat.FireResistance, elementalResistance);
    stat.add(EnumWakfuStat.WaterResistance, elementalResistance);
    stat.add(EnumWakfuStat.EarthResistance, elementalResistance);
    stat.add(EnumWakfuStat.AirResistance, elementalResistance);
    stat.delete(EnumWakfuStat.ElementalResistance);
  },
  [EnumWakfuStat.ElementalMastery]: (stat) => {
    const elementMastery = stat.get(EnumWakfuStat.ElementalMastery);
    stat.add(EnumWakfuStat.FireMastery, elementMastery);
    stat.add(EnumWakfuStat.WaterMastery, elementMastery);
    stat.add(EnumWakfuStat.EarthMastery, elementMastery);
    stat.add(EnumWakfuStat.AirMastery, elementMastery);
    stat.delete(EnumWakfuStat.ElementalMastery);
  },
};
