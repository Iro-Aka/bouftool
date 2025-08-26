import type { WakfuStats } from ".";
import { EnumWakfuStat } from "./types";

/**
 * ORDER IS IMPORTANT
 */

export const WakfuStatEffects: Partial<Record<EnumWakfuStat, (stat: WakfuStats) => void>> = {
  [EnumWakfuStat.PercentHealthPoint]: (stat) => {
    const percentHp = stat.get(EnumWakfuStat.PercentHealthPoint).value;
    const baseHp = stat.get(EnumWakfuStat.HealthPoint).value;
    stat.add(EnumWakfuStat.HealthPoint, Math.floor((baseHp * percentHp) / 100));
    stat.remove(EnumWakfuStat.PercentHealthPoint);
  },
  [EnumWakfuStat.PercentHealthPointToArmor]: (stat) => {
    const percentHp = stat.get(EnumWakfuStat.PercentHealthPointToArmor).value;
    const healthPoint = stat.get(EnumWakfuStat.HealthPoint).value;
    stat.add(EnumWakfuStat.Armor, Math.floor((healthPoint * percentHp) / 100));
    stat.remove(EnumWakfuStat.PercentHealthPointToArmor);
  },
  [EnumWakfuStat.ElementalMastery]: (stat) => {
    const elementMastery = stat.get(EnumWakfuStat.ElementalMastery).value;
    stat.add(EnumWakfuStat.FireMastery, elementMastery);
    stat.add(EnumWakfuStat.WaterMastery, elementMastery);
    stat.add(EnumWakfuStat.EarthMastery, elementMastery);
    stat.add(EnumWakfuStat.AirMastery, elementMastery);
    stat.remove(EnumWakfuStat.ElementalMastery);
  },
};
