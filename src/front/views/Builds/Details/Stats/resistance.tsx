import { stackClasses } from "@mui/material";
import { StackGrid } from "src/front/components/Layout/StackGrid";
import { WakfuStats } from "src/wakfu/types/action";
import { useBuildDetailsContext } from "../context";
import { BuildStats } from "../stats";
import { getResistanceText } from "./logics";

export const BuildDetailsStatResistance = () => {
  const build = useBuildDetailsContext();

  return (
    <StackGrid
      columns={4}
      sx={{
        border: (theme) => `1px solid ${theme.palette.border.light}`,
        borderRadius: 2,
        overflow: "hidden",
        [`& > .${stackClasses.root}`]: {
          "&:nth-of-type(2n)": { bgcolor: "surface.250" },
          "&:nth-of-type(2n+1)": { bgcolor: "surface.150" },
          px: 1,
          py: 0.5,
        },
      }}
    >
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
    </StackGrid>
  );
};
