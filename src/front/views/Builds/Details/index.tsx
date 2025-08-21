import { Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { ElectronEvents } from "src/electron/types";
import { StackRow } from "src/front/components/Layout/StackRow";
import { BreedFaceIcon } from "src/front/components/Wakfu/BreedFaceIcon";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { sendElectronEvent } from "src/front/hooks/electron";
import { WakfuStats } from "src/wakfu/types/action";
import type { WakfuEquipmentPosition } from "src/wakfu/types/itemType";
import { WakfuLevelsRange } from "src/wakfu/types/utils";
import { SearchEquipments } from "../../SearchEquipments";
import type { TSearchItemsFiltersForm } from "../../SearchEquipments/filters";
import { useBuildDetailsContext } from "./context";
import { BuildDetailsItems } from "./Items";
import { ModalEquipConflict } from "./ModalEquipConflict";
import { BuildDetailsNavbar } from "./Navbar";
import { BuildDetailsPreferences } from "./Preferences";
import { BuildDetailsStatsBase } from "./Stats/base";
import { BuildDetailsStatsCombat } from "./Stats/combat";
import { BuildDetailsStatsMastery } from "./Stats/mastery";
import { BuildDetailsStatResistance } from "./Stats/resistance";
import { BuildDetailsStatsSecondary } from "./Stats/secondary";

export const BuildDetails = () => {
  const build = useBuildDetailsContext();
  const [defaultFilters, setDefaultFilters] = useState<Partial<TSearchItemsFiltersForm>>({
    levels: WakfuLevelsRange.find((range) => build.level >= range.min && build.level <= range.max),
  });
  const [conflictPositions, setConflictPositions] = useState<{
    itemId: number;
    position: WakfuEquipmentPosition[];
  } | null>(null);

  const equipItem = useCallback(
    async (itemId: number) => {
      const response = await sendElectronEvent(ElectronEvents.BuildEquipItem, { buildId: build.id, itemId });
      if (response) {
        setConflictPositions({ itemId, position: response });
      }
    },
    [build.id],
  );

  return (
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
              sx={{ border: (theme) => `1px solid ${theme.palette.border.light}`, borderRadius: 2, overflow: "hidden" }}
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
        <BuildDetailsItems setDefaultFilters={setDefaultFilters} />
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
      <Stack sx={{ flex: 1, overflow: "hidden" }}>
        <BuildDetailsNavbar />
        <SearchEquipments defaultFilters={defaultFilters} onEquipItem={equipItem} />
      </Stack>
      <ModalEquipConflict conflictPositions={conflictPositions} onClose={() => setConflictPositions(null)} />
    </Stack>
  );
};
