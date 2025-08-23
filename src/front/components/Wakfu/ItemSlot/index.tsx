import { type BoxProps, Tooltip } from "@mui/material";
import clsx from "clsx";
import { SearchEquipmentsItem } from "src/front/views/SearchEquipments/item/item";
import { isWakfuBuildEquippedPositionStatus, WakfuBuildEquippedPositionStatus } from "src/wakfu/builder/types";
import type { TWakfuItemDisplay } from "src/wakfu/types/items";
import type { WakfuEquipmentPosition } from "src/wakfu/types/itemType";
import { ItemIcon } from "../ItemIcon";
import { ItemSlotBox, itemSlotClasses } from "./styles";

export type TItemSlotProps = {
  position?: WakfuEquipmentPosition;
  item: TWakfuItemDisplay | WakfuBuildEquippedPositionStatus;
  size: number;
  disableTooltip?: boolean;
  onClick?: (position?: WakfuEquipmentPosition) => void;
  onRightClick?: (position?: WakfuEquipmentPosition) => void;
  slotProps?: {
    box?: Partial<BoxProps>;
  };
};

export const ItemSlot = ({
  position,
  item,
  size,
  disableTooltip,
  onClick,
  onRightClick,
  slotProps,
}: TItemSlotProps) => {
  return (
    <Tooltip
      title={
        isWakfuBuildEquippedPositionStatus(item) || disableTooltip ? (
          ""
        ) : (
          <SearchEquipmentsItem item={item} hideButtons />
        )
      }
      slotProps={{ tooltip: { sx: { bgcolor: "transparent", maxWidth: "unset", width: 376, p: 0 } } }}
      disableInteractive
      placement="right"
    >
      <ItemSlotBox
        {...slotProps?.box}
        size={size}
        rarity={isWakfuBuildEquippedPositionStatus(item) ? 1 : item.rarity}
        equippedItem={!isWakfuBuildEquippedPositionStatus(item)}
        disabled={item === WakfuBuildEquippedPositionStatus.Disabled}
        className={clsx(itemSlotClasses.root, slotProps?.box?.className)}
        onClick={onClick ? () => onClick(position) : undefined}
        onContextMenu={onRightClick ? () => onRightClick(position) : undefined}
      >
        {isWakfuBuildEquippedPositionStatus(item) ? (
          <img
            width={size - 24}
            height={size - 24}
            className={clsx(itemSlotClasses.icon, itemSlotClasses.itemTypeIcon)}
            src={`wakfu/slots/item/${position}.png`}
            alt={`Slots ${position}`}
          />
        ) : (
          <ItemIcon width={size} height={size} className={clsx(itemSlotClasses.icon, itemSlotClasses.itemIcon)}>
            {item.gfxId}
          </ItemIcon>
        )}
      </ItemSlotBox>
    </Tooltip>
  );
};
