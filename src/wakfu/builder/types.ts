import { isArrayOf, isNumber, isObject, isString } from "src/types/utils";
import type { WakfuItem } from "../data/item";
import { isWakfuStats, type WakfuStats } from "../types/action";
import { isWakfuBreed, type WakfuBreed } from "../types/breed";
import { isWakfuEquipmentPosition, type WakfuEquipmentPosition } from "../types/itemType";

export enum WakfuBuildEquippedPositionStatus {
  Empty,
  Disabled,
}

export const isWakfuBuildEquippedPositionStatus = (value: unknown): value is WakfuBuildEquippedPositionStatus => {
  return isNumber(value) && value in WakfuBuildEquippedPositionStatus;
};

export type TWakfuBuildPreferences = {
  mastery: [
    WakfuStats.MasteryFire | WakfuStats.MasteryWater | WakfuStats.MasteryEarth | WakfuStats.MasteryAir,
    WakfuStats.MasteryFire | WakfuStats.MasteryWater | WakfuStats.MasteryEarth | WakfuStats.MasteryAir,
    WakfuStats.MasteryFire | WakfuStats.MasteryWater | WakfuStats.MasteryEarth | WakfuStats.MasteryAir,
    WakfuStats.MasteryFire | WakfuStats.MasteryWater | WakfuStats.MasteryEarth | WakfuStats.MasteryAir,
  ];
  resistance: [
    WakfuStats.ResistanceFire | WakfuStats.ResistanceWater | WakfuStats.ResistanceEarth | WakfuStats.ResistanceAir,
    WakfuStats.ResistanceFire | WakfuStats.ResistanceWater | WakfuStats.ResistanceEarth | WakfuStats.ResistanceAir,
    WakfuStats.ResistanceFire | WakfuStats.ResistanceWater | WakfuStats.ResistanceEarth | WakfuStats.ResistanceAir,
    WakfuStats.ResistanceFire | WakfuStats.ResistanceWater | WakfuStats.ResistanceEarth | WakfuStats.ResistanceAir,
  ];
};

export type TWakfuEquipment = {
  item: WakfuItem | null;
  position: WakfuEquipmentPosition[];
};

export type TWakfuBuild = {
  name: string;
  breed: WakfuBreed;
  level: number;
  preferences: TWakfuBuildPreferences;
  items: Record<WakfuEquipmentPosition, number | WakfuBuildEquippedPositionStatus>;
};

export const isWakfuBuildPreferences = (json: unknown) => {
  if (!isObject(json)) {
    console.warn("Invalid JSON: Not an object");
    return false;
  }
  if (
    !("mastery" in json && isObject(json.mastery) && isArrayOf(json.mastery, isWakfuStats) && json.mastery.length === 4)
  ) {
    console.warn("Invalid JSON: Mastery is not valid");
    return false;
  }
  if (
    !(
      "resistance" in json &&
      isObject(json.resistance) &&
      isArrayOf(json.resistance, isWakfuStats) &&
      json.resistance.length === 4
    )
  ) {
    console.warn("Invalid JSON: Resistance is not valid");
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
