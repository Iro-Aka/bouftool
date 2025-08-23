import { Button } from "@mui/material";
import { ElectronEvents } from "src/electron/types";
import { sendElectronEvent } from "src/front/hooks/electron";
import { WakfuItemTypeId } from "src/wakfu/types/itemType";

const BaseUrls: Record<string, { itemTypeIds: WakfuItemTypeId[]; baseUrl: string }> = {
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
const BaseUrlsMap = new Map<number, string>();
for (const key in BaseUrls) {
  const { itemTypeIds, baseUrl } = BaseUrls[key];
  for (const itemTypeId of itemTypeIds) {
    BaseUrlsMap.set(itemTypeId, baseUrl);
  }
}

export type TSearchItemsEncyclopediaProps = {
  itemId: number;
  itemTypeId: number;
};

export const SearchItemsEncyclopedia = ({ itemId, itemTypeId }: TSearchItemsEncyclopediaProps) => {
  const baseUrl = BaseUrlsMap.get(itemTypeId);
  return (
    <Button
      variant="push"
      sx={{ minWidth: 0, p: 0, aspectRatio: "1" }}
      onClick={() => sendElectronEvent(ElectronEvents.OpenUrl, { url: `${baseUrl}${itemId}` })}
      disabled={!baseUrl}
    >
      <img height={18} src={`wakfu/EncyclopediaIcon.png`} alt="Encyclopedia Icon" />
    </Button>
  );
};
