import { EnumWakfuEnchantmentColor } from "src/wakfu/enchantment/types";
import { StyledImg, type TStyledImgProps } from "../StyledImg";

const EnchantmentsIconsPath = {
  [EnumWakfuEnchantmentColor.Red]: {
    full: "wakfu/enchantments/shardRedFull.png",
    empty: "wakfu/enchantments/shardRedEmpty.png",
  },
  [EnumWakfuEnchantmentColor.Green]: {
    full: "wakfu/enchantments/shardGreenFull.png",
    empty: "wakfu/enchantments/shardGreenEmpty.png",
  },
  [EnumWakfuEnchantmentColor.Blue]: {
    full: "wakfu/enchantments/shardBlueFull.png",
    empty: "wakfu/enchantments/shardBlueEmpty.png",
  },
  [EnumWakfuEnchantmentColor.Yellow]: {
    full: "wakfu/enchantments/shardWhiteFull.png",
    empty: "wakfu/enchantments/shardWhiteEmpty.png",
  },
} as const satisfies Record<EnumWakfuEnchantmentColor, { full: string; empty: string }>;
const DefaultEnchantmentsIconPath = "wakfu/enchantments/shardMultiEmpty.png";

export type TEnchantmentIconProps = Omit<TStyledImgProps, "src" | "alt" | "color"> & {
  color?: EnumWakfuEnchantmentColor;
  isFull?: boolean;
};

export const EnchantmentIcon = ({ color, isFull, ...props }: TEnchantmentIconProps) => {
  const iconPath = color
    ? isFull
      ? EnchantmentsIconsPath[color].full
      : EnchantmentsIconsPath[color].empty
    : DefaultEnchantmentsIconPath;

  return (
    <StyledImg {...props} src={iconPath} alt={`Enchantment ${color ? EnumWakfuEnchantmentColor[color] : "empty"}`} />
  );
};
