import { stackClasses } from "@mui/material";
import { StackGrid } from "src/front/components/Layout/StackGrid";
import { WakfuStats } from "src/wakfu/types/action";
import { useBuildDetailsContext } from "../context";
import { BuildStats } from "../stats";

export const BuildDetailsStatsBase = () => {
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
        stats={WakfuStats.PV}
        value={build.stats[WakfuStats.PV].toLocaleString("fr-FR")}
        statsColor="#E34A53"
      />
      <BuildStats
        stats={WakfuStats.PA}
        value={build.stats[WakfuStats.PA].toLocaleString("fr-FR")}
        statsColor="#19ADD5"
      />
      <BuildStats
        stats={WakfuStats.PM}
        value={build.stats[WakfuStats.PM].toLocaleString("fr-FR")}
        statsColor="#96B443"
      />
      <BuildStats
        stats={WakfuStats.PW}
        value={build.stats[WakfuStats.PW].toLocaleString("fr-FR")}
        statsColor="#32D4CA"
      />
    </StackGrid>
  );
};
