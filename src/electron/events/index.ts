import { shell } from "electron";
import { DefaultEncyclopediaBaseUrl, EncyclopediaBaseUrlsMap } from "src/wakfu/constants/encyclopedia";
import { WakfuData } from "src/wakfu/data";
import { searchItems } from "src/wakfu/search";
import { ElectronEvents } from "../types";
import { registerElectronBuildsEvents } from "./builds";
import { registerElectronDataEvents } from "./data";
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

  manager.register(ElectronEvents.OpenWebEncyclopedia, (reply, { itemTypeId, itemId }) => {
    const url = EncyclopediaBaseUrlsMap.get(itemTypeId) ?? DefaultEncyclopediaBaseUrl;
    shell.openExternal(`${url}${itemId}`);
    reply(undefined);
  });

  manager.register(ElectronEvents.SearchItems, (reply, { filters, sort }) => {
    const results = searchItems(filters, sort);
    reply(results);
  });

  registerElectronDataEvents(manager);
  registerElectronBuildsEvents(manager);
};
