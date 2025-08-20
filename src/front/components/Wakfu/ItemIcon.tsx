import type { HTMLProps } from "react";

export type TItemIconProps = Omit<HTMLProps<HTMLImageElement>, "src" | "alt"> & {
  children: number;
};

export const ItemIcon = ({ children, ...props }: TItemIconProps) => {
  return <img src={`wakfu/items/${children}.png`} alt={`Item ${children}`} {...props} />;
};
