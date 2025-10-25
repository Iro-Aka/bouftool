import type { HTMLProps } from "react";
import { EnumWakfuEquipmentPosition, EnumWakfuItemType, isWakfuEquipmentPosition } from "src/wakfu/itemTypes/types";

const Exceptions = [
  {
    originTypes: [
      EnumWakfuItemType.WandOneHanded,
      EnumWakfuItemType.SwordOneHanded,
      EnumWakfuItemType.StaffOneHanded,
      EnumWakfuItemType.NeedleOneHanded,
      EnumWakfuItemType.CardOneHanded,
    ],
    replacedBy: EnumWakfuItemType.OneHandedWeapon,
  },
  {
    originTypes: [
      EnumWakfuItemType.AxeTwoHanded,
      EnumWakfuItemType.ShovelTwoHanded,
      EnumWakfuItemType.HammerTwoHanded,
      EnumWakfuItemType.BowTwoHanded,
      EnumWakfuItemType.SwordTwoHanded,
      EnumWakfuItemType.StaffTwoHanded,
    ],
    replacedBy: EnumWakfuItemType.TwoHandedWeapon,
  },
  {
    originTypes: [EnumWakfuItemType.DaggerSecondHand, EnumWakfuItemType.ShieldSecondHand],
    replacedBy: EnumWakfuItemType.SecondHand,
  },
];

const PositionToItemTypeMap: Record<EnumWakfuEquipmentPosition, EnumWakfuItemType> = {
  [EnumWakfuEquipmentPosition.FirstWeapon]: EnumWakfuItemType.Weapon,
  [EnumWakfuEquipmentPosition.SecondWeapon]: EnumWakfuItemType.Weapon,
  [EnumWakfuEquipmentPosition.Head]: EnumWakfuItemType.Helmet,
  [EnumWakfuEquipmentPosition.Chest]: EnumWakfuItemType.Breastplate,
  [EnumWakfuEquipmentPosition.Legs]: EnumWakfuItemType.Boots,
  [EnumWakfuEquipmentPosition.Belt]: EnumWakfuItemType.Belt,
  [EnumWakfuEquipmentPosition.Neck]: EnumWakfuItemType.Amulet,
  [EnumWakfuEquipmentPosition.Back]: EnumWakfuItemType.Cloak,
  [EnumWakfuEquipmentPosition.LeftHand]: EnumWakfuItemType.Ring,
  [EnumWakfuEquipmentPosition.RightHand]: EnumWakfuItemType.Ring,
  [EnumWakfuEquipmentPosition.Shoulders]: EnumWakfuItemType.Shoulders,
  [EnumWakfuEquipmentPosition.Accessory]: EnumWakfuItemType.Accessory,
  [EnumWakfuEquipmentPosition.Mount]: EnumWakfuItemType.Mount,
  [EnumWakfuEquipmentPosition.Pet]: EnumWakfuItemType.Pet,
};

export interface ItemTypeIconProps extends Omit<HTMLProps<HTMLImageElement>, "children" | "src" | "alt"> {
  children: EnumWakfuItemType | EnumWakfuEquipmentPosition;
}

export const ItemTypeIcon = ({ children, ...props }: ItemTypeIconProps) => {
  const itemType = isWakfuEquipmentPosition(children) ? PositionToItemTypeMap[children] : children;
  const exception = Exceptions.find((ex) => ex.originTypes.includes(itemType));
  const effectiveType = exception ? exception.replacedBy : itemType;
  return <img src={`wakfu/itemTypes/${effectiveType}.png`} alt={String(effectiveType)} {...props} />;
};
