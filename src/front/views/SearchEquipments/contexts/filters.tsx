import { createContext, type Dispatch, type ReactNode, type SetStateAction, useContext, useState } from "react";
import { initialSearchItemsFilters, type TSearchItemsFiltersForm } from "../filters";

export type TSearchItemsFiltersContext = {
  filters: TSearchItemsFiltersForm;
  setFilters: Dispatch<SetStateAction<TSearchItemsFiltersForm>>;
};

const FiltersContext = createContext<TSearchItemsFiltersContext | undefined>(undefined);

export const useSearchItemsFiltersContext = () => {
  const value = useContext(FiltersContext);
  if (!value) {
    throw new Error("useSearchItemsFiltersContext must be used within a SearchItemsFiltersProvider");
  }
  return value;
};

export type TSearchItemsFiltersProviderProps = {
  controlled?: boolean;
  children: ReactNode;
};

export const SearchItemsFiltersProvider = ({ children, controlled }: TSearchItemsFiltersProviderProps) => {
  const [filters, setFilters] = useState<TSearchItemsFiltersForm>(initialSearchItemsFilters);

  if (controlled) {
    return children;
  }
  return <FiltersContext.Provider value={{ filters, setFilters }}>{children}</FiltersContext.Provider>;
};
