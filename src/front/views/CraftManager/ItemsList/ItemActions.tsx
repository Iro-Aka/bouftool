import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button } from "@mui/material";
import type { TCraftItem } from "src/wakfu/craftManager/types";
import { StackRow } from "../../../components/Layout/StackRow";

export const ItemActions = (
  first: boolean,
  craftItem: TCraftItem,
  removeItem: () => void,
  setItemQuantity: (quantity: number) => void,
  markIngredientAsCrafted: () => void,
  unmarkIngredientAsCrafted: () => void,
) => (
  <StackRow>
    {first && (
      <>
        <Button
          variant="push"
          sx={{ minWidth: 0, p: 0.5, aspectRatio: "1" }}
          onClick={(e) => {
            e.stopPropagation();
            setItemQuantity(craftItem.quantity + 1);
          }}
        >
          <AddIcon fontSize="small" />
        </Button>
        <Button
          variant="push"
          sx={{ minWidth: 0, p: 0.5, aspectRatio: "1" }}
          onClick={(e) => {
            e.stopPropagation();
            setItemQuantity(craftItem.quantity - 1);
          }}
        >
          <RemoveIcon fontSize="small" />
        </Button>
        <Button
          variant="push"
          sx={{ minWidth: 0, p: 0.5, aspectRatio: "1" }}
          onClick={(e) => {
            e.stopPropagation();
            removeItem();
          }}
        >
          <DeleteIcon fontSize="small" color="error" />
        </Button>
      </>
    )}
    {!first &&
      (craftItem.item.isCrafted ? (
        <Button
          variant="push"
          sx={{ minWidth: 0, p: 0.5, aspectRatio: "1" }}
          onClick={(e) => {
            e.stopPropagation();
            unmarkIngredientAsCrafted();
          }}
        >
          {craftItem.item.recipes.length === 0 ? (
            <CheckIcon fontSize="small" color="success" />
          ) : (
            <img height={20} src={`wakfu/RecipeIcon.png`} alt="Recipe Icon" />
          )}
        </Button>
      ) : (
        <Button
          variant="push"
          sx={{ minWidth: 0, p: 0.5, aspectRatio: "1" }}
          onClick={(e) => {
            e.stopPropagation();
            markIngredientAsCrafted();
          }}
        >
          {craftItem.item.recipes.length === 0 ? (
            <CheckIcon fontSize="small" color="disabled" />
          ) : (
            <img height={20} src={`wakfu/RecipeIcon.png`} alt="Recipe Icon" style={{ filter: "grayscale(1)" }} />
          )}
        </Button>
      ))}
  </StackRow>
);
