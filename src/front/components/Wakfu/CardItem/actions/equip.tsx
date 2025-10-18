import { Button } from "@mui/material";
import { ElectronEvents } from "src/electron/types";
import { ItemTypeIcon } from "src/front/components/Wakfu/ItemTypeIcon";
import { sendElectronEvent } from "src/front/hooks/electron";
import { EnumWakfuItemType } from "src/wakfu/itemTypes/types";

export type TSearchEquipmentsItemEquipProps = {
  itemId: number;
  buildId?: string;
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
      <ItemTypeIcon height={18}>{EnumWakfuItemType.Helmet}</ItemTypeIcon>
    </Button>
  );
};
