import { ButtonBase } from "@mui/material";
import { ElectronEvents } from "src/electron/types";
import { sendElectronEvent } from "src/front/hooks/electron";

export type TRecipeIngredientEncyclopediaProps = {
  itemId: number;
  itemTypeId: number;
};

export const RecipeIngredientEncyclopedia = ({ itemId, itemTypeId }: TRecipeIngredientEncyclopediaProps) => {
  const handleClick = () => {
    sendElectronEvent(ElectronEvents.OpenWebEncyclopedia, { itemTypeId, itemId });
  };

  return (
    <ButtonBase onClick={handleClick} sx={{ borderRadius: "50%", p: 0.25, "&:hover": { bgcolor: "action.hover" } }}>
      <img height={18} src={`wakfu/EncyclopediaIcon.png`} alt="Encyclopedia Icon" />
    </ButtonBase>
  );
};
