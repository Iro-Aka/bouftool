import { WakfuStats } from "src/wakfu/types/action";
import { useBuildDetailsContext } from "../context";
import { BuildStats } from "../stats";
import { StatsRow, statsRowClasses } from "./styles";

export const BuildDetailsStatsMastery = () => {
  const build = useBuildDetailsContext();
  return (
    <StatsRow columns={4} className={statsRowClasses.root}>
      <BuildStats
        stats={WakfuStats.MasteryFire}
        value={build.stats[WakfuStats.MasteryFire].toLocaleString("fr-FR")}
        hideLabel
        statsColor="#DD8231"
      />
      <BuildStats
        stats={WakfuStats.MasteryWater}
        value={build.stats[WakfuStats.MasteryWater].toLocaleString("fr-FR")}
        hideLabel
        statsColor="#88DBDA"
      />
      <BuildStats
        stats={WakfuStats.MasteryEarth}
        value={build.stats[WakfuStats.MasteryEarth].toLocaleString("fr-FR")}
        hideLabel
        statsColor="#A9BE1F"
      />
      <BuildStats
        stats={WakfuStats.MasteryAir}
        value={build.stats[WakfuStats.MasteryAir].toLocaleString("fr-FR")}
        hideLabel
        statsColor="#CE87DD"
      />
    </StatsRow>
  );
};
