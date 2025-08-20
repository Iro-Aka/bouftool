import type { WakfuItem } from "src/wakfu/data/item";
import { WakfuItemTypeId } from "src/wakfu/types/itemType";
import type { TSearchItemsFilters } from "../types";

const Exceptions = [WakfuItemTypeId.Pet, WakfuItemTypeId.Mount];

export const searchItemsRaritiesFilter = (item: WakfuItem, rarities: number[], filters: TSearchItemsFilters) => {
  if (
    rarities.length === 0 ||
    (filters.itemTypes.some((type) => Exceptions.includes(type)) && Exceptions.includes(item.getItemTypeId()))
  ) {
    return true;
  }
  return rarities.includes(item.getRarity());
};
