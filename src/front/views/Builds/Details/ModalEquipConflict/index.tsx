import { Button, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import { ElectronEvents } from "src/electron/types";
import { StackRow } from "src/front/components/Layout/StackRow";
import { ItemSlot } from "src/front/components/Wakfu/ItemSlot";
import { sendElectronEvent } from "src/front/hooks/electron";
import type { WakfuEquipmentPosition } from "src/wakfu/types/itemType";
import { useBuildDetailsContext } from "../context";

export type TModalEquipConflictProps = {
  conflictPositions: { itemId: number; position: WakfuEquipmentPosition[] } | null;
  onClose: () => void;
};

export const ModalEquipConflict = ({ conflictPositions, onClose }: TModalEquipConflictProps) => {
  const build = useBuildDetailsContext();

  const handleClick = (position: WakfuEquipmentPosition) => {
    if (!conflictPositions) {
      return;
    }
    sendElectronEvent(ElectronEvents.BuildEquipItem, {
      buildId: build.id,
      itemId: conflictPositions?.itemId,
      position,
    });
    onClose();
  };

  return (
    <Dialog open={!!conflictPositions} onClose={onClose}>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
        <Typography variant="body2">Veuillez sélectionner l'équipement à remplacer</Typography>
        <StackRow sx={{ "&&": { gap: 2 } }}>
          {conflictPositions?.position.map((position) => (
            <ItemSlot
              key={position}
              position={position}
              item={build.items[position]}
              size={48}
              onClick={() => handleClick(position)}
            />
          ))}
        </StackRow>
      </DialogContent>
      <DialogActions>
        <Button variant="push" onClick={onClose}>
          Annuler
        </Button>
      </DialogActions>
    </Dialog>
  );
};
