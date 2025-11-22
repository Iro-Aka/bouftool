import { app, shell } from "electron";
import { WakfuCraftManager } from "src/wakfu/craftManager/craftManager";
import { WakfuStore } from "src/wakfu/store";
import { DefaultEncyclopediaBaseUrl, EncyclopediaBaseUrlsMap } from "src/wakfu/utils/encyclopedia";
import { searchItems } from "../searchItems";
import { ElectronEvents } from "../types";
import { registerElectronBuildsEvents } from "./builds";
import { registerElectronCraftManagerEvents } from "./craftManager";
import { registerElectronDataEvents } from "./data";
import { ElectronEventManager } from "./manager";

const manager = new ElectronEventManager();
export const registerElectronEvents = () => {
  manager.register(ElectronEvents.AppReady, async (reply) => {
    const store = await WakfuStore.initialize();
    await WakfuCraftManager.initialize();
    reply({
      version: store.getGamedataVersion(),
      lang: store.getLang(),
    });
  });

  manager.register(ElectronEvents.AppVersion, (reply) => {
    reply(app.getVersion());
  });

  manager.register(ElectronEvents.OpenWebEncyclopedia, (reply, { itemTypeId, itemId }) => {
    const url = EncyclopediaBaseUrlsMap.get(itemTypeId) ?? DefaultEncyclopediaBaseUrl;
    shell.openExternal(`${url}${itemId}`);
    reply(undefined);
  });

  manager.register(ElectronEvents.SearchItems, (reply, { filters, sort, buildLevel }) => {
    const results = searchItems(filters, sort, buildLevel);
    reply(results);
  });

  registerElectronDataEvents(manager);
  registerElectronBuildsEvents(manager);
  registerElectronCraftManagerEvents(manager);
};
