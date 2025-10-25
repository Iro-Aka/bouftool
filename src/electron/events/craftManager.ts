import { WakfuCraftManager } from "src/wakfu/craftManager/craftManager";
import { ElectronEvents } from "../types";
import type { ElectronEventManager } from "./manager";

export const registerElectronCraftManagerEvents = (manager: ElectronEventManager) => {
  manager.register(ElectronEvents.CraftManagerAddItem, (reply, { itemId }) => {
    WakfuCraftManager.getInstance().addItemToCraft(itemId);
    reply(undefined);
  });

  manager.register(ElectronEvents.CraftManagerRemoveItem, (reply, { itemId }) => {
    WakfuCraftManager.getInstance().removeItemToCraft(itemId);
    reply(undefined);
  });

  manager.register(ElectronEvents.CraftManagerSetItemQuantity, (reply, { itemId, quantity }) => {
    WakfuCraftManager.getInstance().setItemQuantity(itemId, quantity);
    reply(undefined);
  });

  manager.register(ElectronEvents.CraftManagerGetItems, (reply) => {
    reply(WakfuCraftManager.getInstance().getItemsToCraftRecursivly());
  });

  manager.register(ElectronEvents.CraftManagerMarkIngredientAsCrafted, (reply, { itemId, path }) => {
    WakfuCraftManager.getInstance().markIngredientAsCrafted(path, itemId);
    reply(undefined);
  });

  manager.register(ElectronEvents.CraftManagerUnmarkIngredientAsCrafted, (reply, { itemId, path }) => {
    WakfuCraftManager.getInstance().unmarkIngredientAsCrafted(path, itemId);
    reply(undefined);
  });

  manager.register(ElectronEvents.CraftManagerMarkAllIngredientsById, (reply, { ingredientId }) => {
    WakfuCraftManager.getInstance().markAllIngredientsById(ingredientId);
    reply(undefined);
  });
};
