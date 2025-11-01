import type { WakfuItem } from "src/wakfu/items";

export const searchItemsSortLevel = (a: WakfuItem, b: WakfuItem) => {
  return b.getLevel() - a.getLevel();
};
