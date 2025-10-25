import { EnumWakfuEquipmentPosition } from "../itemTypes/types";

export const EnchantableEquipmentPositions = [
  EnumWakfuEquipmentPosition.Head,
  EnumWakfuEquipmentPosition.Back,
  EnumWakfuEquipmentPosition.Neck,
  EnumWakfuEquipmentPosition.Shoulders,
  EnumWakfuEquipmentPosition.Chest,
  EnumWakfuEquipmentPosition.Belt,
  EnumWakfuEquipmentPosition.LeftHand,
  EnumWakfuEquipmentPosition.RightHand,
  EnumWakfuEquipmentPosition.Legs,
  EnumWakfuEquipmentPosition.FirstWeapon,
] as const satisfies EnumWakfuEquipmentPosition[];
