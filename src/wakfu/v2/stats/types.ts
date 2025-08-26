export enum EnumWakfuStat {
  HealthPoint = "HealthPoint",
  HealingMastery = "HealingMastery",
  ActionPoint = "ActionPoint",
  MovementPoint = "MovementPoint",
  ElementalResistance = "ElementalResistance",
  FireResistance = "FireResistance",
  WaterResistance = "WaterResistance",
  EarthResistance = "EarthResistance",
  AirResistance = "AirResistance",
  RearResistance = "RearResistance",
  ElementalMastery = "ElementalMastery",
  FireMastery = "FireMastery",
  EarthMastery = "EarthMastery",
  WaterMastery = "WaterMastery",
  AirMastery = "AirMastery",
  CriticalMastery = "CriticalMastery",
  CriticalHit = "CriticalHit",
  Range = "Range",
  Prospecting = "Prospecting",
  Wisdom = "Wisdom",
  Initiative = "Initiative",
  Lock = "Lock",
  Dodge = "Dodge",
  Willpower = "Willpower",
  RearMastery = "RearMastery",
  Control = "Control",
  WakfuPoint = "WakfuPoint",
  Block = "Block",
  CriticalResistance = "CriticalResistance",
  MeleeMastery = "MeleeMastery",
  DistanceMastery = "DistanceMastery",
  BerserkMastery = "BerserkMastery",
  PercentHealthPoint = "PercentHealthPoint",
  Barrier = "Barrier",
  HealingReceived = "HealingReceived",
  PercentHealthPointToArmor = "PercentHealthPointToArmor",
  DamageDealt = "DamageDealt",
  HealingDone = "HealingDone",
  Armor = "Armor",
  IndirectDamages = "IndirectDamages",
  ArmorGiven = "ArmorGiven",
  ArmorReceived = "ArmorReceived",
}

export enum EnumWakfuVariableStat {
  State = "State",
  VariableElementalMastery = "VariableElementalMastery",
  VariableResistanceMastery = "VariableResistanceMastery",
  HarvestBonus = "HarvestBonus",
}

export type TWakfuStatElementalMastery =
  | EnumWakfuStat.FireMastery
  | EnumWakfuStat.WaterMastery
  | EnumWakfuStat.EarthMastery
  | EnumWakfuStat.AirMastery;
export type TElementalPreferences = [
  TWakfuStatElementalMastery,
  TWakfuStatElementalMastery,
  TWakfuStatElementalMastery,
  TWakfuStatElementalMastery,
];

export const isWakfuStat = (stat: unknown): stat is EnumWakfuStat => {
  return Object.values(EnumWakfuStat).includes(stat as EnumWakfuStat);
};

export const isWakfuVariableStat = (stat: unknown): stat is EnumWakfuVariableStat => {
  return Object.values(EnumWakfuVariableStat).includes(stat as EnumWakfuVariableStat);
};

export type TWakfuStatValue = { value: number };
export type TWakfuVariableStatValue = { value: number; option: number };

export type TWakfuStats = Partial<{
  [Key in EnumWakfuStat | EnumWakfuVariableStat]: Key extends EnumWakfuVariableStat
    ? TWakfuVariableStatValue[]
    : TWakfuStatValue;
}>;
