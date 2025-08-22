import { Box } from "@mui/material";
import { useLayoutEffect, useRef } from "react";
import { VariableSizeGrid } from "react-window";
import { useResizeObserver } from "src/front/hooks/useResizeObserver";
import { useSearchItemsContext } from "./contexts/search";
import { SearchEquipmentsItem } from "./item/item";

export type TSearchItemsListProps = {
  onEquipItem?: (itemId: number) => void;
};

export const SearchItemsList = ({ onEquipItem }: TSearchItemsListProps) => {
  const { items } = useSearchItemsContext();
  const gridRef = useRef<VariableSizeGrid>(null);
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
        const effectsCount = item.equipEffectsLabels.length;
        if (effectsCount > highestEffectsCounts) {
          highestEffectsCounts = effectsCount;
        }
      }
    }
    if (onEquipItem) {
      return (
        196 +
        16 +
        // (highestEffectsCounts > 6 ? 24 : 0) + // Added height for the fourth effect only
        Math.max(0, highestEffectsCounts - 6) * 24 // Added height for effects beyond the fourth
      );
    }
    return (
      128 + // Base card height
      16 + // Added padding
      (highestEffectsCounts > 3 ? 20 : 0) + // Added height for the fourth effect only
      Math.max(0, highestEffectsCounts - 4) * 24 // Added height for effects beyond the fourth
    );
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: Reset on new items
  useLayoutEffect(() => {
    if (gridRef.current) {
      gridRef.current.scrollTo({ scrollTop: 0 });
      gridRef.current.resetAfterIndices({ columnIndex: 0, rowIndex: 0 });
    }
  }, [items, columnWidth]);

  return (
    <Box sx={{ flex: 1, overflow: "hidden" }} ref={boxRef}>
      <VariableSizeGrid
        rowCount={rowCount}
        columnCount={columnCount}
        columnWidth={() => columnWidth}
        rowHeight={rowHeight}
        estimatedRowHeight={160}
        height={size.height}
        width={size.width}
        overscanRowCount={2}
        itemKey={({ columnIndex, rowIndex }) =>
          items[rowIndex * columnCount + columnIndex]?.id || `${rowIndex}-${columnIndex}`
        }
        ref={gridRef}
      >
        {({ columnIndex, rowIndex, style }) => {
          const item = items[rowIndex * columnCount + columnIndex];
          if (!item) {
            return null;
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
              }}
            >
              <SearchEquipmentsItem item={item} onEquipItem={onEquipItem} />
            </Box>
          );
        }}
      </VariableSizeGrid>
    </Box>
  );
};
