import { Button, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import { ElectronEvents, type ElectronEventsRenderer } from "src/electron/types";
import { StackRow } from "src/front/components/Layout/StackRow";
import { ItemSlot } from "src/front/components/Wakfu/ItemSlot";
import { sendElectronEvent } from "src/front/hooks/electron";
import type { WakfuItem } from "src/wakfu/items";
import type { EnumWakfuEquipmentPosition } from "src/wakfu/itemTypes/types";
import { useBuildDetailsContext } from "../context";

const isBuildEquipDisabledConflict = (
  response: ElectronEventsRenderer[ElectronEvents.BuildEquipItem],
): response is {
  itemId: number;
  disablingItems: ReturnType<WakfuItem["toObject"]>[];
  position: EnumWakfuEquipmentPosition;
} => {
  return response !== undefined && "disablingItems" in response && Array.isArray(response.disablingItems);
};

export type TModalEquipConflictDisabledProps = {
  conflict: ElectronEventsRenderer[ElectronEvents.BuildEquipItem];
  onClose: () => void;
};

export const ModalEquipConflictDisabled = ({ conflict, onClose }: TModalEquipConflictDisabledProps) => {
  const conflictDisabled = isBuildEquipDisabledConflict(conflict) ? conflict : null;
  const build = useBuildDetailsContext();

  const handleClick = async () => {
    if (!conflictDisabled) {
      return;
    }
    for (const item of conflictDisabled.disablingItems) {
      await sendElectronEvent(ElectronEvents.BuildUnequipItem, {
        buildId: build.id,
        position: item.itemType.equipmentPositions[0],
      });
    }
    sendElectronEvent(ElectronEvents.BuildEquipItem, {
      buildId: build.id,
      itemId: conflictDisabled.itemId,
      position: conflictDisabled.position,
    });
    onClose();
  };

  return (
    <Dialog open={!!conflictDisabled} onClose={onClose}>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
        <Typography variant="subtitle2">
          Ces équipements vous empêchent de porter cet objet.
          <br />
          Voulez-vous les déséquiper ?
        </Typography>
        <StackRow sx={{ "&&": { gap: 2 } }}>
          {conflictDisabled?.disablingItems.map((item) => (
            <ItemSlot key={item.id} position={conflictDisabled.position} item={{ item, disabled: false }} size={48} />
          ))}
        </StackRow>
      </DialogContent>
      <DialogActions>
        <Button variant="push" onClick={onClose}>
          Annuler
        </Button>
        <Button variant="push" color="primary" onClick={handleClick}>
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
};
