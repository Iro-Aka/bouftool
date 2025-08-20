import { Stack, stackClasses } from "@mui/material";
import { StackGrid } from "src/front/components/Layout/StackGrid";
import { WakfuStats } from "src/wakfu/types/action";
import { useBuildDetailsContext } from "../context";
import { BuildStats } from "../stats";
import { getStatsColor } from "./logics";

export const BuildDetailsStatsCombat = () => {
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
        <BuildStats stats={WakfuStats.CriticalRate} value="0" statsColor={getStatsColor(0, true)} />
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
        <BuildStats stats={WakfuStats.CriticalRate} value={"0"} statsColor={getStatsColor(0, true)} />
        <BuildStats
          stats={WakfuStats.Control}
          value={build.stats[WakfuStats.Control].toLocaleString("fr-FR")}
          statsColor={getStatsColor(build.stats[WakfuStats.Control])}
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
        <BuildStats stats={WakfuStats.CriticalRate} value="0%" statsColor={getStatsColor(0, true)} />
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
          stats={WakfuStats.CriticalRate}
          value={`${build.stats[WakfuStats.CriticalRate]}%`}
          statsColor={getStatsColor(build.stats[WakfuStats.CriticalRate], true)}
        />
        <BuildStats
          stats={WakfuStats.Willpower}
          value={build.stats[WakfuStats.Willpower].toLocaleString("fr-FR")}
          statsColor={getStatsColor(build.stats[WakfuStats.Willpower])}
        />
      </Stack>
    </StackGrid>
  );
};
