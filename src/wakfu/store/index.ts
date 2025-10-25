import { WakfuEnchantment } from "../enchantment";
import { fromBonusPositionToEquipmentPosition, fromEquipmentEffectToEnchantmentEffect } from "../enchantment/mapping";
import { isWakfuEnchantmentColor } from "../enchantment/types";
import { WakfuItem } from "../items";
import { WakfuBaseItem } from "../items/base";
import { WakfuItemType } from "../itemTypes";
import {
  EnumWakfuEquipmentPosition,
  EnumWakfuItemType,
  isWakfuEquipmentPosition,
  isWakfuItemTypeId,
} from "../itemTypes/types";
import { WakfuRecipe } from "../recipes/recipe";
import { WakfuRecipeCategory } from "../recipes/recipeCategory";
import { WakfuStats } from "../stats";
import type { WakfuSublimation } from "../sublimation";
import { createWakfuSublimationFromGamedata } from "../sublimation/mapping";
import { DefaultWakfuI18n } from "../utils/constants";
import { EnumWakfuLang } from "../utils/types";
import { WakfuAPI } from "./api";
import { ExcludeEnchantments } from "./constants";
import { WakfuFile } from "./file";
import { EnumWakfuGamedataType, type TPickWakfuGamedata, type TWakfuGamedataTypes } from "./types";

export const ItemTypesOverrideLevel: Record<number, number> = {
  [EnumWakfuItemType.Pet]: 50,
  [EnumWakfuItemType.Mount]: 50,
  [EnumWakfuItemType.Enchantment]: 10,
};

export const ItemIdOverrideLevel: Record<number, number> = {
  12237: 25, // Dot
  26673: 25, // Gélutin Combattant
  26674: 25, // Gélutin Soigneur
  26675: 25, // Gélutin Chasseur
  26676: 25, // Gélutin Berserker
  26677: 25, // Gélutin Aventurier
};

export const ItemTypesOverrideEquipmentPositions: Record<number, EnumWakfuEquipmentPosition[]> = {
  [EnumWakfuItemType.Mount]: [EnumWakfuEquipmentPosition.Mount],
};

export class WakfuStore {
  private static readonly GamedataToLoad = [
    EnumWakfuGamedataType.ItemTypes,
    EnumWakfuGamedataType.EquipmentItemTypes,
    EnumWakfuGamedataType.Items,
    EnumWakfuGamedataType.JobsItems,
    EnumWakfuGamedataType.RecipeCategories,
    EnumWakfuGamedataType.Recipes,
    EnumWakfuGamedataType.RecipeIngredients,
    EnumWakfuGamedataType.RecipeResults,
  ] as const;
  private static instance: WakfuStore | null = null;
  private lang = EnumWakfuLang.French;
  private gamedataVersion: string | null = null;
  private itemTypes: Map<number, WakfuItemType> = new Map();
  private items: Map<number, WakfuItem> = new Map();
  private jobItems: Map<number, WakfuBaseItem> = new Map();
  private recipeCategories: Map<number, WakfuRecipeCategory> = new Map();
  private recipes: Map<number, WakfuRecipe> = new Map();
  private enchantment = {
    shardLevelingCurve: [] as number[],
    shardLevelRequirement: [] as number[],
    enchantments: new Map<number, WakfuEnchantment>(),
    sublimations: new Map<number, WakfuSublimation>(),
  };

  public static async initialize() {
    if (!WakfuStore.instance) {
      WakfuStore.instance = new WakfuStore();
      await WakfuStore.instance.load();
    }
    return WakfuStore.instance;
  }

  public static getInstance() {
    if (!WakfuStore.instance) {
      throw new Error("WakfuStore not initialized");
    }
    return WakfuStore.instance;
  }

  private getFilterSortTransform<Input, Output>(
    iterator: MapIterator<Input>,
    filter: ((item: Input) => boolean) | null = null,
    sort: ((a: Input, b: Input) => number) | null = null,
    transform: ((item: Input) => Output) | null = null,
  ) {
    const filtered: Input[] = [];
    for (const item of iterator) {
      if (!filter || filter(item)) {
        filtered.push(item);
      }
    }
    if (sort) {
      filtered.sort(sort);
    }
    if (transform) {
      const result: Output[] = new Array(filtered.length);
      for (let i = 0; i < filtered.length; ++i) {
        result[i] = transform(filtered[i]);
      }
      return result;
    } else {
      return filtered as unknown as Output[];
    }
  }

  private resetStore() {
    this.gamedataVersion = null;
    this.itemTypes.clear();
    this.items.clear();
    this.jobItems.clear();
    this.recipeCategories.clear();
    this.recipes.clear();
  }

  private loadItemTypes(
    itemTypes:
      | TWakfuGamedataTypes[EnumWakfuGamedataType.ItemTypes][]
      | TWakfuGamedataTypes[EnumWakfuGamedataType.EquipmentItemTypes][],
  ) {
    for (const itemType of itemTypes) {
      if (
        isWakfuItemTypeId(itemType.definition.id) &&
        (!itemType.definition.parentId || isWakfuItemTypeId(itemType.definition.parentId)) &&
        itemType.definition.equipmentPositions.every(isWakfuEquipmentPosition) &&
        itemType.definition.equipmentDisabledPositions.every(isWakfuEquipmentPosition)
      ) {
        this.itemTypes.set(
          itemType.definition.id,
          new WakfuItemType({
            id: itemType.definition.id,
            parentId: itemType.definition.parentId,
            equipmentPositions:
              ItemTypesOverrideEquipmentPositions[itemType.definition.id] || itemType.definition.equipmentPositions,
            equipmentDisabledPositions: itemType.definition.equipmentDisabledPositions,
            title: itemType.title,
          }),
        );
      }
    }
  }

  private loadItems(items: TWakfuGamedataTypes[EnumWakfuGamedataType.Items][]) {
    for (const item of items) {
      const itemType = this.itemTypes.get(item.definition.item.baseParameters.itemTypeId);
      if (!itemType) {
        continue;
      }
      switch (itemType.getId()) {
        case EnumWakfuItemType.Enchantment: {
          if (
            ExcludeEnchantments.has(item.definition.item.id) ||
            !item.definition.item.shardsParameters ||
            !isWakfuEnchantmentColor(item.definition.item.shardsParameters.color)
          ) {
            break;
          }
          if (this.enchantment.shardLevelingCurve.length === 0) {
            this.enchantment.shardLevelingCurve = item.definition.item.shardsParameters.shardLevelingCurve;
            this.enchantment.shardLevelRequirement = item.definition.item.shardsParameters.shardLevelRequirement;
          }
          this.enchantment.enchantments.set(
            item.definition.item.id,
            new WakfuEnchantment(
              item.definition.item.id,
              item.title ?? DefaultWakfuI18n,
              item.definition.item.shardsParameters.color,
              fromBonusPositionToEquipmentPosition(item.definition.item.shardsParameters.doubleBonusPosition),
              fromEquipmentEffectToEnchantmentEffect(item.definition.equipEffects),
            ),
          );
          break;
        }
        case EnumWakfuItemType.Sublimation: {
          if (!item.definition.item.sublimationParameters) {
            break;
          }
          this.enchantment.sublimations.set(item.definition.item.id, createWakfuSublimationFromGamedata(item));
          break;
        }
        default: {
          if (item.definition.equipEffects.length === 0) {
            break;
          }
          this.items.set(
            item.definition.item.id,
            new WakfuItem({
              id: item.definition.item.id || 1,
              level: item.definition.item.level,
              itemType: itemType,
              rarity: item.definition.item.baseParameters.rarity,
              gfxId: item.definition.item.graphicParameters.gfxId,
              stats: WakfuStats.fromGamedata(
                ItemIdOverrideLevel[item.definition.item.id] ||
                  ItemTypesOverrideLevel[item.definition.item.baseParameters.itemTypeId] ||
                  item.definition.item.level ||
                  100,
                item.definition.equipEffects,
              ),
              recipes: [],
              title: item.title,
              description: item.description,
            }),
          );
        }
      }
    }
  }

  private loadJobItems(jobItems: TWakfuGamedataTypes[EnumWakfuGamedataType.JobsItems][]) {
    for (const item of jobItems) {
      if (this.items.has(item.definition.id)) {
        continue;
      }
      const itemType = this.itemTypes.get(item.definition.itemTypeId);
      if (!itemType) {
        continue;
      }
      this.jobItems.set(
        item.definition.id,
        new WakfuBaseItem({
          id: item.definition.id,
          level: item.definition.level,
          itemType: itemType,
          rarity: item.definition.rarity,
          gfxId: item.definition.graphicParameters.gfxId,
          recipes: [],
          title: item.title,
          description: item.description,
        }),
      );
    }
  }

  private loadRecipeCategories(recipeCategories: TWakfuGamedataTypes[EnumWakfuGamedataType.RecipeCategories][]) {
    for (const category of recipeCategories) {
      this.recipeCategories.set(
        category.definition.id,
        new WakfuRecipeCategory({
          id: category.definition.id,
          title: category.title,
        }),
      );
    }
  }

  private loadRecipes(
    recipes: TWakfuGamedataTypes[EnumWakfuGamedataType.Recipes][],
    recipesIngredients: TWakfuGamedataTypes[EnumWakfuGamedataType.RecipeIngredients][],
    recipeResults: TWakfuGamedataTypes[EnumWakfuGamedataType.RecipeResults][],
  ) {
    const ingredientsByRecipeId: Record<number, { item: WakfuBaseItem; quantity: number }[]> = {};
    const resultsByRecipeId: Record<number, { item: WakfuBaseItem; quantity: number }> = {};
    for (const ingredient of recipesIngredients) {
      const item = this.jobItems.get(ingredient.itemId) || this.items.get(ingredient.itemId);
      if (!item) {
        continue;
      }
      if (!ingredientsByRecipeId[ingredient.recipeId]) {
        ingredientsByRecipeId[ingredient.recipeId] = [];
      }
      ingredientsByRecipeId[ingredient.recipeId][ingredient.ingredientOrder] = {
        item,
        quantity: ingredient.quantity,
      };
    }
    for (const result of recipeResults) {
      const item = this.jobItems.get(result.productedItemId) || this.items.get(result.productedItemId);
      if (!item) {
        continue;
      }
      resultsByRecipeId[result.recipeId] = { item, quantity: result.productedItemQuantity };
    }
    for (const recipe of recipes) {
      const category = this.recipeCategories.get(recipe.categoryId);
      const ingredients = ingredientsByRecipeId[recipe.id];
      const result = resultsByRecipeId[recipe.id];
      if (!category || !ingredients || !result) {
        continue;
      }
      const wakfuRecipe = new WakfuRecipe({
        id: recipe.id,
        recipeCategory: category,
        level: recipe.level,
        ingredients: ingredients.filter(Boolean),
        result: result,
      });
      result.item.addRecipe(wakfuRecipe);
      this.recipes.set(recipe.id, wakfuRecipe);
    }
  }

  private loadStore(version: string, gamedata: TPickWakfuGamedata<typeof WakfuStore.GamedataToLoad>) {
    this.resetStore();
    this.gamedataVersion = version;
    this.loadItemTypes(gamedata.itemTypes);
    this.loadItemTypes(gamedata.equipmentItemTypes);
    this.loadItems(gamedata.items);
    this.loadJobItems(gamedata.jobsItems);
    this.loadRecipeCategories(gamedata.recipeCategories);
    this.loadRecipes(gamedata.recipes, gamedata.recipeIngredients, gamedata.recipeResults);
  }

  private async load() {
    const fileLoader = new WakfuFile(...WakfuStore.GamedataToLoad);
    try {
      const { version, gamedata } = await fileLoader.getGamedata();
      this.loadStore(version, gamedata);
    } catch {
      console.warn("Failed to load from file, falling back to API...");
      try {
        const apiLoader = new WakfuAPI(...WakfuStore.GamedataToLoad);
        const { version, gamedata } = await apiLoader.getGamedata();
        this.loadStore(version, gamedata);
        await fileLoader.saveGamedata(version, gamedata);
      } catch (error) {
        console.error("Failed to load from API:", error);
      }
    }
    WakfuStore.instance = this;
  }

  public getLang(): EnumWakfuLang {
    return this.lang;
  }

  public getGamedataVersion(): string {
    if (!this.gamedataVersion) {
      throw new Error("WakfuStore not initialized");
    }
    return this.gamedataVersion;
  }

  public getItemTypeById(id: number) {
    return this.itemTypes.get(id) || null;
  }

  public getItemTypes<T = WakfuItemType>(
    filter: ((itemType: WakfuItemType) => boolean) | null = null,
    sort: ((a: WakfuItemType, b: WakfuItemType) => number) | null = null,
    transform: ((itemType: WakfuItemType) => T) | null = null,
  ): T[] {
    return this.getFilterSortTransform(this.itemTypes.values(), filter, sort, transform);
  }

  public getItemById(id: number) {
    return this.items.get(id) || null;
  }

  public getItems<T = WakfuItem>(
    filter: ((item: WakfuItem) => boolean) | null = null,
    sort: ((a: WakfuItem, b: WakfuItem) => number) | null = null,
    transform: ((item: WakfuItem) => T) | null = null,
  ): T[] {
    return this.getFilterSortTransform(this.items.values(), filter, sort, transform);
  }

  public getJobItemById(id: number) {
    return this.jobItems.get(id) || null;
  }

  public getRecipeCategoryById(id: number) {
    return this.recipeCategories.get(id) || null;
  }

  public getRecipeById(id: number) {
    return this.recipes.get(id) || null;
  }

  public getEnchantmentShardLevelingCurve() {
    return this.enchantment.shardLevelingCurve;
  }

  public getEnchantmentShardLevelRequirement() {
    return this.enchantment.shardLevelRequirement;
  }

  public getEnchantments<T = WakfuEnchantment>(
    filter: ((enchantment: WakfuEnchantment) => boolean) | null = null,
    sort: ((a: WakfuEnchantment, b: WakfuEnchantment) => number) | null = null,
    transform: ((enchantment: WakfuEnchantment) => T) | null = null,
  ): T[] {
    return this.getFilterSortTransform(this.enchantment.enchantments.values(), filter, sort, transform);
  }

  public getEnchantmentById(id: number) {
    return this.enchantment.enchantments.get(id) || null;
  }

  public getSublimations<T = WakfuSublimation>(
    filter: ((sublimation: WakfuSublimation) => boolean) | null = null,
    sort: ((a: WakfuSublimation, b: WakfuSublimation) => number) | null = null,
    transform: ((sublimation: WakfuSublimation) => T) | null = null,
  ): T[] {
    return this.getFilterSortTransform(this.enchantment.sublimations.values(), filter, sort, transform);
  }

  public getSublimationById(id: number) {
    return this.enchantment.sublimations.get(id) || null;
  }
}
