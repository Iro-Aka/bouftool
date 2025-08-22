import { Stack, Typography } from "@mui/material";
import { ElectronEvents } from "src/electron/types";
import { StackRow } from "src/front/components/Layout/StackRow";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { sendElectronEvent } from "src/front/hooks/electron";
import { WakfuStats } from "src/wakfu/types/action";
import { useBuildDetailsContext } from "../context";
import { BuildDetailsPreferences } from "../Preferences";
import { BuildDetailsBreed } from "./breed";

export const BuildDetailsInfo = () => {
  const build = useBuildDetailsContext();

  return (
    <StackRow sx={{ "&&": { alignItems: "start", justifyContent: "space-between" } }}>
      <StackRow>
        <BuildDetailsBreed />
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
  );
};
