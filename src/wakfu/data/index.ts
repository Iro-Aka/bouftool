import fs from "node:fs/promises";
import path from "node:path";
import { isErrnoException } from "src/types/utils";
import { fetchWakfuGamedata, fetchWakfuGamedataVersion, WakfuGamedataTypes } from "../api";
import { WakfuParserItemEffects } from "../parser/Item";
import { loadWakfuActionFromJson } from "../types/action";
import type { TWakfuDescription } from "../types/description";
import { loadWakfuItemFromJson, type TWakfuItem } from "../types/items";
import {
  loadWakfuItemTypeFromJson,
  type TWakfuItemType,
  WakfuEquipmentPosition,
  WakfuItemTypeId,
} from "../types/itemType";
import { loadWakfuJobItemFromJson, type TWakfuJobItem } from "../types/jobsItems";
import { loadWakfuRecipeCategoryFromJson } from "../types/recipeCategory";
import { loadWakfuRecipeIngredientFromJson } from "../types/recipeIngredients";
import { loadWakfuRecipeResultFromJson } from "../types/recipeResults";
import { loadWakfuRecipeFromJson } from "../types/recipes";
import { loadWakfuStateFromJson } from "../types/state";
import { WakfuLang } from "../types/utils";
import { WakfuItem } from "./item";
import { isWakfuGamedata, type TWakfuGamedata, type TWakfuGamedataRecipe } from "./types";

export const ItemTypesOverrideLevel: Record<number, number> = {
  [WakfuItemTypeId.Pet]: 50,
  [WakfuItemTypeId.Mount]: 50,
  [WakfuItemTypeId.Enchantment]: 10,
};

export const ItemIdOverrideLevel: Record<number, number> = {
  12237: 25, // Dot
  26673: 25, // Gélutin Combattant
  26674: 25, // Gélutin Soigneur
  26675: 25, // Gélutin Chasseur
  26676: 25, // Gélutin Berserker
  26677: 25, // Gélutin Aventurier
};

export class WakfuData {
  private static filePath: string = "gamedata.json";
  private static instance: WakfuData | null = null;
  private version: string = "";
  private lang: WakfuLang = WakfuLang.fr;
  private actionLabelsMap: Map<number, TWakfuDescription> = new Map();
  private itemTypesMap: Map<number, Omit<TWakfuItemType, "title">> = new Map();
  private itemTypeLabelsMap: Map<number, TWakfuDescription> = new Map();
  private recipeCategoryMap: Map<number, TWakfuDescription> = new Map();
  private statesMap: Map<number, TWakfuDescription> = new Map();
  private items: WakfuItem[] = [];
  private itemsMap: Map<number, WakfuItem> = new Map();
  private recipesMap: Map<number, TWakfuGamedataRecipe> = new Map();
  private recipesMapByItem: Map<number, TWakfuGamedataRecipe[]> = new Map();
  private jobsItemsMap: Map<number, TWakfuJobItem> = new Map();

  public static async initialize() {
    if (!WakfuData.instance) {
      WakfuData.instance = new WakfuData();
      await WakfuData.instance.loadGamedata();
    }
    return WakfuData.getInstance();
  }

  public static getInstance(): WakfuData {
    if (!WakfuData.instance) {
      throw new Error("WakfuData instance not initialized. Call initialize() first.");
    }
    return WakfuData.instance;
  }

  private async fetchAndBuildActions() {
    const actions = await fetchWakfuGamedata(this.version, WakfuGamedataTypes.Actions, loadWakfuActionFromJson);
    this.actionLabelsMap = new Map<number, TWakfuDescription>();
    for (const action of actions) {
      if (action.description) {
        this.actionLabelsMap.set(action.id, action.description);
      }
    }
  }

  private async fetchAndBuildItemTypes() {
    const itemTypes = await fetchWakfuGamedata(this.version, WakfuGamedataTypes.ItemTypes, loadWakfuItemTypeFromJson);
    const equipmentItemTypes = await fetchWakfuGamedata(
      this.version,
      WakfuGamedataTypes.EquipmentItemTypes,
      loadWakfuItemTypeFromJson,
    );
    this.itemTypesMap = new Map<number, Omit<TWakfuItemType, "title">>();
    this.itemTypeLabelsMap = new Map<number, TWakfuDescription>();
    for (const itemType of itemTypes) {
      const { title, ...rest } = itemType;
      this.itemTypesMap.set(itemType.id, rest);
      if (title) {
        this.itemTypeLabelsMap.set(itemType.id, title);
      }
    }
    for (const itemType of equipmentItemTypes) {
      if (itemType.id === WakfuItemTypeId.Mount) {
        itemType.equipmentPositions = [WakfuEquipmentPosition.Mount];
      }
      const { title, ...rest } = itemType;
      this.itemTypesMap.set(itemType.id, rest);
      if (title) {
        this.itemTypeLabelsMap.set(itemType.id, title);
      }
    }
  }

  private async fetchAndBuildRecipeCategories() {
    const recipeCategories = await fetchWakfuGamedata(
      this.version,
      WakfuGamedataTypes.RecipeCategories,
      loadWakfuRecipeCategoryFromJson,
    );
    this.recipeCategoryMap = new Map<number, TWakfuDescription>();
    for (const category of recipeCategories) {
      this.recipeCategoryMap.set(category.id, category.description);
    }
  }

  private async fetchAndBuildStates() {
    const states = await fetchWakfuGamedata(this.version, WakfuGamedataTypes.States, loadWakfuStateFromJson);
    this.statesMap = new Map<number, TWakfuDescription>();
    for (const state of states) {
      if (state.title) {
        this.statesMap.set(state.id, state.title);
      }
    }
  }

  private async fetchAndBuildRecipes() {
    const recipes = await fetchWakfuGamedata(this.version, WakfuGamedataTypes.Recipes, loadWakfuRecipeFromJson);
    for (const recipe of recipes) {
      this.recipesMap.set(recipe.id, {
        id: recipe.id,
        level: recipe.level,
        recipeCategoryId: recipe.categoryId,
        ingredients: [],
        result: { itemId: 0, quantity: 0 },
      });
    }
    const recipeResults = await fetchWakfuGamedata(
      this.version,
      WakfuGamedataTypes.RecipeResults,
      loadWakfuRecipeResultFromJson,
    );
    for (const recipeResult of recipeResults) {
      const recipe = this.recipesMap.get(recipeResult.recipeId);
      if (recipe) {
        recipe.result = { itemId: recipeResult.productedItemId, quantity: recipeResult.productedItemQuantity };
      }
    }
    const recipeIngredients = await fetchWakfuGamedata(
      this.version,
      WakfuGamedataTypes.RecipeIngredients,
      loadWakfuRecipeIngredientFromJson,
    );
    for (const ingredient of recipeIngredients) {
      const recipe = this.recipesMap.get(ingredient.recipeId);
      if (recipe) {
        recipe.ingredients[ingredient.ingredientOrder] = { itemId: ingredient.itemId, quantity: ingredient.quantity };
      }
    }
    this.recipesMapByItem = new Map<number, TWakfuGamedataRecipe[]>();
    for (const recipe of this.recipesMap.values()) {
      recipe.ingredients = recipe.ingredients.filter((ingredient) => ingredient !== null);
      const itemId = recipe.result.itemId;
      if (!this.recipesMapByItem.has(itemId)) {
        this.recipesMapByItem.set(itemId, []);
      }
      // biome-ignore lint/style/noNonNullAssertion: Will never be undefined
      this.recipesMapByItem.get(itemId)!.push(recipe);
    }
  }

  private async fetchAndBuildJobsItems() {
    const jobsResources = await fetchWakfuGamedata(
      this.version,
      WakfuGamedataTypes.JobsItems,
      loadWakfuJobItemFromJson,
    );
    this.jobsItemsMap = new Map<number, TWakfuJobItem>(jobsResources.map((item) => [item.id, item]));
  }

  private async fetchAndBuildItems() {
    const items = await fetchWakfuGamedata(this.version, WakfuGamedataTypes.Items, loadWakfuItemFromJson);
    const enchantments: TWakfuItem[] = [];
    this.items = [];
    for (const item of items) {
      if (item.itemTypeId === WakfuItemTypeId.Enchantment) {
        enchantments.push(item);
        continue;
      }
      if (item.equipEffects.length > 0) {
        const realLevel = item.level;
        item.level = ItemIdOverrideLevel[item.id] || ItemTypesOverrideLevel[item.itemTypeId] || item.level || 100;
        const parser = new WakfuParserItemEffects(item, this.lang, {
          actions: this.actionLabelsMap,
          recipeCategories: this.recipeCategoryMap,
          states: this.statesMap,
        });
        const equipEffectsLabels = parser.parse();
        item.level = realLevel || 1;
        const wakfuItem = new WakfuItem(
          {
            ...item,
            equipEffectsLabels,
          },
          this.lang,
        );
        this.items.push(wakfuItem);
        this.itemsMap.set(wakfuItem.getId(), wakfuItem);
      }
    }
  }

  private async loadGamedataFromApi() {
    console.log("WakfuData: Load from API");
    this.version = await fetchWakfuGamedataVersion();
    await this.fetchAndBuildActions();
    await this.fetchAndBuildItemTypes();
    await this.fetchAndBuildStates();
    await this.fetchAndBuildRecipeCategories();
    await this.fetchAndBuildRecipes();
    await this.fetchAndBuildJobsItems();
    await this.fetchAndBuildItems();
    await this.saveGamedata();
  }

  private loadGamedataFromFile(parsedData: TWakfuGamedata) {
    console.log("WakfuData: Load from file");
    this.version = parsedData.version;
    this.lang = parsedData.lang;
    this.actionLabelsMap = new Map(parsedData.actionLabels.map(({ id, description }) => [id, description]));
    this.itemTypesMap = new Map(parsedData.itemTypes.map(({ id, ...data }) => [id, { id, ...data }]));
    this.itemTypeLabelsMap = new Map(parsedData.itemTypeLabels.map(({ id, description }) => [id, description]));
    this.recipeCategoryMap = new Map(parsedData.recipeCategories.map(({ id, description }) => [id, description]));
    this.recipesMap = new Map(parsedData.recipes.map((recipe) => [recipe.id, recipe]));
    this.recipesMapByItem = new Map<number, TWakfuGamedataRecipe[]>();
    for (const recipe of this.recipesMap.values()) {
      const itemId = recipe.result.itemId;
      if (!this.recipesMapByItem.has(itemId)) {
        this.recipesMapByItem.set(itemId, []);
      }
      // biome-ignore lint/style/noNonNullAssertion: Will never be undefined
      this.recipesMapByItem.get(itemId)!.push(recipe);
    }
    this.statesMap = new Map(parsedData.states.map(({ id, description }) => [id, description]));
    this.jobsItemsMap = new Map(parsedData.jobsItems.map((item) => [item.id, item]));
    this.items = parsedData.items.map((item) => new WakfuItem(item, this.lang));
    this.itemsMap = new Map(this.items.map((item) => [item.getId(), item]));
  }

  private async saveGamedata() {
    const gamedata = {
      version: this.version,
      lang: this.lang,
      actionLabels: Array.from(this.actionLabelsMap.entries()).map(([id, description]) => ({ id, description })),
      itemTypes: Array.from(this.itemTypesMap.entries()).map(([_id, data]) => data),
      itemTypeLabels: Array.from(this.itemTypeLabelsMap.entries()).map(([id, description]) => ({ id, description })),
      recipeCategories: Array.from(this.recipeCategoryMap.entries()).map(([id, description]) => ({ id, description })),
      recipes: Array.from(this.recipesMap.entries()).map(([_id, recipe]) => recipe),
      states: Array.from(this.statesMap.entries()).map(([id, description]) => ({ id, description })),
      jobsItems: Array.from(this.jobsItemsMap.entries()).map(([_id, jobItem]) => jobItem),
      items: this.items.map((item) => item.item),
    } satisfies TWakfuGamedata;
    await fs.mkdir(path.dirname(WakfuData.filePath), { recursive: true });
    await fs.writeFile(WakfuData.filePath, JSON.stringify(gamedata, null, 2), { encoding: "utf-8" });
  }

  public async loadGamedata() {
    try {
      const gamedata = await fs.readFile(WakfuData.filePath, "utf-8");
      const parsedData = JSON.parse(gamedata);
      if (isWakfuGamedata(parsedData)) {
        this.loadGamedataFromFile(parsedData);
      } else {
        console.error("WakfuData: Invalid data format");
      }
    } catch (error: unknown) {
      if ((isErrnoException(error) && error.code === "ENOENT") || error instanceof SyntaxError) {
        await this.loadGamedataFromApi();
        return;
      }
      throw error;
    }
  }

  public getVersion(): string {
    return this.version;
  }

  public getLang(): WakfuLang {
    return this.lang;
  }

  public setLang(lang: WakfuLang) {
    this.lang = lang;
    for (const item of this.items) {
      item.lang = lang;
      const realLevel = item.getLevel();
      item.item.level =
        ItemIdOverrideLevel[item.item.id] || ItemTypesOverrideLevel[item.item.itemTypeId] || item.getLevel() || 100;
      item.item.equipEffectsLabels = new WakfuParserItemEffects(item.item, this.lang, {
        actions: this.actionLabelsMap,
        recipeCategories: this.recipeCategoryMap,
        states: this.statesMap,
      }).parse();
      item.item.level = realLevel || 1;
    }
  }

  public getItems(): WakfuItem[] {
    return this.items;
  }

  public getItemById(id: number): WakfuItem | undefined {
    return this.itemsMap.get(id);
  }

  public getJobItemById(id: number): TWakfuJobItem | undefined {
    return this.jobsItemsMap.get(id);
  }

  public getItemTypesMap() {
    return this.itemTypesMap;
  }

  public getItemTypeLabels() {
    return this.itemTypeLabelsMap;
  }

  public getRecipeCategoryLabel(id: number): TWakfuDescription | undefined {
    return this.recipeCategoryMap.get(id);
  }

  public getRecipeById(id: number): TWakfuGamedataRecipe | undefined {
    return this.recipesMap.get(id);
  }

  public getRecipesByItemId(itemId: number): TWakfuGamedataRecipe[] {
    return this.recipesMapByItem.get(itemId) || [];
  }
}
