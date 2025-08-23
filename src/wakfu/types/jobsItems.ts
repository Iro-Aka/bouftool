import { isNumber, isObject } from "src/types/utils";
import { isWakfuDescription, type TWakfuDescription } from "./description";
import { isRarity } from "./rarity";

export type TWakfuJobItem = {
  id: number;
  level: number;
  rarity: number;
  itemTypeId: number;
  gfxId: number;
  title: TWakfuDescription;
  description?: TWakfuDescription;
};

export const loadWakfuJobItemFromJson = (json: unknown): TWakfuJobItem => {
  if (!isObject(json)) {
    console.warn("Invalid JSON: Expected an object");
    throw new Error("Invalid JSON: WakfuJobItem");
  }
  if (!("definition" in json && isObject(json.definition))) {
    console.warn("Invalid JSON: Expected 'definition' to be an object");
    throw new Error("Invalid JSON: WakfuJobItem");
  }
  if (!("id" in json.definition && isNumber(json.definition.id))) {
    console.warn("Invalid JSON: Expected 'id' to be a number");
    throw new Error("Invalid JSON: WakfuJobItem");
  }
  if (!("level" in json.definition && isNumber(json.definition.level))) {
    console.warn("Invalid JSON: Expected 'level' to be a number");
    throw new Error("Invalid JSON: WakfuJobItem");
  }
  if (!("rarity" in json.definition && isRarity(json.definition.rarity))) {
    console.warn("Invalid JSON: Expected 'rarity' to be a number");
    throw new Error("Invalid JSON: WakfuJobItem");
  }
  if (!("itemTypeId" in json.definition && isNumber(json.definition.itemTypeId))) {
    console.warn("Invalid JSON: Expected 'itemTypeId' to be a number");
    throw new Error("Invalid JSON: WakfuJobItem");
  }
  if (!("graphicParameters" in json.definition && isObject(json.definition.graphicParameters))) {
    console.warn("Invalid JSON: Expected 'graphicParameters' to be an object");
    throw new Error("Invalid JSON: WakfuJobItem");
  }
  if (!("gfxId" in json.definition.graphicParameters && isNumber(json.definition.graphicParameters.gfxId))) {
    console.warn("Invalid JSON: Expected 'gfxId' to be a number");
    throw new Error("Invalid JSON: WakfuJobItem");
  }
  if (
    !("femaleGfxId" in json.definition.graphicParameters && isNumber(json.definition.graphicParameters.femaleGfxId))
  ) {
    console.warn("Invalid JSON: Expected 'femaleGfxId' to be a number");
    throw new Error("Invalid JSON: WakfuJobItem");
  }
  if (!("title" in json && isWakfuDescription(json.title))) {
    console.warn("Invalid JSON: Expected 'title' to be an object");
    throw new Error("Invalid JSON: WakfuJobItem");
  }
  return {
    id: json.definition.id,
    level: json.definition.level,
    rarity: json.definition.rarity,
    itemTypeId: json.definition.itemTypeId,
    gfxId: json.definition.graphicParameters.gfxId,
    title: json.title,
    ...("description" in json && isWakfuDescription(json.description) ? { description: json.description } : {}),
  };
};

export const isWakfuJobItem = (json: unknown): json is TWakfuJobItem => {
  const result =
    isObject(json) &&
    "id" in json &&
    isNumber(json.id) &&
    "level" in json &&
    isNumber(json.level) &&
    "rarity" in json &&
    isNumber(json.rarity) &&
    "itemTypeId" in json &&
    isNumber(json.itemTypeId) &&
    "gfxId" in json &&
    isNumber(json.gfxId) &&
    "title" in json &&
    isWakfuDescription(json.title) &&
    (!("description" in json) || isWakfuDescription(json.description));
  if (!result) {
    console.log("Invalid JSON: WakfuJobItem");
  }
  return result;
};
