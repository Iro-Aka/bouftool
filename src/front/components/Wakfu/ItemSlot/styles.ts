import { Box, type BoxProps, styled } from "@mui/material";

const Prefix = "ItemSlot";

export const itemSlotClasses = {
  root: `${Prefix}-root`,
  frame: `${Prefix}-frame`,
  icon: `${Prefix}-icon`,
  itemIcon: `${Prefix}-item`,
  itemTypeIcon: `${Prefix}-item-type`,
};

export type TItemSlotBoxProps = BoxProps & {
  size: number;
  rarity: number;
  equippedItem: boolean;
  disabled: boolean;
};

export const ItemSlotBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "size" && prop !== "equippedItem" && prop !== "rarity" && prop !== "disabled",
})<TItemSlotBoxProps>(({ size, equippedItem, rarity, onClick, disabled }) => ({
  [`&.${itemSlotClasses.root}`]: {
    width: size + 8,
    height: size + 8,
    overflow: "hidden",
    position: "relative",
    backgroundImage: `url(wakfu/slots/border/${rarity}${equippedItem ? "1" : "3"}.png)`,
    backgroundSize: "cover",
    ...(disabled && {
      filter: "brightness(0.5)",
    }),
    ...(onClick && {
      cursor: "pointer",
    }),
    "&:hover": {
      filter: "brightness(1)",
      backgroundImage: `url(wakfu/slots/border/${rarity}2.png)`,
    },
  },
  [`& .${itemSlotClasses.icon}`]: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  [`& .${itemSlotClasses.itemIcon}`]: {},
  [`& .${itemSlotClasses.itemTypeIcon}`]: {
    filter: "brightness(0.3)",
  },
}));
