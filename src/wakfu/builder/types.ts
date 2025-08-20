import { isArrayOf, isBoolean, isNumber, isObject, isString } from "src/types/utils";
import type { WakfuItem } from "../data/item";
import type { TSearchItemsSort } from "../search/types";
import { isWakfuStats } from "../types/action";
import { isWakfuBreed, type WakfuBreed } from "../types/breed";
import { isWakfuEquipmentPosition, type WakfuEquipmentPosition } from "../types/itemType";

export enum WakfuBuildEquippedPositionStatus {
  Empty,
  Disabled,
}

export const isWakfuBuildEquippedPositionStatus = (value: unknown): value is WakfuBuildEquippedPositionStatus => {
  return isNumber(value) && value in WakfuBuildEquippedPositionStatus;
};

export type TWakfuPreferences = TSearchItemsSort;

export type TWakfuEquipment = {
  item: WakfuItem | null;
  position: WakfuEquipmentPosition[];
};

export type TWakfuBuild = {
  name: string;
  breed: WakfuBreed;
  level: number;
  preferences: TWakfuPreferences;
  items: Record<WakfuEquipmentPosition, number | WakfuBuildEquippedPositionStatus>;
};

export const isWakfuBuildPreferences = (json: unknown) => {
  if (!isObject(json)) {
    console.warn("Invalid JSON: Not an object");
    return false;
  }
  if (!("mastery" in json && isObject(json.mastery))) {
    console.warn("Invalid JSON: Mastery is not valid");
    return false;
  }
  if (!("elementsPriority" in json.mastery && isArrayOf(json.mastery.elementsPriority, isWakfuStats))) {
    console.warn("Invalid JSON: Mastery elementsPriority is not valid");
    return false;
  }
  if (!("meleeMastery" in json.mastery && isBoolean(json.mastery.meleeMastery))) {
    console.warn("Invalid JSON: Mastery meleeMastery is not valid");
    return false;
  }
  if (!("rangeMastery" in json.mastery && isBoolean(json.mastery.rangeMastery))) {
    console.warn("Invalid JSON: Mastery rangeMastery is not valid");
    return false;
  }
  if (!("criticalMastery" in json.mastery && isBoolean(json.mastery.criticalMastery))) {
    console.warn("Invalid JSON: Mastery criticalMastery is not valid");
    return false;
  }
  if (!("backMastery" in json.mastery && isBoolean(json.mastery.backMastery))) {
    console.warn("Invalid JSON: Mastery backMastery is not valid");
    return false;
  }
  if (!("berserkMastery" in json.mastery && isBoolean(json.mastery.berserkMastery))) {
    console.warn("Invalid JSON: Mastery berserkMastery is not valid");
    return false;
  }
  if (!("healingMastery" in json.mastery && isBoolean(json.mastery.healingMastery))) {
    console.warn("Invalid JSON: Mastery healingMastery is not valid");
    return false;
  }
  if (!("resistance" in json && isObject(json.resistance))) {
    console.warn("Invalid JSON: Resistance is not valid");
    return false;
  }
  if (!("elementsPriority" in json.resistance && isArrayOf(json.resistance.elementsPriority, isWakfuStats))) {
    console.warn("Invalid JSON: Resistance elementsPriority is not valid");
    return false;
  }
  return true;
};

export const isWakfuBuild = (json: unknown): json is TWakfuBuild => {
  if (!isObject(json)) {
    console.warn("Invalid JSON: Not an object");
    return false;
  }
  if (!("name" in json && isString(json.name))) {
    console.warn("Invalid JSON: Name is not valid");
    return false;
  }
  if (!("breed" in json && isWakfuBreed(json.breed))) {
    console.warn("Invalid JSON: Breed is not valid");
    return false;
  }
  if (!("level" in json && isNumber(json.level))) {
    console.warn("Invalid JSON: Level is not valid");
    return false;
  }
  if (!("preferences" in json && isWakfuBuildPreferences(json.preferences))) {
    console.warn("Invalid JSON: Preferences is not valid");
    return false;
  }
  if (
    !(
      "items" in json &&
      isObject(json.items) &&
      isArrayOf(Object.keys(json.items), isWakfuEquipmentPosition) &&
      isArrayOf(Object.values(json.items), isNumber)
    )
  ) {
    console.warn("Invalid JSON: Items is not valid");
    return false;
  }
  return true;
};
