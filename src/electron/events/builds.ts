import { WakfuBuild } from "src/wakfu/builder/build";
import { initializeStats } from "src/wakfu/builder/utils";
import { WakfuData } from "src/wakfu/data";
import type { WakfuItem } from "src/wakfu/data/item";
import { isWakfuStats, WakfuStats } from "src/wakfu/types/action";
import type { TWakfuItemDisplay } from "src/wakfu/types/items";
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

  manager.register(ElectronEvents.BuildDelete, async (reply, { buildId }) => {
    await WakfuBuild.deleteBuild(buildId);
    ElectronEventManager.send(ElectronEvents.GetAllBuilds, WakfuBuild.getBuilds());
    reply(undefined);
  });

  manager.register(ElectronEvents.GetBuild, (reply, { buildId }) => {
    const build = WakfuBuild.getBuildById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }
    reply(build.toDisplay());
  });

  manager.register(ElectronEvents.BuildSetInfo, (reply, { buildId, breed, name, level }) => {
    const build = WakfuBuild.getBuildById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }
    build.setBreed(breed);
    build.setName(name);
    build.setLevel(level);
    ElectronEventManager.send(ElectronEvents.GetBuild, build.toDisplay());
    reply(undefined);
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
          reply({ itemId: itemId, position: itemType.equipmentPositions });
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

  manager.register(ElectronEvents.BuildCompareItem, (reply, { buildId, itemId }) => {
    const build = WakfuBuild.getBuildById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }
    const targetItem = WakfuData.getInstance().getItemById(itemId);
    if (!targetItem) {
      throw new Error(`Item with ID ${itemId} not found`);
    }
    const itemType = targetItem.getItemType();
    if (!itemType) {
      throw new Error(`Item with ID ${itemId} has no type`);
    }
    const results: {
      sourceItems: TWakfuItemDisplay[];
      targetItem: TWakfuItemDisplay;
      stats: Record<WakfuStats, number>;
    }[] = [];
    for (const position of itemType.equipmentPositions) {
      const sourceItem = build.getEquippedItem(position);
      if (!sourceItem) {
        continue;
      }
      const sourceItems: WakfuItem[] = [sourceItem];
      for (const disabledPosition of itemType.equipmentDisabledPositions) {
        const disabledItem = build.getEquippedItem(disabledPosition);
        if (disabledItem) {
          sourceItems.push(disabledItem);
        }
      }
      const stats = initializeStats();
      const targetItemStats = build.getItemStats(targetItem);
      const sourceItemsStats = sourceItems.map((item) => build.getItemStats(item));
      for (const stat of Object.values(WakfuStats)) {
        if (!isWakfuStats(stat)) {
          continue;
        }
        stats[stat] = targetItemStats[stat];
        stats[stat] = Math.floor(stats[stat] - sourceItemsStats.reduce((acc, itemStats) => acc + itemStats[stat], 0));
      }
      results.push({
        sourceItems: sourceItems.map((item) => item.toDisplay()),
        targetItem: targetItem.toDisplay(),
        stats,
      });
    }
    reply(results);
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

  manager.register(ElectronEvents.BuildSetBonuses, (reply, { buildId, bonuses }) => {
    const build = WakfuBuild.getBuildById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }
    build.setBonuses(bonuses);
    ElectronEventManager.send(ElectronEvents.GetBuild, build.toDisplay());
    reply(undefined);
  });
};
