import { Stack } from "@mui/material";
import { type MouseEvent, useRef, useState } from "react";
import { ElectronEvents } from "src/electron/types";
import { StackGrid } from "src/front/components/Layout/StackGrid";
import { ItemSlot } from "src/front/components/Wakfu/ItemSlot";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { sendElectronEvent } from "src/front/hooks/electron";
import { useSearchItemsFiltersContext } from "src/front/views/SearchEquipments/contexts/filters";
import { SearchItemsBehavior } from "src/front/views/SearchEquipments/contexts/search";
import { EnumWakfuEquipmentPosition } from "src/wakfu/itemTypes/types";
import { EnumWakfuStat } from "src/wakfu/stats/types";
import { WakfuLevelsRange } from "src/wakfu/utils/constants";
import { useBuildDetailsContext } from "../context";
import { BuildItemMenu } from "./menu";

export const BuildDetailsItems = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuSelectedPosition, setMenuSelectedPosition] = useState<EnumWakfuEquipmentPosition>(
    EnumWakfuEquipmentPosition.Head,
  );
  const menuAnchorRef = useRef<HTMLElement>(null);
  const build = useBuildDetailsContext();
  const { setFilters } = useSearchItemsFiltersContext();

  const handleClick = async (position: EnumWakfuEquipmentPosition) => {
    const levelsRange = WakfuLevelsRange.find((range) => range.min <= build.level && range.max >= build.level);
    const itemTypes = await sendElectronEvent(ElectronEvents.GetItemTypesByEquipmentPosition, { position });
    SearchItemsBehavior.setSkipNextTimeout(true);
    setFilters((prev) => ({ ...prev, ...(levelsRange && { levels: levelsRange }), itemTypes }));
  };

  const handleRightClick = (evt: MouseEvent<HTMLDivElement>, position?: EnumWakfuEquipmentPosition) => {
    if (!position || !build.stuff[position].item) {
      return;
    }
    menuAnchorRef.current = evt.currentTarget;
    setMenuSelectedPosition(position);
    setMenuOpen(true);
  };

  return (
    <StackGrid
      columns={7}
      gap={0.5}
      sx={{ bgcolor: "surface.100", borderRadius: 2, boxShadow: "inset 0 0 0 black", py: 1.25, px: 1, my: 0.5 }}
    >
      {Object.values(EnumWakfuEquipmentPosition).map((position) => (
        <Stack key={position} sx={{ position: "relative" }}>
          <ItemSlot
            position={position}
            item={build.stuff[position]}
            size={48}
            onClick={() => handleClick(position)}
            onRightClick={handleRightClick}
            slotProps={{ box: { sx: { flex: "0 0 auto" } } }}
          />
          <StatsIcon
            width={18}
            sx={{
              position: "absolute",
              top: -4,
              left: -4,
              display: build.stuff[position].preferences && build.stuff[position].item ? "block" : "none",
            }}
          >
            {EnumWakfuStat.ElementalMastery}
          </StatsIcon>
        </Stack>
      ))}
      <BuildItemMenu
        open={menuOpen}
        position={menuSelectedPosition}
        anchorEl={menuAnchorRef.current}
        onClose={() => setMenuOpen(false)}
      />
    </StackGrid>
  );
};
