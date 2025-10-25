import { EnumWakfuEquipmentPosition } from "../itemTypes/types";
import { getWakfuStatForMapping } from "../stats/mapping";
import type { EnumWakfuGamedataType, TWakfuGamedataTypes } from "../store/types";
import type { TWakfuEnchantmentEffect } from "./types";

const DoubleBonusPositionMapping: Record<number, EnumWakfuEquipmentPosition> = {
  0: EnumWakfuEquipmentPosition.Head,
  3: EnumWakfuEquipmentPosition.Shoulders,
  4: EnumWakfuEquipmentPosition.Neck,
  5: EnumWakfuEquipmentPosition.Chest,
  7: EnumWakfuEquipmentPosition.LeftHand,
  8: EnumWakfuEquipmentPosition.RightHand,
  10: EnumWakfuEquipmentPosition.Belt,
  12: EnumWakfuEquipmentPosition.Legs,
  13: EnumWakfuEquipmentPosition.Back,
  15: EnumWakfuEquipmentPosition.FirstWeapon,
};

export const fromBonusPositionToEquipmentPosition = (position: number[]): EnumWakfuEquipmentPosition[] => {
  const positions: EnumWakfuEquipmentPosition[] = [];
  for (const pos of position) {
    const equipmentPosition = DoubleBonusPositionMapping[pos];
    if (equipmentPosition) {
      positions.push(equipmentPosition);
    }
  }
  return positions;
};

export const fromEquipmentEffectToEnchantmentEffect = (
  effects: TWakfuGamedataTypes[EnumWakfuGamedataType.Items]["definition"]["equipEffects"],
): TWakfuEnchantmentEffect[] => {
  const enchantmentEffects: TWakfuEnchantmentEffect[] = [];
  for (const effect of effects) {
    const stat = getWakfuStatForMapping(effect.effect.definition.actionId, effect.effect.definition.params);
    if (stat) {
      enchantmentEffects.push({
        stat,
        baseValue: effect.effect.definition.params[0],
        perLevelValue: effect.effect.definition.params[1],
      });
    }
  }
  return enchantmentEffects;
};
