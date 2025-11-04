import { Typography } from "@mui/material";
import { StackRow } from "src/front/components/Layout/StackRow";
import { TooltipInfo } from "src/front/components/TooltipInfo";
import { I18n } from "src/front/i18n";
import { EnumWakfuRarity } from "src/wakfu/items/rarity";
import { EnumWakfuEquipmentPosition } from "src/wakfu/itemTypes/types";
import type { TWakfuEnchantment } from "../types";
import { EquipmentsEnchantmentsRow } from "./row";
import { EquipmentsEnchantmentsRoot, equipmentsEnchantmentsClasses } from "./styles";
import { EquipmentsEnchantmentsRowUniqueSublimation } from "./uniqueSublimation";

const EnchantableEquipmentsPositions = [
  EnumWakfuEquipmentPosition.Head,
  EnumWakfuEquipmentPosition.Back,
  EnumWakfuEquipmentPosition.Neck,
  EnumWakfuEquipmentPosition.Shoulders,
  EnumWakfuEquipmentPosition.Chest,
  EnumWakfuEquipmentPosition.Belt,
  EnumWakfuEquipmentPosition.LeftHand,
  EnumWakfuEquipmentPosition.RightHand,
  EnumWakfuEquipmentPosition.Legs,
  EnumWakfuEquipmentPosition.FirstWeapon,
] as const satisfies EnumWakfuEquipmentPosition[];

export type TEquipmentsEnchantmentsProps = {
  enchantments: TWakfuEnchantment[];
  shardLevelRequirement: number[];
};

export const EquipmentsEnchantments = ({ enchantments, shardLevelRequirement }: TEquipmentsEnchantmentsProps) => {
  return (
    <EquipmentsEnchantmentsRoot className={equipmentsEnchantmentsClasses.root}>
      <StackRow sx={{ justifyContent: "space-between" }}>
        <Typography variant="subtitle2">Équipements</Typography>
        <TooltipInfo title={<I18n library="HelperTooltip" message="BuildEnchantments" />} />
      </StackRow>
      <div className={equipmentsEnchantmentsClasses.scroll}>
        {EnchantableEquipmentsPositions.map((position) => (
          <EquipmentsEnchantmentsRow
            key={position}
            position={position}
            enchantments={enchantments}
            shardLevelRequirement={shardLevelRequirement}
          />
        ))}
        <EquipmentsEnchantmentsRowUniqueSublimation rarity={EnumWakfuRarity.Epic} />
        <EquipmentsEnchantmentsRowUniqueSublimation rarity={EnumWakfuRarity.Relic} />
      </div>
    </EquipmentsEnchantmentsRoot>
  );
};
