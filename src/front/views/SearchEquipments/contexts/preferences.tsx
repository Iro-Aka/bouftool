import { createContext, type Dispatch, type ReactNode, useContext } from "react";
import { type TSearchItemsPreferences, useSearchItemsPreferences } from "../preferences/logics";
import type { TSearchItemsPreferencesAction } from "../preferences/logics/reducer";

export type TSearchItemsPreferencesContext = {
  preferences: TSearchItemsPreferences;
  dispatchPreferences: Dispatch<TSearchItemsPreferencesAction>;
};

const PreferencesContext = createContext<TSearchItemsPreferencesContext | undefined>(undefined);

export const useSearchItemsPreferencesContext = () => {
  const value = useContext(PreferencesContext);
  if (!value) {
    throw new Error("useSearchItemsPreferencesContext must be used within a SearchItemsPreferencesProvider");
  }
  return value;
};

export type TSearchItemsPreferencesProviderProps = {
  controlled?: boolean;
  children: ReactNode;
};

export const SearchItemsPreferencesProvider = ({ children, controlled }: TSearchItemsPreferencesProviderProps) => {
  const { preferences, dispatchPreferences } = useSearchItemsPreferences();

  if (controlled) {
    return children;
  }
  return (
    <PreferencesContext.Provider value={{ preferences: preferences, dispatchPreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};
