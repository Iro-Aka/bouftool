import { Stack, Typography } from "@mui/material";
import { StackRow } from "src/front/components/Layout/StackRow";
import { BreedFaceIcon } from "src/front/components/Wakfu/BreedFaceIcon";
import { useNavigationContext } from "../../Navigation";
import { NavigationView } from "../../Navigation/types";
import { SearchEquipments } from "../../SearchEquipments";
import { useBuildDetailsContext } from "./context";
import { BuildDetailsItems } from "./Items";
import { BuildDetailsNavbar } from "./Navbar";
import { BuildDetailsStatsBase } from "./Stats/base";
import { BuildDetailsStatsCombat } from "./Stats/combat";
import { BuildDetailsStatsMastery } from "./Stats/mastery";
import { BuildDetailsStatResistance } from "./Stats/resistance";
import { BuildDetailsStatsSecondary } from "./Stats/secondary";

export const BuildDetails = () => {
  const {
    params: { buildId },
  } = useNavigationContext(NavigationView.BuildDetails);
  const build = useBuildDetailsContext();
  return (
    <Stack sx={{ flex: 1, flexDirection: "row", overflow: "hidden" }}>
      <Stack
        sx={{
          flex: "0 0 450px",
          borderRight: (theme) => `1px solid ${theme.palette.divider}`,
          p: 1,
          gap: 1,
        }}
      >
        <StackRow sx={{ "&&": { alignItems: "start" } }}>
          <Stack
            sx={{ border: (theme) => `1px solid ${theme.palette.border.light}`, borderRadius: 2, overflow: "hidden" }}
          >
            <BreedFaceIcon width={44}>{build.breed}</BreedFaceIcon>
          </Stack>
          <Stack>
            <Typography variant="subtitle2">Iro Kaen (Berserk)</Typography>
            <Typography variant="caption">Niv. {build.level}</Typography>
          </Stack>
        </StackRow>
        <BuildDetailsItems />
        <BuildDetailsStatsBase />
        <Typography variant="subtitle2" sx={{ alignSelf: "center" }}>
          Maîtrises et Résistances
        </Typography>
        <BuildDetailsStatsMastery />
        <BuildDetailsStatResistance />
        <Typography variant="subtitle2" sx={{ alignSelf: "center" }}>
          Combat
        </Typography>
        <BuildDetailsStatsCombat />
        <Typography variant="subtitle2" sx={{ alignSelf: "center" }}>
          Secondaire
        </Typography>
        <BuildDetailsStatsSecondary />
      </Stack>
      <Stack sx={{ flex: 1, overflow: "hidden" }}>
        <BuildDetailsNavbar />
        <SearchEquipments buildId={buildId} />
      </Stack>
    </Stack>
  );
};
