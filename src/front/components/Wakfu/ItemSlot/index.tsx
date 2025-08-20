import { Box, type BoxProps } from "@mui/material";
import clsx from "clsx";
import { isWakfuBuildEquippedPositionStatus, type WakfuBuildEquippedPositionStatus } from "src/wakfu/builder/types";
import type { WakfuEquipmentPosition } from "src/wakfu/types/itemType";
import { ItemIcon } from "../ItemIcon";
import { ItemSlotBox, itemSlotClasses } from "./styles";

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
    <ItemSlotBox
      {...slotProps?.box}
      size={size}
      equippedItem={!isWakfuBuildEquippedPositionStatus(item)}
      className={clsx(itemSlotClasses.root, slotProps?.box?.className)}
    >
      <Box className={itemSlotClasses.frame} />
      {isWakfuBuildEquippedPositionStatus(item) ? (
        <img
          width={size - 24}
          height={size - 24}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            filter: "brightness(0.3)",
          }}
          src={`wakfu/slots/item/${position}.png`}
          alt={`Slots ${position}`}
        />
      ) : (
        <ItemIcon
          width={size}
          height={size}
          style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          {item.gfxId}
        </ItemIcon>
      )}
    </ItemSlotBox>
  );
};
