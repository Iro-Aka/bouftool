import { isNumber, isObject } from "src/types/utils";
import { loadWakfuDescriptionFromJson, type TWakfuDescription } from "./description";

export enum WakfuStats {
  PV,
  PW,
  PA,
  PM,
  Mastery,
  MasteryFire,
  MasteryEarth,
  MasteryWater,
  MasteryAir,
  Resistance,
  ResistanceFire,
  ResistanceWater,
  ResistanceEarth,
  ResistanceAir,
  CriticalRate,
  Initiative,
  Dodge,
  Control,
  Block,
  Range,
  Lock,
  Willpower,
  CriticalMastery,
  CriticalResistance,
  BackMastery,
  BackResistance,
  MeleeMastery,
  DistanceMastery,
  ArmorGiven,
  ArmorReceived,
  HealingMastery,
  BerserkMastery,
  FinalDamage,
  FinalHealing,
  Wisdom,
  Prospection,
  IndirectDamages,
  HealingReceived,
  Armor,
}

export type TWakfuStatsElementalMastery =
  | WakfuStats.MasteryFire
  | WakfuStats.MasteryWater
  | WakfuStats.MasteryEarth
  | WakfuStats.MasteryAir;

export const isWakfuStats = (value: unknown): value is WakfuStats => {
  return typeof value === "number" && Object.values(WakfuStats).includes(value);
};

export enum WakfuActionId {
  PV = 20,
  PVLoss = 21,
  PW = 191,
  PWLoss = 192,
  PA = 31,
  PALoss = 56,
  PM = 41,
  PMLoss = 57,
  Mastery = 120,
  MasteryLoss = 130,
  MasteryFire = 122,
  MasteryFireLoss = 132,
  MasteryEarth = 123,
  MasteryEarthLoss = 133,
  MasteryWater = 124,
  MasteryWaterLoss = 134,
  MasteryAir = 125,
  MasteryAirLoss = 135,
  Resistance = 80,
  ResistanceLoss = 90,
  ResistanceFire = 82,
  ResistanceFireLoss = 92,
  ResistanceWater = 83,
  ResistanceWaterLoss = 93,
  ResistanceEarth = 84,
  ResistanceEarthLoss = 94,
  ResistanceAir = 85,
  ResistanceAirLoss = 95,
  CriticalRate = 150,
  CriticalRateLoss = 168,
  Initiative = 171,
  InitiativeLoss = 172,
  Dodge = 175,
  DodgeLoss = 176,
  Control = 184,
  ControlLoss = 185,
  Block = 875,
  BlockLoss = 876,
  Range = 160,
  RangeLoss = 161,
  Lock = 173,
  LockLoss = 174,
  Willpower = 177,
  WillpowerLoss = 178,
  CriticalMastery = 149,
  CriticalMasteryLoss = 1056,
  CriticalResistance = 988,
  CriticalResistanceLoss = 1062,
  BackMastery = 180,
  BackMasteryLoss = 181,
  BackResistance = 71,
  BackResistanceLoss = 1063,
  MeleeMastery = 1052,
  MeleeMasteryLoss = 1059,
  DistanceMastery = 1053,
  DistanceMasteryLoss = 1060,
  ArmorGiven = 39, // [#3] = 120
  ArmorGivenLoss = 40, // [#3] = 120
  ArmorReceived = 39, // [#3] = 121
  ArmorReceivedLoss = 40, // [#3] = 121
  HealingMastery = 26,
  BerserkMastery = 1055,
  BerserkMasteryLoss = 1061,
  MasteryOnXElements = 1068,
  ResistanceOnXElements = 1069,
  FinalDamage = 39, // [#3] = 10 000
  FinalHealing = 39, // [#3] = 10 001
  Wisdom = 39, // [#3] = 10 002
  Prospection = 39, // [#3] = 10 003
  IndirectDamages = 39, // [#3] = 10 004
  HealingReceived = 39, // [#3] = 10 005
  Armor = 39, // [#3] = 10 006
}

export const wakfuStatsToWakfuActionId: Record<
  WakfuStats,
  { gain: WakfuActionId; loss?: WakfuActionId; params?: { paramIndex: number; value: number }[] }
> = {
  [WakfuStats.PV]: { gain: WakfuActionId.PV, loss: WakfuActionId.PVLoss },
  [WakfuStats.PW]: { gain: WakfuActionId.PW, loss: WakfuActionId.PWLoss },
  [WakfuStats.PA]: { gain: WakfuActionId.PA, loss: WakfuActionId.PALoss },
  [WakfuStats.PM]: { gain: WakfuActionId.PM, loss: WakfuActionId.PMLoss },
  [WakfuStats.Mastery]: { gain: WakfuActionId.Mastery, loss: WakfuActionId.MasteryLoss },
  [WakfuStats.MasteryFire]: { gain: WakfuActionId.MasteryFire, loss: WakfuActionId.MasteryFireLoss },
  [WakfuStats.MasteryEarth]: {
    gain: WakfuActionId.MasteryEarth,
    loss: WakfuActionId.MasteryEarthLoss,
  },
  [WakfuStats.MasteryWater]: {
    gain: WakfuActionId.MasteryWater,
    loss: WakfuActionId.MasteryWaterLoss,
  },
  [WakfuStats.MasteryAir]: { gain: WakfuActionId.MasteryAir, loss: WakfuActionId.MasteryAirLoss },
  [WakfuStats.Resistance]: { gain: WakfuActionId.Resistance, loss: WakfuActionId.ResistanceLoss },
  [WakfuStats.ResistanceFire]: {
    gain: WakfuActionId.ResistanceFire,
    loss: WakfuActionId.ResistanceFireLoss,
  },
  [WakfuStats.ResistanceWater]: {
    gain: WakfuActionId.ResistanceWater,
    loss: WakfuActionId.ResistanceWaterLoss,
  },
  [WakfuStats.ResistanceEarth]: {
    gain: WakfuActionId.ResistanceEarth,
    loss: WakfuActionId.ResistanceEarthLoss,
  },
  [WakfuStats.ResistanceAir]: {
    gain: WakfuActionId.ResistanceAir,
    loss: WakfuActionId.ResistanceAirLoss,
  },
  [WakfuStats.CriticalRate]: {
    gain: WakfuActionId.CriticalRate,
    loss: WakfuActionId.CriticalRateLoss,
  },
  [WakfuStats.Initiative]: { gain: WakfuActionId.Initiative, loss: WakfuActionId.InitiativeLoss },
  [WakfuStats.Dodge]: { gain: WakfuActionId.Dodge, loss: WakfuActionId.DodgeLoss },
  [WakfuStats.Control]: { gain: WakfuActionId.Control, loss: WakfuActionId.ControlLoss },
  [WakfuStats.Block]: { gain: WakfuActionId.Block, loss: WakfuActionId.BlockLoss },
  [WakfuStats.Range]: { gain: WakfuActionId.Range, loss: WakfuActionId.RangeLoss },
  [WakfuStats.Lock]: { gain: WakfuActionId.Lock, loss: WakfuActionId.LockLoss },
  [WakfuStats.Willpower]: { gain: WakfuActionId.Willpower, loss: WakfuActionId.WillpowerLoss },
  [WakfuStats.CriticalMastery]: {
    gain: WakfuActionId.CriticalMastery,
    loss: WakfuActionId.CriticalMasteryLoss,
  },
  [WakfuStats.CriticalResistance]: {
    gain: WakfuActionId.CriticalResistance,
    loss: WakfuActionId.CriticalResistanceLoss,
  },
  [WakfuStats.BackMastery]: { gain: WakfuActionId.BackMastery, loss: WakfuActionId.BackMasteryLoss },
  [WakfuStats.BackResistance]: {
    gain: WakfuActionId.BackResistance,
    loss: WakfuActionId.BackResistanceLoss,
  },
  [WakfuStats.MeleeMastery]: {
    gain: WakfuActionId.MeleeMastery,
    loss: WakfuActionId.MeleeMasteryLoss,
  },
  [WakfuStats.DistanceMastery]: {
    gain: WakfuActionId.DistanceMastery,
    loss: WakfuActionId.DistanceMasteryLoss,
  },
  [WakfuStats.ArmorGiven]: {
    gain: WakfuActionId.ArmorGiven,
    loss: WakfuActionId.ArmorGivenLoss,
    params: [{ paramIndex: 3, value: 120 }],
  },
  [WakfuStats.ArmorReceived]: {
    gain: WakfuActionId.ArmorReceived,
    loss: WakfuActionId.ArmorReceivedLoss,
    params: [{ paramIndex: 3, value: 121 }],
  },
  [WakfuStats.HealingMastery]: { gain: WakfuActionId.HealingMastery },
  [WakfuStats.BerserkMastery]: {
    gain: WakfuActionId.BerserkMastery,
    loss: WakfuActionId.BerserkMasteryLoss,
  },
  [WakfuStats.FinalDamage]: {
    gain: WakfuActionId.FinalDamage,
    params: [{ paramIndex: 3, value: 10000 }],
  },
  [WakfuStats.FinalHealing]: {
    gain: WakfuActionId.FinalHealing,
    params: [{ paramIndex: 3, value: 10001 }],
  },
  [WakfuStats.Wisdom]: {
    gain: WakfuActionId.Wisdom,
    params: [{ paramIndex: 3, value: 10002 }],
  },
  [WakfuStats.Prospection]: {
    gain: WakfuActionId.Prospection,
    params: [{ paramIndex: 3, value: 10003 }],
  },
  [WakfuStats.IndirectDamages]: {
    gain: WakfuActionId.IndirectDamages,
    params: [{ paramIndex: 3, value: 10004 }],
  },
  [WakfuStats.HealingReceived]: {
    gain: WakfuActionId.HealingReceived,
    params: [{ paramIndex: 3, value: 10005 }],
  },
  [WakfuStats.Armor]: {
    gain: WakfuActionId.Armor,
    params: [{ paramIndex: 3, value: 10006 }],
  },
};

export type TWakfuAction = {
  id: number;
  description?: TWakfuDescription;
};

export const loadWakfuActionFromJson = (json: unknown): TWakfuAction => {
  if (
    isObject(json) &&
    "definition" in json &&
    isObject(json.definition) &&
    "id" in json.definition &&
    isNumber(json.definition.id)
  ) {
    return {
      id: json.definition.id,
      description: "description" in json ? loadWakfuDescriptionFromJson(json.description) : undefined,
    };
  }
  throw new Error("Invalid JSON: WakfuAction");
};
