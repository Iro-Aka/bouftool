import { Typography } from "@mui/material";
import clsx from "clsx";
import { ElectronEvents } from "src/electron/types";
import { ItemIcon } from "src/front/components/Wakfu/ItemIcon";
import { sendElectronEvent } from "src/front/hooks/electron";
import { EnumWakfuRarity } from "src/wakfu/items/rarity";
import { useBuildDetailsContext } from "../../context";
import { EpicSublimationIconGfxId, RelicSublimationIconGfxId } from "../constants";
import { useEnchantmentContext } from "../context";
import type { TWakfuSublimation } from "../types";
import { equipmentsEnchantmentsClasses } from "./styles";

const Classes = {
  [EnumWakfuRarity.Epic]: {
    base: equipmentsEnchantmentsClasses.rowSublimationEpic,
    hover: equipmentsEnchantmentsClasses.rowSublimationEpicHover,
  },
  [EnumWakfuRarity.Relic]: {
    base: equipmentsEnchantmentsClasses.rowSublimationRelic,
    hover: equipmentsEnchantmentsClasses.rowSublimationRelicHover,
  },
};

const BaseIcon = {
  [EnumWakfuRarity.Epic]: EpicSublimationIconGfxId,
  [EnumWakfuRarity.Relic]: RelicSublimationIconGfxId,
};

const SublimationFilter = {
  [EnumWakfuRarity.Epic]: (sublimation: TWakfuSublimation) => sublimation.rarityEpic,
  [EnumWakfuRarity.Relic]: (sublimation: TWakfuSublimation) => sublimation.rarityRelic,
};

const GlobalClickListenerTags = {
  [EnumWakfuRarity.Epic]: "epicSublimationSlot",
  [EnumWakfuRarity.Relic]: "relicSublimationSlot",
};

export type TEquipmentsEnchantmentsRowUniqueSublimationProps = {
  rarity: EnumWakfuRarity.Epic | EnumWakfuRarity.Relic;
};

export const EquipmentsEnchantmentsRowUniqueSublimation = ({
  rarity,
}: TEquipmentsEnchantmentsRowUniqueSublimationProps) => {
  const {
    id: buildId,
    enchantments: { sublimationEpic, sublimationRelic },
  } = useBuildDetailsContext();
  const { selectedSublimation } = useEnchantmentContext();

  const sublimation = rarity === EnumWakfuRarity.Epic ? sublimationEpic : sublimationRelic;

  const handleClick = () => {
    if (selectedSublimation && SublimationFilter[rarity](selectedSublimation)) {
      sendElectronEvent(ElectronEvents.BuildAssignUniqueSublimation, {
        buildId: buildId,
        sublimationId: selectedSublimation.id,
      });
    } else if (!selectedSublimation && sublimation) {
      sendElectronEvent(ElectronEvents.BuildUnassignUniqueSublimation, {
        buildId: buildId,
        rarity: rarity,
      });
    }
  };

  return (
    <div
      className={clsx(Classes[rarity].base, {
        [Classes[rarity].hover]:
          (selectedSublimation && SublimationFilter[rarity](selectedSublimation)) || Boolean(sublimation),
      })}
      onClick={handleClick}
      data-global-click={GlobalClickListenerTags[rarity]}
    >
      <ItemIcon
        height={28}
        className={clsx({
          [equipmentsEnchantmentsClasses.sublimationIconDisabled]: !sublimation,
        })}
      >
        {sublimation?.gfxId ?? BaseIcon[rarity]}
      </ItemIcon>
      <Typography variant="subtitle2" noWrap>
        {sublimation?.name.fr}
      </Typography>
    </div>
  );
};
