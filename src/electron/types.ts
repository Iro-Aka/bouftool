import type { IpcRendererEvent } from "electron";
import type { EnumAbilities } from "src/wakfu/abilities/types";
import type { EnumWakfuStatsBonuses } from "src/wakfu/builds/bonus";
import type { TWakfuBuildDisplay, TWakfuCharacterDisplay } from "src/wakfu/builds/types";
import type { TCraftItem } from "src/wakfu/craftManager/types";
import type { EnchantableEquipmentPositions } from "src/wakfu/enchantment/constants";
import type { EnumWakfuEnchantmentColor } from "src/wakfu/enchantment/types";
import type { WakfuItem } from "src/wakfu/items";
import type { EnumWakfuRarity } from "src/wakfu/items/rarity";
import type { EnumWakfuEquipmentPosition } from "src/wakfu/itemTypes/types";
import type { WakfuRecipe } from "src/wakfu/recipes/recipe";
import type { WakfuStats } from "src/wakfu/stats";
import type { TElementalPreferences } from "src/wakfu/stats/types";
import type { EnumWakfuLang, TWakfuI18n } from "src/wakfu/utils/types";
import type { OptimizationConfig } from "../wakfu/optimization/optimizationLauncher";
import type { TSearchItemsPayload } from "./searchItems/types";

export enum ElectronEvents {
  AppReady = "app:ready",
  OpenWebEncyclopedia = "app:open-web-encyclopedia",
  SearchItems = "search:items",
  GetItemById = "data:get-item-by-id",
  GetItemTypeLabels = "data:get-itemtype-labels",
  GetItemTypesByEquipmentPosition = "data:get-itemtypes-by-equipment-position",
  GetItemRecipes = "data:get-item-recipes",
  GetEnchantments = "data:get-enchantments",
  GetAllBuilds = "build:get-all",
  BuildCreate = "build:create",
  BuildDelete = "build:delete",
  GetBuild = "build:get",
  BuildCreateCharacter = "build:create-character",
  BuildEditCharacter = "build:edit-character",
  BuildSetInfo = "build:set-info",
  BuildEquipItem = "build:equip",
  BuildUnequipItem = "build:unequip",
  BuildCompareItem = "build:compare",
  BuildSetPreferences = "build:set-preferences",
  BuildAddAbilityLevel = "build:add-ability-level",
  BuildRemoveAbilityLevel = "build:remove-ability-level",
  BuildSetBonuses = "build:set-bonuses",
  BuildAssignEnchantment = "build:assign-enchantment",
  BuildAssignSublimation = "build:assign-sublimation",
  BuildAssignUniqueSublimation = "build:assign-unique-sublimation",
  BuildUnassignUniqueSublimation = "build:unassign-unique-sublimation",
  BuildSerialize = "build:serialize",
  BuildDeserialize = "build:deserialize",
  BuildOptimize = "build:optimize",
  BuildOptimizeProgress = "build:optimize-progress",
  BuildOptimizeResult = "build:optimize-result",
  CraftManagerAddItem = "craftmanager:add-item",
  CraftManagerRemoveItem = "craftmanager:remove-item",
  CraftManagerSetItemQuantity = "craftmanager:set-item-quantity",
  CraftManagerGetItems = "craftmanager:get-items",
  CraftManagerMarkIngredientAsCrafted = "craftmanager:mark-ingredient-as-crafted",
  CraftManagerUnmarkIngredientAsCrafted = "craftmanager:unmark-ingredient-as-crafted",
  CraftManagerMarkAllIngredientsById = "craftmanager:mark-all-ingredients-by-id",
  CraftManagerSetIngredientRecipe = "craftmanager:set-ingredient-recipe",
}

export type ElectronEventsMain = {
  [ElectronEvents.AppReady]: undefined;
  [ElectronEvents.OpenWebEncyclopedia]: { itemTypeId: number; itemId: number };
  [ElectronEvents.SearchItems]: TSearchItemsPayload;
  [ElectronEvents.GetItemById]: { id: number };
  [ElectronEvents.GetItemTypeLabels]: undefined;
  [ElectronEvents.GetItemTypesByEquipmentPosition]: { position: EnumWakfuEquipmentPosition };
  [ElectronEvents.GetItemRecipes]: { itemId: number };
  [ElectronEvents.GetEnchantments]: undefined;
  [ElectronEvents.BuildCreateCharacter]: { name: string; breed: number };
  [ElectronEvents.BuildEditCharacter]: { characterId: string; name: string; breed: number };
  [ElectronEvents.GetAllBuilds]: undefined;
  [ElectronEvents.BuildCreate]: { characterId: string };
  [ElectronEvents.BuildDelete]: { characterId: string; buildId: string };
  [ElectronEvents.GetBuild]: { buildId: string };
  [ElectronEvents.BuildEquipItem]: { buildId: string; itemId: number; position?: EnumWakfuEquipmentPosition };
  [ElectronEvents.BuildUnequipItem]: { buildId: string; position: EnumWakfuEquipmentPosition };
  [ElectronEvents.BuildCompareItem]: { buildId: string; itemId: number };
  [ElectronEvents.BuildSetPreferences]: { buildId: string; preferences: TElementalPreferences };
  [ElectronEvents.BuildAddAbilityLevel]: { buildId: string; ability: EnumAbilities; level: number };
  [ElectronEvents.BuildRemoveAbilityLevel]: { buildId: string; ability: EnumAbilities; level: number };
  [ElectronEvents.BuildSetInfo]: { buildId: string; name: string; level: number };
  [ElectronEvents.BuildSetBonuses]: {
    buildId: string;
    bonuses: Record<EnumWakfuStatsBonuses, boolean>;
  };
  [ElectronEvents.BuildAssignEnchantment]: {
    buildId: string;
    equipmentPosition: (typeof EnchantableEquipmentPositions)[number];
    slotPosition: number;
    enchantmentId: number | null;
    enchantmentLevel: number;
    anyColor?: boolean;
  };
  [ElectronEvents.BuildAssignSublimation]: {
    buildId: string;
    equipmentPosition: (typeof EnchantableEquipmentPositions)[number];
    sublimationId: number | null;
  };
  [ElectronEvents.BuildAssignUniqueSublimation]: {
    buildId: string;
    sublimationId: number;
  };
  [ElectronEvents.BuildUnassignUniqueSublimation]: {
    buildId: string;
    rarity: EnumWakfuRarity.Epic | EnumWakfuRarity.Relic;
  };
  [ElectronEvents.BuildSerialize]: { buildId: string };
  [ElectronEvents.BuildDeserialize]: { characterId: string; serializedBuild: string };
  [ElectronEvents.BuildOptimize]: { buildId: string; config: OptimizationConfig };
  [ElectronEvents.BuildOptimizeProgress]: undefined;
  [ElectronEvents.BuildOptimizeResult]: undefined;
  [ElectronEvents.CraftManagerAddItem]: { itemId: number };
  [ElectronEvents.CraftManagerRemoveItem]: { itemId: number };
  [ElectronEvents.CraftManagerSetItemQuantity]: { itemId: number; quantity: number };
  [ElectronEvents.CraftManagerGetItems]: undefined;
  [ElectronEvents.CraftManagerMarkIngredientAsCrafted]: { itemId: number; path: number[] };
  [ElectronEvents.CraftManagerUnmarkIngredientAsCrafted]: { itemId: number; path: number[] };
  [ElectronEvents.CraftManagerMarkAllIngredientsById]: { ingredientId: number };
  [ElectronEvents.CraftManagerSetIngredientRecipe]: { itemId: number; path: number[]; recipeIndex: number };
};

export type ElectronEventsRenderer = {
  [ElectronEvents.AppReady]: { version: string; lang: EnumWakfuLang };
  [ElectronEvents.OpenWebEncyclopedia]: undefined;
  [ElectronEvents.SearchItems]: ReturnType<WakfuItem["toObject"]>[];
  [ElectronEvents.GetItemById]: ReturnType<WakfuItem["toObject"]>;
  [ElectronEvents.GetItemTypeLabels]: Record<number, string>;
  [ElectronEvents.GetItemTypesByEquipmentPosition]: number[];
  [ElectronEvents.GetItemRecipes]: ReturnType<WakfuRecipe["toObject"]>[];
  [ElectronEvents.GetEnchantments]: {
    shardLevelingCurve: number[];
    shardLevelRequirement: number[];
    enchantments: {
      id: number;
      color: EnumWakfuEnchantmentColor;
      label: TWakfuI18n;
      doubleBonusPositions: EnumWakfuEquipmentPosition[];
      effects: number[];
    }[];
    sublimations: {
      id: number;
      name: TWakfuI18n;
      level: number;
      maxLevel: number;
      gfxId: number;
      effectId: number;
      colorPattern: EnumWakfuEnchantmentColor[];
      rarityEpic: boolean;
      rarityRelic: boolean;
    }[];
  };
  [ElectronEvents.BuildCreateCharacter]: { characterId: string };
  [ElectronEvents.BuildEditCharacter]: undefined;
  [ElectronEvents.GetAllBuilds]: TWakfuCharacterDisplay[];
  [ElectronEvents.BuildCreate]: { buildId: string };
  [ElectronEvents.BuildDelete]: undefined;
  [ElectronEvents.GetBuild]: TWakfuBuildDisplay;
  [ElectronEvents.BuildEquipItem]: undefined | { itemId: number; position: EnumWakfuEquipmentPosition[] };
  [ElectronEvents.BuildUnequipItem]: undefined;
  [ElectronEvents.BuildCompareItem]: {
    sourceItems: ReturnType<WakfuItem["toObject"]>[];
    targetItem: ReturnType<WakfuItem["toObject"]>;
    stats: ReturnType<WakfuStats["toObject"]>;
  }[];
  [ElectronEvents.BuildSetPreferences]: undefined;
  [ElectronEvents.BuildAddAbilityLevel]: undefined;
  [ElectronEvents.BuildRemoveAbilityLevel]: undefined;
  [ElectronEvents.BuildSetInfo]: undefined;
  [ElectronEvents.BuildSetBonuses]: undefined;
  [ElectronEvents.BuildAssignEnchantment]: undefined;
  [ElectronEvents.BuildAssignSublimation]: undefined;
  [ElectronEvents.BuildAssignUniqueSublimation]: undefined;
  [ElectronEvents.BuildUnassignUniqueSublimation]: undefined;
  [ElectronEvents.BuildSerialize]: { serializedBuild: string };
  [ElectronEvents.BuildDeserialize]: { buildId: string };
  [ElectronEvents.BuildOptimize]: undefined;
  [ElectronEvents.BuildOptimizeProgress]: {
    currentIteration: number;
    totalIterations: number;
    bestScore: number;
  };
  [ElectronEvents.BuildOptimizeResult]: Array<{
    equipment: Record<string, ReturnType<WakfuItem["toObject"]> | null>;
    score: number;
    valid: boolean;
    meetsObjectives: boolean;
    violations: string[];
  }>;
  [ElectronEvents.CraftManagerAddItem]: undefined;
  [ElectronEvents.CraftManagerRemoveItem]: undefined;
  [ElectronEvents.CraftManagerSetItemQuantity]: undefined;
  [ElectronEvents.CraftManagerGetItems]: TCraftItem[];
  [ElectronEvents.CraftManagerMarkIngredientAsCrafted]: undefined;
  [ElectronEvents.CraftManagerUnmarkIngredientAsCrafted]: undefined;
  [ElectronEvents.CraftManagerMarkAllIngredientsById]: undefined;
  [ElectronEvents.CraftManagerSetIngredientRecipe]: undefined;
};

export type TElectronPackage<Payload> = {
  id: string | null;
  payload: Payload;
};

export interface ElectronAPI {
  send: <Event extends ElectronEvents>(event: Event, payload: TElectronPackage<ElectronEventsMain[Event]>) => void;
  addListener: <Event extends ElectronEvents>(
    event: Event,
    callback: (payload: TElectronPackage<ElectronEventsRenderer[Event]>) => void,
  ) => (event: IpcRendererEvent, payload: TElectronPackage<ElectronEventsRenderer[Event]>) => void;
  removeListener: <Event extends ElectronEvents>(
    event: Event,
    callback: (event: IpcRendererEvent, payload: TElectronPackage<ElectronEventsRenderer[Event]>) => void,
  ) => void;
}
