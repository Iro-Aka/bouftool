import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { Stack } from "@mui/material";
import type { ElectronEvents, ElectronEventsRenderer } from "src/electron/types";
import { StackRow } from "src/front/components/Layout/StackRow";
import { ItemSlot } from "src/front/components/Wakfu/ItemSlot";
import { isWakfuEquipmentPosition } from "src/wakfu/itemTypes/types";
import { type EnumWakfuStat, isWakfuStat, type TWakfuStats } from "src/wakfu/stats/types";
import { ModalCompareItemCardRow } from "./row";
import { CompareItemStats, compareItemStatsClasses } from "./styles";

const splitStats = (stats: TWakfuStats) => {
  const positiveValues: { stat: EnumWakfuStat; value: number }[] = [];
  const negativeValues: { stat: EnumWakfuStat; value: number }[] = [];
  for (const [key, value] of Object.entries(stats)) {
    if (isWakfuStat(key)) {
      if (value > 0) {
        positiveValues.push({ stat: key, value });
      } else if (value < 0) {
        negativeValues.push({ stat: key, value });
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

  return (
    <Stack sx={{ p: 1.5, gap: 1.5, bgcolor: "surface.100", borderRadius: "8px" }}>
      <StackRow sx={{ justifyContent: "space-between" }}>
        <StackRow sx={{ flex: 1, justifyContent: "center" }}>
          {results.sourceItems.map((item) =>
            isWakfuEquipmentPosition(item) ? (
              <ItemSlot key={item} position={item} item={{ item: null, disabled: false }} size={48} />
            ) : (
              <ItemSlot key={item.id} item={{ item, disabled: false }} size={48} />
            ),
          )}
        </StackRow>
        <CompareArrowsIcon sx={{ flex: "0 0 auto" }} />
        <StackRow sx={{ flex: 1, justifyContent: "center" }}>
          <ItemSlot item={{ item: results.targetItem, disabled: false }} size={48} />
        </StackRow>
      </StackRow>
      <CompareItemStats className={compareItemStatsClasses.root}>
        <ModalCompareItemCardRow type="loss" stats={negativeValues} length={rowsLength} />
        <ModalCompareItemCardRow type="gain" stats={positiveValues} length={rowsLength} />
      </CompareItemStats>
    </Stack>
  );
};
