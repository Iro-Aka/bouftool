import { Box, type BoxProps, styled } from "@mui/material";

const Prefix = "ItemSlot";

export const itemSlotClasses = {
  root: `${Prefix}-root`,
  frame: `${Prefix}-frame`,
};

export type TItemSlotBoxProps = BoxProps & {
  size: number;
};

export const ItemSlotBox = styled(Box, { shouldForwardProp: (prop) => prop !== "size" })<TItemSlotBoxProps>(
  ({ theme, size }) => ({
    [`&.${itemSlotClasses.root}`]: {
      width: size + 8,
      height: size + 8,
      overflow: "hidden",
      position: "relative",
    },
    [`& .${itemSlotClasses.frame}`]: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: `url(wakfu/slots/border/13.png)`,
      backgroundSize: "cover",
    },
    [`&:hover .${itemSlotClasses.frame}`]: {
      backgroundImage: `url(wakfu/slots/border/10.png)`,
    },
  }),
);
