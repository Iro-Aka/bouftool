import { WakfuStatIcons } from "src/wakfu/stats/icons";
import type { EnumWakfuStat } from "src/wakfu/stats/types";
import { StyledImg, type TStyledImgProps } from "../StyledImg";

export type TStatsIconProps = Omit<TStyledImgProps, "children" | "src" | "alt"> & {
  children: EnumWakfuStat;
};

export const StatsIcon = ({ children, ...props }: TStatsIconProps) => {
  const icon = WakfuStatIcons[children];
  if (icon === null) {
    return null;
  }
  return <StyledImg src={`wakfu/charac/${icon}.png`} alt={icon} {...props} />;
};
