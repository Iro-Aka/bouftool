import { isArrayOf, isNumber, isObject, isString } from "src/types/utils";
import { isWakfuDescription, type TWakfuDescription } from "../types/description";
import { isWakfuItemParsed, type TWakfuItemParsed } from "../types/items";
import { isWakfuEquipmentPosition, type TWakfuItemType } from "../types/itemType";
import { isWakfuJobItem, type TWakfuJobItem } from "../types/jobsItems";
import { isWakfuLang, type WakfuLang } from "../types/utils";

export type TWakfuRecipeDisplay = {
  id: number;
  level: number;
  recipeCategoryId: number;
  recipeCategoryLabel: string;
  ingredients: { itemId: number; itemLabel: string; itemRarity: number; itemGfxId: number; quantity: number }[];
  result: { itemId: number; itemLabel: string; itemGfxId: number; quantity: number };
};

export type TWakfuGamedataRecipe = {
  id: number;
  level: number;
  recipeCategoryId: number;
  ingredients: { itemId: number; quantity: number }[];
  result: { itemId: number; quantity: number };
};

export type TWakfuGamedata = {
  version: string;
  lang: WakfuLang;
  actionLabels: Array<{ id: number; description: TWakfuDescription }>;
  itemTypes: Array<Omit<TWakfuItemType, "title">>;
  itemTypeLabels: Array<{ id: number; description: TWakfuDescription }>;
  recipeCategories: Array<{ id: number; description: TWakfuDescription }>;
  recipes: Array<TWakfuGamedataRecipe>;
  states: Array<{ id: number; description: TWakfuDescription }>;
  jobsItems: Array<TWakfuJobItem>;
  items: Array<TWakfuItemParsed>;
};

const isWakfuGamedataAction = (json: unknown): json is TWakfuGamedata["actionLabels"][number] => {
  const result =
    isObject(json) &&
    "id" in json &&
    isNumber(json.id) &&
    "description" in json &&
    isWakfuDescription(json.description);
  if (!result) {
    console.log("Invalid JSON: WakfuGamedataAction");
  }
  return result;
};

const isWakfuGamedataItemType = (json: unknown): json is TWakfuGamedata["itemTypes"][number] => {
  const result =
    isObject(json) &&
    "id" in json &&
    isNumber(json.id) &&
    (!("parent" in json) || isNumber(json.parent)) &&
    "equipmentPositions" in json &&
    isArrayOf(json.equipmentPositions, isWakfuEquipmentPosition) &&
    "equipmentDisabledPositions" in json &&
    isArrayOf(json.equipmentDisabledPositions, isWakfuEquipmentPosition);
  if (!result) {
    console.log("Invalid JSON: WakfuGamedataItemType");
  }
  return result;
};

const isWakfuGamedataItemTypeLabel = (json: unknown): json is TWakfuGamedata["itemTypeLabels"][number] => {
  const result =
    isObject(json) &&
    "id" in json &&
    isNumber(json.id) &&
    "description" in json &&
    isWakfuDescription(json.description);
  if (!result) {
    console.log("Invalid JSON: WakfuGamedataItemTypeLabel");
  }
  return result;
};

const isWakfuGamedataRecipeCategory = (json: unknown): json is TWakfuGamedata["recipeCategories"][number] => {
  const result =
    isObject(json) &&
    "id" in json &&
    isNumber(json.id) &&
    "description" in json &&
    isWakfuDescription(json.description);
  if (!result) {
    console.log("Invalid JSON: WakfuGamedataRecipeCategory");
  }
  return result;
};

const isWakfuGamedataState = (json: unknown): json is TWakfuGamedata["states"][number] => {
  const result =
    isObject(json) &&
    "id" in json &&
    isNumber(json.id) &&
    "description" in json &&
    isWakfuDescription(json.description);
  if (!result) {
    console.log("Invalid JSON: WakfuGamedataState");
  }
  return result;
};

export const isWakfuGamedataRecipeIngredient = (json: unknown): json is TWakfuGamedataRecipe["ingredients"][number] => {
  const result =
    isObject(json) && "itemId" in json && isNumber(json.itemId) && "quantity" in json && isNumber(json.quantity);
  if (!result) {
    console.log("Invalid JSON: WakfuGamedataRecipeIngredient", json);
  }
  return result;
};

export const isWakfuGamedataRecipeResult = (json: unknown): json is TWakfuGamedataRecipe["result"] => {
  const result =
    isObject(json) && "itemId" in json && isNumber(json.itemId) && "quantity" in json && isNumber(json.quantity);
  if (!result) {
    console.log("Invalid JSON: WakfuGamedataRecipeResult");
  }
  return result;
};

export const isWakfuGamedataRecipe = (json: unknown): json is TWakfuGamedataRecipe => {
  const result =
    isObject(json) &&
    "id" in json &&
    isNumber(json.id) &&
    "level" in json &&
    isNumber(json.level) &&
    "recipeCategoryId" in json &&
    isNumber(json.recipeCategoryId) &&
    "ingredients" in json &&
    isArrayOf(json.ingredients, isWakfuGamedataRecipeIngredient) &&
    "result" in json &&
    isWakfuGamedataRecipeResult(json.result);
  if (!result) {
    console.log("Invalid JSON: WakfuGamedataRecipe");
  }
  return result;
};

export const isWakfuGamedata = (json: unknown): json is TWakfuGamedata => {
  if (!isObject(json)) {
    console.warn("Invalid JSON: Not an object");
    return false;
  }
  if (!("version" in json && isString(json.version))) {
    console.warn("Invalid JSON: Version is not valid");
    return false;
  }
  if (!("lang" in json && isWakfuLang(json.lang))) {
    console.warn("Invalid JSON: Lang is not valid");
    return false;
  }
  if (!("actionLabels" in json && isArrayOf(json.actionLabels, isWakfuGamedataAction))) {
    console.warn("Invalid JSON: ActionLabels is not valid");
    return false;
  }
  if (!("itemTypes" in json && isArrayOf(json.itemTypes, isWakfuGamedataItemType))) {
    console.warn("Invalid JSON: ItemTypes is not valid");
    return false;
  }
  if (!("itemTypeLabels" in json && isArrayOf(json.itemTypeLabels, isWakfuGamedataItemTypeLabel))) {
    console.warn("Invalid JSON: ItemTypeLabels is not valid");
    return false;
  }
  if (!("recipeCategories" in json && isArrayOf(json.recipeCategories, isWakfuGamedataRecipeCategory))) {
    console.warn("Invalid JSON: RecipeCategories is not valid");
    return false;
  }
  if (!("states" in json && isArrayOf(json.states, isWakfuGamedataState))) {
    console.warn("Invalid JSON: States is not valid");
    return false;
  }
  if (!("items" in json && isArrayOf(json.items, isWakfuItemParsed))) {
    console.warn("Invalid JSON: Items is not valid");
    return false;
  }
  if (!("jobsItems" in json && isArrayOf(json.jobsItems, isWakfuJobItem))) {
    console.warn("Invalid JSON: JobsItems is not valid");
    return false;
  }
  if (!("recipes" in json && isArrayOf(json.recipes, isWakfuGamedataRecipe))) {
    console.warn("Invalid JSON: Recipes is not valid");
    return false;
  }
  return true;
};
