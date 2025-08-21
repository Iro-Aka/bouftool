import { Stack } from "@mui/material";
import { WakfuStats } from "src/wakfu/types/action";
import { useBuildDetailsContext } from "../context";
import { BuildStats } from "../stats";
import { getStatsColor } from "./logics";
import { StatsPanel, statsPanelClasses } from "./styles";

export const BuildDetailsStatsCombat = () => {
  const build = useBuildDetailsContext();

  return (
    <StatsPanel className={statsPanelClasses.root} columns={2}>
      <Stack className={statsPanelClasses.column}>
        <BuildStats
          stats={WakfuStats.FinalDamage}
          value={`${build.stats[WakfuStats.FinalDamage]}%`}
          statsColor={getStatsColor(build.stats[WakfuStats.FinalDamage], true)}
        />
        <BuildStats
          stats={WakfuStats.CriticalRate}
          value={`${build.stats[WakfuStats.CriticalRate]}%`}
          statsColor={getStatsColor(build.stats[WakfuStats.CriticalRate], true)}
        />
        <BuildStats
          stats={WakfuStats.Initiative}
          value={build.stats[WakfuStats.Initiative].toLocaleString("fr-FR")}
          statsColor={getStatsColor(build.stats[WakfuStats.Initiative])}
        />
        <BuildStats
          stats={WakfuStats.Dodge}
          value={build.stats[WakfuStats.Dodge].toLocaleString("fr-FR")}
          statsColor={getStatsColor(build.stats[WakfuStats.Dodge])}
        />
        <BuildStats
          stats={WakfuStats.Wisdom}
          value={build.stats[WakfuStats.Wisdom].toLocaleString("fr-FR")}
          statsColor={getStatsColor(build.stats[WakfuStats.Wisdom])}
        />
        <BuildStats
          stats={WakfuStats.Control}
          value={build.stats[WakfuStats.Control].toLocaleString("fr-FR")}
          statsColor={getStatsColor(build.stats[WakfuStats.Control])}
        />
      </Stack>
      <Stack className={statsPanelClasses.column}>
        <BuildStats
          stats={WakfuStats.FinalHealing}
          value={`${build.stats[WakfuStats.FinalHealing]}%`}
          statsColor={getStatsColor(build.stats[WakfuStats.FinalHealing], true)}
        />
        <BuildStats
          stats={WakfuStats.Block}
          value={`${build.stats[WakfuStats.Block]}%`}
          statsColor={getStatsColor(build.stats[WakfuStats.Block], true)}
        />
        <BuildStats
          stats={WakfuStats.Range}
          value={build.stats[WakfuStats.Range].toLocaleString("fr-FR")}
          statsColor={getStatsColor(build.stats[WakfuStats.Range])}
        />
        <BuildStats
          stats={WakfuStats.Lock}
          value={build.stats[WakfuStats.Lock].toLocaleString("fr-FR")}
          statsColor={getStatsColor(build.stats[WakfuStats.Lock])}
        />
        <BuildStats
          stats={WakfuStats.Prospection}
          value={build.stats[WakfuStats.Prospection].toLocaleString("fr-FR")}
          statsColor={getStatsColor(build.stats[WakfuStats.Prospection])}
        />
        <BuildStats
          stats={WakfuStats.Willpower}
          value={build.stats[WakfuStats.Willpower].toLocaleString("fr-FR")}
          statsColor={getStatsColor(build.stats[WakfuStats.Willpower])}
        />
      </Stack>
    </StatsPanel>
  );
};
