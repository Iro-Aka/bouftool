import { useLayoutEffect, useState } from "react";
import { ElectronEvents } from "src/electron/types";
import { useElectronEvent } from "src/front/hooks/electron";
import { SearchEquipments } from "src/front/views/SearchEquipments";
import type { WakfuEquipmentPosition } from "src/wakfu/types/itemType";
import { useBuildDetailsContext } from "../context";
import { ModalEquipConflict } from "../ModalEquipConflict";

export const BuildSearchItems = () => {
  const build = useBuildDetailsContext();
  const [, equipResponse] = useElectronEvent(ElectronEvents.BuildEquipItem);
  const [conflictPositions, setConflictPositions] = useState<{
    itemId: number;
    position: WakfuEquipmentPosition[];
  } | null>(null);

  useLayoutEffect(() => {
    if (equipResponse) {
      setConflictPositions({ itemId: equipResponse.itemId, position: equipResponse.position });
    }
  }, [equipResponse]);

  return (
    <>
      <SearchEquipments buildId={build.id} controlled />
      <ModalEquipConflict conflictPositions={conflictPositions} onClose={() => setConflictPositions(null)} />
    </>
  );
};
