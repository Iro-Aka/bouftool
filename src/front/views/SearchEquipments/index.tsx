import { Stack } from "@mui/material";
import { SearchItemsFiltersProvider } from "./contexts/filters";
import { SearchItemsPreferencesProvider } from "./contexts/preferences";
import { SearchItemsProvider } from "./contexts/search";
import { SearchItemsFilters } from "./filters";
import { SearchItemsList } from "./list";
import { ModalItemRecipeProvider } from "./ModalItemRecipe/context";
import { SearchItemsPreferences } from "./preferences";

export type TSearchEquipmentsProps = {
  controlled?: boolean;
  onEquipItem?: (itemId: number) => void;
};

export const SearchEquipments = ({ controlled, onEquipItem }: TSearchEquipmentsProps) => {
  return (
    <Stack sx={{ flex: 1, p: 1, gap: 1, overflow: "hidden" }}>
      <SearchItemsFiltersProvider controlled={controlled}>
        <SearchItemsPreferencesProvider controlled={controlled}>
          <ModalItemRecipeProvider>
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
              <SearchItemsList onEquipItem={onEquipItem} />
            </SearchItemsProvider>
          </ModalItemRecipeProvider>
        </SearchItemsPreferencesProvider>
      </SearchItemsFiltersProvider>
    </Stack>
  );
};
