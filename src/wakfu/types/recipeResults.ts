import { isNumber, isObject } from "src/types/utils";

export type TWakfuRecipeResults = {
  recipeId: number;
  productedItemId: number;
  productOrder: number;
  productedItemQuantity: number;
};

export const loadWakfuRecipeResultFromJson = (json: unknown): TWakfuRecipeResults => {
  if (!isObject(json)) {
    console.error("Invalid JSON: Not an object", json);
    throw new Error("Invalid JSON");
  }
  if (!("recipeId" in json && isNumber(json.recipeId))) {
    console.error("Invalid JSON: Missing or invalid 'recipeId'", json);
    throw new Error("Invalid JSON");
  }

  if (!("productedItemId" in json && isNumber(json.productedItemId))) {
    console.error("Invalid JSON: Missing or invalid 'productedItemId'", json);
    throw new Error("Invalid JSON");
  }

  if (!("productOrder" in json && isNumber(json.productOrder))) {
    console.error("Invalid JSON: Missing or invalid 'productOrder'", json);
    throw new Error("Invalid JSON");
  }

  if (!("productedItemQuantity" in json && isNumber(json.productedItemQuantity))) {
    console.error("Invalid JSON: Missing or invalid 'productedItemQuantity'", json);
    throw new Error("Invalid JSON");
  }
  return {
    recipeId: json.recipeId,
    productedItemId: json.productedItemId,
    productOrder: json.productOrder,
    productedItemQuantity: json.productedItemQuantity,
  };
};
