import { shell } from "electron";
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

  manager.register(ElectronEvents.OpenUrl, (reply, { url }) => {
    shell.openExternal(url);
    reply(undefined);
  });

  manager.register(ElectronEvents.SearchItems, (reply, { filters, sort }) => {
    const results = searchItems(filters, sort);
    reply(results);
  });

  registerElectronDataEvents(manager);
  registerElectronBuildsEvents(manager);
};
