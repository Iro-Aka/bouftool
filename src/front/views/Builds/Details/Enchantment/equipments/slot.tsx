import { Tooltip } from "@mui/material";
import clsx from "clsx";
import { ElectronEvents } from "src/electron/types";
import { EnchantmentIcon } from "src/front/components/Wakfu/EnchantmentIcon";
import { sendElectronEvent } from "src/front/hooks/electron";
import type { EnchantableEquipmentPositions } from "src/wakfu/enchantment/constants";
import type { EnumWakfuEnchantmentColor } from "src/wakfu/enchantment/types";
import { useEnchantmentContext } from "../enchantments/context";
import { equipmentsEnchantmentsClasses } from "./styles";

export type TEnchantmentSlotProps = {
  position: (typeof EnchantableEquipmentPositions)[number];
  slot: number;
  buildId: string;
  effect: string | null;
  enchantment: { id: number; color: EnumWakfuEnchantmentColor } | null;
};

export const EnchantmentSlot = ({ buildId, position, slot, effect, enchantment }: TEnchantmentSlotProps) => {
  const { selectedEnchantment } = useEnchantmentContext();

  const handleClick = () => {
    if (selectedEnchantment) {
      sendElectronEvent(ElectronEvents.BuildAssignEnchantment, {
        buildId,
        equipmentPosition: position,
        slotPosition: slot,
        enchantmentId: selectedEnchantment.id,
        enchantmentLevel: selectedEnchantment.level,
      });
    } else if (enchantment) {
      sendElectronEvent(ElectronEvents.BuildAssignEnchantment, {
        buildId,
        equipmentPosition: position,
        slotPosition: slot,
        enchantmentId: null,
        enchantmentLevel: 0,
      });
    }
  };

  return (
    <Tooltip title={effect} placement="top" disableInteractive arrow>
      <EnchantmentIcon
        height={32}
        color={enchantment ? enchantment.color : undefined}
        isFull={Boolean(enchantment)}
        data-global-click="enchantmentSlot"
        onClick={handleClick}
        className={clsx({
          [equipmentsEnchantmentsClasses.slotHover]: Boolean(selectedEnchantment) || Boolean(enchantment),
        })}
      />
    </Tooltip>
  );
};
