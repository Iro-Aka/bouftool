import { createContext, type ReactNode, useContext, useLayoutEffect } from "react";
import { ElectronEvents } from "src/electron/types";
import { useElectronEvent } from "src/front/hooks/electron";
import type { TSearchItemsFilters, TSearchItemsSort } from "src/wakfu/search/types";
import { isWakfuStats, WakfuStats } from "src/wakfu/types/action";
import type { TWakfuItemDisplay } from "src/wakfu/types/items";
import type { TSearchItemsFiltersForm } from "../filters";
import type { TSearchItemsPreferences } from "../preferences/logics";
import { useSearchItemsFiltersContext } from "./filters";
import { useSearchItemsPreferencesContext } from "./preferences";

const formatFilters = (filters: TSearchItemsFiltersForm): TSearchItemsFilters => {
  const stats: TSearchItemsFilters["stats"] = [];
  for (const wakfuStats of Object.values(WakfuStats)) {
    if (isWakfuStats(wakfuStats)) {
      const values = filters.stats[wakfuStats];
      if (values) {
        stats.push({ ...values, stats: wakfuStats });
      }
    }
  }
  return {
    title: filters.title,
    rarities: filters.rarities,
    itemTypes: filters.itemTypes,
    levels: filters.levels,
    stats: stats,
  };
};

const formatPreferences = (preferences: TSearchItemsPreferences): TSearchItemsSort => {
  return {
    mastery: {
      elementsPriority: preferences.mastery.elementsPriority,
      meleeMastery: preferences.mastery.meleeRangeMastery === WakfuStats.MeleeMastery,
      rangeMastery: preferences.mastery.meleeRangeMastery === WakfuStats.DistanceMastery,
      criticalMastery: preferences.mastery.subMasteries.includes(WakfuStats.CriticalMastery),
      backMastery: preferences.mastery.subMasteries.includes(WakfuStats.BackMastery),
      berserkMastery: preferences.mastery.subMasteries.includes(WakfuStats.BerserkMastery),
      healingMastery: preferences.mastery.subMasteries.includes(WakfuStats.HealingMastery),
    },
    resistance: {
      elementsPriority: preferences.resistance.elementsPriority,
    },
  };
};

export type TSearchItemsContext = {
  items: TWakfuItemDisplay[];
};

const SearchContext = createContext<TSearchItemsContext | undefined>(undefined);

export const useSearchItemsContext = () => {
  const value = useContext(SearchContext);
  if (!value) {
    throw new Error("useSearchItemsContext must be used within a SearchItemsProvider");
  }
  return value;
};

export type TSearchItemsProviderProps = {
  children: ReactNode;
};

export const SearchItemsProvider = ({ children }: TSearchItemsProviderProps) => {
  const { filters } = useSearchItemsFiltersContext();
  const { preferences } = useSearchItemsPreferencesContext();
  const [searchItems, items] = useElectronEvent(ElectronEvents.SearchItems);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Only depends on filters and preferences
  useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      searchItems({ filters: formatFilters(filters), sort: formatPreferences(preferences) });
    }, 750);
    return () => clearTimeout(timeout);
  }, [filters, preferences]);

  return <SearchContext.Provider value={{ items: items ?? [] }}>{children}</SearchContext.Provider>;
};
