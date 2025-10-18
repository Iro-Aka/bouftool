import { Typography } from "@mui/material";
import { getWakfuStatEffectLabel } from "src/wakfu/stats/i18n/effects";
import type { EnumWakfuStat } from "src/wakfu/stats/types";
import { EnumWakfuLang } from "src/wakfu/utils/types";
import { StatsIcon } from "../../StatsIcon";
import { cardItemClasses } from "../styles";

export interface TCardItemStatsRowProps {
  stat: EnumWakfuStat;
  value: number;
}

export const CardItemStatsRow = ({ stat, value }: TCardItemStatsRowProps) => {
  return (
    <div className={cardItemClasses.statsRow}>
      <StatsIcon width={18}>{stat}</StatsIcon>
      <Typography variant="body1">{getWakfuStatEffectLabel(EnumWakfuLang.French, stat, value)}</Typography>
    </div>
  );
};
