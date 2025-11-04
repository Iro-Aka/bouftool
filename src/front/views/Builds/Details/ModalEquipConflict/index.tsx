import { useEffect, useState } from "react";
import { ElectronEvents, type ElectronEventsRenderer } from "src/electron/types";
import { useElectronEvent } from "src/front/hooks/electron";
import { ModalEquipConflictDisabled } from "./disabled";
import { ModalEquipConflictPosition } from "./position";

export const ModalEquipConflict = () => {
  const [, conflicts] = useElectronEvent(ElectronEvents.BuildEquipItem, true);
  const [queuedConflicts, setQueuedConflicts] = useState<ElectronEventsRenderer[ElectronEvents.BuildEquipItem][]>([]);

  const handleClose = () => {
    setQueuedConflicts((prev) => prev.toSpliced(0, 1));
  };

  useEffect(() => {
    if (conflicts) {
      setQueuedConflicts((prev) => [...prev, conflicts]);
    }
  }, [conflicts]);

  return (
    <>
      <ModalEquipConflictPosition conflict={queuedConflicts[0]} onClose={handleClose} />
      <ModalEquipConflictDisabled conflict={queuedConflicts[0]} onClose={handleClose} />
    </>
  );
};
