import { type BoxProps, Tooltip } from "@mui/material";
import clsx from "clsx";
import type { TWakfuBuildStuffDisplay } from "src/wakfu/builds/types";
import type { EnumWakfuEquipmentPosition } from "src/wakfu/itemTypes/types";
import { CardItem } from "../CardItem";
import { ItemIcon } from "../ItemIcon";
import { ItemSlotBox, itemSlotClasses } from "./styles";

export type TItemSlotProps = {
  position?: EnumWakfuEquipmentPosition;
  item: Omit<TWakfuBuildStuffDisplay[EnumWakfuEquipmentPosition], "constraints"> & {
    constraints?: TWakfuBuildStuffDisplay[EnumWakfuEquipmentPosition];
  };
  size: number;
  disableTooltip?: boolean;
  onClick?: (position?: EnumWakfuEquipmentPosition) => void;
  onRightClick?: (position?: EnumWakfuEquipmentPosition) => void;
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
      title={disableTooltip || item.disabled || item.item === null ? "" : <CardItem item={item.item} />}
      slotProps={{ tooltip: { sx: { bgcolor: "transparent", maxWidth: "unset", width: 376, p: 0 } } }}
      disableInteractive
      placement="right"
    >
      <ItemSlotBox
        {...slotProps?.box}
        size={size}
        rarity={item.item ? item.item.rarity : 1}
        equippedItem={Boolean(item.item)}
        disabled={item.disabled}
        className={clsx(itemSlotClasses.root, slotProps?.box?.className)}
        onClick={onClick ? () => onClick(position) : undefined}
        onContextMenu={onRightClick ? () => onRightClick(position) : undefined}
      >
        {item.item ? (
          <ItemIcon width={size} height={size} className={clsx(itemSlotClasses.icon, itemSlotClasses.itemIcon)}>
            {item.item.gfxId}
          </ItemIcon>
        ) : (
          <img
            width={size - 24}
            height={size - 24}
            className={clsx(itemSlotClasses.icon, itemSlotClasses.itemTypeIcon)}
            src={`wakfu/slots/item/${position}.png`}
            alt={`Slots ${position}`}
          />
        )}
      </ItemSlotBox>
    </Tooltip>
  );
};
