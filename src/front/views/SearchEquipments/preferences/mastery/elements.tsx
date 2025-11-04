import { ToggleButtonGroup } from "@mui/material";
import { TooltipToggleButton } from "src/front/components/TooltipToggleButton";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { getWakfuStatLabel } from "src/wakfu/stats/i18n/label";
import { EnumWakfuStat, type TWakfuStatElementalMastery } from "src/wakfu/stats/types";
import { EnumWakfuLang } from "src/wakfu/utils/types";

export type SearchItemsMasteryElementsPreferencesProps = {
  value: TWakfuStatElementalMastery[];
  onChange: (value: TWakfuStatElementalMastery[]) => void;
};

export const SearchItemsMasteryElementsPreferences = ({
  value,
  onChange,
}: SearchItemsMasteryElementsPreferencesProps) => {
  return (
    <ToggleButtonGroup
      variant="push"
      value={value}
      onChange={(_, newValue: TWakfuStatElementalMastery[]) => onChange(newValue)}
    >
      <TooltipToggleButton
        value={EnumWakfuStat.FireMastery}
        tooltip={getWakfuStatLabel(EnumWakfuStat.FireMastery, EnumWakfuLang.French)}
      >
        <StatsIcon>{EnumWakfuStat.FireMastery}</StatsIcon>
      </TooltipToggleButton>
      <TooltipToggleButton
        value={EnumWakfuStat.WaterMastery}
        tooltip={getWakfuStatLabel(EnumWakfuStat.WaterMastery, EnumWakfuLang.French)}
      >
        <StatsIcon>{EnumWakfuStat.WaterMastery}</StatsIcon>
      </TooltipToggleButton>
      <TooltipToggleButton
        value={EnumWakfuStat.EarthMastery}
        tooltip={getWakfuStatLabel(EnumWakfuStat.EarthMastery, EnumWakfuLang.French)}
      >
        <StatsIcon>{EnumWakfuStat.EarthMastery}</StatsIcon>
      </TooltipToggleButton>
      <TooltipToggleButton
        value={EnumWakfuStat.AirMastery}
        tooltip={getWakfuStatLabel(EnumWakfuStat.AirMastery, EnumWakfuLang.French)}
      >
        <StatsIcon>{EnumWakfuStat.AirMastery}</StatsIcon>
      </TooltipToggleButton>
    </ToggleButtonGroup>
  );
};
