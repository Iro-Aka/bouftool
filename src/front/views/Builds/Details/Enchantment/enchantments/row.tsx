import { ButtonBase, Typography } from "@mui/material";
import { useCursorManager } from "src/front/components/CursorManager";
import { StackRow } from "src/front/components/Layout/StackRow";
import { EnchantmentIcon } from "src/front/components/Wakfu/EnchantmentIcon";
import { ItemTypeIcon } from "src/front/components/Wakfu/ItemTypeIcon";
import { EnumWakfuEnchantmentColor } from "src/wakfu/enchantment/types";
import type { TWakfuEnchantment } from "../types";
import { useEnchantmentContext } from "./context";
import { listEnchantmentsClasses } from "./styles";

export type TListEnchantmentsRowProps = {
  enchantment: TWakfuEnchantment;
  level: number;
};

export const ListEnchantmentsRow = ({ enchantment, level }: TListEnchantmentsRowProps) => {
  const { selectedEnchantment, setSelectedEnchantment } = useEnchantmentContext();
  const setCursor = useCursorManager();

  const bgOpacity = selectedEnchantment?.id === enchantment.id ? 0.3 : 0.1;

  return (
    <ButtonBase
      className={listEnchantmentsClasses.row}
      sx={{
        bgcolor:
          enchantment.color === EnumWakfuEnchantmentColor.Red
            ? `rgba(255, 0, 0, ${bgOpacity})`
            : enchantment.color === EnumWakfuEnchantmentColor.Blue
              ? `rgba(0, 150, 255, ${bgOpacity})`
              : `rgba(0, 255, 0, ${bgOpacity})`,
      }}
      onClick={() => {
        setSelectedEnchantment({ ...enchantment, level });
        setCursor(
          enchantment.color === EnumWakfuEnchantmentColor.Red
            ? "EnchantmentRedFull"
            : enchantment.color === EnumWakfuEnchantmentColor.Blue
              ? "EnchantmentBlueFull"
              : "EnchantmentGreenFull",
        );
      }}
      data-global-click="enchantmentItem"
    >
      <StackRow>
        <EnchantmentIcon height={20} color={enchantment.color} isFull={enchantment.doubleBonusPositions.length > 0} />
        <Typography variant="subtitle2" noWrap>
          {enchantment.effects[level - 1]} {enchantment.label.fr}
        </Typography>
      </StackRow>
      <StackRow>
        {enchantment.doubleBonusPositions.map((position) => (
          <ItemTypeIcon key={position} height={20}>
            {position}
          </ItemTypeIcon>
        ))}
      </StackRow>
    </ButtonBase>
  );
};
