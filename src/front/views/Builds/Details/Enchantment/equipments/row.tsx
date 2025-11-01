import { clsx } from "clsx";
import { ItemTypeIcon } from "src/front/components/Wakfu/ItemTypeIcon";
import type { EnchantableEquipmentPositions } from "src/wakfu/enchantment/constants";
import { EnumWakfuEnchantmentColor } from "src/wakfu/enchantment/types";
import { useBuildDetailsContext } from "../../context";
import { useEnchantmentContext } from "../context";
import type { TWakfuEnchantment } from "../types";
import { EnchantmentSlot } from "./slot";
import { equipmentsEnchantmentsClasses } from "./styles";
import { EquipmentsEnchantmentsRowSublimation } from "./sublimation";

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
  shardLevelRequirement: number[];
  position: (typeof EnchantableEquipmentPositions)[number];
};

export const EquipmentsEnchantmentsRow = ({
  enchantments,
  position,
  shardLevelRequirement,
}: TBuildEnchantmentEquipmentsRowProps) => {
  const { id: buildId, enchantments: buildEnchantments } = useBuildDetailsContext();
  const { selectedEnchantment, selectedSublimation } = useEnchantmentContext();

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
      <div
        className={clsx(equipmentsEnchantmentsClasses.rowEnchantments, {
          [equipmentsEnchantmentsClasses.rowEnchantmentsRedSelected]: isHighlighted(EnumWakfuEnchantmentColor.Red),
          [equipmentsEnchantmentsClasses.rowEnchantmentsBlueSelected]: isHighlighted(EnumWakfuEnchantmentColor.Blue),
          [equipmentsEnchantmentsClasses.rowEnchantmentsGreenSelected]: isHighlighted(EnumWakfuEnchantmentColor.Green),
        })}
      >
        <ItemTypeIcon height={26}>{position}</ItemTypeIcon>
        {buildEnchantments[position].enchantments.map((e, index) => (
          <EnchantmentSlot
            // biome-ignore lint/suspicious/noArrayIndexKey: No better key available
            key={index}
            position={position}
            slot={index}
            effect={getCurrentEnchantmentEffect(selectedEnchantment, e, enchantments)}
            shardLevelRequirement={shardLevelRequirement}
            enchantment={e}
          />
        ))}
      </div>
      <EquipmentsEnchantmentsRowSublimation position={position} />
    </div>
  );
};
