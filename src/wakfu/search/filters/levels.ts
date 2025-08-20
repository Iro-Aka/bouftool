import type { WakfuItem } from "src/wakfu/data/item";
import { WakfuItemTypeId } from "src/wakfu/types/itemType";
import type { TSearchItemsFilters } from "../types";

const Exceptions = [WakfuItemTypeId.Pet, WakfuItemTypeId.Mount];

export const searchItemsLevelsFilter = (
  item: WakfuItem,
  levels: { min: number; max: number },
  filters: TSearchItemsFilters,
) => {
  if (filters.itemTypes.some((type) => Exceptions.includes(type)) && Exceptions.includes(item.getItemTypeId())) {
    return true;
  }
  return item.getLevel() >= levels.min && item.getLevel() <= levels.max;
};
