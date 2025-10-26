import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button } from "@mui/material";
import { ItemIcon } from "src/front/components/Wakfu/ItemIcon";
import type { TCraftItem } from "src/wakfu/craftManager/types";
import { StackRow } from "../../../components/Layout/StackRow";

export type ItemActionsProps = {
  isFirst: boolean;
  craftItem: TCraftItem;
  onRemove: () => void;
  onQuantityChange: (quantity: number) => void;
  onMarkAsCrafted: () => void;
  onUnmarkAsCrafted: () => void;
  openSelectRecipeModal?: () => void;
};

export const ItemActions = ({
  isFirst,
  craftItem,
  onRemove,
  onQuantityChange,
  onMarkAsCrafted,
  onUnmarkAsCrafted,
  openSelectRecipeModal,
}: ItemActionsProps) => {
  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuantityChange(craftItem.quantity + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuantityChange(craftItem.quantity - 1);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove();
  };

  const handleMarkAsCrafted = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMarkAsCrafted();
  };

  const handleUnmarkAsCrafted = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUnmarkAsCrafted();
  };

  const handleOpenSelectRecipeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (openSelectRecipeModal) {
      openSelectRecipeModal();
    }
  };

  const hasMultipleRecipes = craftItem.item.recipes.length > 1;
  const hasRecipes = craftItem.item.recipes.length > 0;
  const isCrafted = craftItem.item.isCrafted;

  return (
    <StackRow>
      {isFirst && (
        <>
          <Button variant="push" sx={{ minWidth: 0, p: 0.5, aspectRatio: "1" }} onClick={handleIncrement}>
            <AddIcon fontSize="small" />
          </Button>
          <Button variant="push" sx={{ minWidth: 0, p: 0.5, aspectRatio: "1" }} onClick={handleDecrement}>
            <RemoveIcon fontSize="small" />
          </Button>
          <Button variant="push" sx={{ minWidth: 0, p: 0.5, aspectRatio: "1" }} onClick={handleRemove}>
            <DeleteIcon fontSize="small" color="error" />
          </Button>
        </>
      )}
      {hasMultipleRecipes && openSelectRecipeModal && (
        <Button variant="push" sx={{ minWidth: 0, p: 0.5, aspectRatio: "1" }} onClick={handleOpenSelectRecipeModal}>
          <ItemIcon width={20}>{71919808}</ItemIcon>
        </Button>
      )}
      {!isFirst &&
        (isCrafted ? (
          <Button variant="push" sx={{ minWidth: 0, p: 0.5, aspectRatio: "1" }} onClick={handleUnmarkAsCrafted}>
            {hasRecipes ? (
              <img height={20} src="wakfu/RecipeIcon.png" alt="Recipe Icon" />
            ) : (
              <CheckIcon fontSize="small" color="success" />
            )}
          </Button>
        ) : (
          <Button variant="push" sx={{ minWidth: 0, p: 0.5, aspectRatio: "1" }} onClick={handleMarkAsCrafted}>
            {hasRecipes ? (
              <img height={20} src="wakfu/RecipeIcon.png" alt="Recipe Icon" style={{ filter: "grayscale(1)" }} />
            ) : (
              <CheckIcon fontSize="small" color="disabled" />
            )}
          </Button>
        ))}
    </StackRow>
  );
};
