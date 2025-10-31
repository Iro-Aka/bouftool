import { Box } from "@mui/material";
import { Activity, type ReactElement, useLayoutEffect, useRef } from "react";
import { type CellComponentProps, Grid, useGridRef } from "react-window";
import { CardItem } from "src/front/components/Wakfu/CardItem";
import { useResizeObserver } from "src/front/hooks/useResizeObserver";
import { type TSearchItemsContext, useSearchItemsContext } from "./contexts/search";

export type TSearchItemsListProps = {
  buildId?: string;
};

type TCellProps = {
  items: TSearchItemsContext;
  columnCount: number;
  buildId: string | undefined;
};

const CellComponent = ({
  columnIndex,
  items,
  columnCount,
  buildId,
  rowIndex,
  style,
}: CellComponentProps<TCellProps>): ReactElement => {
  const item = items[rowIndex * columnCount + columnIndex];
  if (!item) {
    return <div>Unknown</div>;
  }
  return (
    <Box
      key={item.id}
      style={style}
      sx={{
        pr: 2,
        pb: 2,
        [`&:nth-of-type(-n+${columnCount})`]: { pt: "2px" },
        [`&:nth-of-type(${columnCount}n)`]: { pr: "2px" },
        [`&:nth-of-type(${columnCount}n+1)`]: { pl: "2px" },
        "& > div": { height: "100%" },
      }}
    >
      <CardItem item={item} buildId={buildId} displayActions />
    </Box>
  );
};

export const SearchItemsList = ({ buildId }: TSearchItemsListProps) => {
  const items = useSearchItemsContext();
  const gridRef = useGridRef(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const size = useResizeObserver(boxRef.current);
  const columnCount = Math.max(1, Math.floor(size.width / 384));
  const columnWidth = (size.width - 16) / columnCount;
  const rowCount = Math.ceil(items.length / columnCount);

  const rowHeight = (index: number) => {
    const realIndex = index * columnCount;
    let highestEffectsCounts = 0;
    for (let i = 0; i < columnCount; i++) {
      const item = items[realIndex + i];
      if (item) {
        const effectsCount = Object.values(item.stats).length;
        if (effectsCount > highestEffectsCounts) {
          highestEffectsCounts = effectsCount;
        }
      }
    }
    if (buildId) {
      return (
        196 +
        16 +
        // (highestEffectsCounts > 6 ? 24 : 0) + // Added height for the fourth effect only
        Math.max(0, highestEffectsCounts - 6) * 24 // Added height for effects beyond the fourth
      );
    }
    return (
      164 + // Base card height
      16 + // Added padding
      (highestEffectsCounts > 4 ? 10 : 0) + // Added height for the fourth effect only
      Math.max(0, highestEffectsCounts - 5) * 24 // Added height for effects beyond the fourth
    );
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: Reset on new items
  useLayoutEffect(() => {
    if (gridRef.current && items.length > 0) {
      gridRef.current.scrollToRow({ index: 0, align: "start" });
    }
  }, [items, columnWidth]);

  return (
    <Box sx={{ flex: 1, overflow: "hidden" }} ref={boxRef}>
      <Activity mode={columnWidth > 0 ? "visible" : "hidden"}>
        <Grid
          gridRef={gridRef}
          rowCount={rowCount}
          columnCount={columnCount}
          columnWidth={columnWidth}
          rowHeight={rowHeight}
          overscanCount={2}
          cellProps={{ items, columnCount, buildId }}
          cellComponent={CellComponent}
        />
      </Activity>
    </Box>
  );
};
