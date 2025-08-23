import { Button } from "@mui/material";
import { ElectronEvents } from "src/electron/types";
import { ItemTypeIcon } from "src/front/components/Wakfu/ItemTypeIcon";
import { sendElectronEvent } from "src/front/hooks/electron";
import { WakfuItemTypeId } from "src/wakfu/types/itemType";

export type TSearchEquipmentsItemEquipProps = {
  itemId: number;
  buildId?: number;
};

export const SearchEquipmentsItemEquip = ({ itemId, buildId }: TSearchEquipmentsItemEquipProps) => {
  if (!buildId) {
    return null;
  }
  return (
    <Button
      variant="push"
      sx={{ minWidth: 0, p: 0, aspectRatio: "1" }}
      onClick={() => sendElectronEvent(ElectronEvents.BuildEquipItem, { itemId, buildId })}
    >
      <ItemTypeIcon height={18}>{WakfuItemTypeId.Helmet}</ItemTypeIcon>
    </Button>
  );
};
