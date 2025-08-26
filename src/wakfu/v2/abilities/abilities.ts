import { EnumWakfuStat } from "../stats/types";
import { EnumAbilities, type TAbilitiesEffect } from "./types";

export const AbilitiesDefinitions: Record<EnumAbilities, { effects: TAbilitiesEffect[]; maxLevel: number }> = {
  [EnumAbilities.PercentHp]: { effects: [{ stat: EnumWakfuStat.PercentHealthPoint, scaling: 4 }], maxLevel: 0 },
  [EnumAbilities.Resistance]: { effects: [{ stat: EnumWakfuStat.ElementalResistance, scaling: 10 }], maxLevel: 10 },
  [EnumAbilities.Barrier]: {
    effects: [
      {
        stat: EnumWakfuStat.Barrier,
        scaling: 1,
      },
    ],
    maxLevel: 10,
  },
  [EnumAbilities.HealingReceived]: { effects: [{ stat: EnumWakfuStat.HealingReceived, scaling: 6 }], maxLevel: 5 },
  [EnumAbilities.PercentHpToArmor]: {
    effects: [{ stat: EnumWakfuStat.PercentHealthPointToArmor, scaling: 4 }],
    maxLevel: 0,
  },
  [EnumAbilities.Mastery]: { effects: [{ stat: EnumWakfuStat.ElementalMastery, scaling: 5 }], maxLevel: 0 },
  [EnumAbilities.MeleeMastery]: { effects: [{ stat: EnumWakfuStat.MeleeMastery, scaling: 8 }], maxLevel: 40 },
  [EnumAbilities.RangeMastery]: { effects: [{ stat: EnumWakfuStat.DistanceMastery, scaling: 8 }], maxLevel: 40 },
  [EnumAbilities.Hp]: { effects: [{ stat: EnumWakfuStat.HealthPoint, scaling: 20 }], maxLevel: 0 },
  [EnumAbilities.Lock]: { effects: [{ stat: EnumWakfuStat.Lock, scaling: 6 }], maxLevel: 0 },
  [EnumAbilities.Dodge]: { effects: [{ stat: EnumWakfuStat.Dodge, scaling: 6 }], maxLevel: 0 },
  [EnumAbilities.Initiative]: { effects: [{ stat: EnumWakfuStat.Initiative, scaling: 4 }], maxLevel: 20 },
  [EnumAbilities.LockAndDodge]: {
    effects: [
      { stat: EnumWakfuStat.Lock, scaling: 4 },
      { stat: EnumWakfuStat.Dodge, scaling: 4 },
    ],
    maxLevel: 0,
  },
  [EnumAbilities.Willpower]: { effects: [{ stat: EnumWakfuStat.Willpower, scaling: 1 }], maxLevel: 20 },
  [EnumAbilities.CriticalRate]: { effects: [{ stat: EnumWakfuStat.CriticalHit, scaling: 1 }], maxLevel: 20 },
  [EnumAbilities.Block]: { effects: [{ stat: EnumWakfuStat.Block, scaling: 1 }], maxLevel: 20 },
  [EnumAbilities.CriticalMastery]: { effects: [{ stat: EnumWakfuStat.CriticalMastery, scaling: 4 }], maxLevel: 0 },
  [EnumAbilities.BackMastery]: { effects: [{ stat: EnumWakfuStat.RearMastery, scaling: 6 }], maxLevel: 0 },
  [EnumAbilities.BerserkMastery]: { effects: [{ stat: EnumWakfuStat.BerserkMastery, scaling: 8 }], maxLevel: 0 },
  [EnumAbilities.HealingMastery]: { effects: [{ stat: EnumWakfuStat.HealingMastery, scaling: 6 }], maxLevel: 0 },
  [EnumAbilities.BackResistance]: { effects: [{ stat: EnumWakfuStat.RearResistance, scaling: 4 }], maxLevel: 20 },
  [EnumAbilities.CriticalResistance]: {
    effects: [{ stat: EnumWakfuStat.CriticalResistance, scaling: 4 }],
    maxLevel: 20,
  },
  [EnumAbilities.Ap]: { effects: [{ stat: EnumWakfuStat.ActionPoint, scaling: 1 }], maxLevel: 1 },
  [EnumAbilities.MpAndMastery]: {
    effects: [
      { stat: EnumWakfuStat.MovementPoint, scaling: 1 },
      { stat: EnumWakfuStat.ElementalMastery, scaling: 20 },
    ],
    maxLevel: 1,
  },
  [EnumAbilities.RangeAndMastery]: {
    effects: [
      { stat: EnumWakfuStat.Range, scaling: 1 },
      { stat: EnumWakfuStat.ElementalMastery, scaling: 40 },
    ],
    maxLevel: 1,
  },
  [EnumAbilities.Wp]: { effects: [{ stat: EnumWakfuStat.WakfuPoint, scaling: 2 }], maxLevel: 1 },
  [EnumAbilities.ControlAndMastery]: {
    effects: [
      { stat: EnumWakfuStat.Control, scaling: 2 },
      { stat: EnumWakfuStat.ElementalMastery, scaling: 40 },
    ],
    maxLevel: 1,
  },
  [EnumAbilities.DamageDealt]: { effects: [{ stat: EnumWakfuStat.DamageDealt, scaling: 10 }], maxLevel: 1 },
  [EnumAbilities.MajorResistance]: {
    effects: [{ stat: EnumWakfuStat.ElementalResistance, scaling: 50 }],
    maxLevel: 1,
  },
};

export enum EnumAbilitiesCategories {
  Intelligence = "Intelligence",
  Strength = "Strength",
  Agility = "Agility",
  Chance = "Chance",
  Major = "Major",
}

export const AbilitiesCategories: Record<
  EnumAbilitiesCategories,
  { label: string; abilities: EnumAbilities[]; firstPointLevel: number; nextPointsEveryLevels: number }
> = {
  [EnumAbilitiesCategories.Intelligence]: {
    label: "Intelligence",
    abilities: [
      EnumAbilities.PercentHp,
      EnumAbilities.Resistance,
      EnumAbilities.Barrier,
      EnumAbilities.HealingReceived,
      EnumAbilities.PercentHpToArmor,
    ],
    firstPointLevel: 2,
    nextPointsEveryLevels: 4,
  },
  [EnumAbilitiesCategories.Strength]: {
    label: "Force",
    abilities: [EnumAbilities.Mastery, EnumAbilities.MeleeMastery, EnumAbilities.RangeMastery, EnumAbilities.Hp],
    firstPointLevel: 3,
    nextPointsEveryLevels: 4,
  },
  [EnumAbilitiesCategories.Agility]: {
    label: "Agilité",
    abilities: [
      EnumAbilities.Lock,
      EnumAbilities.Dodge,
      EnumAbilities.Initiative,
      EnumAbilities.LockAndDodge,
      EnumAbilities.Willpower,
    ],
    firstPointLevel: 4,
    nextPointsEveryLevels: 4,
  },
  [EnumAbilitiesCategories.Chance]: {
    label: "Chance",
    abilities: [
      EnumAbilities.CriticalRate,
      EnumAbilities.Block,
      EnumAbilities.CriticalMastery,
      EnumAbilities.BackMastery,
      EnumAbilities.BerserkMastery,
      EnumAbilities.HealingMastery,
      EnumAbilities.BackResistance,
      EnumAbilities.CriticalResistance,
    ],
    firstPointLevel: 5,
    nextPointsEveryLevels: 4,
  },
  [EnumAbilitiesCategories.Major]: {
    label: "Majeur",
    abilities: [
      EnumAbilities.Ap,
      EnumAbilities.MpAndMastery,
      EnumAbilities.RangeAndMastery,
      EnumAbilities.Wp,
      EnumAbilities.ControlAndMastery,
      EnumAbilities.DamageDealt,
      EnumAbilities.MajorResistance,
    ],
    firstPointLevel: 25,
    nextPointsEveryLevels: 50,
  },
};
