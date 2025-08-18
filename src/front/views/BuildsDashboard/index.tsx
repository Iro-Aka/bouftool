import AddIcon from "@mui/icons-material/Add";
import { Button, Stack } from "@mui/material";
import { StackRow } from "src/front/components/Layout/StackRow";
import { useNavigationContext } from "../Navigation";
import { NavigationView } from "../Navigation/types";

export const BuildsDashboard = () => {
  const { setCurrentView } = useNavigationContext();

  return (
    <Stack sx={{ flex: 1, p: 2 }}>
      <StackRow sx={{ justifyContent: "end" }}>
        <Button variant="push" color="primary" startIcon={<AddIcon />} onClick={() => setCurrentView(NavigationView.BuildCreate)}>
          Nouveau Build
        </Button>
      </StackRow>
    </Stack>
  );
};
