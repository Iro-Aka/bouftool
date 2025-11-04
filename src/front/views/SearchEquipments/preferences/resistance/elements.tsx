import { ToggleButtonGroup } from "@mui/material";
import { TooltipToggleButton } from "src/front/components/TooltipToggleButton";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { getWakfuStatLabel } from "src/wakfu/stats/i18n/label";
import { EnumWakfuStat } from "src/wakfu/stats/types";
import { EnumWakfuLang } from "src/wakfu/utils/types";
import type { TSearchItemsPreferences } from "../logics";

export type TSearchItemsResistanceElementsPreferencesProps = {
  value: TSearchItemsPreferences["resistance"]["elementsPriority"];
  onChange: (value: TSearchItemsPreferences["resistance"]["elementsPriority"]) => void;
};

export const SearchItemsResistanceElementsPreferences = ({
  value,
  onChange,
}: TSearchItemsResistanceElementsPreferencesProps) => {
  return (
    <ToggleButtonGroup
      variant="push"
      sx={{ bgcolor: "grey.900" }}
      value={value}
      onChange={(_, newValue: TSearchItemsPreferences["resistance"]["elementsPriority"]) => onChange(newValue)}
    >
      <TooltipToggleButton
        value={EnumWakfuStat.FireResistance}
        tooltip={getWakfuStatLabel(EnumWakfuStat.FireResistance, EnumWakfuLang.French)}
      >
        <StatsIcon>{EnumWakfuStat.FireResistance}</StatsIcon>
      </TooltipToggleButton>
      <TooltipToggleButton
        value={EnumWakfuStat.WaterResistance}
        tooltip={getWakfuStatLabel(EnumWakfuStat.WaterResistance, EnumWakfuLang.French)}
      >
        <StatsIcon>{EnumWakfuStat.WaterResistance}</StatsIcon>
      </TooltipToggleButton>
      <TooltipToggleButton
        value={EnumWakfuStat.EarthResistance}
        tooltip={getWakfuStatLabel(EnumWakfuStat.EarthResistance, EnumWakfuLang.French)}
      >
        <StatsIcon>{EnumWakfuStat.EarthResistance}</StatsIcon>
      </TooltipToggleButton>
      <TooltipToggleButton
        value={EnumWakfuStat.AirResistance}
        tooltip={getWakfuStatLabel(EnumWakfuStat.AirResistance, EnumWakfuLang.French)}
      >
        <StatsIcon>{EnumWakfuStat.AirResistance}</StatsIcon>
      </TooltipToggleButton>
    </ToggleButtonGroup>
  );
};
