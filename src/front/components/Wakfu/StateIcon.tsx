import type { HTMLProps } from "react";
import { WakfuStatesDefinitions } from "src/wakfu/states/definitions";
import type { EnumWakfuState } from "src/wakfu/states/types";

export type TStateIconProps = Omit<HTMLProps<HTMLImageElement>, "children" | "src" | "alt"> & {
  children: EnumWakfuState;
};

export const StateIcon = ({ children, ...props }: TStateIconProps) => {
  const stateId = WakfuStatesDefinitions[children].id;

  return <img src={`wakfu/states/${stateId}.png`} alt={children} {...props} />;
};
