import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, OutlinedInput, Tooltip, Typography } from "@mui/material";
import { type MouseEvent, useEffect, useState } from "react";
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
  const [rowTooltipOpen, setRowTooltipOpen] = useState(false);
  const [removeTooltipOpen, setRemoveTooltipOpen] = useState(false);
  const [addTooltipOpen, setAddTooltipOpen] = useState(false);
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

  useEffect(() => {
    if (addLevelDisabled) {
      setAddTooltipOpen(false);
    }
  }, [addLevelDisabled]);

  useEffect(() => {
    if (removeLevelDisabled) {
      setRemoveTooltipOpen(false);
    }
  }, [removeLevelDisabled]);

  return (
    <Tooltip
      open={removeTooltipOpen || addTooltipOpen ? false : rowTooltipOpen}
      onOpen={() => setRowTooltipOpen(true)}
      onClose={() => setRowTooltipOpen(false)}
      title={<AbilitiesCategoryTooltip ability={ability} />}
      placement="left"
      arrow
      disableInteractive
    >
      <div className={abilitiesCategoryClasses.row}>
        <div className={abilitiesCategoryClasses.rowLabel}>
          <StatsIcon>{AbilitiesDisplay[ability].icon}</StatsIcon>
          <Typography variant="caption">{AbilitiesDisplay[ability].label}</Typography>
        </div>
        <div className={abilitiesCategoryClasses.rowActions}>
          <Tooltip
            open={removeLevelDisabled ? false : removeTooltipOpen}
            onOpen={() => !removeLevelDisabled && setRemoveTooltipOpen(true)}
            onClose={() => setRemoveTooltipOpen(false)}
            title={<AbilitiesCategoryButtonTooltip type="remove" />}
            placement="top"
            arrow
            disableInteractive
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
            open={addLevelDisabled ? false : addTooltipOpen}
            onOpen={() => !addLevelDisabled && setAddTooltipOpen(true)}
            onClose={() => setAddTooltipOpen(false)}
            title={<AbilitiesCategoryButtonTooltip type="add" />}
            placement="top"
            arrow
            disableInteractive
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
