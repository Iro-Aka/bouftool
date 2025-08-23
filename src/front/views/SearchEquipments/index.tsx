import { Stack } from "@mui/material";
import { SearchItemsFiltersProvider } from "./contexts/filters";
import { SearchItemsPreferencesProvider } from "./contexts/preferences";
import { SearchItemsProvider } from "./contexts/search";
import { SearchItemsFilters } from "./filters";
import { SearchItemsList } from "./list";
import { ModalCompareItem } from "./ModalCompareItem";
import { ModalItemRecipeProvider } from "./ModalItemRecipe/context";
import { SearchItemsPreferences } from "./preferences";

export type TSearchEquipmentsProps = {
  controlled?: boolean;
  buildId?: number;
};

export const SearchEquipments = ({ controlled, buildId }: TSearchEquipmentsProps) => {
  return (
    <Stack sx={{ flex: 1, p: 1, gap: 1, overflow: "hidden" }}>
      <ModalItemRecipeProvider>
        <SearchItemsFiltersProvider controlled={controlled}>
          <SearchItemsPreferencesProvider controlled={controlled}>
            <Stack
              sx={{
                p: 1,
                gap: 1,
                bgcolor: "surface.100",
                borderRadius: 2,
              }}
            >
              <SearchItemsPreferences />
              <SearchItemsFilters />
            </Stack>
            <SearchItemsProvider>
              <SearchItemsList buildId={buildId} />
            </SearchItemsProvider>
          </SearchItemsPreferencesProvider>
        </SearchItemsFiltersProvider>
      </ModalItemRecipeProvider>
      <ModalCompareItem />
    </Stack>
  );
};
