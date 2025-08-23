import { Stack, Typography } from "@mui/material";
import { StackRow } from "src/front/components/Layout/StackRow";
import { BuildDetailsInfo } from "./Info";
import { BuildDetailsItems } from "./Items";
import { BuildDetailsPreferences } from "./Preferences";
import { BuildDetailsAdditionalStats } from "./Stats/additionalStats";
import { BuildDetailsStatsBase } from "./Stats/base";
import { BuildDetailsStatsCombat } from "./Stats/combat";
import { BuildDetailsStatsMastery } from "./Stats/mastery";
import { BuildDetailsStatResistance } from "./Stats/resistance";
import { BuildDetailsStatsSecondary } from "./Stats/secondary";
import { BuildDetailsTabs } from "./Tabs";

export const BuildDetails = () => {
  return (
    <Stack sx={{ flex: 1, flexDirection: "row", overflow: "hidden" }}>
      <Stack
        sx={{
          flex: "0 0 450px",
          maxWidth: 450,
          borderRight: (theme) => `1px solid ${theme.palette.divider}`,
          p: 1,
          gap: 1,
          overflowY: "auto",
        }}
      >
        <StackRow sx={{ "&&": { alignItems: "start", justifyContent: "space-between" } }}>
          <BuildDetailsInfo />
          <BuildDetailsPreferences />
        </StackRow>
        <BuildDetailsItems />
        <BuildDetailsStatsBase />
        <Typography variant="subtitle2" sx={{ alignSelf: "center" }}>
          Maîtrises et Résistances
        </Typography>
        <BuildDetailsAdditionalStats />
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
      <BuildDetailsTabs />
    </Stack>
  );
};
