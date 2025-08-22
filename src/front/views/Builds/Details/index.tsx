import { Stack, Typography } from "@mui/material";
import { SearchItemsFiltersProvider } from "../../SearchEquipments/contexts/filters";
import { SearchItemsPreferencesProvider } from "../../SearchEquipments/contexts/preferences";
import { BuildDetailsInfo } from "./Info";
import { BuildDetailsItems } from "./Items";
import { BuildDetailsStatsBase } from "./Stats/base";
import { BuildDetailsStatsCombat } from "./Stats/combat";
import { BuildDetailsStatsMastery } from "./Stats/mastery";
import { BuildDetailsStatResistance } from "./Stats/resistance";
import { BuildDetailsStatsSecondary } from "./Stats/secondary";
import { BuildDetailsTabs } from "./Tabs";

export const BuildDetails = () => {
  return (
    <SearchItemsFiltersProvider>
      <SearchItemsPreferencesProvider>
        <Stack sx={{ flex: 1, flexDirection: "row", overflow: "hidden" }}>
          <Stack
            sx={{
              flex: "0 0 450px",
              borderRight: (theme) => `1px solid ${theme.palette.divider}`,
              p: 1,
              gap: 1,
            }}
          >
            <BuildDetailsInfo />
            <BuildDetailsItems />
            <BuildDetailsStatsBase />
            <Typography variant="subtitle2" sx={{ alignSelf: "center" }}>
              Maîtrises et Résistances
            </Typography>
            <BuildDetailsStatsMastery />
            <BuildDetailsStatResistance />
            <Typography variant="subtitle2" sx={{ alignSelf: "center" }}>
              Combat
            </Typography>
            <BuildDetailsStatsCombat />
            <Typography variant="subtitle2" sx={{ alignSelf: "center" }}>
              Secondaire
            </Typography>
            <BuildDetailsStatsSecondary />
          </Stack>
          <BuildDetailsTabs />
        </Stack>
      </SearchItemsPreferencesProvider>
    </SearchItemsFiltersProvider>
  );
};
