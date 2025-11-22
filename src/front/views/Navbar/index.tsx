import ModeLightIcon from "@mui/icons-material/LightMode";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import { Button, buttonClasses, Divider, Switch, Typography, useColorScheme } from "@mui/material";
import { useLayoutEffect } from "react";
import { ElectronEvents } from "src/electron/types";
import { AppIcon } from "src/front/components/AppIcon";
import { StackRow } from "src/front/components/Layout/StackRow";
import { useElectronEvent } from "src/front/hooks/electron";
import { useNavigationContext } from "../Navigation";
import { NavigationView } from "../Navigation/types";

export const Navbar = () => {
  const { currentView, setCurrentView } = useNavigationContext();
  const { mode, setMode } = useColorScheme();
  const [getVersion, version] = useElectronEvent(ElectronEvents.AppVersion);

  // biome-ignore lint/correctness/useExhaustiveDependencies: load one time
  useLayoutEffect(() => {
    getVersion(undefined);
  }, []);

  return (
    <StackRow
      sx={{
        flex: "0 0 auto",
        px: 2,
        gap: 1,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        justifyContent: "space-between",
      }}
    >
      <StackRow>
        <AppIcon height={28} />
        <Divider flexItem />
        <StackRow sx={{ gap: "0 !important", [`& .${buttonClasses.root}`]: { borderRadius: 0 } }}>
          <Button
            variant="text"
            color="inherit"
            className={Math.floor(currentView / 100) === 1 ? "Mui-selected" : ""}
            onClick={() => setCurrentView(NavigationView.Builds, undefined)}
          >
            <Typography variant="subtitle2" sx={{ textTransform: "none" }}>
              Builds
            </Typography>
          </Button>
          <Button
            variant="text"
            color="inherit"
            className={Math.floor(currentView / 100) === 2 ? "Mui-selected" : ""}
            onClick={() => setCurrentView(NavigationView.EncyclopediaEquipment, undefined)}
          >
            <Typography variant="subtitle2" sx={{ textTransform: "none" }}>
              Encyclopédie
            </Typography>
          </Button>
          <Button
            variant="text"
            color="inherit"
            className={Math.floor(currentView / 100) === 3 ? "Mui-selected" : ""}
            onClick={() => setCurrentView(NavigationView.CraftManager, undefined)}
          >
            <Typography variant="subtitle2" sx={{ textTransform: "none" }}>
              Crafts
            </Typography>
          </Button>
        </StackRow>
      </StackRow>
      <StackRow>
        {mode === "light" ? <ModeLightIcon /> : <ModeNightIcon />}
        <Switch checked={mode === "dark"} onChange={() => setMode(mode === "dark" ? "light" : "dark")} size="small" />
        <Typography variant="subtitle2" color="textDisabled">
          {version}
        </Typography>
      </StackRow>
    </StackRow>
  );
};
