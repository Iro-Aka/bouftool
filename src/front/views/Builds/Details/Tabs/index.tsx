import { Stack } from "@mui/material";
import { useState } from "react";
import { BuildAbilities } from "../Abilities";
import { BuildDetailsNavbar } from "./Navbar";
import { BuildSearchItems } from "./SearchItems";

export enum EnumBuildDetailsTabs {
  Equipments = "equipments",
  Abilities = "abilities",
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
