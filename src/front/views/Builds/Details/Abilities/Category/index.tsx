import { Stack, Typography } from "@mui/material";
import { AbilitiesCategories, type EnumAbilitiesCategories } from "src/wakfu/types/ability";
import { getCurrentAbilitiesCategoryPoints } from "src/wakfu/utils/abilities";
import { useBuildDetailsContext } from "../../context";
import { AbilitiesCategoryRow } from "./row";
import { AbilitiesCategoryRoot, abilitiesCategoryClasses } from "./styles";

export type TAbilitiesCategoryProps = {
  category: EnumAbilitiesCategories;
  level: number;
};

export const AbilitiesCategory = ({ category, level }: TAbilitiesCategoryProps) => {
  const build = useBuildDetailsContext();
  const availablePoints = getCurrentAbilitiesCategoryPoints(build.abilities, category, level);

  return (
    <AbilitiesCategoryRoot className={abilitiesCategoryClasses.root}>
      <div className={abilitiesCategoryClasses.header}>
        <Typography variant="subtitle2">{AbilitiesCategories[category].label}</Typography>
        <div className={abilitiesCategoryClasses.headerRight}>
          <Typography variant="subtitle2">Restants</Typography>
          <Typography className={abilitiesCategoryClasses.availablePoints} variant="subtitle2">
            {availablePoints}
          </Typography>
        </div>
      </div>
      <Stack>
        {AbilitiesCategories[category].abilities.map((ability) => (
          <AbilitiesCategoryRow key={ability} ability={ability} availablePoints={availablePoints} />
        ))}
      </Stack>
    </AbilitiesCategoryRoot>
  );
};
