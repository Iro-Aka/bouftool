import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { Button } from "@mui/material";
import { ElectronEvents } from "src/electron/types";
import { sendElectronEvent } from "src/front/hooks/electron";

export type TSearchItemsCompareProps = {
  buildId?: string;
  itemId: number;
};

export const SearchItemsCompare = ({ buildId, itemId }: TSearchItemsCompareProps) => {
  if (!buildId) {
    return null;
  }
  return (
    <Button
      variant="push"
      sx={{ minWidth: 0, p: 0, aspectRatio: "1" }}
      onClick={() => sendElectronEvent(ElectronEvents.BuildCompareItem, { buildId, itemId })}
    >
      <CompareArrowsIcon sx={{ fontSize: "18px" }} />
    </Button>
  );
};
