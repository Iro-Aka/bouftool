import { WakfuItemTypeId } from "../types/itemType";

const EncyclopediaBaseUrls: Record<string, { itemTypeIds: WakfuItemTypeId[]; baseUrl: string }> = {
  armors: {
    itemTypeIds: [
      WakfuItemTypeId.Amulet,
      WakfuItemTypeId.Ring,
      WakfuItemTypeId.Boots,
      WakfuItemTypeId.Cloak,
      WakfuItemTypeId.Helmet,
      WakfuItemTypeId.Belt,
      WakfuItemTypeId.Shoulders,
      WakfuItemTypeId.Breastplate,
    ],
    baseUrl: "https://www.wakfu.com/fr/mmorpg/encyclopedie/armures/",
  },
  weapons: {
    itemTypeIds: [
      WakfuItemTypeId.AxeTwoHanded,
      WakfuItemTypeId.BowTwoHanded,
      WakfuItemTypeId.CardOneHanded,
      WakfuItemTypeId.DaggerSecondHand,
      WakfuItemTypeId.HammerTwoHanded,
      WakfuItemTypeId.NeedleOneHanded,
      WakfuItemTypeId.ShieldSecondHand,
      WakfuItemTypeId.ShovelTwoHanded,
      WakfuItemTypeId.StaffOneHanded,
      WakfuItemTypeId.StaffTwoHanded,
      WakfuItemTypeId.SwordOneHanded,
      WakfuItemTypeId.SwordTwoHanded,
      WakfuItemTypeId.WandOneHanded,
    ],
    baseUrl: "https://www.wakfu.com/fr/mmorpg/encyclopedie/armes/",
  },
  pets: {
    itemTypeIds: [WakfuItemTypeId.Pet],
    baseUrl: "https://www.wakfu.com/fr/mmorpg/encyclopedie/familiers/",
  },
  accessories: {
    itemTypeIds: [WakfuItemTypeId.Emblem],
    baseUrl: "https://www.wakfu.com/fr/mmorpg/encyclopedie/accessoires/",
  },
  mounts: {
    itemTypeIds: [WakfuItemTypeId.Mount],
    baseUrl: "https://www.wakfu.com/fr/mmorpg/encyclopedie/montures/",
  },
};
export const DefaultEncyclopediaBaseUrl = "https://www.wakfu.com/fr/mmorpg/encyclopedie/ressources/";
export const EncyclopediaBaseUrlsMap = new Map<number, string>();
for (const key in EncyclopediaBaseUrls) {
  const { itemTypeIds, baseUrl } = EncyclopediaBaseUrls[key];
  for (const itemTypeId of itemTypeIds) {
    EncyclopediaBaseUrlsMap.set(itemTypeId, baseUrl);
  }
}
