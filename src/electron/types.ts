import type { IpcRendererEvent } from "electron";
import type { WakfuBuild } from "src/wakfu/builder/build";
import type { TWakfuBuildPreferences } from "src/wakfu/builder/types";
import type { WakfuItem } from "src/wakfu/data/item";
import type { TSearchItemsPayload } from "src/wakfu/search/types";
import type { WakfuEquipmentPosition } from "src/wakfu/types/itemType";
import type { WakfuLang } from "src/wakfu/types/utils";

export enum ElectronEvents {
  AppReady = "app:ready",
  SearchItems = "search:items",
  GetItemById = "data:get-item-by-id",
  GetItemTypeLabels = "data:get-itemtype-labels",
  GetItemTypesByEquipmentPosition = "data:get-itemtypes-by-equipment-position",
  CreateBuild = "build:create",
  GetBuild = "build:get",
  BuildEquipItem = "build:equip",
  BuildUnequipItem = "build:unequip",
  BuildSetPreferences = "build:set-preferences",
}

export type ElectronEventsMain = {
  [ElectronEvents.AppReady]: undefined;
  [ElectronEvents.SearchItems]: TSearchItemsPayload;
  [ElectronEvents.GetItemById]: { id: number };
  [ElectronEvents.GetItemTypeLabels]: undefined;
  [ElectronEvents.GetItemTypesByEquipmentPosition]: { position: WakfuEquipmentPosition };
  [ElectronEvents.CreateBuild]: undefined;
  [ElectronEvents.GetBuild]: { buildId: number };
  [ElectronEvents.BuildEquipItem]: { buildId: number; itemId: number; position?: WakfuEquipmentPosition };
  [ElectronEvents.BuildUnequipItem]: { buildId: number; position: WakfuEquipmentPosition };
  [ElectronEvents.BuildSetPreferences]: { buildId: number; preferences: Partial<TWakfuBuildPreferences> };
};

export type ElectronEventsRenderer = {
  [ElectronEvents.AppReady]: { version: string; lang: WakfuLang };
  [ElectronEvents.SearchItems]: ReturnType<typeof WakfuItem.prototype.toDisplay>[];
  [ElectronEvents.GetItemById]: ReturnType<typeof WakfuItem.prototype.toDisplay>;
  [ElectronEvents.GetItemTypeLabels]: Record<number, string>;
  [ElectronEvents.GetItemTypesByEquipmentPosition]: number[];
  [ElectronEvents.CreateBuild]: { buildId: number };
  [ElectronEvents.GetBuild]: ReturnType<typeof WakfuBuild.prototype.toDisplay>;
  [ElectronEvents.BuildEquipItem]: undefined | WakfuEquipmentPosition[];
  [ElectronEvents.BuildUnequipItem]: undefined;
  [ElectronEvents.BuildSetPreferences]: undefined;
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
