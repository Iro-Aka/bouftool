import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { StackRow } from "src/front/components/Layout/StackRow";
import { TreeItem, type TreeNode } from "src/front/components/TreeView";
import { ItemIcon } from "src/front/components/Wakfu/ItemIcon";
import { RarityIcon } from "src/front/components/Wakfu/RarityIcon";
import type { TCraftItem } from "src/wakfu/craftManager/types";

export type RecipeSelectionModalProps = {
  craftItem: TCraftItem | null;
  currentRecipeIndex: number;
  onSelectRecipe: (recipeIndex: number) => void;
  onClose: () => void;
};

const recipeToTreeNode = (recipe: TCraftItem["item"]["recipes"][number]): TreeNode => {
  const resultNode: TreeNode = {
    id: recipe.result.item.id.toString(),
    label: (
      <Stack>
        <Typography>
          {recipe.result.item.title.fr} (x{recipe.result.quantity})
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {recipe.recipeCategory.title.fr} - Niveau {recipe.level}
        </Typography>
      </Stack>
    ),
    defaultExpanded: true,
    icon: (
      <StackRow sx={{ pr: 1 }}>
        <ItemIcon width={38}>{recipe.result.item.gfxId}</ItemIcon>
        <RarityIcon width={14}>{recipe.result.item.rarity}</RarityIcon>
      </StackRow>
    ),
  };

  const ingredientNodes: TreeNode[] = recipe.ingredients.map((ingredient) => ({
    id: ingredient.item.id.toString(),
    label: (
      <Stack>
        <Typography>
          {ingredient.item.title.fr} (x{ingredient.quantity})
        </Typography>
        {ingredient.item.recipes.length > 0 && ingredient.item.recipes[0] && (
          <Typography variant="caption" color="text.secondary">
            {ingredient.item.recipes[0].recipeCategory.title.fr} - Niveau {ingredient.item.recipes[0].level}
          </Typography>
        )}
      </Stack>
    ),
    defaultExpanded: true,
    icon: (
      <StackRow sx={{ pr: 1 }}>
        <ItemIcon width={30}>{ingredient.item.gfxId}</ItemIcon>
        <RarityIcon width={14}>{ingredient.item.rarity}</RarityIcon>
      </StackRow>
    ),
  }));

  resultNode.children = ingredientNodes;

  return resultNode;
};

export const RecipeSelectionModal = ({
  craftItem,
  currentRecipeIndex,
  onSelectRecipe,
  onClose,
}: RecipeSelectionModalProps) => {
  const [selectedIndex, setSelectedIndex] = useState(currentRecipeIndex);

  const handleConfirm = () => {
    onSelectRecipe(selectedIndex);
  };

  const treeNodes = useMemo(() => {
    if (!craftItem) {
      return [];
    }
    return craftItem.item.recipes.map((recipe) => recipeToTreeNode(recipe));
  }, [craftItem]);

  return (
    <Dialog open={craftItem != null} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Choisir une recette - {craftItem?.item.title.fr}
        <Typography variant="caption" display="block" color="text.secondary">
          {craftItem?.item.recipes.length} recettes disponibles
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack gap={1}>
          {treeNodes.map((node, index) => {
            const isSelected = index === selectedIndex;
            const isCurrent = index === currentRecipeIndex;

            return (
              <Box
                key={node.id}
                sx={{
                  py: 1,
                  px: 2,
                  border: "2px solid",
                  borderColor: isSelected ? "primary.main" : "divider",
                  borderRadius: "8px",
                  bgcolor: isSelected ? "action.selected" : "background.paper",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: "primary.light",
                    bgcolor: "action.hover",
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(index);
                }}
              >
                <StackRow sx={{ justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="subtitle1">
                    Recette #{index + 1}
                    {isCurrent && (
                      <Typography component="span" variant="caption" color="success.main" sx={{ ml: 1 }}>
                        (Actuelle)
                      </Typography>
                    )}
                  </Typography>
                </StackRow>

                <TreeItem node={node} depth={0} isLast={true} disableCollapse />
              </Box>
            );
          })}
        </Stack>
      </DialogContent>
      <DialogActions>
        <StackRow sx={{ justifyContent: "flex-end", gap: 1 }}>
          <Button variant="push" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="push" onClick={handleConfirm} disabled={selectedIndex === currentRecipeIndex}>
            Confirmer
          </Button>
        </StackRow>
      </DialogActions>
    </Dialog>
  );
};
