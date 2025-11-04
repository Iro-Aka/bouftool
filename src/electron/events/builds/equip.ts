import { ElectronEvents } from "src/electron/types";
import { WakfuBuild } from "src/wakfu/builds/build";
import type { EnumWakfuEquipmentPosition } from "src/wakfu/itemTypes/types";
import { WakfuStore } from "src/wakfu/store";
import { ElectronEventManager } from "../manager";

export const registerElectronBuildsEquipEvents = (manager: ElectronEventManager) => {
  manager.register(ElectronEvents.BuildEquipItem, (reply, { buildId, itemId, position }) => {
    const build = WakfuBuild.getById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }
    const item = WakfuStore.getInstance().getItemById(itemId);
    if (!item) {
      throw new Error(`Item with ID ${itemId} not found`);
    }
    let equipPosition: EnumWakfuEquipmentPosition | null = position ?? null;
    if (equipPosition === null) {
      const availablePositions = item.getItemType().getEquipmentPositions();
      for (const pos of availablePositions) {
        if (availablePositions.length === 1 || !build.isEquipped(pos)) {
          equipPosition = pos;
          break;
        }
      }
      if (equipPosition === null) {
        reply({ itemId: itemId, availablePositions });
        return;
      }
    }
    const disablingItems = build.getItemsDisablingPosition(equipPosition);
    if (disablingItems.length > 0) {
      reply({ itemId: itemId, disablingItems: disablingItems.map((item) => item.toObject()), position: equipPosition });
      return;
    }
    build.equipItem(equipPosition, item);
    ElectronEventManager.send(ElectronEvents.GetBuild, build.toDisplay());
    reply(undefined);
  });
};
