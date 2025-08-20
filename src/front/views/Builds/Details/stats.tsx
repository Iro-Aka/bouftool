import { Typography, type TypographyProps } from "@mui/material";
import { StackRow } from "src/front/components/Layout/StackRow";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import type { WakfuStats } from "src/wakfu/types/action";
import { searchableStats } from "../../SearchEquipments/filters/stats/constants";

export type TBuildStatsProps = {
  stats: WakfuStats;
  value: string;
  hideLabel?: boolean;
  statsColor?: string;
  slotProps?: {
    typoValue?: Partial<TypographyProps>;
  };
};

export const BuildStats = ({ stats, value, hideLabel, statsColor, slotProps }: TBuildStatsProps) => {
  return (
    <StackRow sx={{ justifyContent: "space-between", "&&": { gap: 0.5 } }}>
      <StackRow sx={{ "&&": { gap: 0.25 } }}>
        <StatsIcon height={24}>{stats}</StatsIcon>
        {!hideLabel && <Typography variant="caption">{searchableStats[stats].fr}</Typography>}
      </StackRow>
      <Typography variant="caption" {...slotProps?.typoValue} sx={{ color: statsColor }}>
        {value}
      </Typography>
    </StackRow>
  );
};
