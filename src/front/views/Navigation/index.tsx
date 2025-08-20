import { createContext, useContext, useState } from "react";
import { BuildsDashboard } from "../Builds/Dashboard";
import { BuildDetails } from "../Builds/Details";
import { BuildDetailsProvider } from "../Builds/Details/context";
import { SearchEquipments } from "../SearchEquipments";
import {
  isNavigationContextView,
  NavigationView,
  type TNavigationContext,
  type TNavigationParams,
  type TNavigationProviderProps,
  type UseNavigationContextReturn,
} from "./types";

const context = createContext<TNavigationContext | undefined>(undefined);

export const useNavigationContext = <View extends NavigationView | undefined = undefined>(
  view?: View,
): UseNavigationContextReturn<View> => {
  const value = useContext(context);
  if (value === undefined) {
    throw new Error("useNavigationContext must be used within a NavigationProvider");
  }
  if (view !== undefined && !isNavigationContextView(value, view)) {
    throw new Error(`useNavigationContext called with invalid view: ${view}`);
  }
  return value as UseNavigationContextReturn<View>;
};

export const NavigationProvider = ({ children }: TNavigationProviderProps) => {
  const [state, setState] = useState<Omit<TNavigationContext, "setCurrentView">>({
    currentView: NavigationView.Builds,
    params: undefined,
  });

  const setCurrentView = <NewView extends NavigationView>(view: NewView, params: TNavigationParams[NewView]) => {
    setState({ currentView: view, params });
  };

  const contextValue = {
    ...state,
    setCurrentView,
  } as TNavigationContext;

  return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export const Navigation = () => {
  const { currentView, params } = useNavigationContext();

  switch (currentView) {
    case NavigationView.Builds:
      return <BuildsDashboard />;
    case NavigationView.BuildDetails:
      return (
        <BuildDetailsProvider buildId={params.buildId}>
          <BuildDetails />
        </BuildDetailsProvider>
      );
    case NavigationView.EncyclopediaEquipment:
      return <SearchEquipments />;
    default:
      return null;
  }
};
