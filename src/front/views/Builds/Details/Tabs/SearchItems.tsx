import { useLayoutEffect, useState } from "react";
import { ElectronEvents } from "src/electron/types";
import { useElectronEvent } from "src/front/hooks/electron";
import { SearchEquipments } from "src/front/views/SearchEquipments";
import type { EnumWakfuEquipmentPosition } from "src/wakfu/itemTypes/types";
import { useBuildDetailsContext } from "../context";
import { ModalEquipConflict } from "../ModalEquipConflict";

export const BuildSearchItems = () => {
  const build = useBuildDetailsContext();
  const [, equipResponse] = useElectronEvent(ElectronEvents.BuildEquipItem, true);
  const [conflictPositions, setConflictPositions] = useState<{
    itemId: number;
    position: EnumWakfuEquipmentPosition[];
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
