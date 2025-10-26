import { EnumWakfuEquipmentPosition, EnumWakfuItemType } from "src/wakfu/itemTypes/types";
import { WakfuStore } from "src/wakfu/store";
import { ElectronEvents } from "../types";
import type { ElectronEventManager } from "./manager";

export const registerElectronDataEvents = (manager: ElectronEventManager) => {
  manager.register(ElectronEvents.GetItemById, (reply, { id }) => {
    const item = WakfuStore.getInstance().getItemById(id);
    if (!item) {
      throw new Error(`Item with ID ${id} not found`);
    }
    reply(item.toObject());
  });

  manager.register(ElectronEvents.GetItemTypesByEquipmentPosition, (reply, { position }) => {
    switch (position) {
      case EnumWakfuEquipmentPosition.FirstWeapon: {
        reply([EnumWakfuItemType.OneHandedWeapon, EnumWakfuItemType.TwoHandedWeapon]);
        break;
      }
      case EnumWakfuEquipmentPosition.SecondWeapon: {
        reply([EnumWakfuItemType.SecondHand]);
        break;
      }
      default: {
        const wakfuData = WakfuStore.getInstance();
        const itemTypes = wakfuData.getItemTypes(
          (itemType) => itemType.isPositionEnabled(position),
          null,
          (itemType) => itemType.getId(),
        );
        reply(itemTypes);
      }
    }
  });

  manager.register(ElectronEvents.GetItemRecipes, (reply, { itemId }) => {
    const store = WakfuStore.getInstance();
    const item = store.getItemById(itemId);
    if (!item) {
      throw new Error(`Item with ID ${itemId} not found`);
    }
    reply(item.getRecipes().map((recipe) => recipe.toObject()));
  });

  manager.register(ElectronEvents.GetEnchantments, (reply) => {
    const store = WakfuStore.getInstance();
    const shardLevelingCurve = store.getEnchantmentShardLevelingCurve();
    const shardLevelRequirement = store.getEnchantmentShardLevelRequirement();
    reply({
      shardLevelingCurve: shardLevelingCurve,
      shardLevelRequirement: shardLevelRequirement,
      enchantments: store.getEnchantments(
        null,
        (a, b) => a.getColor() - b.getColor(),
        (enchantment) => ({
          id: enchantment.getId(),
          color: enchantment.getColor(),
          label: enchantment.getLabel(),
          doubleBonusPositions: Array.from(enchantment.getDoubleBonusPositions()),
          effects: shardLevelRequirement.map((_, index) => enchantment.getEffectValue(index + 1)),
        }),
      ),
      sublimations: store.getSublimations(
        null,
        (a, b) => {
          const diff = a.getEffectId() - b.getEffectId();
          if (diff !== 0) {
            return diff;
          }
          return a.getName().fr.localeCompare(b.getName().fr);
        },
        (sublimation) => ({
          id: sublimation.getId(),
          name: sublimation.getName(),
          level: sublimation.getLevel(),
          maxLevel: sublimation.getMaxLevel(),
          gfxId: sublimation.getGfxId(),
          effectId: sublimation.getEffectId(),
          colorPattern: sublimation.getColorPattern(),
          rarityEpic: sublimation.isRarityEpic(),
          rarityRelic: sublimation.isRarityRelic(),
        }),
      ),
    });
  });
};
