import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import type { TSearchItemsFiltersForm } from "../filters";
import { SearchItemsBehavior } from "./search";

const initialSearchItemsFilters: TSearchItemsFiltersForm = {
  title: "",
  rarities: [],
  itemTypes: [],
  levels: { min: 1, max: 245 },
  stats: {},
};

export type TSearchItemsFiltersContext = {
  filters: TSearchItemsFiltersForm;
  setFilters: Dispatch<SetStateAction<TSearchItemsFiltersForm>>;
  resetFilters: () => void;
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
  defaultFilters?: Partial<TSearchItemsFiltersForm>;
  children: ReactNode;
};

export const SearchItemsFiltersProvider = ({
  children,
  controlled,
  defaultFilters,
}: TSearchItemsFiltersProviderProps) => {
  const defaultFiltersRef = useRef(defaultFilters);
  defaultFiltersRef.current = defaultFilters;
  const [filters, setFilters] = useState<TSearchItemsFiltersForm>({ ...initialSearchItemsFilters, ...defaultFilters });

  const resetFilters = useCallback(() => {
    SearchItemsBehavior.setSkipNextTimeout(true);
    setFilters({ ...initialSearchItemsFilters, ...defaultFiltersRef.current });
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: resetFilters is immutable
  const contextValue = useMemo(() => ({ filters, setFilters, resetFilters }), [filters]);

  if (controlled) {
    return children;
  }
  return <FiltersContext.Provider value={contextValue}>{children}</FiltersContext.Provider>;
};
