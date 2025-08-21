import { WakfuBuild } from "src/wakfu/builder/build";
import { WakfuData } from "src/wakfu/data";
import { searchItems } from "src/wakfu/search";
import { WakfuEquipmentPosition, WakfuItemTypeId } from "src/wakfu/types/itemType";
import { ElectronEvents } from "../types";
import { ElectronEventManager } from "./manager";

const manager = new ElectronEventManager();
export const registerElectronEvents = () => {
  manager.register(ElectronEvents.AppReady, async (reply) => {
    const wakfuData = await WakfuData.initialize();
    reply({
      version: wakfuData.getVersion(),
      lang: wakfuData.getLang(),
    });
  });

  manager.register(ElectronEvents.SearchItems, (reply, { filters, sort }) => {
    const results = searchItems(filters, sort);
    reply(results);
  });

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

  manager.register(ElectronEvents.CreateBuild, async (reply) => {
    const newBuild = await WakfuBuild.createBuild();
    reply({
      buildId: newBuild.getId(),
    });
  });

  manager.register(ElectronEvents.GetBuild, (reply, { buildId }) => {
    const build = WakfuBuild.getBuildById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }
    reply(build.toDisplay());
  });

  manager.register(ElectronEvents.BuildEquipItem, (reply, { buildId, itemId, position: forcedPosition }) => {
    const build = WakfuBuild.getBuildById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }
    const item = WakfuData.getInstance().getItemById(itemId);
    if (!item) {
      throw new Error(`Item with ID ${itemId} not found`);
    }
    if (forcedPosition) {
      build.equipItem(item, forcedPosition);
    } else {
      const itemType = item.getItemType();
      if (!itemType) {
        throw new Error(`Item with ID ${itemId} has no type`);
      }
      let position = itemType.equipmentPositions[0];
      if (itemType.equipmentPositions.length > 1 && build.isEquipped(position)) {
        position = itemType.equipmentPositions[1];
        if (build.isEquipped(position)) {
          reply(itemType.equipmentPositions);
          return;
        }
      }
      build.equipItem(item, position);
    }
    ElectronEventManager.send(ElectronEvents.GetBuild, build.toDisplay());
    reply(undefined);
  });

  manager.register(ElectronEvents.BuildUnequipItem, (reply, { buildId, position }) => {
    const build = WakfuBuild.getBuildById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }
    build.unequipItem(position);
    ElectronEventManager.send(ElectronEvents.GetBuild, build.toDisplay());
    reply(undefined);
  });

  manager.register(ElectronEvents.BuildSetPreferences, (reply, { buildId, preferences }) => {
    const build = WakfuBuild.getBuildById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }
    if (preferences.mastery) {
      build.setMasteryPreferences(preferences.mastery);
    }
    if (preferences.resistance) {
      build.setResistancePreferences(preferences.resistance);
    }
    ElectronEventManager.send(ElectronEvents.GetBuild, build.toDisplay());
    reply(undefined);
  });
};
