import { StyledImg, type TStyledImgProps } from "../StyledImg";

export const getItemIconSrc = (itemId: number) => {
  return `wakfu/items/${itemId}.png`;
};

export type TItemIconProps = Omit<TStyledImgProps, "src" | "alt"> & {
  children: number;
};

export const ItemIcon = ({ children, ...props }: TItemIconProps) => {
  return <StyledImg src={getItemIconSrc(children)} alt={`Item ${children}`} {...props} />;
};
