import { Tooltip } from "@mui/material";
import clsx from "clsx";
import { ElectronEvents } from "src/electron/types";
import { EnchantmentIcon } from "src/front/components/Wakfu/EnchantmentIcon";
import { sendElectronEvent } from "src/front/hooks/electron";
import type { TWakfuBuildDisplay } from "src/wakfu/builds/types";
import type { EnchantableEquipmentPositions } from "src/wakfu/enchantment/constants";
import { EnumWakfuEnchantmentColor } from "src/wakfu/enchantment/types";
import type { EnumWakfuEquipmentPosition } from "src/wakfu/itemTypes/types";
import { useBuildDetailsContext } from "../../context";
import { useEnchantmentContext } from "../context";
import { equipmentsEnchantmentsClasses } from "./styles";

const isEnchantmentLevelValid = (
  equippedItem: TWakfuBuildDisplay["stuff"][EnumWakfuEquipmentPosition],
  buildLevel: number,
  enchantment: TWakfuBuildDisplay["enchantments"][(typeof EnchantableEquipmentPositions)[number]]["enchantments"][number],
  shardLevelRequirement: number[],
) => {
  if (!enchantment) return false;

  const targetLevel = equippedItem.item?.level ?? buildLevel;
  const requiredLevel = shardLevelRequirement[enchantment.level - 1];
  return targetLevel >= requiredLevel;
};

export type TEnchantmentSlotProps = {
  position: (typeof EnchantableEquipmentPositions)[number];
  slot: number;
  effect: string | null;
  enchantment: TWakfuBuildDisplay["enchantments"][(typeof EnchantableEquipmentPositions)[number]]["enchantments"][number];
  shardLevelRequirement: number[];
};

export const EnchantmentSlot = ({
  position,
  slot,
  effect,
  enchantment,
  shardLevelRequirement,
}: TEnchantmentSlotProps) => {
  const { id: buildId, level, stuff } = useBuildDetailsContext();
  const { selectedEnchantment, selectedSublimation } = useEnchantmentContext();
  const enchantmentLevelValid = isEnchantmentLevelValid(stuff[position], level, enchantment, shardLevelRequirement);

  const handleClick = () => {
    if (selectedSublimation) {
      return;
    } else if (selectedEnchantment) {
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

  const handleRightClick = () => {
    if (enchantment) {
      sendElectronEvent(ElectronEvents.BuildAssignEnchantment, {
        buildId,
        equipmentPosition: position,
        slotPosition: slot,
        enchantmentId: enchantment.id,
        enchantmentLevel: enchantment.level,
        anyColor: !enchantment.anyColor,
      });
    }
  };

  return (
    <Tooltip title={effect} placement="top" disableInteractive arrow>
      <EnchantmentIcon
        height={32}
        color={enchantment ? (enchantment.anyColor ? EnumWakfuEnchantmentColor.Yellow : enchantment.color) : undefined}
        isFull={enchantmentLevelValid}
        data-global-click="enchantmentSlot"
        onClick={handleClick}
        onContextMenu={handleRightClick}
        className={clsx({
          [equipmentsEnchantmentsClasses.slotHover]:
            !selectedSublimation && (Boolean(selectedEnchantment) || Boolean(enchantment)),
        })}
      />
    </Tooltip>
  );
};
