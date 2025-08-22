import { Stack, Typography } from "@mui/material";
import { ElectronEvents } from "src/electron/types";
import { StackRow } from "src/front/components/Layout/StackRow";
import { BreedFaceIcon } from "src/front/components/Wakfu/BreedFaceIcon";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { sendElectronEvent } from "src/front/hooks/electron";
import { WakfuStats } from "src/wakfu/types/action";
import { SearchItemsFiltersProvider } from "../../SearchEquipments/contexts/filters";
import { SearchItemsPreferencesProvider } from "../../SearchEquipments/contexts/preferences";
import { useBuildDetailsContext } from "./context";
import { BuildDetailsItems } from "./Items";
import { BuildDetailsPreferences } from "./Preferences";
import { BuildDetailsStatsBase } from "./Stats/base";
import { BuildDetailsStatsCombat } from "./Stats/combat";
import { BuildDetailsStatsMastery } from "./Stats/mastery";
import { BuildDetailsStatResistance } from "./Stats/resistance";
import { BuildDetailsStatsSecondary } from "./Stats/secondary";
import { BuildDetailsTabs } from "./Tabs";

export const BuildDetails = () => {
  const build = useBuildDetailsContext();

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
            <StackRow sx={{ "&&": { alignItems: "start", justifyContent: "space-between" } }}>
              <StackRow>
                <Stack
                  sx={{
                    border: (theme) => `1px solid ${theme.palette.border.light}`,
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <BreedFaceIcon width={44}>{build.breed}</BreedFaceIcon>
                </Stack>
                <Stack>
                  <Typography variant="subtitle2">Iro Kaen (Berserk)</Typography>
                  <Typography variant="caption">Niv. {build.level}</Typography>
                </Stack>
              </StackRow>
              <Stack sx={{ gap: 1 }}>
                <StackRow>
                  <StatsIcon>{WakfuStats.Mastery}</StatsIcon>
                  <BuildDetailsPreferences
                    value={build.preferences.mastery}
                    onChange={(values) =>
                      sendElectronEvent(ElectronEvents.BuildSetPreferences, {
                        buildId: build.id,
                        preferences: { mastery: values },
                      })
                    }
                  />
                </StackRow>
                <StackRow>
                  <StatsIcon>{WakfuStats.Resistance}</StatsIcon>
                  <BuildDetailsPreferences
                    value={build.preferences.resistance}
                    onChange={(values) =>
                      sendElectronEvent(ElectronEvents.BuildSetPreferences, {
                        buildId: build.id,
                        preferences: { resistance: values },
                      })
                    }
                  />
                </StackRow>
              </Stack>
            </StackRow>
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
