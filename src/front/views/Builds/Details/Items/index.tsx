import { StackGrid } from "src/front/components/Layout/StackGrid";
import { ItemSlot } from "src/front/components/Wakfu/ItemSlot";
import { WakfuEquipmentPosition } from "src/wakfu/types/itemType";
import { useBuildDetailsContext } from "../context";

export const BuildDetailsItems = () => {
  const build = useBuildDetailsContext();

  return (
    <StackGrid
      columns={7}
      gap={0.5}
      sx={{ bgcolor: "surface.100", borderRadius: 2, boxShadow: "inset 0 0 0 black", py: 1.25, px: 1, my: 0.5 }}
    >
      {Object.values(WakfuEquipmentPosition).map((position) => (
        <ItemSlot
          key={position}
          position={position}
          item={build.items[position]}
          size={48}
          slotProps={{ box: { sx: { flex: "0 0 auto" } } }}
        />
      ))}
    </StackGrid>
  );
};
