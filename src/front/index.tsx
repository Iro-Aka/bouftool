import { CssBaseline, Stack, ThemeProvider, Typography } from "@mui/material";
import { useEffect } from "react";
import { type ElectronAPI, ElectronEvents } from "src/electron/types";
import { AppContainer } from "./components/AppContainer";
import { Loading } from "./components/Loading";
import { ModalConfirmationProvider } from "./components/Modal/Confirmation";
import { useElectronEvent } from "./hooks/electron";
import { theme } from "./theme/material";
import { Navbar } from "./views/Navbar";
import { Navigation, NavigationProvider } from "./views/Navigation";

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}

export const App = () => {
  const [send, response] = useElectronEvent(ElectronEvents.AppReady);

  useEffect(() => {
    send(undefined);
  }, [send]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContainer>
        {response === null ? (
          <Loading>
            <Typography variant="body1">Loading...</Typography>
          </Loading>
        ) : (
          <ModalConfirmationProvider>
            <NavigationProvider>
              <Stack sx={{ flex: 1, flexDirection: "column", alignItems: "stretch", overflow: "hidden" }}>
                <Navbar />
                <Navigation />
              </Stack>
            </NavigationProvider>
          </ModalConfirmationProvider>
        )}
      </AppContainer>
    </ThemeProvider>
  );
};
