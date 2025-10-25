import { Typography } from "@mui/material";
import { EnumWakfuEquipmentPosition } from "src/wakfu/itemTypes/types";
import type { TWakfuEnchantment } from "../types";
import { EquipmentsEnchantmentsRow } from "./row";
import { EquipmentsEnchantmentsRoot, equipmentsEnchantmentsClasses } from "./styles";

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
};

export const EquipmentsEnchantments = ({ enchantments }: TEquipmentsEnchantmentsProps) => {
  return (
    <EquipmentsEnchantmentsRoot className={equipmentsEnchantmentsClasses.root}>
      <Typography variant="subtitle2">Équipements</Typography>
      <div className={equipmentsEnchantmentsClasses.scroll}>
        {EnchantableEquipmentsPositions.map((position) => (
          <EquipmentsEnchantmentsRow key={position} position={position} enchantments={enchantments} />
        ))}
      </div>
    </EquipmentsEnchantmentsRoot>
  );
};
