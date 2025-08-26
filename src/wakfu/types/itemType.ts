import { isArrayOf, isNumber, isObject } from "src/types/utils";
import { loadWakfuDescriptionFromJson, type TWakfuDescription } from "./description";

export enum WakfuEquipmentPosition {
  Head = "HEAD",
  Back = "BACK",
  Neck = "NECK",
  Shoulders = "SHOULDERS",
  Chest = "CHEST",
  Belt = "BELT",
  LeftHand = "LEFT_HAND",
  RightHand = "RIGHT_HAND",
  Legs = "LEGS",
  SecondWeapon = "SECOND_WEAPON",
  FirstWeapon = "FIRST_WEAPON",
  Accessory = "ACCESSORY",
  Pet = "PET",
  Mount = "MOUNT",
  Costume = "COSTUME",
}

export enum WakfuItemTypeId {
  AxeTwoHanded = 101,
  Ring = 103,
  WandOneHanded = 108,
  SwordOneHanded = 110,
  ShovelTwoHanded = 111,
  DaggerSecondHand = 112,
  StaffOneHanded = 113,
  HammerTwoHanded = 114,
  NeedleOneHanded = 115,
  BowTwoHanded = 117,
  Amulet = 120,
  Boots = 119,
  Cloak = 132,
  Belt = 133,
  Helmet = 134,
  Breastplate = 136,
  Shoulders = 138,
  ShieldSecondHand = 189,
  SwordTwoHanded = 223,
  StaffTwoHanded = 253,
  CardOneHanded = 254,
  OneHandedWeapon = 518,
  TwoHandedWeapon = 519,
  SecondHand = 520,
  Pet = 582,
  Mount = 611,
  Emblem = 646,
  Enchantment = 811,
  Sublimation = 812,
}

export const isWakfuEquipmentPosition = (value: unknown): value is WakfuEquipmentPosition => {
  return typeof value === "string" && Object.values(WakfuEquipmentPosition).includes(value as WakfuEquipmentPosition);
};

export type TWakfuItemType = {
  id: number;
  parentId?: number;
  equipmentPositions: WakfuEquipmentPosition[];
  equipmentDisabledPositions: WakfuEquipmentPosition[];
  title?: TWakfuDescription;
};

export const loadWakfuItemTypeFromJson = (json: unknown): TWakfuItemType => {
  if (
    isObject(json) &&
    "definition" in json &&
    isObject(json.definition) &&
    "id" in json.definition &&
    isNumber(json.definition.id) &&
    "equipmentPositions" in json.definition &&
    isArrayOf(json.definition.equipmentPositions, isWakfuEquipmentPosition) &&
    "equipmentDisabledPositions" in json.definition &&
    isArrayOf(json.definition.equipmentDisabledPositions, isWakfuEquipmentPosition)
  ) {
    const itemType: TWakfuItemType = {
      id: json.definition.id,
      parentId:
        "parentId" in json.definition && isNumber(json.definition.parentId) ? json.definition.parentId : undefined,
      equipmentPositions: json.definition.equipmentPositions,
      equipmentDisabledPositions: json.definition.equipmentDisabledPositions,
      title: "title" in json ? loadWakfuDescriptionFromJson(json.title) : undefined,
    };
    return itemType;
  }
  throw new Error("Invalid JSON: WakfuItemType");
};
