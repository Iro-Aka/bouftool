import { Typography } from "@mui/material";
import { clsx } from "clsx";
import { StackRow } from "src/front/components/Layout/StackRow";
import { EnchantmentIcon } from "src/front/components/Wakfu/EnchantmentIcon";
import { ItemIcon } from "src/front/components/Wakfu/ItemIcon";
import { ItemTypeIcon } from "src/front/components/Wakfu/ItemTypeIcon";
import type { EnchantableEquipmentPositions } from "src/wakfu/enchantment/constants";
import { EnumWakfuEnchantmentColor } from "src/wakfu/enchantment/types";
import { useBuildDetailsContext } from "../../context";
import { BaseSublimationIconGfxId } from "../constants";
import { useEnchantmentContext } from "../enchantments/context";
import type { TWakfuEnchantment } from "../types";
import { EnchantmentSlot } from "./slot";
import { equipmentsEnchantmentsClasses } from "./styles";

const getCurrentEnchantmentEffect = (
  selectedEnchantment: (TWakfuEnchantment & { level: number }) | null,
  buildEnchantment: { id: number; color: EnumWakfuEnchantmentColor; level: number } | null,
  enchantments: TWakfuEnchantment[],
) => {
  const id = selectedEnchantment?.id ?? buildEnchantment?.id;
  const level = selectedEnchantment?.level ?? buildEnchantment?.level;
  if (!id || !level) {
    return null;
  }
  const enchantment = enchantments.find((enchant) => enchant.id === id);
  if (!enchantment) {
    return null;
  }
  return `${enchantment.effects[level - 1]} ${enchantment.label.fr}`;
};

export type TBuildEnchantmentEquipmentsRowProps = {
  enchantments: TWakfuEnchantment[];
  position: (typeof EnchantableEquipmentPositions)[number];
};

export const EquipmentsEnchantmentsRow = ({ enchantments, position }: TBuildEnchantmentEquipmentsRowProps) => {
  const { id, enchantments: buildEnchantments } = useBuildDetailsContext();
  const { selectedEnchantment } = useEnchantmentContext();

  const isHighlighted = (color: EnumWakfuEnchantmentColor) => {
    return selectedEnchantment?.color === color && selectedEnchantment.doubleBonusPositions.includes(position);
  };

  return (
    <div
      className={clsx(equipmentsEnchantmentsClasses.row, {
        [equipmentsEnchantmentsClasses.rowRedSelected]: isHighlighted(EnumWakfuEnchantmentColor.Red),
        [equipmentsEnchantmentsClasses.rowBlueSelected]: isHighlighted(EnumWakfuEnchantmentColor.Blue),
        [equipmentsEnchantmentsClasses.rowGreenSelected]: isHighlighted(EnumWakfuEnchantmentColor.Green),
      })}
    >
      <StackRow sx={{ bgcolor: "surface.150" }}>
        <ItemTypeIcon height={26}>{position}</ItemTypeIcon>
        <EnchantmentSlot
          buildId={id}
          position={position}
          slot={0}
          effect={getCurrentEnchantmentEffect(
            selectedEnchantment,
            buildEnchantments[position].enchantments[0],
            enchantments,
          )}
          enchantment={buildEnchantments[position].enchantments[0] ?? null}
        />
        <EnchantmentSlot
          buildId={id}
          position={position}
          slot={1}
          effect={getCurrentEnchantmentEffect(
            selectedEnchantment,
            buildEnchantments[position].enchantments[1],
            enchantments,
          )}
          enchantment={buildEnchantments[position].enchantments[1] ?? null}
        />
        <EnchantmentSlot
          buildId={id}
          position={position}
          slot={2}
          effect={getCurrentEnchantmentEffect(
            selectedEnchantment,
            buildEnchantments[position].enchantments[2],
            enchantments,
          )}
          enchantment={buildEnchantments[position].enchantments[2] ?? null}
        />
        <EnchantmentSlot
          buildId={id}
          position={position}
          slot={3}
          effect={getCurrentEnchantmentEffect(
            selectedEnchantment,
            buildEnchantments[position].enchantments[3],
            enchantments,
          )}
          enchantment={buildEnchantments[position].enchantments[3] ?? null}
        />
      </StackRow>
      <StackRow className={equipmentsEnchantmentsClasses.rowSubmlimation}>
        <ItemIcon height={24} sx={{ filter: "grayscale(1) brightness(0.5)" }}>
          {BaseSublimationIconGfxId}
        </ItemIcon>
        <Typography variant="body2" noWrap>
          Expert des Coups critiques III
        </Typography>
      </StackRow>
      <StackRow sx={{ bgcolor: "surface.200" }}>
        <EnchantmentIcon height={26} color={EnumWakfuEnchantmentColor.Red} isFull />
        <EnchantmentIcon height={26} color={EnumWakfuEnchantmentColor.Red} isFull />
        <EnchantmentIcon height={26} color={EnumWakfuEnchantmentColor.Red} isFull />
      </StackRow>
    </div>
  );
};
