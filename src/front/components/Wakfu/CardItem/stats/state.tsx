import { Tooltip, Typography } from "@mui/material";
import { WakfuStateLabels } from "src/wakfu/states/labels";
import type { EnumWakfuState } from "src/wakfu/states/types";
import { StateIcon } from "../../StateIcon";
import { cardItemClasses } from "../styles";
import { CardItemStateTooltip } from "./stateTooltip";

export type TCardItemStatsRowStateProps = {
  state: EnumWakfuState;
  level: number;
};

export const CardItemStatsRowState = ({ state, level }: TCardItemStatsRowStateProps) => {
  return (
    <div className={cardItemClasses.statsRow}>
      <StateIcon width={18}>{state}</StateIcon>
      <Typography variant="body1">
        <Tooltip title={<CardItemStateTooltip state={state} level={level} />}>
          <span className={cardItemClasses.stateLabel}>{WakfuStateLabels[state]}</span>
        </Tooltip>
        <span> (+{level} Niv.)</span>
      </Typography>
    </div>
  );
};
