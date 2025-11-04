import { ToggleButtonGroup } from "@mui/material";
import { TooltipToggleButton } from "src/front/components/TooltipToggleButton";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { getWakfuStatLabel } from "src/wakfu/stats/i18n/label";
import { EnumWakfuStat } from "src/wakfu/stats/types";
import { EnumWakfuLang } from "src/wakfu/utils/types";
import type { TSearchItemsPreferences } from "../logics";

export type TSearchItemsSubMasteriesPreferencesProps = {
  value: TSearchItemsPreferences["mastery"]["subMasteries"];
  onChange: (value: TSearchItemsPreferences["mastery"]["subMasteries"]) => void;
};

export const SearchItemsSubMasteriesPreferences = ({ value, onChange }: TSearchItemsSubMasteriesPreferencesProps) => {
  return (
    <ToggleButtonGroup
      variant="push"
      value={value}
      onChange={(_, newValue: TSearchItemsPreferences["mastery"]["subMasteries"]) => onChange(newValue)}
    >
      <TooltipToggleButton
        value={EnumWakfuStat.CriticalMastery}
        tooltip={getWakfuStatLabel(EnumWakfuStat.CriticalMastery, EnumWakfuLang.French)}
      >
        <StatsIcon>{EnumWakfuStat.CriticalMastery}</StatsIcon>
      </TooltipToggleButton>
      <TooltipToggleButton
        value={EnumWakfuStat.RearMastery}
        tooltip={getWakfuStatLabel(EnumWakfuStat.RearMastery, EnumWakfuLang.French)}
      >
        <StatsIcon>{EnumWakfuStat.RearMastery}</StatsIcon>
      </TooltipToggleButton>
      <TooltipToggleButton
        value={EnumWakfuStat.BerserkMastery}
        tooltip={getWakfuStatLabel(EnumWakfuStat.BerserkMastery, EnumWakfuLang.French)}
      >
        <StatsIcon>{EnumWakfuStat.BerserkMastery}</StatsIcon>
      </TooltipToggleButton>
      <TooltipToggleButton
        value={EnumWakfuStat.HealingMastery}
        tooltip={getWakfuStatLabel(EnumWakfuStat.HealingMastery, EnumWakfuLang.French)}
      >
        <StatsIcon>{EnumWakfuStat.HealingMastery}</StatsIcon>
      </TooltipToggleButton>
    </ToggleButtonGroup>
  );
};
