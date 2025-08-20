import type { TWakfuPreferences, WakfuBuildEquippedPositionStatus } from "src/wakfu/builder/types";
import type { WakfuItem } from "src/wakfu/data/item";
import type { TSearchItemsPayload, TSearchItemsResult } from "src/wakfu/search/types";
import type { WakfuBreed } from "src/wakfu/types/breed";
import type { WakfuEquipmentPosition } from "src/wakfu/types/itemType";
import type { WakfuLang } from "src/wakfu/types/utils";

export enum ElectronEvents {
  AppReady = "app:ready",
  SearchItems = "app:search-items",
  GetItemTypeLabels = "app:get-itemtype-labels",
  CreateBuild = "app:create-build",
  GetBuild = "app:get-build",
}

export type ElectronEventsMain = {
  [ElectronEvents.AppReady]: undefined;
  [ElectronEvents.SearchItems]: TSearchItemsPayload;
  [ElectronEvents.GetItemTypeLabels]: undefined;
  [ElectronEvents.CreateBuild]: undefined;
  [ElectronEvents.GetBuild]: { buildId: number };
};

export type ElectronEventsRenderer = {
  [ElectronEvents.AppReady]: { version: string; lang: WakfuLang };
  [ElectronEvents.SearchItems]: TSearchItemsResult[];
  [ElectronEvents.GetItemTypeLabels]: Record<number, string>;
  [ElectronEvents.CreateBuild]: { buildId: number };
  [ElectronEvents.GetBuild]: {
    name: string;
    breed: WakfuBreed;
    level: number;
    preferences: TWakfuPreferences;
    items: Record<
      WakfuEquipmentPosition,
      ReturnType<typeof WakfuItem.prototype.toDisplay> | WakfuBuildEquippedPositionStatus
    >;
  };
};

export interface ElectronAPI {
  send: <Event extends ElectronEvents>(event: Event, payload: ElectronEventsMain[Event]) => void;
  receive: <Event extends ElectronEvents>(
    event: Event,
    callback: (payload: ElectronEventsRenderer[Event]) => void,
  ) => void;
}
