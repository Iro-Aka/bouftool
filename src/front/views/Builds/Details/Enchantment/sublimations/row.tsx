import { ButtonBase, Typography } from "@mui/material";
import clsx from "clsx";
import { useCursorManager } from "src/front/components/CursorManager";
import { StackRow } from "src/front/components/Layout/StackRow";
import { EnchantmentIcon } from "src/front/components/Wakfu/EnchantmentIcon";
import { getItemIconSrc, ItemIcon } from "src/front/components/Wakfu/ItemIcon";
import type { EnumWakfuEnchantmentColor } from "src/wakfu/enchantment/types";
import type { TWakfuI18n } from "src/wakfu/utils/types";
import { useEnchantmentContext } from "../context";
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
  const setCursor = useCursorManager();
  const { setSelectedEnchantment, selectedSublimation, setSelectedSublimation } = useEnchantmentContext();

  const handleClick = () => {
    setSelectedEnchantment(null);
    setSelectedSublimation(sublimation);
    setCursor(getItemIconSrc(sublimation.gfxId));
  };

  return (
    <ButtonBase
      className={clsx(listSublimationsClasses.row, {
        [listSublimationsClasses.rowSelected]: selectedSublimation?.id === sublimation.id,
      })}
      data-global-click="sublimationItem"
      onClick={handleClick}
    >
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
    </ButtonBase>
  );
};
