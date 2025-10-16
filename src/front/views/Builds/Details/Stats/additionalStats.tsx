import { Stack, Tooltip, Typography } from "@mui/material";
import type { ElectronEvents, ElectronEventsRenderer } from "src/electron/types";
import { StackRow, stackRowClasses } from "src/front/components/Layout/StackRow";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { getWakfuStatEffectLabel } from "src/wakfu/stats/i18n/effects";
import { EnumWakfuStat } from "src/wakfu/stats/types";
import { EnumWakfuLang } from "src/wakfu/utils/types";
import { useBuildDetailsContext } from "../context";
import { BuildStats } from "../stats";
import { getStatsColor } from "./logics";
import { StatsRow, statsRowClasses } from "./styles";

const getElementalMastery = (build: ElectronEventsRenderer[ElectronEvents.GetBuild], value: number) => {
  switch (value) {
    case build.stats[EnumWakfuStat.FireMastery]:
      return EnumWakfuStat.FireMastery;
    case build.stats[EnumWakfuStat.WaterMastery]:
      return EnumWakfuStat.WaterMastery;
    case build.stats[EnumWakfuStat.EarthMastery]:
      return EnumWakfuStat.EarthMastery;
    case build.stats[EnumWakfuStat.AirMastery]:
      return EnumWakfuStat.AirMastery;
    default:
      return EnumWakfuStat.FireMastery;
  }
};

const getRangeMastery = (build: ElectronEventsRenderer[ElectronEvents.GetBuild], value: number) => {
  switch (value) {
    case build.stats[EnumWakfuStat.DistanceMastery]:
      return EnumWakfuStat.DistanceMastery;
    case build.stats[EnumWakfuStat.MeleeMastery]:
      return EnumWakfuStat.MeleeMastery;
    default:
      return EnumWakfuStat.DistanceMastery;
  }
};

const MasteryTooltip = () => {
  const build = useBuildDetailsContext();

  const elementalMastery = Math.max(
    build.stats[EnumWakfuStat.FireMastery] ?? 0,
    build.stats[EnumWakfuStat.WaterMastery] ?? 0,
    build.stats[EnumWakfuStat.EarthMastery] ?? 0,
    build.stats[EnumWakfuStat.AirMastery] ?? 0,
  );
  const rangeMastery = Math.max(
    build.stats[EnumWakfuStat.DistanceMastery] ?? 0,
    build.stats[EnumWakfuStat.MeleeMastery] ?? 0,
  );
  const criticalMastery = build.stats[EnumWakfuStat.CriticalMastery] ?? 0;
  const rearMastery = build.stats[EnumWakfuStat.RearMastery] ?? 0;
  const berserkMastery = build.stats[EnumWakfuStat.BerserkMastery] ?? 0;
  const healingMastery = build.stats[EnumWakfuStat.HealingMastery] ?? 0;

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
            {getWakfuStatEffectLabel(EnumWakfuLang.French, getElementalMastery(build, elementalMastery))}
          </Typography>
        </StackRow>
      )}
      {rangeMastery !== 0 && (
        <StackRow>
          <StatsIcon>{getRangeMastery(build, rangeMastery)}</StatsIcon>
          <Typography variant="caption">
            <span style={{ color: getStatsColor(rangeMastery) }}>{rangeMastery.toLocaleString("fr-FR")}</span>
            {getWakfuStatEffectLabel(EnumWakfuLang.French, getRangeMastery(build, rangeMastery))}
          </Typography>
        </StackRow>
      )}
      {criticalMastery > 0 && (
        <StackRow>
          <StatsIcon>{EnumWakfuStat.CriticalMastery}</StatsIcon>
          <Typography variant="caption">
            <span style={{ color: getStatsColor(criticalMastery) }}>{criticalMastery.toLocaleString("fr-FR")}</span>
            {getWakfuStatEffectLabel(EnumWakfuLang.French, EnumWakfuStat.CriticalMastery)}
          </Typography>
        </StackRow>
      )}
      {rearMastery > 0 && (
        <StackRow>
          <StatsIcon>{EnumWakfuStat.RearMastery}</StatsIcon>
          <Typography variant="caption">
            <span style={{ color: getStatsColor(rearMastery) }}>{rearMastery.toLocaleString("fr-FR")}</span>
            {getWakfuStatEffectLabel(EnumWakfuLang.French, EnumWakfuStat.RearMastery)}
          </Typography>
        </StackRow>
      )}
      {berserkMastery > 0 && (
        <StackRow>
          <StatsIcon>{EnumWakfuStat.BerserkMastery}</StatsIcon>
          <Typography variant="caption">
            <span style={{ color: getStatsColor(berserkMastery) }}>{berserkMastery.toLocaleString("fr-FR")}</span>
            {getWakfuStatEffectLabel(EnumWakfuLang.French, EnumWakfuStat.BerserkMastery)}
          </Typography>
        </StackRow>
      )}
      {healingMastery > 0 && (
        <StackRow>
          <StatsIcon>{EnumWakfuStat.HealingMastery}</StatsIcon>
          <Typography variant="caption">
            <span style={{ color: getStatsColor(healingMastery) }}>{healingMastery.toLocaleString("fr-FR")}</span>
            {getWakfuStatEffectLabel(EnumWakfuLang.French, EnumWakfuStat.HealingMastery)}
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
      build.stats[EnumWakfuStat.FireMastery] ?? 0,
      build.stats[EnumWakfuStat.WaterMastery] ?? 0,
      build.stats[EnumWakfuStat.EarthMastery] ?? 0,
      build.stats[EnumWakfuStat.AirMastery] ?? 0,
    ) +
    Math.max(build.stats[EnumWakfuStat.MeleeMastery] ?? 0, build.stats[EnumWakfuStat.DistanceMastery] ?? 0) +
    (build.stats[EnumWakfuStat.CriticalMastery] ?? 0) +
    (build.stats[EnumWakfuStat.RearMastery] ?? 0) +
    (build.stats[EnumWakfuStat.BerserkMastery] ?? 0) +
    (build.stats[EnumWakfuStat.HealingMastery] ?? 0);

  return (
    <StatsRow columns={2} className={statsRowClasses.root}>
      <BuildStats
        stats={EnumWakfuStat.Armor}
        value={(build.stats[EnumWakfuStat.Armor] ?? 0).toLocaleString("fr-FR")}
        statsColor="#218246"
      />
      <Tooltip title={<MasteryTooltip />} placement="top" arrow disableInteractive>
        <BuildStats
          stats={EnumWakfuStat.ElementalMastery}
          label="Maîtrise cumulée"
          value={cumulatedMastery.toLocaleString("fr-FR")}
          statsColor={getStatsColor(cumulatedMastery)}
        />
      </Tooltip>
    </StatsRow>
  );
};
