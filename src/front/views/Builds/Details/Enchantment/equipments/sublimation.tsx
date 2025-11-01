import { Typography } from "@mui/material";
import clsx from "clsx";
import { ElectronEvents } from "src/electron/types";
import { StackRow } from "src/front/components/Layout/StackRow";
import { EnchantmentIcon } from "src/front/components/Wakfu/EnchantmentIcon";
import { ItemIcon } from "src/front/components/Wakfu/ItemIcon";
import { sendElectronEvent } from "src/front/hooks/electron";
import type { TWakfuBuildDisplay } from "src/wakfu/builds/types";
import type { EnchantableEquipmentPositions } from "src/wakfu/enchantment/constants";
import { useBuildDetailsContext } from "../../context";
import { BaseSublimationIconGfxId } from "../constants";
import { useEnchantmentContext } from "../context";
import { equipmentsEnchantmentsClasses } from "./styles";

const isPatternSegmentRespected = (
  enchantments: TWakfuBuildDisplay["enchantments"][(typeof EnchantableEquipmentPositions)[number]]["enchantments"],
  sublimation: Exclude<
    TWakfuBuildDisplay["enchantments"][(typeof EnchantableEquipmentPositions)[number]]["sublimation"],
    null
  >,
  startIndex: number,
) => {
  for (let i = 0; i < sublimation.colorPattern.length; i++) {
    const enchantment = enchantments[startIndex + i];
    if (!enchantment || (enchantment.color !== sublimation.colorPattern[i] && !enchantment.anyColor)) {
      return false;
    }
  }
  return true;
};

const isPatternRespected = (
  enchantments: TWakfuBuildDisplay["enchantments"][(typeof EnchantableEquipmentPositions)[number]]["enchantments"],
  sublimation: TWakfuBuildDisplay["enchantments"][(typeof EnchantableEquipmentPositions)[number]]["sublimation"],
) => {
  if (!sublimation) {
    return false;
  }
  for (let start = 0; start <= enchantments.length - sublimation.colorPattern.length; start++) {
    if (isPatternSegmentRespected(enchantments, sublimation, start)) {
      return true;
    }
  }
  return false;
};

export interface TEquipmentsEnchantmentsRowSublimationProps {
  position: (typeof EnchantableEquipmentPositions)[number];
}

export const EquipmentsEnchantmentsRowSublimation = ({ position }: TEquipmentsEnchantmentsRowSublimationProps) => {
  const { id: buildId, enchantments: buildEnchantments } = useBuildDetailsContext();
  const { selectedEnchantment, selectedSublimation } = useEnchantmentContext();

  const patternRespected = isPatternRespected(
    buildEnchantments[position].enchantments,
    buildEnchantments[position].sublimation,
  );

  const handleClick = () => {
    if (selectedSublimation && !selectedSublimation.rarityEpic && !selectedSublimation.rarityRelic) {
      sendElectronEvent(ElectronEvents.BuildAssignSublimation, {
        buildId,
        equipmentPosition: position,
        sublimationId: selectedSublimation.id,
      });
    } else if (buildEnchantments[position].sublimation) {
      sendElectronEvent(ElectronEvents.BuildAssignSublimation, {
        buildId,
        equipmentPosition: position,
        sublimationId: null,
      });
    }
  };

  return (
    <div
      className={clsx(equipmentsEnchantmentsClasses.rowSublimation, {
        [equipmentsEnchantmentsClasses.rowSublimationHover]:
          ((selectedSublimation !== null && !selectedSublimation.rarityEpic && !selectedSublimation.rarityRelic) ||
            Boolean(buildEnchantments[position].sublimation)) &&
          !selectedEnchantment,
      })}
      onClick={handleClick}
      data-global-click="sublimationSlot"
    >
      <StackRow sx={{ flex: "1 1 0", overflow: "hidden" }}>
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
      <StackRow>
        {buildEnchantments[position].sublimation?.colorPattern.map((color, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: No better key available
          <EnchantmentIcon key={index} height={26} color={color} isFull={patternRespected} />
        ))}
      </StackRow>
    </div>
  );
};
