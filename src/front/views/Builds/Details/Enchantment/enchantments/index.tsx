import { Slider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useBuildDetailsContext } from "../../context";
import { useEnchantmentContext } from "../context";
import type { TWakfuEnchantment } from "../types";
import { ListEnchantmentsRow } from "./row";
import { ListEnchantmentsRoot, listEnchantmentsClasses } from "./styles";

export type TAbilitiesCategoryProps = {
  shardLevelRequirement: number[];
  enchantments: TWakfuEnchantment[];
};

export const ListEnchantments = ({ shardLevelRequirement, enchantments }: TAbilitiesCategoryProps) => {
  const { level } = useBuildDetailsContext();
  const maxLevel = shardLevelRequirement.findIndex((req) => req > level) || shardLevelRequirement.length;
  const [selectedLevel, setSelectedLevel] = useState(maxLevel);
  const { setSelectedEnchantment } = useEnchantmentContext();

  useEffect(() => {
    setSelectedEnchantment((prev) => {
      if (!prev || selectedLevel === prev.level) {
        return prev;
      }
      return { ...prev, level: selectedLevel };
    });
  }, [selectedLevel, setSelectedEnchantment]);

  return (
    <ListEnchantmentsRoot className={listEnchantmentsClasses.root}>
      <Typography variant="subtitle2">Enchantements</Typography>
      <Stack sx={{ px: 2 }}>
        <Slider
          step={1}
          value={selectedLevel}
          onChange={(_, value) => setSelectedLevel(value)}
          min={1}
          max={maxLevel}
          valueLabelDisplay="auto"
          data-global-click="enchantmentItem"
        />
      </Stack>
      <div className={listEnchantmentsClasses.scroll}>
        {enchantments.map((enchantment) => (
          <ListEnchantmentsRow key={enchantment.id} enchantment={enchantment} level={selectedLevel} />
        ))}
      </div>
    </ListEnchantmentsRoot>
  );
};
