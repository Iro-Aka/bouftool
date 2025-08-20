import type { WakfuBuild } from "src/wakfu/builder/build";
import type { TSearchItemsPayload, TSearchItemsResult } from "src/wakfu/search/types";
import type { WakfuLang } from "src/wakfu/types/utils";

export enum ElectronEvents {
  AppReady = "app:ready",
  SearchItems = "search:items",
  GetItemTypeLabels = "data:get-itemtype-labels",
  CreateBuild = "build:create",
  GetBuild = "build:get",
  BuildEquipItem = "build:equip",
}

export type ElectronEventsMain = {
  [ElectronEvents.AppReady]: undefined;
  [ElectronEvents.SearchItems]: TSearchItemsPayload;
  [ElectronEvents.GetItemTypeLabels]: undefined;
  [ElectronEvents.CreateBuild]: undefined;
  [ElectronEvents.GetBuild]: { buildId: number };
  [ElectronEvents.BuildEquipItem]: { buildId: number; itemId: number };
};

export type ElectronEventsRenderer = {
  [ElectronEvents.AppReady]: { version: string; lang: WakfuLang };
  [ElectronEvents.SearchItems]: TSearchItemsResult[];
  [ElectronEvents.GetItemTypeLabels]: Record<number, string>;
  [ElectronEvents.CreateBuild]: { buildId: number };
  [ElectronEvents.GetBuild]: ReturnType<typeof WakfuBuild.prototype.toDisplay>;
  [ElectronEvents.BuildEquipItem]: undefined;
};

export interface ElectronAPI {
  send: <Event extends ElectronEvents>(event: Event, payload: ElectronEventsMain[Event]) => void;
  receive: <Event extends ElectronEvents>(
    event: Event,
    callback: (payload: ElectronEventsRenderer[Event]) => void,
  ) => void;
}
