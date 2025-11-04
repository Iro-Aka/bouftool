import { ToggleButtonGroup } from "@mui/material";
import { TooltipToggleButton } from "src/front/components/TooltipToggleButton";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { getWakfuStatLabel } from "src/wakfu/stats/i18n/label";
import { EnumWakfuStat } from "src/wakfu/stats/types";
import { EnumWakfuLang } from "src/wakfu/utils/types";

export type TSearchItemsMeleeRangeMasteryPreferencesProps = {
  value: EnumWakfuStat.MeleeMastery | EnumWakfuStat.DistanceMastery | null;
  onChange: (value: EnumWakfuStat.MeleeMastery | EnumWakfuStat.DistanceMastery | null) => void;
};

export const SearchItemsMeleeRangeMasteryPreferences = ({
  value,
  onChange,
}: TSearchItemsMeleeRangeMasteryPreferencesProps) => {
  return (
    <ToggleButtonGroup variant="push" value={value} exclusive onChange={(_event, newValue) => onChange(newValue)}>
      <TooltipToggleButton
        value={EnumWakfuStat.MeleeMastery}
        tooltip={getWakfuStatLabel(EnumWakfuStat.MeleeMastery, EnumWakfuLang.French)}
      >
        <StatsIcon>{EnumWakfuStat.MeleeMastery}</StatsIcon>
      </TooltipToggleButton>
      <TooltipToggleButton
        value={EnumWakfuStat.DistanceMastery}
        tooltip={getWakfuStatLabel(EnumWakfuStat.DistanceMastery, EnumWakfuLang.French)}
      >
        <StatsIcon>{EnumWakfuStat.DistanceMastery}</StatsIcon>
      </TooltipToggleButton>
    </ToggleButtonGroup>
  );
};
