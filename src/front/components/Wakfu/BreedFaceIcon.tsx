import type { HTMLProps } from "react";
import type { WakfuBreed } from "src/wakfu/types/breed";

export type TBreedFaceIconProps = HTMLProps<HTMLImageElement> & {
  children: WakfuBreed;
};

export const BreedFaceIcon = ({ children, ...props }: TBreedFaceIconProps) => {
  return <img src={`wakfu/breedsFaces/${children}0.png`} alt={String(children)} {...props} />;
};
