import { isWakfuStats, WakfuStats } from "../types/action";
import { WakfuEquipmentPosition } from "../types/itemType";

export const initializeStats = (): Record<WakfuStats, number> => {
  const stats: Partial<Record<WakfuStats, number>> = {};
  for (const stat of Object.values(WakfuStats)) {
    if (isWakfuStats(stat)) {
      stats[stat] = 0;
    }
  }
  return stats as Record<WakfuStats, number>;
};

export const setEquipmentPositionRecord = <T>(getValue: (position: WakfuEquipmentPosition) => T) => {
  const record: Partial<Record<WakfuEquipmentPosition, T>> = {};
  for (const position of Object.values(WakfuEquipmentPosition)) {
    record[position] = getValue(position);
  }
  return record as Record<WakfuEquipmentPosition, T>;
};
