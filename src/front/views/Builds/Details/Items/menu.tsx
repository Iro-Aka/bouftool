import { Button, ListItem, ListItemButton, Typography } from "@mui/material";
import { ElectronEvents } from "src/electron/types";
import { StackRow } from "src/front/components/Layout/StackRow";
import { Popover } from "src/front/components/Navigation/Popover";
import { ItemTypeIcon } from "src/front/components/Wakfu/ItemTypeIcon";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { sendElectronEvent } from "src/front/hooks/electron";
import { type EnumWakfuEquipmentPosition, EnumWakfuItemType } from "src/wakfu/itemTypes/types";
import { EnumWakfuStat, type TElementalPreferences } from "src/wakfu/stats/types";
import { useBuildDetailsContext } from "../context";
import { BuildDetailsPreferencesSortable } from "../Preferences/sortable";
import { BuildItemMenuList, buildItemMenuListClasses } from "./styles";

export type TBuildItemMenuProps = {
  open: boolean;
  position: EnumWakfuEquipmentPosition;
  anchorEl: HTMLElement | null;
  onClose: () => void;
};

export const BuildItemMenu = ({ open, position, anchorEl, onClose }: TBuildItemMenuProps) => {
  const { id: buildId, stuff, elementalPreferences } = useBuildDetailsContext();

  const disabledElementalPreferences = !position || stuff[position].preferences === null;

  const toggleElementalPreferences = () => {
    sendElectronEvent(ElectronEvents.BuildSetPositionElementalPreferences, {
      buildId: buildId,
      position: position,
      preferences: disabledElementalPreferences ? elementalPreferences : null,
    });
  };

  const handleChangePreferences = (newPreferences: TElementalPreferences) => {
    sendElectronEvent(ElectronEvents.BuildSetPositionElementalPreferences, {
      buildId: buildId,
      position: position,
      preferences: newPreferences,
    });
  };

  const handleEncyclopedia = () => {
    if (stuff[position].item) {
      sendElectronEvent(ElectronEvents.OpenWebEncyclopedia, {
        itemId: stuff[position].item.id,
        itemTypeId: stuff[position].item.itemType.id,
      });
    }
    onClose();
  };

  const handleCraft = () => {
    if (stuff[position].item) {
      sendElectronEvent(ElectronEvents.CraftManagerAddItem, { itemId: stuff[position].item?.id });
    }
    onClose();
  };

  const handleUnequip = () => {
    sendElectronEvent(ElectronEvents.BuildUnequipItem, { buildId: buildId, position });
    onClose();
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      onClose={onClose}
      slotProps={{
        paper: { sx: { border: (theme) => `1px solid ${theme.palette.border.light}` } },
      }}
    >
      <BuildItemMenuList className={buildItemMenuListClasses.root}>
        <ListItem>
          <Button size="small" variant="push" onClick={toggleElementalPreferences}>
            <StatsIcon>{EnumWakfuStat.ElementalMastery}</StatsIcon>
          </Button>
          <StackRow
            sx={{ "&&": { gap: 0.5 }, ...(disabledElementalPreferences && { "& img": { filter: "grayscale(100%)" } }) }}
          >
            <BuildDetailsPreferencesSortable
              value={(position ? stuff[position].preferences : null) ?? elementalPreferences}
              onChange={handleChangePreferences}
              disabled={disabledElementalPreferences}
            />
          </StackRow>
        </ListItem>
        <ListItemButton onClick={handleEncyclopedia}>
          <img height={22} src={`wakfu/EncyclopediaIcon.png`} alt="Encyclopedia Icon" />
          <Typography variant="subtitle2">Encyclopédie</Typography>
        </ListItemButton>
        <ListItemButton onClick={handleCraft} disabled={stuff[position].item?.recipes.length === 0}>
          <img height={22} src={`wakfu/RecipeIcon.png`} alt="Recipe Icon" />
          <Typography variant="subtitle2">Crafter</Typography>
        </ListItemButton>
        <ListItemButton onClick={handleUnequip}>
          <ItemTypeIcon height={22}>{EnumWakfuItemType.Helmet}</ItemTypeIcon>
          <Typography variant="subtitle2">Déséquiper</Typography>
        </ListItemButton>
      </BuildItemMenuList>
    </Popover>
  );
};
