import { WakfuData } from "src/wakfu/data";
import type { WakfuItem } from "src/wakfu/data/item";
import { WakfuItemTypeId } from "src/wakfu/types/itemType";

export const searchItemsItemTypesFilter = (item: WakfuItem, itemTypes: number[]) => {
  const itemTypesMap = WakfuData.getInstance().getItemTypesMap();
  if (itemTypes.length === 0) {
    itemTypes = [
      WakfuItemTypeId.Amulet,
      WakfuItemTypeId.Ring,
      WakfuItemTypeId.Boots,
      WakfuItemTypeId.Cloak,
      WakfuItemTypeId.Helmet,
      WakfuItemTypeId.Belt,
      WakfuItemTypeId.Shoulders,
      WakfuItemTypeId.Breastplate,
      WakfuItemTypeId.OneHandedWeapon,
      WakfuItemTypeId.TwoHandedWeapon,
      WakfuItemTypeId.SecondHand,
      WakfuItemTypeId.Emblem,
    ];
  }
  return itemTypes.some(
    (itemType) => itemType === item.getItemTypeId() || itemType === itemTypesMap.get(item.getItemTypeId())?.parentId,
  );
};
