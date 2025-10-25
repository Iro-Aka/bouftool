import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Tooltip, Typography } from "@mui/material";
import { useCallback, useLayoutEffect } from "react";
import { ElectronEvents } from "src/electron/types";
import { StackRow } from "src/front/components/Layout/StackRow";
import { ItemIcon } from "src/front/components/Wakfu/ItemIcon";
import { RarityIcon } from "src/front/components/Wakfu/RarityIcon";
import { useElectronEvent } from "src/front/hooks/electron";
import type { WakfuItem } from "src/wakfu/items";
import { RecipeIngredient } from "./Ingredient";

export type TModalItemRecipeProps = {
  open: boolean;
  item: Pick<ReturnType<WakfuItem["toObject"]>, "id" | "gfxId" | "rarity" | "title"> | null;
  onClose: () => void;
};

export const ModalItemRecipe = ({ open, item, onClose }: TModalItemRecipeProps) => {
  const [send, recipes] = useElectronEvent(ElectronEvents.GetItemRecipes);
  const [addToCraft] = useElectronEvent(ElectronEvents.CraftManagerAddItem);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Never deps on send
  useLayoutEffect(() => {
    if (item) {
      send({ itemId: item.id });
    }
  }, [item]);

  const onAddToCraft = useCallback(() => {
    if (item) {
      addToCraft({ itemId: item.id });
      onClose();
    }
  }, [item, addToCraft, onClose]);

  if (!item || !recipes) {
    return null;
  }
  return (
    <Dialog open={open} onClose={onClose} slotProps={{ paper: { sx: { minWidth: 450 } } }}>
      <DialogTitle variant="subtitle2">
        <StackRow sx={{ bgcolor: "surface.100", px: 1, borderRadius: "8px", py: 0.5, justifyContent: "space-between" }}>
          <StackRow>
            <ItemIcon width={40}>{item.gfxId}</ItemIcon>
            <RarityIcon width={12}>{item.rarity}</RarityIcon>
            {item.title.fr}
          </StackRow>
          <Tooltip title="Ajouter au planificateur de craft" placement="top">
            <Button
              sx={{
                minWidth: 0,
                p: 1,
                bgcolor: "surface.150",
                "&:hover": { bgcolor: "surface.250" },
              }}
              onClick={onAddToCraft}
            >
              Crafter <img height={22} style={{ paddingLeft: 4 }} src={`wakfu/RecipeIcon.png`} alt="Recipe Icon" />
            </Button>
          </Tooltip>
        </StackRow>
      </DialogTitle>
      <DialogContent>
        <Stack sx={{ gap: 1.5 }}>
          {recipes.map((recipe) => (
            <Stack key={recipe.id} sx={{ bgcolor: "surface.100", p: 1.5, borderRadius: "8px", gap: 1 }}>
              <StackRow sx={{ justifyContent: "space-between" }}>
                <Typography variant="subtitle2">{recipe.recipeCategory.title.fr}</Typography>
                <Typography variant="subtitle2">Niv. {recipe.level}</Typography>
              </StackRow>
              <Stack>
                {recipe.ingredients.map((ingredient) => (
                  <RecipeIngredient key={ingredient.item.id} ingredient={ingredient} />
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
