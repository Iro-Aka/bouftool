import { ElectronEvents } from "src/electron/types";
import { WakfuBuild } from "src/wakfu/builds/build";
import { ElectronEventManager } from "../manager";

export const registerElectronBuildsElementalPreferencesEvents = (manager: ElectronEventManager) => {
  manager.register(ElectronEvents.BuildSetPositionElementalPreferences, (reply, { buildId, position, preferences }) => {
    const build = WakfuBuild.getById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }
    build.setPositionElementalPreferences(position, preferences);
    ElectronEventManager.send(ElectronEvents.GetBuild, build.toDisplay());
    reply(undefined);
  });
};
