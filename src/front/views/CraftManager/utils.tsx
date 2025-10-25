import type { ReactNode } from "react";
import type { TreeNode } from "src/front/components/TreeView";
import type { TCraftItem } from "src/wakfu/craftManager/types";
import { StackRow } from "../../components/Layout/StackRow";
import { ItemIcon } from "../../components/Wakfu/ItemIcon";
import { RarityIcon } from "../../components/Wakfu/RarityIcon";

export const craftItemToTreeNode = (
  craftItem: TCraftItem,
  path: number[],
  first: boolean = false,
  actions?: (first: boolean, craftItem: TCraftItem, path: number[]) => ReactNode,
): TreeNode => {
  const { item, quantity } = craftItem;
  const hasRecipes = item.recipes && item.recipes.length > 0;

  const recipe = hasRecipes ? item.recipes[0] : null;

  const children: TreeNode[] = [];
  if (recipe?.ingredients) {
    for (const ingredient of recipe.ingredients) {
      children.push(craftItemToTreeNode(ingredient, [...path, item.id], false, actions));
    }
  }

  return {
    id: item.id.toString(),
    label: `${item.title.fr} (x${quantity})`,
    defaultExpanded: false,
    icon: (
      <StackRow sx={{ pr: 1 }}>
        <ItemIcon width={children.length > 0 ? 38 : 30}>{item.gfxId}</ItemIcon>
        <RarityIcon width={14}>{item.rarity}</RarityIcon>
      </StackRow>
    ),
    indicatorColor: item.isCrafted ? "#4caf50" : undefined,
    children: children.length > 0 ? children : undefined,
    actions: actions ? actions(first, craftItem, path) : undefined,
  };
};

export const craftItemsToTreeNodes = (
  items: TCraftItem[],
  actions?: (first: boolean, craftItem: TCraftItem, path: number[]) => ReactNode,
): TreeNode[] => {
  return items.map((item) => craftItemToTreeNode(item, [], true, actions));
};
