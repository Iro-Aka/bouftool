import { Stack, Typography } from "@mui/material";
import { TreeView } from "../../../components/TreeView";
import { useCraftManagerContext } from "../context";
import { RecipeSelectionModal } from "../ItemsList/RecipeSelectionModal";

export const CraftItemsList = () => {
  const { treeNodes, recipeCraftItem, currentRecipeIndex, onSelectRecipe, onCloseRecipeModal } =
    useCraftManagerContext();

  return (
    <Stack sx={{ flexBasis: "500px", borderRadius: "8px", bgcolor: "surface.100", overflowY: "auto" }}>
      <Typography variant="subtitle2" sx={{ px: 1, pt: 1 }}>
        Items à crafter
      </Typography>
      <TreeView nodes={treeNodes} />
      <RecipeSelectionModal
        craftItem={recipeCraftItem}
        currentRecipeIndex={currentRecipeIndex}
        onSelectRecipe={onSelectRecipe}
        onClose={onCloseRecipeModal}
      />
    </Stack>
  );
};
