import { ToggleButton, type ToggleButtonProps, Tooltip } from "@mui/material";
import type { ReactNode } from "react";

export type TooltipToggleButtonProps = ToggleButtonProps & {
  tooltip?: ReactNode;
};

export const TooltipToggleButton = ({ tooltip, ...props }: TooltipToggleButtonProps) => {
  return (
    <Tooltip title={tooltip} enterDelay={500} disableInteractive>
      <ToggleButton {...props} />
    </Tooltip>
  );
};
