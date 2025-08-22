import { WakfuStats } from "src/wakfu/types/action";

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
  FinalDamage = "FinalDamage",
  MajorResistance = "MajorResistance",
}

export const isEnumAbilities = (value: string): value is EnumAbilities => {
  return Object.values(EnumAbilities).includes(value as EnumAbilities);
};

export type TAbilitiesEffect = {
  stats: WakfuStats;
  scaling: number;
};

export const AbilitiesDefinitions: Record<EnumAbilities, { effects: TAbilitiesEffect[]; maxLevel: number }> = {
  [EnumAbilities.PercentHp]: { effects: [{ stats: WakfuStats.PercentHp, scaling: 4 }], maxLevel: 0 },
  [EnumAbilities.Resistance]: { effects: [{ stats: WakfuStats.Resistance, scaling: 10 }], maxLevel: 10 },
  [EnumAbilities.Barrier]: { effects: [], maxLevel: 10 },
  [EnumAbilities.HealingReceived]: { effects: [{ stats: WakfuStats.HealingReceived, scaling: 6 }], maxLevel: 5 },
  [EnumAbilities.PercentHpToArmor]: { effects: [{ stats: WakfuStats.PercentHpToArmor, scaling: 4 }], maxLevel: 0 },
  [EnumAbilities.Mastery]: { effects: [{ stats: WakfuStats.Mastery, scaling: 5 }], maxLevel: 0 },
  [EnumAbilities.MeleeMastery]: { effects: [{ stats: WakfuStats.MeleeMastery, scaling: 8 }], maxLevel: 40 },
  [EnumAbilities.RangeMastery]: { effects: [{ stats: WakfuStats.DistanceMastery, scaling: 8 }], maxLevel: 40 },
  [EnumAbilities.Hp]: { effects: [{ stats: WakfuStats.PV, scaling: 20 }], maxLevel: 0 },
  [EnumAbilities.Lock]: { effects: [{ stats: WakfuStats.Lock, scaling: 6 }], maxLevel: 0 },
  [EnumAbilities.Dodge]: { effects: [{ stats: WakfuStats.Dodge, scaling: 6 }], maxLevel: 0 },
  [EnumAbilities.Initiative]: { effects: [{ stats: WakfuStats.Initiative, scaling: 4 }], maxLevel: 20 },
  [EnumAbilities.LockAndDodge]: {
    effects: [
      { stats: WakfuStats.Lock, scaling: 4 },
      { stats: WakfuStats.Dodge, scaling: 4 },
    ],
    maxLevel: 0,
  },
  [EnumAbilities.Willpower]: { effects: [{ stats: WakfuStats.Willpower, scaling: 1 }], maxLevel: 20 },
  [EnumAbilities.CriticalRate]: { effects: [{ stats: WakfuStats.CriticalRate, scaling: 1 }], maxLevel: 20 },
  [EnumAbilities.Block]: { effects: [{ stats: WakfuStats.Block, scaling: 1 }], maxLevel: 20 },
  [EnumAbilities.CriticalMastery]: { effects: [{ stats: WakfuStats.CriticalMastery, scaling: 4 }], maxLevel: 0 },
  [EnumAbilities.BackMastery]: { effects: [{ stats: WakfuStats.BackMastery, scaling: 6 }], maxLevel: 0 },
  [EnumAbilities.BerserkMastery]: { effects: [{ stats: WakfuStats.BerserkMastery, scaling: 8 }], maxLevel: 0 },
  [EnumAbilities.HealingMastery]: { effects: [{ stats: WakfuStats.HealingMastery, scaling: 6 }], maxLevel: 0 },
  [EnumAbilities.BackResistance]: { effects: [{ stats: WakfuStats.BackResistance, scaling: 4 }], maxLevel: 20 },
  [EnumAbilities.CriticalResistance]: { effects: [{ stats: WakfuStats.CriticalResistance, scaling: 4 }], maxLevel: 20 },
  [EnumAbilities.Ap]: { effects: [{ stats: WakfuStats.PA, scaling: 1 }], maxLevel: 1 },
  [EnumAbilities.MpAndMastery]: {
    effects: [
      { stats: WakfuStats.PM, scaling: 1 },
      { stats: WakfuStats.Mastery, scaling: 20 },
    ],
    maxLevel: 1,
  },
  [EnumAbilities.RangeAndMastery]: {
    effects: [
      { stats: WakfuStats.Range, scaling: 1 },
      { stats: WakfuStats.Mastery, scaling: 40 },
    ],
    maxLevel: 1,
  },
  [EnumAbilities.Wp]: { effects: [{ stats: WakfuStats.PW, scaling: 2 }], maxLevel: 1 },
  [EnumAbilities.ControlAndMastery]: {
    effects: [
      { stats: WakfuStats.Control, scaling: 2 },
      { stats: WakfuStats.Mastery, scaling: 40 },
    ],
    maxLevel: 1,
  },
  [EnumAbilities.FinalDamage]: { effects: [{ stats: WakfuStats.FinalDamage, scaling: 10 }], maxLevel: 1 },
  [EnumAbilities.MajorResistance]: { effects: [{ stats: WakfuStats.Resistance, scaling: 50 }], maxLevel: 1 },
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
      EnumAbilities.FinalDamage,
      EnumAbilities.MajorResistance,
    ],
    firstPointLevel: 25,
    nextPointsEveryLevels: 50,
  },
};
