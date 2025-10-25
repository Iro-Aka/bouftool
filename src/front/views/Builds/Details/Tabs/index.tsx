import { Stack } from "@mui/material";
import { useState } from "react";
import { BuildAbilities } from "../Abilities";
import { BuildEnchantment } from "../Enchantment";
import { BuildOptimizer } from "../Optimizer";
import { BuildDetailsNavbar } from "./Navbar";
import { BuildSearchItems } from "./SearchItems";

export enum EnumBuildDetailsTabs {
  Equipments = "equipments",
  Abilities = "abilities",
  Enchantment = "enchantment",
  Optimizer = "optimizer",
}

export type TBuildDetailsTabsSwitchProps = {
  selectedTab: EnumBuildDetailsTabs;
};

const BuildDetailsTabsSwitch = ({ selectedTab }: TBuildDetailsTabsSwitchProps) => {
  switch (selectedTab) {
    case EnumBuildDetailsTabs.Equipments:
      return <BuildSearchItems />;
    case EnumBuildDetailsTabs.Abilities:
      return <BuildAbilities />;
    case EnumBuildDetailsTabs.Enchantment:
      return <BuildEnchantment />;
    case EnumBuildDetailsTabs.Optimizer:
      return <BuildOptimizer />;
    default:
      return null;
  }
};

export const BuildDetailsTabs = () => {
  const [selectedTab, setSelectedTab] = useState<EnumBuildDetailsTabs>(EnumBuildDetailsTabs.Equipments);

  return (
    <Stack sx={{ flex: 1, overflow: "hidden" }}>
      <BuildDetailsNavbar selectedTab={selectedTab} onTabChange={setSelectedTab} />
      <BuildDetailsTabsSwitch selectedTab={selectedTab} />
    </Stack>
  );
};
