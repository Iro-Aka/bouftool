import FilterIcon from "@mui/icons-material/FilterAlt";
import ReplayIcon from "@mui/icons-material/Replay";
import { Button, Stack, TextField } from "@mui/material";
import type { TSearchItemsFilters } from "src/wakfu/search/types";
import type { WakfuStats } from "src/wakfu/types/action";
import { RangeFields } from "../../../components/Input/RangeFields";
import { useSearchItemsFiltersContext } from "../contexts/filters";
import { ItemTypeFilters } from "./itemTypes";
import { RarityFilters } from "./rarities/rarity";
import { StatsFilters, StatsFiltersCards } from "./stats";

export const initialSearchItemsFilters = {
  title: "",
  rarities: [],
  itemTypes: [],
  levels: { min: 1, max: 245 },
  stats: {},
};

export type TSearchItemsFiltersForm = {
  title: string;
  rarities: number[];
  itemTypes: number[];
  levels: { min: number; max: number };
  stats: Partial<Record<WakfuStats, Omit<TSearchItemsFilters["stats"][number], "stats">>>;
};

export const SearchItemsFilters = () => {
  const { filters, setFilters } = useSearchItemsFiltersContext();

  return (
    <Stack sx={{ flexDirection: "row", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
      <FilterIcon />
      <TextField
        placeholder="Rechercher..."
        size="small"
        value={filters.title}
        onChange={(e) => setFilters({ ...filters, title: e.target.value })}
      />
      <RangeFields
        label="Niv."
        min={0}
        max={245}
        value={[filters.levels.min, filters.levels.max]}
        onChange={(range) => setFilters({ ...filters, levels: { min: range[0], max: range[1] } })}
        slotProps={{ box: { sx: { width: 160 } } }}
      />
      <RarityFilters value={filters.rarities} onChange={(rarities) => setFilters({ ...filters, rarities })} />
      <ItemTypeFilters value={filters.itemTypes} onChange={(itemTypes) => setFilters({ ...filters, itemTypes })} />
      <StatsFilters value={filters.stats} onChange={(stats) => setFilters({ ...filters, stats })} />
      <StatsFiltersCards value={filters.stats} onChange={(stats) => setFilters({ ...filters, stats })} />
      <Button variant="push" onClick={() => setFilters(initialSearchItemsFilters)} sx={{ minWidth: 0 }}>
        <ReplayIcon />
      </Button>
    </Stack>
  );
};
