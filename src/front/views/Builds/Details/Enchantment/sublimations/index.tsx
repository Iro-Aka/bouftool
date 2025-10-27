import { Box, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { FixedSizeList } from "react-window";
import { BoufField } from "src/front/components/Input/BoufField";
import { useResizeObserver } from "src/front/hooks/useResizeObserver";
import { searchCompare } from "src/utils/search";
import type { EnumWakfuEnchantmentColor } from "src/wakfu/enchantment/types";
import type { TWakfuI18n } from "src/wakfu/utils/types";
import { ListSublimationsFilters } from "./filters";
import { ListSublimationsRow } from "./row";
import { ListSublimationsRoot, listSublimationsClasses } from "./styles";

export type TListSublimationsProps = {
  sublimations: {
    id: number;
    name: TWakfuI18n;
    level: number;
    maxLevel: number;
    gfxId: number;
    effectId: number;
    colorPattern: EnumWakfuEnchantmentColor[];
    rarityEpic: boolean;
    rarityRelic: boolean;
  }[];
};

export const ListSublimations = ({ sublimations }: TListSublimationsProps) => {
  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null);
  const size = useResizeObserver(scrollContainer);
  const [filters, setFilters] = useState({
    text: "",
    rarityEpic: false,
    rarityRelic: false,
  });

  const options = useMemo(
    () =>
      sublimations.filter(
        (sublimation) =>
          searchCompare(sublimation.name.fr, filters.text) &&
          sublimation.rarityEpic === filters.rarityEpic &&
          sublimation.rarityRelic === filters.rarityRelic,
      ),
    [sublimations, filters],
  );

  return (
    <ListSublimationsRoot className={listSublimationsClasses.root}>
      <Stack sx={{ flexDirection: "row", alignItems: "start", justifyContent: "space-between" }}>
        <Typography variant="subtitle2">Sublimations</Typography>
        <ListSublimationsFilters filters={filters} setFilters={setFilters} />
      </Stack>
      <BoufField
        placeholder="Recherche..."
        value={filters.text}
        onChange={(evt) => setFilters((prev) => ({ ...prev, text: evt.target.value }))}
      />
      <Stack sx={{ flex: 1, mx: -1, my: -0.5, overflow: "hidden" }} ref={setScrollContainer}>
        <FixedSizeList
          height={size.height}
          width={size.width}
          itemCount={options.length}
          itemSize={50}
          overscanCount={5}
        >
          {({ index, style }) => {
            const item = options[index];
            if (!item) {
              return null;
            }
            return (
              <Box key={item.id} style={style} sx={{ px: 1, py: 0.5 }}>
                <ListSublimationsRow sublimation={item} />
              </Box>
            );
          }}
        </FixedSizeList>
      </Stack>
    </ListSublimationsRoot>
  );
};
