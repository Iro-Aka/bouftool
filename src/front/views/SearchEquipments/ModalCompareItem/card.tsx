import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { Stack } from "@mui/material";
import type { ElectronEvents, ElectronEventsRenderer } from "src/electron/types";
import { StackRow } from "src/front/components/Layout/StackRow";
import { ItemSlot } from "src/front/components/Wakfu/ItemSlot";
import { isWakfuStats, type WakfuStats } from "src/wakfu/types/action";
import { ModalCompareItemCardRow } from "./row";
import { CompareItemStats, compareItemStatsClasses } from "./styles";

const splitStats = (stats: Record<WakfuStats, number>) => {
  const positiveValues: { stat: WakfuStats; value: number }[] = [];
  const negativeValues: { stat: WakfuStats; value: number }[] = [];
  for (const [key, value] of Object.entries(stats)) {
    const stat = Number(key);
    if (isWakfuStats(stat)) {
      if (value > 0) {
        positiveValues.push({ stat: stat, value });
      } else if (value < 0) {
        negativeValues.push({ stat: stat, value });
      }
    }
  }
  return { positiveValues, negativeValues };
};

export type TModalCompareItemCardProps = {
  results: ElectronEventsRenderer[ElectronEvents.BuildCompareItem][number];
};

export const ModalCompareItemCard = ({ results }: TModalCompareItemCardProps) => {
  const { positiveValues, negativeValues } = splitStats(results.stats);
  const rowsLength = Math.max(positiveValues.length, negativeValues.length);

  console.log(results.stats, positiveValues, negativeValues);

  return (
    <Stack sx={{ p: 1.5, gap: 1.5, bgcolor: "surface.100", borderRadius: "8px" }}>
      <StackRow sx={{ justifyContent: "space-between" }}>
        <StackRow sx={{ flex: 1, justifyContent: "center" }}>
          {results.sourceItems.map((item) => (
            <ItemSlot key={item.id} item={item} size={48} />
          ))}
        </StackRow>
        <CompareArrowsIcon sx={{ flex: "0 0 auto" }} />
        <StackRow sx={{ flex: 1, justifyContent: "center" }}>
          <ItemSlot item={results.targetItem} size={48} />
        </StackRow>
      </StackRow>
      <CompareItemStats className={compareItemStatsClasses.root}>
        <ModalCompareItemCardRow type="loss" stats={negativeValues} length={rowsLength} />
        <ModalCompareItemCardRow type="gain" stats={positiveValues} length={rowsLength} />
      </CompareItemStats>
    </Stack>
  );
};
