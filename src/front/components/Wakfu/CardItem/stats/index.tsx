import type { WakfuItem } from "src/wakfu/items";
import { isWakfuState } from "src/wakfu/states/types";
import { isWakfuStat } from "src/wakfu/stats/types";
import { cardItemClasses } from "../styles";
import { CardItemStatsRow } from "./row";
import { CardItemStatsRowState } from "./state";

export type TCardItemStatsProps = {
  stats: ReturnType<WakfuItem["toObject"]>["stats"];
};

export const CardItemStats = ({ stats }: TCardItemStatsProps) => {
  const statsRows = [];
  for (const [stat, value] of Object.entries(stats)) {
    if (isWakfuStat(stat)) {
      statsRows.push(<CardItemStatsRow key={stat} stat={stat} value={value} />);
    } else if (isWakfuState(stat)) {
      statsRows.push(<CardItemStatsRowState key={stat} state={stat} level={value} />);
    }
  }

  return <div className={cardItemClasses.stats}>{statsRows}</div>;
};
