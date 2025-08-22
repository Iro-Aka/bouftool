import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, OutlinedInput, Typography } from "@mui/material";
import type { MouseEvent } from "react";
import { ElectronEvents } from "src/electron/types";
import { StatsIcon } from "src/front/components/Wakfu/StatsIcon";
import { sendElectronEvent } from "src/front/hooks/electron";
import { AbilitiesDefinitions, type EnumAbilities } from "src/wakfu/types/ability";
import { useBuildDetailsContext } from "../../context";
import { AbilitiesDisplay } from "../constants";
import { abilitiesCategoryClasses } from "./styles";

export type TAbilitiesCategoryRowProps = {
  ability: EnumAbilities;
  availablePoints: number;
};

export const AbilitiesCategoryRow = ({ ability, availablePoints }: TAbilitiesCategoryRowProps) => {
  const build = useBuildDetailsContext();
  const abilityLevel = build.abilities[ability] ?? 0;

  const handleAddClick = (event: MouseEvent<HTMLButtonElement>) => {
    const levels = event.altKey ? availablePoints : event.shiftKey ? 10 : 1;
    sendElectronEvent(ElectronEvents.BuildAddAbilityLevel, { buildId: build.id, ability, level: levels });
  };

  const handleRemoveClick = (event: MouseEvent<HTMLButtonElement>) => {
    const levels = event.altKey ? abilityLevel : event.shiftKey ? 10 : 1;
    sendElectronEvent(ElectronEvents.BuildRemoveAbilityLevel, { buildId: build.id, ability, level: levels });
  };

  return (
    <div className={abilitiesCategoryClasses.row}>
      <div className={abilitiesCategoryClasses.rowLabel}>
        <StatsIcon>{AbilitiesDisplay[ability].icon}</StatsIcon>
        <Typography variant="caption">{AbilitiesDisplay[ability].label}</Typography>
      </div>
      <div className={abilitiesCategoryClasses.rowActions}>
        <Button
          variant="push"
          size="small"
          className={abilitiesCategoryClasses.rowActionsButton}
          onClick={handleRemoveClick}
          disabled={abilityLevel <= 0}
        >
          <RemoveIcon fontSize="small" />
        </Button>
        <OutlinedInput
          value={build.abilities[ability] ?? 0}
          size="small"
          className={abilitiesCategoryClasses.rowActionsInput}
        />
        <Button
          variant="push"
          size="small"
          className={abilitiesCategoryClasses.rowActionsButton}
          onClick={handleAddClick}
          disabled={
            availablePoints <= 0 ||
            (abilityLevel >= AbilitiesDefinitions[ability].maxLevel && AbilitiesDefinitions[ability].maxLevel > 0)
          }
        >
          <AddIcon fontSize="small" />
        </Button>
      </div>
    </div>
  );
};
