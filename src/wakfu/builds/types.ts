import type { TWakfuAbilities } from "../abilities/types";
import type { EnumWakfuBreed } from "../breed/types";
import type { WakfuEnchantment } from "../enchantment";
import type { EnchantableEquipmentPositions } from "../enchantment/constants";
import type { EnumWakfuEnchantmentColor } from "../enchantment/types";
import type { WakfuItem } from "../items";
import type { EnumWakfuEquipmentPosition } from "../itemTypes/types";
import type { TElementalPreferences, TWakfuStats } from "../stats/types";
import type { WakfuSublimation } from "../sublimation";
import type { TWakfuI18n } from "../utils/types";
import type { EnumWakfuStatsBonuses } from "./bonus";

export type TWakfuBuildEnchantmentSlot = {
  level: number;
  enchantment: WakfuEnchantment;
  anyColor: boolean;
};

export type TWakfuBuildEnchantments = {
  sublimationEpic: WakfuSublimation | null;
  sublimationRelic: WakfuSublimation | null;
} & {
  [K in (typeof EnchantableEquipmentPositions)[number]]: {
    enchantments: [
      TWakfuBuildEnchantmentSlot | null,
      TWakfuBuildEnchantmentSlot | null,
      TWakfuBuildEnchantmentSlot | null,
      TWakfuBuildEnchantmentSlot | null,
    ];
    sublimation: WakfuSublimation | null;
  };
};

export type TWakfuCharacterDisplay = {
  id: string;
  name: string;
  breed: EnumWakfuBreed;
  builds: TWakfuBuildMinimalDisplay[];
};

export type TWakfuCharacterRaw = {
  id: string;
  name: string;
  breed: EnumWakfuBreed;
};

export type TWakfuBuildEquipment = {
  preferences: TElementalPreferences | null;
  item: WakfuItem | null;
  disabled: number;
};

export type TWakfuBuildStuff = {
  [K in EnumWakfuEquipmentPosition]: TWakfuBuildEquipment;
};

export type TWakfuBuildStuffDisplay = {
  [K in EnumWakfuEquipmentPosition]: {
    item: ReturnType<typeof WakfuItem.prototype.toObject> | null;
    disabled: boolean;
    constraints: string[];
  };
};

export type TWakfuBuildMinimalDisplay = {
  id: string;
  name: string;
  level: number;
  stuff: TWakfuBuildStuffDisplay;
};

export type TWakfuBuildDisplay = {
  id: string;
  characterId: string;
  characterName: string;
  characterBreed: EnumWakfuBreed;
  name: string;
  level: number;
  abilities: TWakfuAbilities;
  bonuses: Record<EnumWakfuStatsBonuses, boolean>;
  elementalPreferences: TElementalPreferences;
  stuff: TWakfuBuildStuffDisplay;
  stats: TWakfuStats;
  enchantments: {
    sublimationEpic: { id: number; name: TWakfuI18n; gfxId: number } | null;
    sublimationRelic: { id: number; name: TWakfuI18n; gfxId: number } | null;
  } & Record<
    keyof TWakfuBuildEnchantments,
    {
      enchantments: ({ id: number; level: number; color: EnumWakfuEnchantmentColor; anyColor: boolean } | null)[];
      sublimation: { id: number; name: TWakfuI18n; gfxId: number; colorPattern: EnumWakfuEnchantmentColor[] } | null;
    }
  >;
};

export type TWakfuBuildRaw = {
  id: string;
  name: string;
  level: number;
  abilities: TWakfuAbilities;
  stuff: {
    [K in EnumWakfuEquipmentPosition]: {
      preferences: TElementalPreferences | null;
      item: number | null;
      disabled: number;
    };
  };
  elementalPreferences: TElementalPreferences;
  bonuses: Record<EnumWakfuStatsBonuses, boolean>;
  enchantments: {
    sublimationEpic: number | null;
    sublimationRelic: number | null;
  } & Record<
    (typeof EnchantableEquipmentPositions)[number],
    {
      enchantments: (null | { id: number; level: number; anyColor: boolean })[];
      sublimation: number | null;
    }
  >;
};
