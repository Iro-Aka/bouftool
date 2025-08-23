import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, OutlinedInput, Tooltip, Typography } from "@mui/material";
import { type MouseEvent, useState } from "react";
import { ElectronEvents } from "src/electron/types";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { sendElectronEvent } from "src/front/hooks/electron";
import { AbilitiesCategoryButtonTooltip } from "src/front/views/Builds/Details/Abilities/Category/buttonTooltip";
import { AbilitiesDefinitions, type EnumAbilities } from "src/wakfu/types/ability";
import { useBuildDetailsContext } from "../../context";
import { AbilitiesDisplay } from "../constants";
import { abilitiesCategoryClasses } from "./styles";
import { AbilitiesCategoryTooltip } from "./tooltip";

export type TAbilitiesCategoryRowProps = {
  ability: EnumAbilities;
  availablePoints: number;
};

export const AbilitiesCategoryRow = ({ ability, availablePoints }: TAbilitiesCategoryRowProps) => {
  const [parentOpen, setParentOpen] = useState(false);
  const [childOpened, setChildOpened] = useState(false);
  const build = useBuildDetailsContext();
  const abilityLevel = build.abilities[ability] ?? 0;
  const addLevelDisabled =
    availablePoints <= 0 ||
    (abilityLevel >= AbilitiesDefinitions[ability].maxLevel && AbilitiesDefinitions[ability].maxLevel > 0);
  const removeLevelDisabled = abilityLevel <= 0;

  const handleAddClick = (event: MouseEvent<HTMLButtonElement>) => {
    const levels = event.altKey ? availablePoints : event.shiftKey ? 10 : 1;
    sendElectronEvent(ElectronEvents.BuildAddAbilityLevel, { buildId: build.id, ability, level: levels });
  };

  const handleRemoveClick = (event: MouseEvent<HTMLButtonElement>) => {
    const levels = event.altKey ? abilityLevel : event.shiftKey ? 10 : 1;
    sendElectronEvent(ElectronEvents.BuildRemoveAbilityLevel, { buildId: build.id, ability, level: levels });
  };

  return (
    <Tooltip
      open={childOpened ? false : parentOpen}
      title={<AbilitiesCategoryTooltip ability={ability} />}
      placement="left"
      arrow
      disableInteractive
      onOpen={() => setParentOpen(true)}
      onClose={() => setParentOpen(false)}
    >
      <div className={abilitiesCategoryClasses.row}>
        <div className={abilitiesCategoryClasses.rowLabel}>
          <StatsIcon>{AbilitiesDisplay[ability].icon}</StatsIcon>
          <Typography variant="caption">{AbilitiesDisplay[ability].label}</Typography>
        </div>
        <div className={abilitiesCategoryClasses.rowActions}>
          <Tooltip
            title={<AbilitiesCategoryButtonTooltip type="remove" />}
            placement="top"
            arrow
            disableInteractive
            onOpen={() => setChildOpened(true)}
            onClose={() => setChildOpened(false)}
            disableHoverListener={removeLevelDisabled}
          >
            <span>
              <Button
                variant="push"
                size="small"
                className={abilitiesCategoryClasses.rowActionsButton}
                onClick={handleRemoveClick}
                disabled={removeLevelDisabled}
              >
                <RemoveIcon fontSize="small" />
              </Button>
            </span>
          </Tooltip>
          <OutlinedInput
            value={build.abilities[ability] ?? 0}
            size="small"
            className={abilitiesCategoryClasses.rowActionsInput}
          />
          <Tooltip
            title={<AbilitiesCategoryButtonTooltip type="add" />}
            placement="top"
            arrow
            disableInteractive
            onOpen={() => setChildOpened(true)}
            onClose={() => setChildOpened(false)}
            disableHoverListener={addLevelDisabled}
          >
            <span>
              <Button
                variant="push"
                size="small"
                className={abilitiesCategoryClasses.rowActionsButton}
                onClick={handleAddClick}
                disabled={addLevelDisabled}
              >
                <AddIcon fontSize="small" />
              </Button>
            </span>
          </Tooltip>
        </div>
      </div>
    </Tooltip>
  );
};
