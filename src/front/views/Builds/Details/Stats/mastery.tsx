import { stackClasses } from "@mui/material";
import { StackGrid } from "src/front/components/Layout/StackGrid";
import { WakfuStats } from "src/wakfu/types/action";
import { useBuildDetailsContext } from "../context";
import { BuildStats } from "../stats";

export const BuildDetailsStatsMastery = () => {
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
    </StackGrid>
  );
};
