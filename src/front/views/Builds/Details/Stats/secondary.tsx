import { Stack } from "@mui/material";
import { WakfuStats } from "src/wakfu/types/action";
import { useBuildDetailsContext } from "../context";
import { BuildStats } from "../stats";
import { getStatsColor } from "./logics";
import { StatsPanel, statsPanelClasses } from "./styles";

export const BuildDetailsStatsSecondary = () => {
  const build = useBuildDetailsContext();

  return (
    <StatsPanel className={statsPanelClasses.root} columns={2}>
      <Stack className={statsPanelClasses.column}>
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
      <Stack className={statsPanelClasses.column}>
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
        <BuildStats
          stats={WakfuStats.HealingReceived}
          value={`${build.stats[WakfuStats.HealingReceived]}%`}
          statsColor={getStatsColor(build.stats[WakfuStats.HealingReceived], true)}
        />
        <BuildStats
          stats={WakfuStats.IndirectDamages}
          value={`${build.stats[WakfuStats.IndirectDamages]}%`}
          statsColor={getStatsColor(build.stats[WakfuStats.IndirectDamages], true)}
        />
      </Stack>
    </StatsPanel>
  );
};
