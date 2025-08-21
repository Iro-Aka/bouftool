import AddIcon from "@mui/icons-material/Add";
import { Button, Stack } from "@mui/material";
import { useLayoutEffect } from "react";
import { ElectronEvents } from "src/electron/types";
import { StackRow } from "src/front/components/Layout/StackRow";
import { useElectronEvent } from "src/front/hooks/electron";
import { useNavigationContext } from "../../Navigation";
import { NavigationView } from "../../Navigation/types";

export const BuildsDashboard = () => {
  const { setCurrentView } = useNavigationContext();
  const [createBuild, response, loading] = useElectronEvent(ElectronEvents.CreateBuild);

  const handleCreateBuild = () => {
    createBuild(undefined);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: Switch page when buildId received
  useLayoutEffect(() => {
    if (response) {
      setCurrentView(NavigationView.BuildDetails, { buildId: response.buildId });
    }
  }, [response]);

  return (
    <Stack sx={{ flex: 1, p: 2 }}>
      <StackRow sx={{ justifyContent: "end" }}>
        <Button variant="push" color="primary" startIcon={<AddIcon />} onClick={handleCreateBuild} loading={loading}>
          Nouveau Build
        </Button>
      </StackRow>
    </Stack>
  );
};
