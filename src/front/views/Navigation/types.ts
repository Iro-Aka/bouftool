import type { ReactNode } from "react";

export enum NavigationView {
  Builds = 100,
  BuildDetails = 101,
  EncyclopediaEquipment = 200,
}

export type TNavigationParams = {
  [NavigationView.Builds]: undefined;
  [NavigationView.BuildDetails]: { buildId: number };
  [NavigationView.EncyclopediaEquipment]: undefined;
};

export type TNavigationContext = {
  [View in NavigationView]: {
    currentView: View;
    params: TNavigationParams[View];
    setCurrentView: <NewView extends NavigationView>(view: NewView, params: TNavigationParams[NewView]) => void;
  };
}[NavigationView];

export type UseNavigationContextReturn<View extends NavigationView | undefined = undefined> =
  View extends NavigationView ? Extract<TNavigationContext, { currentView: View }> : TNavigationContext;

export type TNavigationProviderProps = {
  children: ReactNode;
};

export const isNavigationContextView = <View extends NavigationView>(
  context: TNavigationContext,
  view: View,
): context is UseNavigationContextReturn<View> => {
  return context.currentView === view;
};
