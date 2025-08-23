import { isNumber, isObject } from "src/types/utils";

export type TWakfuRecipeIngredients = {
  recipeId: number;
  itemId: number;
  quantity: number;
  ingredientOrder: number;
};

export const loadWakfuRecipeIngredientFromJson = (json: unknown): TWakfuRecipeIngredients => {
  if (!isObject(json)) {
    console.error("Invalid JSON: Not an object", json);
    throw new Error("Invalid JSON");
  }
  if (!("recipeId" in json && isNumber(json.recipeId))) {
    console.error("Invalid JSON: Missing or invalid 'recipeId'", json);
    throw new Error("Invalid JSON");
  }
  if (!("itemId" in json && isNumber(json.itemId))) {
    console.error("Invalid JSON: Missing or invalid 'itemId'", json);
    throw new Error("Invalid JSON");
  }
  if (!("quantity" in json && isNumber(json.quantity))) {
    console.error("Invalid JSON: Missing or invalid 'quantity'", json);
    throw new Error("Invalid JSON");
  }
  if (!("ingredientOrder" in json && isNumber(json.ingredientOrder))) {
    console.error("Invalid JSON: Missing or invalid 'ingredientOrder'", json);
    throw new Error("Invalid JSON");
  }
  return {
    recipeId: json.recipeId,
    itemId: json.itemId,
    quantity: json.quantity,
    ingredientOrder: json.ingredientOrder,
  };
};
