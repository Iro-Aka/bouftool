import { useCallback, useState } from "react";
import { ElectronEvents } from "src/electron/types";
import { sendElectronEvent } from "src/front/hooks/electron";
import { SearchEquipments } from "src/front/views/SearchEquipments";
import type { WakfuEquipmentPosition } from "src/wakfu/types/itemType";
import { useBuildDetailsContext } from "../context";
import { ModalEquipConflict } from "../ModalEquipConflict";

export const BuildSearchItems = () => {
  const build = useBuildDetailsContext();
  const [conflictPositions, setConflictPositions] = useState<{
    itemId: number;
    position: WakfuEquipmentPosition[];
  } | null>(null);

  const equipItem = useCallback(
    async (itemId: number) => {
      const response = await sendElectronEvent(ElectronEvents.BuildEquipItem, { buildId: build.id, itemId });
      if (response) {
        setConflictPositions({ itemId, position: response });
      }
    },
    [build.id],
  );

  return (
    <>
      <SearchEquipments onEquipItem={equipItem} controlled />
      <ModalEquipConflict conflictPositions={conflictPositions} onClose={() => setConflictPositions(null)} />
    </>
  );
};
