import { isNumber, isObject } from "src/types/utils";
import type { EnumWakfuStat } from "../stats/types";

export enum EnumAbilities {
  PercentHp = "PercentHp",
  Resistance = "Resistance",
  Barrier = "Barrier",
  HealingReceived = "HealingReceived",
  PercentHpToArmor = "PercentHpToArmor",
  Mastery = "Mastery",
  MeleeMastery = "MeleeMastery",
  RangeMastery = "RangeMastery",
  Hp = "Hp",
  Lock = "Lock",
  Dodge = "Dodge",
  Initiative = "Initiative",
  LockAndDodge = "LockAndDodge",
  Willpower = "Willpower",
  CriticalRate = "CriticalRate",
  Block = "Block",
  CriticalMastery = "CriticalMastery",
  BackMastery = "BackMastery",
  BerserkMastery = "BerserkMastery",
  HealingMastery = "HealingMastery",
  BackResistance = "BackResistance",
  CriticalResistance = "CriticalResistance",
  Ap = "Ap",
  MpAndMastery = "MpAndMastery",
  RangeAndMastery = "RangeAndMastery",
  Wp = "Wp",
  ControlAndMastery = "ControlAndMastery",
  DamageDealt = "DamageDealt",
  MajorResistance = "MajorResistance",
}

export const isEnumAbilities = (value: string): value is EnumAbilities => {
  return Object.values(EnumAbilities).includes(value as EnumAbilities);
};

export type TAbilitiesEffect = {
  stat: EnumWakfuStat;
  scaling: number;
};

export type TWakfuAbilities = Partial<Record<EnumAbilities, number>>;

export const isWakfuAbilities = (json: unknown): json is TWakfuAbilities => {
  if (!isObject(json)) {
    console.warn("Invalid JSON: Not an object");
    return false;
  }
  for (const key in json) {
    if (!isEnumAbilities(key)) {
      console.warn(`Invalid JSON: ${key} is not a valid EnumAbilities`);
      return false;
    }
    if (!isNumber((json as Record<EnumAbilities, unknown>)[key])) {
      console.warn(`Invalid JSON: ${key} is not a number`);
      return false;
    }
  }
  return true;
};
