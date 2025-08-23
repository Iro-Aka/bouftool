import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { useLayoutEffect } from "react";
import { ElectronEvents } from "src/electron/types";
import { StackRow } from "src/front/components/Layout/StackRow";
import { ItemIcon } from "src/front/components/Wakfu/ItemIcon";
import { RarityIcon } from "src/front/components/Wakfu/RarityIcon";
import { useElectronEvent } from "src/front/hooks/electron";
import type { TWakfuItemDisplay } from "src/wakfu/types/items";
import { RecipeIngredient } from "./Ingredient";

export type TModalItemRecipeProps = {
  open: boolean;
  item: TWakfuItemDisplay | null;
  onClose: () => void;
};

export const ModalItemRecipe = ({ open, item, onClose }: TModalItemRecipeProps) => {
  const [send, recipes] = useElectronEvent(ElectronEvents.GetItemRecipes);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Never deps on send
  useLayoutEffect(() => {
    if (item) {
      send({ itemId: item.id });
    }
  }, [item]);

  if (!item || !recipes) {
    return null;
  }
  return (
    <Dialog open={open} onClose={onClose} slotProps={{ paper: { sx: { minWidth: 450 } } }}>
      <DialogTitle variant="subtitle2">
        <StackRow sx={{ bgcolor: "surface.100", px: 1, borderRadius: "8px", py: 0.5 }}>
          <ItemIcon width={40}>{item.gfxId}</ItemIcon>
          <RarityIcon width={12}>{item.rarity}</RarityIcon>
          {item.title}
        </StackRow>
      </DialogTitle>
      <DialogContent>
        <Stack sx={{ gap: 1.5 }}>
          {recipes.map((recipe) => (
            <Stack key={recipe.id} sx={{ bgcolor: "surface.100", p: 1.5, borderRadius: "8px", gap: 1 }}>
              <StackRow sx={{ justifyContent: "space-between" }}>
                <Typography variant="subtitle2">{recipe.recipeCategoryLabel}</Typography>
                <Typography variant="subtitle2">Niv. {recipe.level}</Typography>
              </StackRow>
              <Stack>
                {recipe.ingredients.map((ingredient) => (
                  <RecipeIngredient key={ingredient.itemId} ingredient={ingredient} />
                ))}
              </Stack>
            </Stack>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="push" onClick={onClose}>
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};
