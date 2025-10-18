import { Stack, Typography } from "@mui/material";
import { StackRow } from "src/front/components/Layout/StackRow";
import { WakfuStatesDefinitions } from "src/wakfu/states/definitions";
import { getWakfuStateEffectLabel } from "src/wakfu/states/descriptions";
import { WakfuStateLabels } from "src/wakfu/states/labels";
import type { EnumWakfuState } from "src/wakfu/states/types";
import { StateIcon } from "../../StateIcon";

export type TCardItemStateTooltipProps = {
  state: EnumWakfuState;
  level: number;
};

export const CardItemStateTooltip = ({ state, level }: TCardItemStateTooltipProps) => {
  const stateDefinition = WakfuStatesDefinitions[state];

  return (
    <Stack sx={{ gap: 1 }}>
      <StackRow sx={{ justifyContent: "space-between" }}>
        <StackRow>
          <StateIcon width={24}>{state}</StateIcon>
          <Typography variant="subtitle2">{WakfuStateLabels[state]}</Typography>
        </StackRow>
        <Typography variant="caption">Niv. {level}</Typography>
      </StackRow>
      <Typography variant="body2">{getWakfuStateEffectLabel(state, level, stateDefinition.effects)}</Typography>
    </Stack>
  );
};
