import { Stack, Tooltip, Typography } from "@mui/material";
import type { ElectronEvents, ElectronEventsRenderer } from "src/electron/types";
import { StackRow, stackRowClasses } from "src/front/components/Layout/StackRow";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { getWakfuStatsEffectLabel } from "src/front/constants/stats";
import { WakfuStats } from "src/wakfu/types/action";
import { useBuildDetailsContext } from "../context";
import { BuildStats } from "../stats";
import { getStatsColor } from "./logics";
import { StatsRow, statsRowClasses } from "./styles";

const getElementalMastery = (build: ElectronEventsRenderer[ElectronEvents.GetBuild], value: number) => {
  switch (value) {
    case build.stats[WakfuStats.MasteryFire]:
      return WakfuStats.MasteryFire;
    case build.stats[WakfuStats.MasteryWater]:
      return WakfuStats.MasteryWater;
    case build.stats[WakfuStats.MasteryEarth]:
      return WakfuStats.MasteryEarth;
    case build.stats[WakfuStats.MasteryAir]:
      return WakfuStats.MasteryAir;
    default:
      return WakfuStats.MasteryFire;
  }
};

const getRangeMastery = (build: ElectronEventsRenderer[ElectronEvents.GetBuild], value: number) => {
  switch (value) {
    case build.stats[WakfuStats.DistanceMastery]:
      return WakfuStats.DistanceMastery;
    case build.stats[WakfuStats.MeleeMastery]:
      return WakfuStats.MeleeMastery;
    default:
      return WakfuStats.DistanceMastery;
  }
};

const MasteryTooltip = () => {
  const build = useBuildDetailsContext();

  const elementalMastery = Math.max(
    build.stats[WakfuStats.MasteryFire],
    build.stats[WakfuStats.MasteryWater],
    build.stats[WakfuStats.MasteryEarth],
    build.stats[WakfuStats.MasteryAir],
  );
  const rangeMastery = Math.max(build.stats[WakfuStats.DistanceMastery], build.stats[WakfuStats.MeleeMastery]);
  const criticalMastery = build.stats[WakfuStats.CriticalMastery];
  const backMastery = build.stats[WakfuStats.BackMastery];
  const berserkMastery = build.stats[WakfuStats.BerserkMastery];
  const healingMastery = build.stats[WakfuStats.HealingMastery];

  return (
    <Stack sx={{ [`& > .${stackRowClasses.root}`]: { gap: 0.5 }, "& img": { width: 20, height: 20 } }}>
      <Typography variant="caption" sx={{ mb: 1 }}>
        Correspond au cumul de maîtrise maximum que vous pouvez atteindre.
      </Typography>
      {elementalMastery !== 0 && (
        <StackRow>
          <StatsIcon>{getElementalMastery(build, elementalMastery)}</StatsIcon>
          <Typography variant="caption">
            <span style={{ color: getStatsColor(elementalMastery) }}>{elementalMastery.toLocaleString("fr-FR")}</span>
            {getWakfuStatsEffectLabel(getElementalMastery(build, elementalMastery))}
          </Typography>
        </StackRow>
      )}
      {rangeMastery !== 0 && (
        <StackRow>
          <StatsIcon>{getRangeMastery(build, rangeMastery)}</StatsIcon>
          <Typography variant="caption">
            <span style={{ color: getStatsColor(rangeMastery) }}>{rangeMastery.toLocaleString("fr-FR")}</span>
            {getWakfuStatsEffectLabel(getRangeMastery(build, rangeMastery))}
          </Typography>
        </StackRow>
      )}
      {criticalMastery > 0 && (
        <StackRow>
          <StatsIcon>{WakfuStats.CriticalMastery}</StatsIcon>
          <Typography variant="caption">
            <span style={{ color: getStatsColor(criticalMastery) }}>{criticalMastery.toLocaleString("fr-FR")}</span>
            {getWakfuStatsEffectLabel(WakfuStats.CriticalMastery)}
          </Typography>
        </StackRow>
      )}
      {backMastery > 0 && (
        <StackRow>
          <StatsIcon>{WakfuStats.BackMastery}</StatsIcon>
          <Typography variant="caption">
            <span style={{ color: getStatsColor(backMastery) }}>{backMastery.toLocaleString("fr-FR")}</span>
            {getWakfuStatsEffectLabel(WakfuStats.BackMastery)}
          </Typography>
        </StackRow>
      )}
      {berserkMastery > 0 && (
        <StackRow>
          <StatsIcon>{WakfuStats.BerserkMastery}</StatsIcon>
          <Typography variant="caption">
            <span style={{ color: getStatsColor(berserkMastery) }}>{berserkMastery.toLocaleString("fr-FR")}</span>
            {getWakfuStatsEffectLabel(WakfuStats.BerserkMastery)}
          </Typography>
        </StackRow>
      )}
      {healingMastery > 0 && (
        <StackRow>
          <StatsIcon>{WakfuStats.HealingMastery}</StatsIcon>
          <Typography variant="caption">
            <span style={{ color: getStatsColor(healingMastery) }}>{healingMastery.toLocaleString("fr-FR")}</span>
            {getWakfuStatsEffectLabel(WakfuStats.HealingMastery)}
          </Typography>
        </StackRow>
      )}
    </Stack>
  );
};

export const BuildDetailsAdditionalStats = () => {
  const build = useBuildDetailsContext();
  const cumulatedMastery =
    Math.max(
      build.stats[WakfuStats.MasteryFire],
      build.stats[WakfuStats.MasteryWater],
      build.stats[WakfuStats.MasteryEarth],
      build.stats[WakfuStats.MasteryAir],
    ) +
    Math.max(build.stats[WakfuStats.MeleeMastery], build.stats[WakfuStats.DistanceMastery]) +
    (build.stats[WakfuStats.CriticalMastery] || 0) +
    (build.stats[WakfuStats.BackMastery] || 0) +
    (build.stats[WakfuStats.BerserkMastery] || 0) +
    (build.stats[WakfuStats.HealingMastery] || 0);

  return (
    <StatsRow columns={2} className={statsRowClasses.root}>
      <BuildStats
        stats={WakfuStats.Armor}
        value={build.stats[WakfuStats.Armor].toLocaleString("fr-FR")}
        statsColor="#218246"
      />
      <Tooltip title={<MasteryTooltip />} placement="top" arrow disableInteractive>
        <BuildStats
          stats={WakfuStats.Mastery}
          label="Maîtrise cumulée"
          value={cumulatedMastery.toLocaleString("fr-FR")}
          statsColor={getStatsColor(cumulatedMastery)}
        />
      </Tooltip>
    </StatsRow>
  );
};
