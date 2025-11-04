import InfoIcon from "@mui/icons-material/Info";
import { ClickAwayListener, IconButton, Tooltip } from "@mui/material";
import { type ReactNode, useState } from "react";

export type TooltipInfoProps = {
  title: ReactNode;
};

export const TooltipInfo = ({ title }: TooltipInfoProps) => {
  const [open, setOpen] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Tooltip open={open} title={title} disableFocusListener disableHoverListener disableTouchListener arrow>
        <IconButton sx={{ width: 24, height: 24 }} onClick={() => setOpen(!open)}>
          <InfoIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Tooltip>
    </ClickAwayListener>
  );
};
