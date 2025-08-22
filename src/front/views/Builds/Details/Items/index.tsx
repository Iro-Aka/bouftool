import { useEffect } from "react";
import { ElectronEvents } from "src/electron/types";
import { StackGrid } from "src/front/components/Layout/StackGrid";
import { ItemSlot } from "src/front/components/Wakfu/ItemSlot";
import { sendElectronEvent } from "src/front/hooks/electron";
import { useSearchItemsFiltersContext } from "src/front/views/SearchEquipments/contexts/filters";
import { WakfuEquipmentPosition } from "src/wakfu/types/itemType";
import { WakfuLevelsRange } from "src/wakfu/types/utils";
import { useBuildDetailsContext } from "../context";

export const BuildDetailsItems = () => {
  const build = useBuildDetailsContext();
  const { setFilters } = useSearchItemsFiltersContext();

  const handleClick = async (position: WakfuEquipmentPosition) => {
    const itemTypes = await sendElectronEvent(ElectronEvents.GetItemTypesByEquipmentPosition, { position });
    setFilters((prev) => ({ ...prev, itemTypes }));
  };

  const handleRightClick = (position: WakfuEquipmentPosition) => {
    sendElectronEvent(ElectronEvents.BuildUnequipItem, { buildId: build.id, position });
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: Rune once
  useEffect(() => {
    const levelsRange = WakfuLevelsRange.find((range) => range.min <= build.level && range.max >= build.level);
    if (levelsRange) {
      setFilters((prev) => ({ ...prev, levels: levelsRange }));
    }
  }, []);

  return (
    <StackGrid
      columns={7}
      gap={0.5}
      sx={{ bgcolor: "surface.100", borderRadius: 2, boxShadow: "inset 0 0 0 black", py: 1.25, px: 1, my: 0.5 }}
    >
      {Object.values(WakfuEquipmentPosition).map(
        (position) =>
          position !== WakfuEquipmentPosition.Costume && (
            <ItemSlot
              key={position}
              position={position}
              item={build.items[position]}
              size={48}
              onClick={handleClick}
              onRightClick={handleRightClick}
              slotProps={{ box: { sx: { flex: "0 0 auto" } } }}
            />
          ),
      )}
    </StackGrid>
  );
};
