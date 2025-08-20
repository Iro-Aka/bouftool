import { Stack, stackClasses } from "@mui/material";
import { StackGrid } from "src/front/components/Layout/StackGrid";
import { WakfuStats } from "src/wakfu/types/action";
import { useBuildDetailsContext } from "../context";
import { BuildStats } from "../stats";
import { getStatsColor } from "./logics";

export const BuildDetailsStatsSecondary = () => {
  const build = useBuildDetailsContext();

  return (
    <StackGrid columns={2}>
      <Stack
        sx={{
          overflow: "hidden",
          borderTopLeftRadius: "8px",
          borderBottomLeftRadius: "8px",
          border: (theme) => `1px solid ${theme.palette.border.light}`,
          [`& > .${stackClasses.root}`]: {
            "&:nth-of-type(2n)": { bgcolor: "surface.250" },
            "&:nth-of-type(2n+1)": { bgcolor: "surface.150" },
            px: 1,
            py: 0.5,
          },
        }}
      >
        <BuildStats
          stats={WakfuStats.CriticalMastery}
          value={build.stats[WakfuStats.CriticalMastery].toLocaleString("fr-FR")}
          statsColor={getStatsColor(build.stats[WakfuStats.CriticalMastery])}
        />
        <BuildStats
          stats={WakfuStats.BackMastery}
          value={build.stats[WakfuStats.BackMastery].toLocaleString("fr-FR")}
          statsColor={getStatsColor(build.stats[WakfuStats.BackMastery])}
        />
        <BuildStats
          stats={WakfuStats.MeleeMastery}
          value={build.stats[WakfuStats.MeleeMastery].toLocaleString("fr-FR")}
          statsColor={getStatsColor(build.stats[WakfuStats.MeleeMastery])}
        />
        <BuildStats
          stats={WakfuStats.DistanceMastery}
          value={build.stats[WakfuStats.DistanceMastery].toLocaleString("fr-FR")}
          statsColor={getStatsColor(build.stats[WakfuStats.DistanceMastery])}
        />
        <BuildStats
          stats={WakfuStats.HealingMastery}
          value={build.stats[WakfuStats.HealingMastery].toLocaleString("fr-FR")}
          statsColor={getStatsColor(build.stats[WakfuStats.HealingMastery])}
        />
        <BuildStats
          stats={WakfuStats.BerserkMastery}
          value={build.stats[WakfuStats.BerserkMastery].toLocaleString("fr-FR")}
          statsColor={getStatsColor(build.stats[WakfuStats.BerserkMastery])}
        />
      </Stack>
      <Stack
        sx={{
          overflow: "hidden",
          borderTopRightRadius: "8px",
          borderBottomRightRadius: "8px",
          border: (theme) => `1px solid ${theme.palette.border.light}`,
          [`& > .${stackClasses.root}`]: {
            "&:nth-of-type(2n)": { bgcolor: "surface.250" },
            "&:nth-of-type(2n+1)": { bgcolor: "surface.150" },
            px: 1,
            py: 0.5,
          },
        }}
      >
        <BuildStats
          stats={WakfuStats.CriticalResistance}
          value={build.stats[WakfuStats.CriticalResistance].toLocaleString("fr-FR")}
          statsColor={getStatsColor(build.stats[WakfuStats.CriticalResistance])}
        />
        <BuildStats
          stats={WakfuStats.BackResistance}
          value={build.stats[WakfuStats.BackResistance].toLocaleString("fr-FR")}
          statsColor={getStatsColor(build.stats[WakfuStats.BackResistance])}
        />
        <BuildStats
          stats={WakfuStats.ArmorGiven}
          value={`${build.stats[WakfuStats.ArmorGiven]}%`}
          statsColor={getStatsColor(build.stats[WakfuStats.ArmorGiven], true)}
        />
        <BuildStats
          stats={WakfuStats.ArmorReceived}
          value={`${build.stats[WakfuStats.ArmorReceived]}%`}
          statsColor={getStatsColor(build.stats[WakfuStats.ArmorReceived], true)}
        />
        <BuildStats stats={WakfuStats.ArmorReceived} value={`0%`} statsColor={getStatsColor(0, true)} />
        <Stack sx={{ flex: "1" }} />
      </Stack>
    </StackGrid>
  );
};
