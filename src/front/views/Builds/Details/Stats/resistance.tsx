import { WakfuStats } from "src/wakfu/types/action";
import { useBuildDetailsContext } from "../context";
import { BuildStats } from "../stats";
import { getResistanceText } from "./logics";
import { StatsRow, statsRowClasses } from "./styles";

export const BuildDetailsStatResistance = () => {
  const build = useBuildDetailsContext();

  return (
    <StatsRow columns={4} className={statsRowClasses.root}>
      <BuildStats
        stats={WakfuStats.ResistanceFire}
        value={getResistanceText(build.stats[WakfuStats.ResistanceFire])}
        hideLabel
        statsColor="#DD8231"
      />
      <BuildStats
        stats={WakfuStats.ResistanceWater}
        value={getResistanceText(build.stats[WakfuStats.ResistanceWater])}
        hideLabel
        statsColor="#88DBDA"
      />
      <BuildStats
        stats={WakfuStats.ResistanceEarth}
        value={getResistanceText(build.stats[WakfuStats.ResistanceEarth])}
        hideLabel
        statsColor="#A9BE1F"
      />
      <BuildStats
        stats={WakfuStats.ResistanceAir}
        value={getResistanceText(build.stats[WakfuStats.ResistanceAir])}
        hideLabel
        statsColor="#CE87DD"
      />
    </StatsRow>
  );
};
