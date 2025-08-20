import { WakfuBuild } from "src/wakfu/builder/build";
import { isWakfuBuildEquippedPositionStatus } from "src/wakfu/builder/types";
import { WakfuData } from "src/wakfu/data";
import { searchItems } from "src/wakfu/search";
import { WakfuEquipmentPosition } from "src/wakfu/types/itemType";
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

  manager.register(ElectronEvents.GetItemTypeLabels, (reply) => {
    const wakfuData = WakfuData.getInstance();
    const labels = wakfuData.getItemTypeLabels();
    const map: Record<number, string> = {};
    for (const [id, description] of labels.entries()) {
      map[id] = description[wakfuData.getLang()];
    }
    reply(map);
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
    const equippedItems = build.getEquippedItems();
    const getItemForDisplay = (position: WakfuEquipmentPosition) => {
      const item = equippedItems[position];
      return isWakfuBuildEquippedPositionStatus(item) ? item : item.toDisplay();
    };
    reply({
      name: build.getName(),
      breed: build.getBreed(),
      level: build.getLevel(),
      preferences: build.getPreferences(),
      items: {
        [WakfuEquipmentPosition.Head]: getItemForDisplay(WakfuEquipmentPosition.Head),
        [WakfuEquipmentPosition.Back]: getItemForDisplay(WakfuEquipmentPosition.Back),
        [WakfuEquipmentPosition.Neck]: getItemForDisplay(WakfuEquipmentPosition.Neck),
        [WakfuEquipmentPosition.Shoulders]: getItemForDisplay(WakfuEquipmentPosition.Shoulders),
        [WakfuEquipmentPosition.Chest]: getItemForDisplay(WakfuEquipmentPosition.Chest),
        [WakfuEquipmentPosition.Belt]: getItemForDisplay(WakfuEquipmentPosition.Belt),
        [WakfuEquipmentPosition.LeftHand]: getItemForDisplay(WakfuEquipmentPosition.LeftHand),
        [WakfuEquipmentPosition.RightHand]: getItemForDisplay(WakfuEquipmentPosition.RightHand),
        [WakfuEquipmentPosition.Legs]: getItemForDisplay(WakfuEquipmentPosition.Legs),
        [WakfuEquipmentPosition.FirstWeapon]: getItemForDisplay(WakfuEquipmentPosition.FirstWeapon),
        [WakfuEquipmentPosition.SecondWeapon]: getItemForDisplay(WakfuEquipmentPosition.SecondWeapon),
        [WakfuEquipmentPosition.Accessory]: getItemForDisplay(WakfuEquipmentPosition.Accessory),
        [WakfuEquipmentPosition.Pet]: getItemForDisplay(WakfuEquipmentPosition.Pet),
        [WakfuEquipmentPosition.Mount]: getItemForDisplay(WakfuEquipmentPosition.Mount),
      },
    });
  });
};
