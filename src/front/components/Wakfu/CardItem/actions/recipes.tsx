import { Button } from "@mui/material";
import { useModalItemRecipeContext } from "src/front/views/SearchEquipments/ModalItemRecipe/context";
import type { WakfuItem } from "src/wakfu/items";

export type TSearchItemsRecipesProps = {
  item: ReturnType<WakfuItem["toObject"]>;
};

export const SearchItemsRecipes = ({ item }: TSearchItemsRecipesProps) => {
  const openModalRecipe = useModalItemRecipeContext();

  return (
    <Button
      variant="push"
      sx={{ minWidth: 0, p: 0, aspectRatio: "1" }}
      onClick={() => openModalRecipe(item)}
      disabled={item.recipes.length === 0}
    >
      <img height={18} src={`wakfu/RecipeIcon.png`} alt="Recipe Icon" />
    </Button>
  );
};
