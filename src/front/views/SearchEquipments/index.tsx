import { Box, Stack, Typography } from "@mui/material";
import { lazy, Suspense, useLayoutEffect, useRef } from "react";
import { VariableSizeGrid } from "react-window";
import { useResizeObserver } from "src/front/hooks/useResizeObserver";
import { SearchItemsFilters } from "./filters";
import { useWakfuSearchItems } from "./logics";
import { SearchItemsPreferences } from "./preferences";

const SearchEquipmentsItemLazy = lazy(async () => import("./item/item"));

export const SearchEquipments = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const size = useResizeObserver(boxRef.current);
  const columnCount = Math.max(1, Math.floor(size.width / 384));
  const columnWidth = (size.width - 16) / columnCount;
  const { items, setFilters, setSort } = useWakfuSearchItems();
  const gridRef = useRef<VariableSizeGrid>(null);
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
    <Stack sx={{ flex: 1, p: 1, gap: 1, overflow: "hidden" }}>
      <Stack
        sx={{
          p: 1,
          gap: 1,
          bgcolor: "surface.100",
          borderRadius: 2,
        }}
      >
        <SearchItemsPreferences onChange={setSort} />
        <SearchItemsFilters onChange={setFilters} />
      </Stack>
      <Typography variant="caption" sx={{ pl: 1 }}>
        Résultats : {items.length}
      </Typography>
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
                  [`&:nth-of-type(${columnCount}n)`]: { pr: 1 },
                  [`&:nth-of-type(${columnCount}n+1)`]: { pl: 1 },
                }}
              >
                <Suspense fallback={<div style={{ height: "100%", borderRadius: 8, background: "hsl(0 0% 16%)" }} />}>
                  <SearchEquipmentsItemLazy item={item} />
                </Suspense>
              </Box>
            );
          }}
        </VariableSizeGrid>
      </Box>
    </Stack>
  );
};
