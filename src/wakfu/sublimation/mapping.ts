import type { EnumWakfuGamedataType, TWakfuGamedataTypes } from "../store/types";
import { DefaultWakfuI18n } from "../utils/constants";
import { WakfuSublimation } from "./index";

export const createWakfuSublimationFromGamedata = (item: TWakfuGamedataTypes[EnumWakfuGamedataType.Items]) => {
  if (item.definition.item.sublimationParameters === undefined) {
    throw new Error("Item does not have sublimation parameters");
  }
  return new WakfuSublimation(
    item.definition.item.id,
    item.title || DefaultWakfuI18n,
    item.definition.equipEffects[0].effect.definition.params[2],
    item.definition.item.sublimationParameters.isEpic || item.definition.item.sublimationParameters.isRelic
      ? 1
      : Number(item.description?.fr.substring(item.description.fr.length - 2, item.description.fr.length - 1)),
    item.definition.item.graphicParameters.gfxId,
    item.definition.equipEffects[0].effect.definition.params[0],
    item.definition.item.sublimationParameters.slotColorPattern,
    item.definition.item.sublimationParameters.isEpic,
    item.definition.item.sublimationParameters.isRelic,
  );
};
