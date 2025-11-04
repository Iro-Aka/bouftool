import { WakfuBuild } from "src/wakfu/builds/build";
import { WakfuCharacter } from "src/wakfu/builds/character";
import type { WakfuItem } from "src/wakfu/items";
import { type EnumWakfuEquipmentPosition, isWakfuEquipmentPosition } from "src/wakfu/itemTypes/types";
import { WakfuStats } from "src/wakfu/stats";
import { WakfuStore } from "src/wakfu/store";
import { lauchOptimization } from "../../../wakfu/optimization/optimizationLauncher";
import { ElectronEvents } from "../../types";
import { ElectronEventManager } from "../manager";
import { registerElectronBuildsEquipEvents } from "./equip";

export const registerElectronBuildsEvents = (manager: ElectronEventManager) => {
  registerElectronBuildsEquipEvents(manager);

  manager.register(ElectronEvents.BuildCreateCharacter, async (reply, { name, breed }) => {
    const character = await WakfuCharacter.create(name, breed);
    ElectronEventManager.send(ElectronEvents.GetAllBuilds, WakfuCharacter.getCharactersToDisplay());
    reply({ characterId: character.getId() });
  });

  manager.register(ElectronEvents.BuildEditCharacter, (reply, { characterId, name, breed }) => {
    const character = WakfuCharacter.getById(characterId);
    if (character === null) {
      throw new Error(`Character with ID ${characterId} not found`);
    }
    character.setName(name);
    character.setBreed(breed);
    ElectronEventManager.send(ElectronEvents.GetAllBuilds, WakfuCharacter.getCharactersToDisplay());
    reply(undefined);
  });

  manager.register(ElectronEvents.GetAllBuilds, async (reply) => {
    await WakfuCharacter.loadCharacters();
    const characters = WakfuCharacter.getCharactersToDisplay();
    reply(characters);
  });

  manager.register(ElectronEvents.BuildCreate, async (reply, { characterId }) => {
    const character = WakfuCharacter.getById(characterId);
    if (character === null) {
      throw new Error(`Character with ID ${characterId} not found`);
    }
    const newBuild = await WakfuBuild.create(character, "", 245);
    reply({
      buildId: newBuild.getId(),
    });
  });

  manager.register(ElectronEvents.BuildDelete, (reply, { characterId, buildId }) => {
    const character = WakfuCharacter.getById(characterId);
    if (character === null) {
      throw new Error(`Character with ID ${characterId} not found`);
    }
    character.deleteBuild(buildId);
    ElectronEventManager.send(ElectronEvents.GetAllBuilds, WakfuCharacter.getCharactersToDisplay());
    reply(undefined);
  });

  manager.register(ElectronEvents.GetBuild, (reply, { buildId }) => {
    const build = WakfuBuild.getById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }
    reply(build.toDisplay());
  });

  manager.register(ElectronEvents.BuildSetInfo, (reply, { buildId, name, level }) => {
    const build = WakfuBuild.getById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }
    build.setName(name);
    build.setLevel(level);
    ElectronEventManager.send(ElectronEvents.GetBuild, build.toDisplay());
    reply(undefined);
  });

  manager.register(ElectronEvents.BuildUnequipItem, (reply, { buildId, position }) => {
    const build = WakfuBuild.getById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }
    build.unequipItem(position);
    ElectronEventManager.send(ElectronEvents.GetBuild, build.toDisplay());
    reply(undefined);
  });

  manager.register(ElectronEvents.BuildCompareItem, (reply, { buildId, itemId }) => {
    const build = WakfuBuild.getById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }
    const elementalPreferences = build.getElementalPreferences();
    const targetItem = WakfuStore.getInstance().getItemById(itemId);
    if (!targetItem) {
      throw new Error(`Item with ID ${itemId} not found`);
    }
    const itemType = targetItem.getItemType();
    const results: {
      sourceItems: (ReturnType<WakfuItem["toObject"]> | EnumWakfuEquipmentPosition)[];
      targetItem: ReturnType<WakfuItem["toObject"]>;
      stats: ReturnType<WakfuStats["toObject"]>;
    }[] = [];
    for (const position of itemType.getEquipmentPositions()) {
      const equippedItem = build.getEquippedItem(position);
      const sourceItems: (WakfuItem | EnumWakfuEquipmentPosition)[] = [equippedItem ?? position];
      for (const disablingItem of build.getItemsDisablingPosition(position)) {
        if (disablingItem) {
          sourceItems.push(disablingItem);
        }
      }
      for (const disabledPosition of itemType.getEquipmentDisabledPositions()) {
        const disabledItem = build.getEquippedItem(disabledPosition);
        if (disabledItem) {
          sourceItems.push(disabledItem);
        }
      }
      const targetItemStats = targetItem.getStats().toApplyEffects().applyElementalPreferences(elementalPreferences);
      const sourceItemsStats = sourceItems.map((item) =>
        isWakfuEquipmentPosition(item)
          ? new WakfuStats()
          : item.getStats().toApplyEffects().applyElementalPreferences(elementalPreferences),
      );
      const delta = targetItemStats.compare(sourceItemsStats);
      results.push({
        sourceItems: sourceItems.map((item) => (isWakfuEquipmentPosition(item) ? item : item.toObject())),
        targetItem: targetItem.toObject(),
        stats: delta.toObject(),
      });
    }
    reply(results);
  });

  manager.register(ElectronEvents.BuildSetPreferences, (reply, { buildId, preferences }) => {
    const build = WakfuBuild.getById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }
    build.setElementalPreferences(preferences);
    ElectronEventManager.send(ElectronEvents.GetBuild, build.toDisplay());
    reply(undefined);
  });

  manager.register(ElectronEvents.BuildAddAbilityLevel, (reply, { buildId, ability, level }) => {
    const build = WakfuBuild.getById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }
    build.addAbilityLevel(ability, level);
    ElectronEventManager.send(ElectronEvents.GetBuild, build.toDisplay());
    reply(undefined);
  });

  manager.register(ElectronEvents.BuildRemoveAbilityLevel, (reply, { buildId, ability, level }) => {
    const build = WakfuBuild.getById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }
    build.removeAbilityLevel(ability, level);
    ElectronEventManager.send(ElectronEvents.GetBuild, build.toDisplay());
    reply(undefined);
  });

  manager.register(ElectronEvents.BuildSetBonuses, (reply, { buildId, bonuses }) => {
    const build = WakfuBuild.getById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }
    build.setBonuses(bonuses);
    ElectronEventManager.send(ElectronEvents.GetBuild, build.toDisplay());
    reply(undefined);
  });

  manager.register(
    ElectronEvents.BuildAssignEnchantment,
    (reply, { buildId, enchantmentId, enchantmentLevel, equipmentPosition, slotPosition, anyColor }) => {
      const build = WakfuBuild.getById(buildId);
      if (!build) {
        throw new Error(`Build with ID ${buildId} not found`);
      }
      build.assignEnchantment(equipmentPosition, slotPosition, enchantmentId, enchantmentLevel, anyColor);
      ElectronEventManager.send(ElectronEvents.GetBuild, build.toDisplay());
      reply(undefined);
    },
  );

  manager.register(ElectronEvents.BuildAssignSublimation, (reply, { buildId, sublimationId, equipmentPosition }) => {
    const build = WakfuBuild.getById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }
    build.assignSublimation(equipmentPosition, sublimationId);
    ElectronEventManager.send(ElectronEvents.GetBuild, build.toDisplay());
    reply(undefined);
  });

  manager.register(ElectronEvents.BuildAssignUniqueSublimation, (reply, { buildId, sublimationId }) => {
    const build = WakfuBuild.getById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }
    build.assignUniqueSublimation(sublimationId);
    ElectronEventManager.send(ElectronEvents.GetBuild, build.toDisplay());
    reply(undefined);
  });

  manager.register(ElectronEvents.BuildUnassignUniqueSublimation, (reply, { buildId, rarity }) => {
    const build = WakfuBuild.getById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }
    build.unassignUniqueSublimation(rarity);
    ElectronEventManager.send(ElectronEvents.GetBuild, build.toDisplay());
    reply(undefined);
  });

  manager.register(ElectronEvents.BuildSerialize, (reply, { buildId }) => {
    const build = WakfuBuild.getById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }

    const serializedBuild = build.serializeToBase64();
    reply({ serializedBuild });
  });

  manager.register(ElectronEvents.BuildDeserialize, async (reply, { characterId, serializedBuild }) => {
    const character = WakfuCharacter.getById(characterId);
    if (!character) {
      throw new Error(`Character with ID ${characterId} not found`);
    }
    const build = await WakfuBuild.deserializeFromBase64(character, serializedBuild);
    reply({ buildId: build.getId() });
  });

  manager.register(ElectronEvents.BuildOptimize, (reply, { buildId, config }) => {
    const build = WakfuBuild.getById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }

    reply(undefined);

    lauchOptimization(build, config);
  });
};
