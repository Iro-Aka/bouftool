import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { useLayoutEffect } from "react";
import { ElectronEvents } from "src/electron/types";
import { StackRow } from "src/front/components/Layout/StackRow";
import { ItemIcon } from "src/front/components/Wakfu/ItemIcon";
import { RarityIcon } from "src/front/components/Wakfu/RarityIcon";
import { useElectronEvent } from "src/front/hooks/electron";
import type { TWakfuItemDisplay } from "src/wakfu/types/items";

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
                  <StackRow
                    key={ingredient.itemId}
                    sx={{
                      border: (theme) => `1px solid ${theme.palette.border.main}`,
                      borderTopWidth: "0px",
                      borderBottomWidth: "0px",
                      py: 0.5,
                      px: 1,
                      "&:first-of-type": {
                        borderTopWidth: "1px",
                        borderTopLeftRadius: "8px",
                        borderTopRightRadius: "8px",
                      },
                      "&:last-of-type": {
                        borderBottomWidth: "1px",
                        borderBottomLeftRadius: "8px",
                        borderBottomRightRadius: "8px",
                      },
                      "&:nth-of-type(2n+1)": { bgcolor: "surface.150" },
                      "&:nth-of-type(2n)": { bgcolor: "surface.250" },
                    }}
                  >
                    <ItemIcon width={24}>{ingredient.itemGfxId}</ItemIcon>
                    <RarityIcon width={10}>{ingredient.itemRarity}</RarityIcon>
                    <Typography variant="body2">
                      x{ingredient.quantity} {ingredient.itemLabel}
                    </Typography>
                  </StackRow>
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
