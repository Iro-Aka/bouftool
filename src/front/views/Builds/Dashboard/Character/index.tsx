import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Stack, Typography } from "@mui/material";
import { ElectronEvents } from "src/electron/types";
import { StackRow } from "src/front/components/Layout/StackRow";
import { BreedFaceIcon } from "src/front/components/Wakfu/BreedFaceIcon";
import { sendElectronEvent, useElectronEvent } from "src/front/hooks/electron";
import { useNavigationContext } from "src/front/views/Navigation";
import { NavigationView } from "src/front/views/Navigation/types";
import type { TWakfuCharacterDisplay } from "src/wakfu/builds/types";
import { useModalEditCharacterContext } from "../ModalEditCharacter/context";
import { CardCharacterBuild } from "./build";
import { CardCharacterRoot, cardCharacterClasses } from "./styles";

export type TCharacterProps = {
  character: TWakfuCharacterDisplay;
};

export const Character = ({ character }: TCharacterProps) => {
  const { setCurrentView } = useNavigationContext();
  const openModalEditCharacter = useModalEditCharacterContext();
  const [createBuild, _, loading] = useElectronEvent(ElectronEvents.BuildCreate);
  const [deserializeBuild] = useElectronEvent(ElectronEvents.BuildDeserialize);

  const handleClickCreateBuild = async () => {
    const build = await createBuild({ characterId: character.id });
    setCurrentView(NavigationView.BuildDetails, { buildId: build.buildId });
  };

  const handleClickEditCharacter = () => {
    openModalEditCharacter({
      open: true,
      character: { name: character.name, breed: character.breed },
      onSubmit: (name, breed) =>
        sendElectronEvent(ElectronEvents.BuildEditCharacter, { characterId: character.id, name, breed }),
      title: "Modifier le personnage",
      submitLabel: "Modifier",
    });
  };

  const handleClickPasteBuild = async () => {
    const clipboardText = await navigator.clipboard.readText();
    const result = await deserializeBuild({ characterId: character.id, serializedBuild: clipboardText });
    setCurrentView(NavigationView.BuildDetails, { buildId: result.buildId });
  };

  return (
    <CardCharacterRoot className={cardCharacterClasses.root}>
      <StackRow className={cardCharacterClasses.character}>
        <StackRow>
          <BreedFaceIcon className={cardCharacterClasses.breed}>{character.breed}</BreedFaceIcon>
          <Typography variant="subtitle2">{character.name}</Typography>
        </StackRow>
        <StackRow>
          <Button
            variant="push"
            startIcon={<AddIcon />}
            onClick={handleClickCreateBuild}
            disabled={loading}
            loading={loading}
          >
            Nouveau Build
          </Button>
          <Button variant="push" onClick={handleClickPasteBuild}>
            Importer
          </Button>
          <Button variant="push" onClick={handleClickEditCharacter}>
            <EditIcon />
          </Button>
        </StackRow>
      </StackRow>
      <Stack>
        {character.builds.map((build) => (
          <CardCharacterBuild key={build.id} characterId={character.id} build={build} />
        ))}
      </Stack>
    </CardCharacterRoot>
  );
};
