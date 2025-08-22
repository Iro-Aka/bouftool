import { WakfuBuild } from "src/wakfu/builder/build";
import { WakfuData } from "src/wakfu/data";
import { ElectronEvents } from "../types";
import { ElectronEventManager } from "./manager";

export const registerElectronBuildsEvents = (manager: ElectronEventManager) => {
  manager.register(ElectronEvents.GetAllBuilds, async (reply) => {
    await WakfuBuild.loadBuilds();
    const builds = WakfuBuild.getBuilds();
    reply(builds);
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

  manager.register(ElectronEvents.BuildAddAbilityLevel, (reply, { buildId, ability, level }) => {
    const build = WakfuBuild.getBuildById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }
    build.addAbilityLevel(ability, level);
    ElectronEventManager.send(ElectronEvents.GetBuild, build.toDisplay());
    reply(undefined);
  });

  manager.register(ElectronEvents.BuildRemoveAbilityLevel, (reply, { buildId, ability, level }) => {
    const build = WakfuBuild.getBuildById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }
    build.removeAbilityLevel(ability, level);
    ElectronEventManager.send(ElectronEvents.GetBuild, build.toDisplay());
    reply(undefined);
  });
};
