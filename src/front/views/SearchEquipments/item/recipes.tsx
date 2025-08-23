import { Button } from "@mui/material";
import type { TWakfuItemDisplay } from "src/wakfu/types/items";
import { useModalItemRecipeContext } from "../ModalItemRecipe/context";

export type TSearchItemsRecipesProps = {
  item: TWakfuItemDisplay;
  recipes: number[];
};

export const SearchItemsRecipes = ({ item, recipes }: TSearchItemsRecipesProps) => {
  const openModalRecipe = useModalItemRecipeContext();

  return (
    <Button
      variant="push"
      sx={{ minWidth: 0, p: 0, aspectRatio: "1" }}
      onClick={() => openModalRecipe(item)}
      disabled={recipes.length === 0}
    >
      <img height={18} src={`wakfu/RecipeIcon.png`} alt="Recipe Icon" />
    </Button>
  );
};
