import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Stack, Tooltip, Typography } from "@mui/material";
import type { MouseEvent } from "react";
import { ElectronEvents } from "src/electron/types";
import { StackRow } from "src/front/components/Layout/StackRow";
import { useModalConfirmationContext } from "src/front/components/Modal/Confirmation";
import { ItemSlot } from "src/front/components/Wakfu/ItemSlot";
import { useElectronEvent } from "src/front/hooks/electron";
import { useNavigationContext } from "src/front/views/Navigation";
import { NavigationView } from "src/front/views/Navigation/types";
import type { TWakfuBuildMinimalDisplay } from "src/wakfu/builds/types";
import { EnumWakfuEquipmentPosition } from "src/wakfu/itemTypes/types";
import { cardCharacterClasses } from "./styles";

export type TCardCharacterBuildProps = {
  characterId: string;
  build: TWakfuBuildMinimalDisplay;
};

export const CardCharacterBuild = ({ characterId, build }: TCardCharacterBuildProps) => {
  const { setCurrentView } = useNavigationContext();
  const confirm = useModalConfirmationContext();
  const [deleteBuild, _, loading] = useElectronEvent(ElectronEvents.BuildDelete);
  const [serializeBuild] = useElectronEvent(ElectronEvents.BuildSerialize);

  const handleClickBuild = () => {
    setCurrentView(NavigationView.BuildDetails, { buildId: build.id });
  };

  const handleClickDeleteBuild = (evt: MouseEvent) => {
    evt.stopPropagation();
    confirm("Confirmer la suppression", "Êtes-vous sûr de vouloir supprimer ce build ?").then((result) => {
      if (result) {
        deleteBuild({ characterId, buildId: build.id });
      }
    });
  };

  const handleClickExportBuild = async (evt: MouseEvent) => {
    evt.stopPropagation();
    const result = await serializeBuild({ buildId: build.id });
    await navigator.clipboard.writeText(result.serializedBuild);
  };

  return (
    <StackRow key={build.id} className={cardCharacterClasses.build} onClick={handleClickBuild}>
      <Stack>
        <Typography variant="subtitle2">{build.name}</Typography>
        <Typography variant="caption">Niv. {build.level}</Typography>
      </Stack>
      <StackRow flexWrap="wrap">
        {Object.values(EnumWakfuEquipmentPosition).map((position) => (
          <ItemSlot key={position} position={position} item={build.stuff[position]} size={40} disableTooltip />
        ))}
        <Button variant="push" onClick={handleClickExportBuild}>
          <Tooltip title="Exporter le build dans le presse-papier" placement="top">
            <ContentCopyIcon />
          </Tooltip>
        </Button>
        <Button variant="push" onClick={handleClickDeleteBuild} disabled={loading} loading={loading}>
          <Tooltip title="Supprimer le build" placement="top">
            <DeleteIcon color="error" />
          </Tooltip>
        </Button>
      </StackRow>
    </StackRow>
  );
};
