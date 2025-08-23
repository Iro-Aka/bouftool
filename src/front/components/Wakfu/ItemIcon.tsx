import { StyledImg, type TStyledImgProps } from "../StyledImg";

export type TItemIconProps = Omit<TStyledImgProps, "src" | "alt"> & {
  children: number;
};

export const ItemIcon = ({ children, ...props }: TItemIconProps) => {
  return <StyledImg src={`wakfu/items/${children}.png`} alt={`Item ${children}`} {...props} />;
};
