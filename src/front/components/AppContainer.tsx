import { Box } from "@mui/material";
import type { ReactNode } from "react";
import { CursorManager } from "./CursorManager";

export type TAppContainerProps = {
  children: ReactNode;
};

export const AppContainer = ({ children }: TAppContainerProps) => {
  return (
    <CursorManager>
      <Box
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          position: "absolute",
          width: "100%",
          height: "100%",
          bgcolor: theme.palette.background.default,
        })}
      >
        {children}
      </Box>
    </CursorManager>
  );
};
