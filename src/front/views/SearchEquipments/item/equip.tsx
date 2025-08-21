import { Button } from "@mui/material";
import { ItemTypeIcon } from "src/front/components/Wakfu/ItemTypeIcon";
import { WakfuItemTypeId } from "src/wakfu/types/itemType";

export type TSearchEquipmentsItemEquipProps = {
  itemId: number;
  onEquipItem?: (itemId: number) => void;
};

export const SearchEquipmentsItemEquip = ({ itemId, onEquipItem }: TSearchEquipmentsItemEquipProps) => {
  if (!onEquipItem) {
    return null;
  }
  return (
    <Button variant="push" sx={{ minWidth: 0, p: 0, aspectRatio: "1" }} onClick={() => onEquipItem(itemId)}>
      <ItemTypeIcon height={18}>{WakfuItemTypeId.Helmet}</ItemTypeIcon>
    </Button>
  );
};
