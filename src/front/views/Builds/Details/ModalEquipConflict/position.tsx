import { Button, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import { ElectronEvents, type ElectronEventsRenderer } from "src/electron/types";
import { StackRow } from "src/front/components/Layout/StackRow";
import { ItemSlot } from "src/front/components/Wakfu/ItemSlot";
import { sendElectronEvent } from "src/front/hooks/electron";
import type { EnumWakfuEquipmentPosition } from "src/wakfu/itemTypes/types";
import { useBuildDetailsContext } from "../context";

const isBuildEquipPositionConflict = (
  response: ElectronEventsRenderer[ElectronEvents.BuildEquipItem],
): response is { itemId: number; availablePositions: EnumWakfuEquipmentPosition[] } => {
  return response !== undefined && "availablePositions" in response && Array.isArray(response.availablePositions);
};

export type TModalEquipConflictPositionProps = {
  conflict: ElectronEventsRenderer[ElectronEvents.BuildEquipItem];
  onClose: () => void;
};

export const ModalEquipConflictPosition = ({ conflict, onClose }: TModalEquipConflictPositionProps) => {
  const conflictPositions = isBuildEquipPositionConflict(conflict) ? conflict : null;
  const build = useBuildDetailsContext();

  const handleClick = (position: EnumWakfuEquipmentPosition) => {
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
        <Typography variant="subtitle2">Veuillez sélectionner l'équipement à remplacer</Typography>
        <StackRow sx={{ "&&": { gap: 2 } }}>
          {conflictPositions?.availablePositions.map((position) => (
            <ItemSlot
              key={position}
              position={position}
              item={build.stuff[position]}
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
