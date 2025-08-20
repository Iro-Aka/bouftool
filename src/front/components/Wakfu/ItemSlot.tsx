import { Box, type BoxProps } from "@mui/material";
import clsx from "clsx";
import { isWakfuBuildEquippedPositionStatus, type WakfuBuildEquippedPositionStatus } from "src/wakfu/builder/types";
import type { WakfuEquipmentPosition } from "src/wakfu/types/itemType";
import { ItemIcon } from "./ItemIcon";
import { ItemSlotBox, itemSlotClasses } from "./ItemSlot/styles";

export type TItemSlotProps = {
  position: WakfuEquipmentPosition;
  item: { rarity: number; gfxId: number } | WakfuBuildEquippedPositionStatus;
  itemType?: number;
  size: number;
  slotProps?: {
    box?: Partial<BoxProps>;
  };
};

export const ItemSlot = ({ position, item, size, slotProps }: TItemSlotProps) => {
  return (
    <ItemSlotBox {...slotProps?.box} size={size} className={clsx(itemSlotClasses.root, slotProps?.box?.className)}>
      {isWakfuBuildEquippedPositionStatus(item) ? (
        <img
          width={size - 32}
          height={size - 32}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          src={`wakfu/slots/item/${position}.png`}
          alt={`Slots ${position}`}
        />
      ) : (
        <ItemIcon width={size} height={size} style={{ position: "absolute" }}>
          {item.gfxId}
        </ItemIcon>
      )}
      <Box className={itemSlotClasses.frame} />
    </ItemSlotBox>
  );
};
