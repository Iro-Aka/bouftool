import { Typography } from "@mui/material";
import { clsx } from "clsx";
import { ElectronEvents } from "src/electron/types";
import { StackRow } from "src/front/components/Layout/StackRow";
import { EnchantmentIcon } from "src/front/components/Wakfu/EnchantmentIcon";
import { ItemIcon } from "src/front/components/Wakfu/ItemIcon";
import { ItemTypeIcon } from "src/front/components/Wakfu/ItemTypeIcon";
import { sendElectronEvent } from "src/front/hooks/electron";
import type { EnchantableEquipmentPositions } from "src/wakfu/enchantment/constants";
import { EnumWakfuEnchantmentColor } from "src/wakfu/enchantment/types";
import { useBuildDetailsContext } from "../../context";
import { BaseSublimationIconGfxId } from "../constants";
import { useEnchantmentContext } from "../context";
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
      <div className={equipmentsEnchantmentsClasses.rowEnchantments}>
        <ItemTypeIcon height={26}>{position}</ItemTypeIcon>
        {buildEnchantments[position].enchantments.map((e, index) => (
          <EnchantmentSlot
            // biome-ignore lint/suspicious/noArrayIndexKey: No better key available
            key={index}
            buildId={buildId}
            position={position}
            slot={index}
            effect={getCurrentEnchantmentEffect(selectedEnchantment, e, enchantments)}
            enchantment={e}
          />
        ))}
      </div>
      <StackRow
        className={equipmentsEnchantmentsClasses.rowSublimation}
        onClick={() => {
          sendElectronEvent(ElectronEvents.BuildAssignSublimation, {
            buildId,
            equipmentPosition: position,
            sublimationId: selectedSublimation?.id ?? null,
          });
        }}
        data-global-click="sublimationSlot"
      >
        <ItemIcon
          height={24}
          className={clsx({
            [equipmentsEnchantmentsClasses.sublimationIconDisabled]: !buildEnchantments[position].sublimation,
          })}
        >
          {buildEnchantments[position].sublimation?.gfxId ?? BaseSublimationIconGfxId}
        </ItemIcon>
        <Typography variant="body2" noWrap>
          {buildEnchantments[position].sublimation?.name.fr}
        </Typography>
      </StackRow>
      <StackRow sx={{ bgcolor: "surface.200" }}>
        {buildEnchantments[position].sublimation?.colorPattern.map((color, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: No better key available
          <EnchantmentIcon key={index} height={26} color={color} isFull />
        ))}
      </StackRow>
    </div>
  );
};
