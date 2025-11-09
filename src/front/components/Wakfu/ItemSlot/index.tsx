import { type BoxProps, Tooltip } from "@mui/material";
import clsx from "clsx";
import type { MouseEvent } from "react";
import type { TWakfuBuildStuffDisplay } from "src/wakfu/builds/types";
import type { EnumWakfuEquipmentPosition } from "src/wakfu/itemTypes/types";
import type { TElementalPreferences } from "src/wakfu/stats/types";
import { CardItem } from "../CardItem";
import { ItemIcon } from "../ItemIcon";
import { ItemSlotBox, itemSlotClasses } from "./styles";

export type TItemSlotProps = {
  position?: EnumWakfuEquipmentPosition;
  item: Omit<TWakfuBuildStuffDisplay[EnumWakfuEquipmentPosition], "constraints" | "preferences"> & {
    preferences?: TElementalPreferences | null;
    constraints?: TWakfuBuildStuffDisplay[EnumWakfuEquipmentPosition]["constraints"];
  };
  size: number;
  disableTooltip?: boolean;
  onClick?: (evt: MouseEvent<HTMLDivElement>, position?: EnumWakfuEquipmentPosition) => void;
  onRightClick?: (evt: MouseEvent<HTMLDivElement>, position?: EnumWakfuEquipmentPosition) => void;
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
        disableTooltip || item.disabled || item.item === null ? (
          ""
        ) : (
          <CardItem
            item={item.item}
            constraints={item.constraints}
            elementalPreferences={item.preferences ?? undefined}
          />
        )
      }
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
        error={item.constraints !== undefined && item.constraints.length > 0}
        className={clsx(itemSlotClasses.root, slotProps?.box?.className)}
        onClick={onClick ? (evt) => onClick(evt, position) : undefined}
        onContextMenu={onRightClick ? (evt) => onRightClick(evt, position) : undefined}
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
