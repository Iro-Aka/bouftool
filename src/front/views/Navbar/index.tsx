import DropDownIcon from "@mui/icons-material/ArrowDropDown";
import ModeLightIcon from "@mui/icons-material/LightMode";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import { Button, buttonClasses, Divider, Switch, Typography, useColorScheme } from "@mui/material";
import { AppIcon } from "src/front/components/AppIcon";
import { StackRow } from "src/front/components/Layout/StackRow";
import { useNavigationContext } from "../Navigation";
import { NavigationView } from "../Navigation/types";

export const Navbar = () => {
  const { currentView, setCurrentView } = useNavigationContext();
  const { mode, setMode } = useColorScheme();

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
            className={Math.floor(currentView / NavigationView.Builds) === 1 ? "Mui-selected" : ""}
            onClick={() => setCurrentView(NavigationView.Builds, undefined)}
          >
            <Typography variant="subtitle2" sx={{ textTransform: "none" }}>
              Builds
            </Typography>
          </Button>
          <Button
            variant="text"
            color="inherit"
            className={Math.floor(currentView / NavigationView.EncyclopediaEquipment) === 1 ? "Mui-selected" : ""}
            onClick={() => setCurrentView(NavigationView.EncyclopediaEquipment, undefined)}
            endIcon={<DropDownIcon />}
          >
            <Typography variant="subtitle2" sx={{ textTransform: "none" }}>
              Encyclopédie
            </Typography>
          </Button>
        </StackRow>
      </StackRow>
      <StackRow>
        {mode === "light" ? <ModeLightIcon /> : <ModeNightIcon />}
        <Switch checked={mode === "dark"} onChange={() => setMode(mode === "dark" ? "light" : "dark")} size="small" />
      </StackRow>
    </StackRow>
  );
};
