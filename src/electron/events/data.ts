import { WakfuData } from "src/wakfu/data";
import { WakfuEquipmentPosition, WakfuItemTypeId } from "src/wakfu/types/itemType";
import { ElectronEvents } from "../types";
import type { ElectronEventManager } from "./manager";

export const registerElectronDataEvents = (manager: ElectronEventManager) => {
  manager.register(ElectronEvents.GetItemById, (reply, { id }) => {
    const item = WakfuData.getInstance().getItemById(id);
    if (!item) {
      throw new Error(`Item with ID ${id} not found`);
    }
    reply(item.toDisplay());
  });

  manager.register(ElectronEvents.GetItemTypeLabels, (reply) => {
    const wakfuData = WakfuData.getInstance();
    const labels = wakfuData.getItemTypeLabels();
    const map: Record<number, string> = {};
    for (const [id, description] of labels.entries()) {
      map[id] = description[wakfuData.getLang()];
    }
    reply(map);
  });

  manager.register(ElectronEvents.GetItemTypesByEquipmentPosition, (reply, { position }) => {
    switch (position) {
      case WakfuEquipmentPosition.FirstWeapon: {
        reply([WakfuItemTypeId.OneHandedWeapon, WakfuItemTypeId.TwoHandedWeapon]);
        break;
      }
      case WakfuEquipmentPosition.SecondWeapon: {
        reply([WakfuItemTypeId.SecondHand]);
        break;
      }
      default: {
        const wakfuData = WakfuData.getInstance();
        const itemTypes = wakfuData.getItemTypesMap();
        const filteredItemTypes: number[] = [];
        for (const itemType of itemTypes.values()) {
          if (itemType.equipmentPositions.includes(position)) {
            filteredItemTypes.push(itemType.id);
          }
        }
        reply(filteredItemTypes);
      }
    }
  });
};
