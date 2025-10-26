import { Typography } from "@mui/material";
import { StackRow } from "src/front/components/Layout/StackRow";
import { EnchantmentIcon } from "src/front/components/Wakfu/EnchantmentIcon";
import { ItemIcon } from "src/front/components/Wakfu/ItemIcon";
import type { EnumWakfuEnchantmentColor } from "src/wakfu/enchantment/types";
import type { TWakfuI18n } from "src/wakfu/utils/types";
import { listSublimationsClasses } from "./styles";

export type TListSublimationsRowProps = {
  sublimation: {
    id: number;
    name: TWakfuI18n;
    level: number;
    maxLevel: number;
    gfxId: number;
    effectId: number;
    colorPattern: EnumWakfuEnchantmentColor[];
    rarityEpic: boolean;
    rarityRelic: boolean;
  };
};

export const ListSublimationsRow = ({ sublimation }: TListSublimationsRowProps) => {
  return (
    <div className={listSublimationsClasses.row}>
      <StackRow sx={{ p: 1, flex: 1, overflow: "hidden" }}>
        <ItemIcon width={26}>{sublimation.gfxId}</ItemIcon>
        <Typography variant="body2" noWrap>
          {sublimation.name.fr}
        </Typography>
      </StackRow>
      <StackRow sx={{ p: 1, bgcolor: "surface.200" }}>
        <Typography variant="caption">Niv. max {sublimation.maxLevel}</Typography>
      </StackRow>
      <StackRow sx={{ p: 1 }}>
        {sublimation.colorPattern.map((color, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: No other valid key
          <EnchantmentIcon key={index} height={20} color={color} isFull />
        ))}
      </StackRow>
    </div>
  );
};
