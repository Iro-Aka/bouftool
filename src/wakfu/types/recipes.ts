import { isBoolean, isNumber, isObject } from "src/types/utils";

export type TWakfuRecipe = {
  id: number;
  categoryId: number;
  level: number;
  xpRatio: number;
  isUpgrade: boolean;
  upgradeItemId: number;
};

export const loadWakfuRecipeFromJson = (json: unknown): TWakfuRecipe => {
  if (!isObject(json)) {
    console.error("Invalid JSON: Not an object", json);
    throw new Error("Invalid JSON");
  }
  if (!("id" in json && isNumber(json.id))) {
    console.error("Invalid JSON: Missing or invalid 'id'", json);
    throw new Error("Invalid JSON");
  }
  if (!("categoryId" in json && isNumber(json.categoryId))) {
    console.error("Invalid JSON: Missing or invalid 'categoryId'", json);
    throw new Error("Invalid JSON");
  }
  if (!("level" in json && isNumber(json.level))) {
    console.error("Invalid JSON: Missing or invalid 'level'", json);
    throw new Error("Invalid JSON");
  }
  if (!("xpRatio" in json && isNumber(json.xpRatio))) {
    console.error("Invalid JSON: Missing or invalid 'xpRatio'", json);
    throw new Error("Invalid JSON");
  }
  if (!("isUpgrade" in json && isBoolean(json.isUpgrade))) {
    console.error("Invalid JSON: Missing or invalid 'isUpgrade'", json);
    throw new Error("Invalid JSON");
  }
  if (!("upgradeItemId" in json && isNumber(json.upgradeItemId))) {
    console.error("Invalid JSON: Missing or invalid 'upgradeItemId'", json);
    throw new Error("Invalid JSON");
  }
  return {
    id: json.id,
    categoryId: json.categoryId,
    level: json.level,
    xpRatio: json.xpRatio,
    isUpgrade: json.isUpgrade,
    upgradeItemId: json.upgradeItemId,
  };
};
