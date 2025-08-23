import { isArray, isArrayOf, isBoolean, isNumber, isObject, isString } from "src/types/utils";
import { isWakfuDescription, loadWakfuDescriptionFromJson, type TWakfuDescription } from "./description";
import { isWakfuEffect, loadWakfuEffectFromJson, type TWakfuEffect } from "./effect";

export type TWakfuItem = {
  id: number;
  level: number;
  itemTypeId: number;
  itemSetId: number;
  rarity: number;
  gfxId: number;
  useParameters: {
    costAp: number;
    costMp: number;
    costWp: number;
    rangeMin: number;
    rangeMax: number;
    freeCell: boolean;
    sightLine: boolean;
    onlyLine: boolean;
    noBorderCell: boolean;
    worldTarget: number;
  };
  useEffects: TWakfuEffect[];
  useCriticalEffects: TWakfuEffect[];
  equipEffects: TWakfuEffect[];
  title?: TWakfuDescription;
  description?: TWakfuDescription;
};

export type TWakfuItemParsed = TWakfuItem & {
  equipEffectsLabels: string[];
};

export type TWakfuItemDisplay = {
  id: number;
  level: number;
  itemTypeId: number;
  rarity: number;
  gfxId: number;
  equipEffectsLabels: string[];
  title: string;
  recipes: number[];
};

export const loadWakfuItemFromJson = (json: unknown): TWakfuItem => {
  if (
    isObject(json) &&
    "definition" in json &&
    isObject(json.definition) &&
    "item" in json.definition &&
    isObject(json.definition.item) &&
    "id" in json.definition.item &&
    isNumber(json.definition.item.id) &&
    "level" in json.definition.item &&
    isNumber(json.definition.item.level) &&
    "baseParameters" in json.definition.item &&
    isObject(json.definition.item.baseParameters) &&
    "itemTypeId" in json.definition.item.baseParameters &&
    isNumber(json.definition.item.baseParameters.itemTypeId) &&
    "itemSetId" in json.definition.item.baseParameters &&
    isNumber(json.definition.item.baseParameters.itemSetId) &&
    "rarity" in json.definition.item.baseParameters &&
    isNumber(json.definition.item.baseParameters.rarity) &&
    "useParameters" in json.definition.item &&
    isObject(json.definition.item.useParameters) &&
    "useCostAp" in json.definition.item.useParameters &&
    isNumber(json.definition.item.useParameters.useCostAp) &&
    "useCostMp" in json.definition.item.useParameters &&
    isNumber(json.definition.item.useParameters.useCostMp) &&
    "useCostWp" in json.definition.item.useParameters &&
    isNumber(json.definition.item.useParameters.useCostWp) &&
    "useRangeMin" in json.definition.item.useParameters &&
    isNumber(json.definition.item.useParameters.useRangeMin) &&
    "useRangeMax" in json.definition.item.useParameters &&
    isNumber(json.definition.item.useParameters.useRangeMax) &&
    "useTestFreeCell" in json.definition.item.useParameters &&
    typeof json.definition.item.useParameters.useTestFreeCell === "boolean" &&
    "useTestLos" in json.definition.item.useParameters &&
    typeof json.definition.item.useParameters.useTestLos === "boolean" &&
    "useTestOnlyLine" in json.definition.item.useParameters &&
    typeof json.definition.item.useParameters.useTestOnlyLine === "boolean" &&
    "useTestNoBorderCell" in json.definition.item.useParameters &&
    typeof json.definition.item.useParameters.useTestNoBorderCell === "boolean" &&
    "useWorldTarget" in json.definition.item.useParameters &&
    isNumber(json.definition.item.useParameters.useWorldTarget) &&
    "graphicParameters" in json.definition.item &&
    isObject(json.definition.item.graphicParameters) &&
    "gfxId" in json.definition.item.graphicParameters &&
    isNumber(json.definition.item.graphicParameters.gfxId) &&
    "useEffects" in json.definition &&
    isArray(json.definition.useEffects) &&
    "useCriticalEffects" in json.definition &&
    isArray(json.definition.useCriticalEffects) &&
    "equipEffects" in json.definition &&
    isArray(json.definition.equipEffects)
  ) {
    return {
      id: json.definition.item.id,
      level: json.definition.item.level,
      itemTypeId: json.definition.item.baseParameters.itemTypeId,
      itemSetId: json.definition.item.baseParameters.itemSetId,
      rarity: json.definition.item.baseParameters.rarity,
      gfxId: json.definition.item.graphicParameters.gfxId,
      useParameters: {
        costAp: json.definition.item.useParameters.useCostAp,
        costMp: json.definition.item.useParameters.useCostMp,
        costWp: json.definition.item.useParameters.useCostWp,
        rangeMin: json.definition.item.useParameters.useRangeMin,
        rangeMax: json.definition.item.useParameters.useRangeMax,
        freeCell: json.definition.item.useParameters.useTestFreeCell,
        sightLine: json.definition.item.useParameters.useTestLos,
        onlyLine: json.definition.item.useParameters.useTestOnlyLine,
        noBorderCell: json.definition.item.useParameters.useTestNoBorderCell,
        worldTarget: json.definition.item.useParameters.useWorldTarget,
      },
      useEffects: json.definition.useEffects.map(loadWakfuEffectFromJson),
      useCriticalEffects: json.definition.useCriticalEffects.map(loadWakfuEffectFromJson),
      equipEffects: json.definition.equipEffects.map(loadWakfuEffectFromJson),
      title: "title" in json ? loadWakfuDescriptionFromJson(json.title) : undefined,
      description: "description" in json ? loadWakfuDescriptionFromJson(json.description) : undefined,
    };
  }
  throw new Error(`Invalid JSON: WakfuItem ${JSON.stringify(json)}`);
};

export const isWakfuItem = (json: unknown): json is TWakfuItemParsed => {
  return (
    isObject(json) &&
    "id" in json &&
    isNumber(json.id) &&
    "level" in json &&
    isNumber(json.level) &&
    "itemTypeId" in json &&
    isNumber(json.itemTypeId) &&
    "itemSetId" in json &&
    isNumber(json.itemSetId) &&
    "rarity" in json &&
    isNumber(json.rarity) &&
    "gfxId" in json &&
    isNumber(json.gfxId) &&
    "useParameters" in json &&
    isObject(json.useParameters) &&
    "costAp" in json.useParameters &&
    isNumber(json.useParameters.costAp) &&
    "costMp" in json.useParameters &&
    isNumber(json.useParameters.costMp) &&
    "costWp" in json.useParameters &&
    isNumber(json.useParameters.costWp) &&
    "rangeMin" in json.useParameters &&
    isNumber(json.useParameters.rangeMin) &&
    "rangeMax" in json.useParameters &&
    isNumber(json.useParameters.rangeMax) &&
    "freeCell" in json.useParameters &&
    isBoolean(json.useParameters.freeCell) &&
    "sightLine" in json.useParameters &&
    isBoolean(json.useParameters.sightLine) &&
    "onlyLine" in json.useParameters &&
    isBoolean(json.useParameters.onlyLine) &&
    "noBorderCell" in json.useParameters &&
    isBoolean(json.useParameters.noBorderCell) &&
    "worldTarget" in json.useParameters &&
    isNumber(json.useParameters.worldTarget) &&
    "useEffects" in json &&
    isArrayOf(json.useEffects, isWakfuEffect) &&
    "useCriticalEffects" in json &&
    isArrayOf(json.useCriticalEffects, isWakfuEffect) &&
    "equipEffects" in json &&
    isArrayOf(json.equipEffects, isWakfuEffect) &&
    (!("title" in json) || isWakfuDescription(json.title)) &&
    (!("description" in json) || isWakfuDescription(json.description))
  );
};

export const isWakfuItemParsed = (json: unknown): json is TWakfuItemParsed => {
  if (!isWakfuItem(json)) {
    return false;
  }
  if (!("equipEffectsLabels" in json && isArrayOf(json.equipEffectsLabels, isString))) {
    console.warn("Invalid JSON: Missing or invalid equipEffectsLabels");
    return false;
  }
  return true;
};
