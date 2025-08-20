import { Typography } from "@mui/material";
import { createContext, type ReactNode, useContext, useEffect } from "react";
import { ElectronEvents, type ElectronEventsRenderer } from "src/electron/types";
import { Loading } from "src/front/components/Loading";
import { useElectronEvent } from "src/front/hooks/electron";

const context = createContext<ElectronEventsRenderer[ElectronEvents.GetBuild] | undefined>(undefined);

export const useBuildDetailsContext = () => {
  const contextValue = useContext(context);
  if (!contextValue) {
    throw new Error("useBuildDetailsContext must be used within a BuildDetailsProvider");
  }
  return contextValue;
};

export type TBuildDetailsProviderProps = {
  buildId: number;
  children: ReactNode;
};

export const BuildDetailsProvider = ({ buildId, children }: TBuildDetailsProviderProps) => {
  const [send, response] = useElectronEvent(ElectronEvents.GetBuild);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Get build when buildId change
  useEffect(() => {
    send({ buildId });
  }, [buildId]);

  if (response === null) {
    return (
      <Loading>
        <Typography variant="body1">Récupération du build</Typography>
      </Loading>
    );
  }
  return <context.Provider value={response}>{children}</context.Provider>;
};
