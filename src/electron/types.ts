import type { IpcRendererEvent } from "electron";
import type { WakfuBuild } from "src/wakfu/builder/build";
import type { TWakfuBuildPreferences } from "src/wakfu/builder/types";
import type { WakfuItem } from "src/wakfu/data/item";
import type { TSearchItemsPayload } from "src/wakfu/search/types";
import type { EnumAbilities } from "src/wakfu/types/ability";
import type { WakfuBreed } from "src/wakfu/types/breed";
import type { WakfuEquipmentPosition } from "src/wakfu/types/itemType";
import type { WakfuLang } from "src/wakfu/types/utils";

export enum ElectronEvents {
  AppReady = "app:ready",
  SearchItems = "search:items",
  GetItemById = "data:get-item-by-id",
  GetItemTypeLabels = "data:get-itemtype-labels",
  GetItemTypesByEquipmentPosition = "data:get-itemtypes-by-equipment-position",
  GetAllBuilds = "build:get-all",
  CreateBuild = "build:create",
  GetBuild = "build:get",
  BuildSetBreed = "build:set-breed",
  BuildEquipItem = "build:equip",
  BuildUnequipItem = "build:unequip",
  BuildSetPreferences = "build:set-preferences",
  BuildAddAbilityLevel = "build:add-ability-level",
  BuildRemoveAbilityLevel = "build:remove-ability-level",
}

export type ElectronEventsMain = {
  [ElectronEvents.AppReady]: undefined;
  [ElectronEvents.SearchItems]: TSearchItemsPayload;
  [ElectronEvents.GetItemById]: { id: number };
  [ElectronEvents.GetItemTypeLabels]: undefined;
  [ElectronEvents.GetItemTypesByEquipmentPosition]: { position: WakfuEquipmentPosition };
  [ElectronEvents.GetAllBuilds]: undefined;
  [ElectronEvents.CreateBuild]: undefined;
  [ElectronEvents.GetBuild]: { buildId: number };
  [ElectronEvents.BuildEquipItem]: { buildId: number; itemId: number; position?: WakfuEquipmentPosition };
  [ElectronEvents.BuildUnequipItem]: { buildId: number; position: WakfuEquipmentPosition };
  [ElectronEvents.BuildSetPreferences]: { buildId: number; preferences: Partial<TWakfuBuildPreferences> };
  [ElectronEvents.BuildAddAbilityLevel]: { buildId: number; ability: EnumAbilities; level: number };
  [ElectronEvents.BuildRemoveAbilityLevel]: { buildId: number; ability: EnumAbilities; level: number };
  [ElectronEvents.BuildSetBreed]: { buildId: number; breed: WakfuBreed };
};

export type ElectronEventsRenderer = {
  [ElectronEvents.AppReady]: { version: string; lang: WakfuLang };
  [ElectronEvents.SearchItems]: ReturnType<WakfuItem["toDisplay"]>[];
  [ElectronEvents.GetItemById]: ReturnType<WakfuItem["toDisplay"]>;
  [ElectronEvents.GetItemTypeLabels]: Record<number, string>;
  [ElectronEvents.GetItemTypesByEquipmentPosition]: number[];
  [ElectronEvents.GetAllBuilds]: ReturnType<typeof WakfuBuild.getBuilds>;
  [ElectronEvents.CreateBuild]: { buildId: number };
  [ElectronEvents.GetBuild]: ReturnType<WakfuBuild["toDisplay"]>;
  [ElectronEvents.BuildEquipItem]: undefined | WakfuEquipmentPosition[];
  [ElectronEvents.BuildUnequipItem]: undefined;
  [ElectronEvents.BuildSetPreferences]: undefined;
  [ElectronEvents.BuildAddAbilityLevel]: undefined;
  [ElectronEvents.BuildRemoveAbilityLevel]: undefined;
  [ElectronEvents.BuildSetBreed]: undefined;
};

export interface ElectronAPI {
  send: <Event extends ElectronEvents>(event: Event, payload: ElectronEventsMain[Event]) => void;
  addListener: <Event extends ElectronEvents>(
    event: Event,
    callback: (payload: ElectronEventsRenderer[Event]) => void,
  ) => (event: IpcRendererEvent, payload: ElectronEventsRenderer[Event]) => void;
  removeListener: <Event extends ElectronEvents>(
    event: Event,
    callback: (event: IpcRendererEvent, payload: ElectronEventsRenderer[Event]) => void,
  ) => void;
}
