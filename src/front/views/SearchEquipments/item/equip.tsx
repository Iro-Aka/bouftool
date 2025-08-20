import { Button } from "@mui/material";
import { ElectronEvents } from "src/electron/types";
import { ItemTypeIcon } from "src/front/components/Wakfu/ItemTypeIcon";
import { useElectronEvent } from "src/front/hooks/electron";
import { WakfuItemTypeId } from "src/wakfu/types/itemType";

export type TSearchEquipmentsItemEquipProps = {
  buildId?: number;
  itemId: number;
};

export const SearchEquipmentsItemEquip = ({ buildId, itemId }: TSearchEquipmentsItemEquipProps) => {
  const [equip] = useElectronEvent(ElectronEvents.BuildEquipItem);

  if (!buildId) {
    return null;
  }
  return (
    <Button variant="push" sx={{ minWidth: 0, p: 0, aspectRatio: "1" }} onClick={() => equip({ buildId, itemId })}>
      <ItemTypeIcon height={18}>{WakfuItemTypeId.Helmet}</ItemTypeIcon>
    </Button>
  );
};
