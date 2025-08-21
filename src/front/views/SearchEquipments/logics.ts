import { useEffect, useState } from "react";
import { ElectronEvents } from "src/electron/types";
import { useElectronEvent } from "src/front/hooks/electron";
import type { TSearchItemsFilters, TSearchItemsSort } from "src/wakfu/search/types";

export const useWakfuSearchItems = () => {
  const [send, items] = useElectronEvent(ElectronEvents.SearchItems);
  const [filters, setFilters] = useState<TSearchItemsFilters>({
    title: "",
    itemTypes: [],
    rarities: [],
    levels: { min: 1, max: 245 },
    stats: [],
  });
  const [sort, setSort] = useState<TSearchItemsSort>({
    mastery: {
      elementsPriority: [],
      meleeMastery: false,
      rangeMastery: false,
      criticalMastery: false,
      backMastery: false,
      berserkMastery: false,
      healingMastery: false,
    },
    resistance: {
      elementsPriority: [],
    },
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    console.log("Send change !");
    send({ filters, sort });
  }, [send]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    console.log("Filters changed, sending new filters");
    send({ filters, sort });
  }, [filters]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    console.log("Sort changed, sending new sort");
    send({ filters, sort });
  }, [sort]);

  return { items: items || [], filters, setFilters, sort, setSort };
};
