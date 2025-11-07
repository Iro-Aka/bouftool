import { WakfuBuild } from "../builds/build";
import type { WakfuBaseItem } from "../items/base";
import { WakfuStore } from "../store";
import { FileHandler } from "../utils/FileHandler";
import type {
  TCraftedIngredientNode,
  TCraftedIngredientNodeRaw,
  TCraftItem,
  TWakfuCraftManagerItem,
  TWakfuCraftManagerRaw,
} from "./types";

const DefaultCraftManagerData: TWakfuCraftManagerRaw = {
  itemsToCraft: [],
};

export class WakfuCraftManager {
  private static instance: WakfuCraftManager | null = null;
  private fileHandler: FileHandler<TWakfuCraftManagerRaw>;
  private itemsToCraft: TWakfuCraftManagerItem[] = [];

  private constructor() {
    this.fileHandler = new FileHandler<TWakfuCraftManagerRaw>("crafting/craftManager.json");
  }

  private serializeCraftedIngredientsMap(
    map: Map<number, TCraftedIngredientNode>,
  ): Record<number, TCraftedIngredientNodeRaw> {
    const result: Record<number, TCraftedIngredientNodeRaw> = {};
    for (const [key, value] of map.entries()) {
      result[key] = {
        itemId: value.itemId,
        isCrafted: value.isCrafted,
        selectedRecipeIndex: value.selectedRecipeIndex,
        children: this.serializeCraftedIngredientsMap(value.children),
      };
    }
    return result;
  }

  private deserializeCraftedIngredientsMap(
    record: Record<number, TCraftedIngredientNodeRaw>,
  ): Map<number, TCraftedIngredientNode> {
    const map = new Map<number, TCraftedIngredientNode>();
    for (const [key, value] of Object.entries(record)) {
      map.set(Number(key), {
        itemId: value.itemId,
        isCrafted: value.isCrafted,
        selectedRecipeIndex: value.selectedRecipeIndex ?? 0,
        children: this.deserializeCraftedIngredientsMap(value.children),
      });
    }
    return map;
  }

  private findNodeByPath(
    rootMap: Map<number, TCraftedIngredientNode>,
    path: number[],
  ): Map<number, TCraftedIngredientNode> | null {
    let currentMap = rootMap;
    for (const id of path) {
      const node = currentMap.get(id);
      if (!node) {
        return null;
      }
      currentMap = node.children;
    }
    return currentMap;
  }

  private ensurePathExists(
    rootMap: Map<number, TCraftedIngredientNode>,
    path: number[],
  ): Map<number, TCraftedIngredientNode> {
    let currentMap = rootMap;
    for (const id of path) {
      let node = currentMap.get(id);
      if (!node) {
        node = {
          itemId: id,
          isCrafted: false,
          selectedRecipeIndex: 0,
          children: new Map(),
        };
        currentMap.set(id, node);
      }
      currentMap = node.children;
    }
    return currentMap;
  }

  public static async initialize() {
    if (!WakfuCraftManager.instance) {
      WakfuCraftManager.instance = new WakfuCraftManager();
      await WakfuCraftManager.instance.load();
    }
    return WakfuCraftManager.instance;
  }

  public static getInstance() {
    if (!WakfuCraftManager.instance) {
      throw new Error("WakfuCraftManager not initialized");
    }
    return WakfuCraftManager.instance;
  }

  private async load() {
    if (!(await this.fileHandler.exists())) {
      await this.fileHandler.write(DefaultCraftManagerData, true);
    }
    try {
      const result = await this.fileHandler.read();

      for (const itemData of result.itemsToCraft) {
        const item = WakfuStore.getInstance().getItemById(itemData.id);
        if (item) {
          this.itemsToCraft.push({
            item,
            quantity: itemData.quantity,
            craftedIngredients: itemData.craftedIngredients
              ? this.deserializeCraftedIngredientsMap(itemData.craftedIngredients)
              : new Map(),
          });
        }
      }
    } catch {
      this.itemsToCraft = [];
      await this.fileHandler.write(DefaultCraftManagerData, true);
    }
  }

  private save(skipTimeout: boolean = false) {
    return this.fileHandler.write(
      {
        itemsToCraft: this.itemsToCraft.map((item) => ({
          id: item.item.getId(),
          quantity: item.quantity,
          craftedIngredients: this.serializeCraftedIngredientsMap(item.craftedIngredients),
        })),
      },
      skipTimeout,
    );
  }

  public addItemToCraft(itemId: number) {
    const item = WakfuStore.getInstance().getItemById(itemId);
    if (!item) {
      throw new Error(`Item with ID ${itemId} not found`);
    }
    const itemToCraft = this.itemsToCraft.find((i) => i.item.getId() === itemId);
    if (itemToCraft) {
      itemToCraft.quantity += 1;
    } else {
      this.itemsToCraft.push({ item, quantity: 1, craftedIngredients: new Map() });
    }
    this.save();
  }

  public addBuildItemsToCraft(buildId: string) {
    const build = WakfuBuild.getById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }

    const buildDisplay = build.toDisplay();

    for (const position in buildDisplay.stuff) {
      const equipment = buildDisplay.stuff[position as keyof typeof buildDisplay.stuff];
      if (equipment.item) {
        const itemId = equipment.item.id;
        const itemToCraft = this.itemsToCraft.find((i) => i.item.getId() === itemId);
        if (itemToCraft) {
          itemToCraft.quantity += 1;
        } else {
          const item = WakfuStore.getInstance().getItemById(itemId);
          if (item && item.getRecipes().length > 0) {
            this.itemsToCraft.push({ item, quantity: 1, craftedIngredients: new Map() });
          }
        }
      }
    }

    this.save();
  }

  public setItemQuantity(itemId: number, quantity: number) {
    if (quantity <= 0) {
      return;
    }
    const itemToCraft = this.itemsToCraft.find((i) => i.item.getId() === itemId);
    if (itemToCraft) {
      itemToCraft.quantity = quantity;
      this.save();
    }
  }

  public removeItemToCraft(itemId: number) {
    const index = this.itemsToCraft.findIndex((i) => i.item.getId() === itemId);
    if (index !== -1) {
      this.itemsToCraft.splice(index, 1);
      this.save();
    }
  }

  public getItemsToCraft() {
    return this.itemsToCraft;
  }

  public setIngredientSelectedRecipe(path: number[], ingredientId: number, recipeIndex: number) {
    if (path.length === 0) {
      throw new Error("Path cannot be empty");
    }

    const rootItemId = path[0];
    const itemToCraft = this.itemsToCraft.find((i) => i.item.getId() === rootItemId);
    if (!itemToCraft) {
      throw new Error(`Item with ID ${rootItemId} not found in craft list`);
    }

    const parentPath = path.slice(1);

    const targetMap =
      parentPath.length > 0
        ? this.ensurePathExists(itemToCraft.craftedIngredients, parentPath)
        : itemToCraft.craftedIngredients;

    let node = targetMap.get(ingredientId);
    if (!node) {
      node = {
        itemId: ingredientId,
        isCrafted: false,
        selectedRecipeIndex: recipeIndex,
        children: new Map(),
      };
      targetMap.set(ingredientId, node);
    } else {
      const item =
        WakfuStore.getInstance().getItemById(ingredientId) ?? WakfuStore.getInstance().getJobItemById(ingredientId);
      if (item) {
        const recipes = item.getRecipes();

        if (recipeIndex < 0 || recipeIndex >= recipes.length) {
          throw new Error(`Recipe index ${recipeIndex} out of bounds for item ${ingredientId}`);
        }
      }

      node.selectedRecipeIndex = recipeIndex;
      node.isCrafted = false;
      node.children.clear();
      this.createNodeWithChildren(ingredientId, false, recipeIndex);
    }

    this.save();
  }

  private markNodeAndChildrenAsCrafted(node: TCraftedIngredientNode, isCrafted: boolean): void {
    node.isCrafted = isCrafted;

    if (isCrafted && node.children.size === 0) {
      const item =
        WakfuStore.getInstance().getItemById(node.itemId) ?? WakfuStore.getInstance().getJobItemById(node.itemId);
      if (item) {
        const recipes = item.getRecipes();
        if (recipes.length > 0) {
          const recipeIndex = node.selectedRecipeIndex ?? 0;
          const recipe = recipes[recipeIndex];
          for (const ingredient of recipe.getIngredients()) {
            const ingredientId = ingredient.item.getId();
            const childNode = this.createNodeWithChildren(ingredientId, true, 0);
            node.children.set(ingredientId, childNode);
          }
        }
      }
    } else {
      for (const child of node.children.values()) {
        this.markNodeAndChildrenAsCrafted(child, isCrafted);
      }
    }
  }

  private createNodeWithChildren(
    itemId: number,
    isCrafted: boolean,
    selectedRecipeIndex: number = 0,
  ): TCraftedIngredientNode {
    const node: TCraftedIngredientNode = {
      itemId,
      isCrafted,
      selectedRecipeIndex,
      children: new Map(),
    };

    if (isCrafted) {
      const item = WakfuStore.getInstance().getItemById(itemId) ?? WakfuStore.getInstance().getJobItemById(itemId);
      if (item) {
        const recipes = item.getRecipes();
        if (recipes.length > 0) {
          const recipeIndex = selectedRecipeIndex ?? 0;
          const recipe = recipes[recipeIndex];
          const ingredients = recipe.getIngredients();
          for (const ingredient of ingredients) {
            const ingredientId = ingredient.item.getId();
            const childNode = this.createNodeWithChildren(ingredientId, true, 0);
            node.children.set(ingredientId, childNode);
          }
        }
      }
    }

    return node;
  }

  public markIngredientAsCrafted(path: number[], ingredientId: number): void {
    if (path.length === 0) {
      throw new Error("Path cannot be empty");
    }

    const rootItemId = path[0];
    const itemToCraft = this.itemsToCraft.find((i) => i.item.getId() === rootItemId);
    if (!itemToCraft) {
      throw new Error(`Item with ID ${rootItemId} not found in craft list`);
    }

    const parentPath = path.slice(1);
    const targetMap =
      parentPath.length > 0
        ? this.ensurePathExists(itemToCraft.craftedIngredients, parentPath)
        : itemToCraft.craftedIngredients;

    let node = targetMap.get(ingredientId);
    if (!node) {
      node = this.createNodeWithChildren(ingredientId, true, 0);
      targetMap.set(ingredientId, node);
    } else {
      this.markNodeAndChildrenAsCrafted(node, true);
    }

    this.save();
  }

  private unmarkParentNodes(rootMap: Map<number, TCraftedIngredientNode>, path: number[]): void {
    if (path.length === 0) {
      return;
    }

    let currentMap = rootMap;
    for (const id of path) {
      const node = currentMap.get(id);
      if (!node) {
        return;
      }
      node.isCrafted = false;
      currentMap = node.children;
    }
  }

  public unmarkIngredientAsCrafted(path: number[], ingredientId: number): void {
    if (path.length === 0) {
      throw new Error("Path cannot be empty");
    }

    const rootItemId = path[0];
    const itemToCraft = this.itemsToCraft.find((i) => i.item.getId() === rootItemId);
    if (!itemToCraft) {
      throw new Error(`Item with ID ${rootItemId} not found in craft list`);
    }

    const targetMap = this.findNodeByPath(itemToCraft.craftedIngredients, path.slice(1));
    if (!targetMap) {
      return;
    }

    const node = targetMap.get(ingredientId);
    if (node) {
      node.isCrafted = false;

      this.unmarkParentNodes(itemToCraft.craftedIngredients, path.slice(1));
    }

    this.save();
  }

  public isIngredientCrafted(path: number[], ingredientId: number): boolean {
    if (path.length === 0) {
      return false;
    }

    const rootItemId = path[0];
    const itemToCraft = this.itemsToCraft.find((i) => i.item.getId() === rootItemId);
    if (!itemToCraft) {
      return false;
    }

    const targetMap = this.findNodeByPath(itemToCraft.craftedIngredients, path.slice(1));
    if (!targetMap) {
      return false;
    }

    const node = targetMap.get(ingredientId);
    return node ? node.isCrafted : false;
  }

  public getCraftedIngredients(path: number[]): number[] {
    if (path.length === 0) {
      return [];
    }

    const rootItemId = path[0];
    const itemToCraft = this.itemsToCraft.find((i) => i.item.getId() === rootItemId);
    if (!itemToCraft) {
      return [];
    }

    const targetMap = this.findNodeByPath(itemToCraft.craftedIngredients, path.slice(1));
    if (!targetMap) {
      return [];
    }

    const craftedIds: number[] = [];
    for (const [id, node] of targetMap.entries()) {
      if (node.isCrafted) {
        craftedIds.push(id);
      }
    }

    return craftedIds;
  }

  private findIngredientInRecipe(
    item: WakfuBaseItem,
    craftedIngredients: Map<number, TCraftedIngredientNode>,
    ingredientId: number,
    currentPath: number[] = [],
    selectedRecipeIndex: number = 0,
  ): number[][] {
    const paths: number[][] = [];

    const recipes = item.getRecipes();
    if (recipes.length === 0) {
      return paths;
    }

    const recipeIndex = Math.min(selectedRecipeIndex, recipes.length - 1);
    const recipe = recipes[recipeIndex];
    const ingredients = recipe.getIngredients();

    for (const ingredient of ingredients) {
      const ingredientItem = ingredient.item;
      const ingredientItemId = ingredientItem.getId();

      if (ingredientItemId === ingredientId) {
        paths.push([...currentPath, ingredientItemId]);
      }

      const recipeIndexForChild = craftedIngredients.get(ingredientItemId)?.selectedRecipeIndex ?? 0;

      const childPaths = this.findIngredientInRecipe(
        ingredientItem,
        craftedIngredients.get(ingredientItemId)?.children || new Map(),
        ingredientId,
        [...currentPath, ingredientItemId],
        recipeIndexForChild,
      );
      paths.push(...childPaths);
    }

    return paths;
  }

  public markAllIngredientsById(ingredientId: number): void {
    for (const itemToCraft of this.itemsToCraft) {
      const rootItem = itemToCraft.item;

      const paths = this.findIngredientInRecipe(rootItem, itemToCraft.craftedIngredients, ingredientId);

      for (let i = 0; i < paths.length; i++) {
        const path = paths[i];

        const parentPath = path.slice(0, -1);
        const targetMap =
          parentPath.length > 0
            ? this.ensurePathExists(itemToCraft.craftedIngredients, parentPath)
            : itemToCraft.craftedIngredients;

        let node = targetMap.get(ingredientId);

        if (!node) {
          node = {
            itemId: ingredientId,
            isCrafted: true,
            selectedRecipeIndex: 0,
            children: new Map(),
          };
          targetMap.set(ingredientId, node);
        } else {
          node.isCrafted = true;
        }
      }
    }

    this.save();
  }

  public getItemsToCraftRecursivly(): TCraftItem[] {
    const processItem = (
      item: WakfuBaseItem,
      quantity: number,
      craftedIngredientsMap: Map<number, TCraftedIngredientNode>,
      isCraftedFromParent?: boolean,
      selectedRecipeIndexFromParent?: number,
    ): TCraftItem => {
      const itemId = item.getId();
      const recipes = item.getRecipes();
      const currentItemNode = craftedIngredientsMap.get(itemId);
      const selectedRecipeIndex = selectedRecipeIndexFromParent ?? currentItemNode?.selectedRecipeIndex ?? 0;
      const isCrafted = isCraftedFromParent !== undefined ? isCraftedFromParent : currentItemNode?.isCrafted || false;

      const recipesData = recipes.map((recipe) => {
        const recipeObj = {
          id: recipe.getId(),
          recipeCategory: recipe.getRecipeCategory().toObject(),
          level: recipe.getLevel(),
          ingredients: recipe.getIngredients().map((ingredient) => {
            const ingredientItem = ingredient.item;
            const ingredientId = ingredientItem.getId();
            const ingredientRecipes = ingredientItem.getRecipes();

            const ingredientNode = craftedIngredientsMap.get(ingredientId);
            const ingredientChildren = ingredientNode?.children || new Map<number, TCraftedIngredientNode>();

            if (ingredientRecipes.length > 0) {
              return processItem(
                ingredientItem,
                ingredient.quantity * quantity,
                ingredientChildren,
                ingredientNode?.isCrafted,
                ingredientNode?.selectedRecipeIndex,
              );
            }

            return {
              item: {
                ...ingredientItem.toObject(),
                recipes: [],
                isCrafted: ingredientNode?.isCrafted || false,
              },
              quantity: ingredient.quantity * quantity,
              selectedRecipeIndex: ingredientNode?.selectedRecipeIndex ?? 0,
              craftedIngredients: this.serializeCraftedIngredientsMap(ingredientChildren),
            };
          }),
          result: {
            item: recipe.getResult().item.toObject(),
            quantity: recipe.getResult().quantity,
          },
        };

        return recipeObj;
      });

      return {
        item: {
          ...item.toObject(),
          recipes: recipesData,
          isCrafted,
        },
        quantity,
        selectedRecipeIndex,
        craftedIngredients: this.serializeCraftedIngredientsMap(craftedIngredientsMap),
      };
    };

    return this.itemsToCraft.map((itemToCraft) =>
      processItem(itemToCraft.item, itemToCraft.quantity, itemToCraft.craftedIngredients, undefined),
    );
  }
}
