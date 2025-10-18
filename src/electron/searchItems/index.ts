import type { WakfuItem } from "src/wakfu/items";
import { WakfuStore } from "src/wakfu/store";
import { EnumWakfuLang } from "src/wakfu/utils/types";
import { searchItemsItemTypesFilter } from "./filters/itemTypes";
import { searchItemsLevelsFilter } from "./filters/levels";
import { searchItemsRaritiesFilter } from "./filters/rarities";
import { searchItemsStatsFilter } from "./filters/stats";
import { searchItemsTitleFilter } from "./filters/title";
import { searchItemsSortLevel } from "./sort/level";
import { searchItemsSortWeight } from "./sort/weight";
import type { TSearchItemsFilters, TSearchItemsSort } from "./types";

const ItemFiltersMap: {
  [Key in keyof TSearchItemsFilters]: (
    item: WakfuItem,
    text: TSearchItemsFilters[Key],
    filters: TSearchItemsFilters,
  ) => boolean;
} = {
  title: searchItemsTitleFilter,
  itemTypes: searchItemsItemTypesFilter,
  rarities: searchItemsRaritiesFilter,
  levels: searchItemsLevelsFilter,
  stats: searchItemsStatsFilter,
};

const isItemFiltered = (item: WakfuItem, filters: TSearchItemsFilters) => {
  for (const key in filters) {
    if (
      !ItemFiltersMap[key as keyof TSearchItemsFilters](item, filters[key as keyof TSearchItemsFilters] as any, filters)
    ) {
      return false;
    }
  }
  return true;
};

export const searchItems = (
  filters: TSearchItemsFilters,
  sort: TSearchItemsSort,
): ReturnType<WakfuItem["toObject"]>[] => {
  const store = WakfuStore.getInstance();
  const itemWeightCache: Record<number, number> = {};
  return store.getItems(
    (item) => isItemFiltered(item, filters),
    (a, b) => {
      let comparison = searchItemsSortWeight(a, b, sort, itemWeightCache);
      if (comparison === 0) {
        comparison = searchItemsSortLevel(a, b);
        if (comparison === 0) {
          comparison = a.getTitle(EnumWakfuLang.French).localeCompare(b.getTitle(EnumWakfuLang.French));
        }
      }
      return comparison;
    },
    (item) => {
      return item.toObject();
    },
  );
};
