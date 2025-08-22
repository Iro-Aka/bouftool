import { Stack } from "@mui/material";
import { StackGrid } from "src/front/components/Layout/StackGrid";
import { EnumAbilitiesCategories } from "src/wakfu/types/ability";
import { useBuildDetailsContext } from "../context";
import { AbilitiesCategory } from "./Category";

export const BuildAbilities = () => {
  const build = useBuildDetailsContext();

  return (
    <Stack
      sx={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto",
        flexDirection: "row",
      }}
    >
      <StackGrid columns={2} gap={2} p={2} sx={{ flex: 1, maxWidth: "800px" }}>
        <Stack sx={{ gap: 1 }}>
          <AbilitiesCategory category={EnumAbilitiesCategories.Intelligence} level={build.level} />
          <AbilitiesCategory category={EnumAbilitiesCategories.Strength} level={build.level} />
          <AbilitiesCategory category={EnumAbilitiesCategories.Agility} level={build.level} />
        </Stack>
        <Stack sx={{ gap: 1 }}>
          <AbilitiesCategory category={EnumAbilitiesCategories.Chance} level={build.level} />
          <AbilitiesCategory category={EnumAbilitiesCategories.Major} level={build.level} />
        </Stack>
      </StackGrid>
    </Stack>
  );
};
