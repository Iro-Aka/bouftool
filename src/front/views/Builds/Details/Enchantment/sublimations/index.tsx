import { Box, Stack, Typography } from "@mui/material";
import { type ReactElement, useMemo, useState } from "react";
import { List, type RowComponentProps } from "react-window";
import { BoufField } from "src/front/components/Input/BoufField";
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

const RowComponent = ({
  index,
  options,
  style,
}: RowComponentProps<{
  options: TListSublimationsProps["sublimations"];
}>): ReactElement => {
  const item = options[index];
  if (!item) {
    return <div>Unknown</div>;
  }
  return (
    <Box key={item.id} style={style} sx={{ px: 1, py: 0.5 }}>
      <ListSublimationsRow sublimation={item} />
    </Box>
  );
};

export const ListSublimations = ({ sublimations }: TListSublimationsProps) => {
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
      <Stack sx={{ flex: 1, mx: -1, my: -0.5, overflow: "hidden" }}>
        <List
          rowHeight={50}
          rowCount={options.length}
          overscanCount={5}
          rowProps={{ options }}
          rowComponent={RowComponent}
        />
      </Stack>
    </ListSublimationsRoot>
  );
};
