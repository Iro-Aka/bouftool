import type { EnumWakfuStat } from "src/wakfu/stats/types";
import { cardItemClasses } from "../styles";
import { CardItemStatsRow } from "./row";

export type TCardItemStatsProps = {
  stats: Partial<Record<EnumWakfuStat, number>>;
};

export const CardItemStats = ({ stats }: TCardItemStatsProps) => {
  const statsRows = [];
  for (const [stat, value] of Object.entries(stats)) {
    statsRows.push(<CardItemStatsRow key={stat} stat={stat as EnumWakfuStat} value={value} />);
  }

  return <div className={cardItemClasses.stats}>{statsRows}</div>;
};
