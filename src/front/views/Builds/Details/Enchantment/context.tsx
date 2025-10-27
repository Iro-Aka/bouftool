import { createContext, type Dispatch, type ReactNode, type SetStateAction, useContext, useState } from "react";
import { useCursorManager } from "src/front/components/CursorManager";
import { useGlobalClickListener } from "src/front/hooks/useGlobalClickListener";
import type { TWakfuEnchantment, TWakfuSublimation } from "./types";

export type TEnchantmentContext = {
  selectedEnchantment: (TWakfuEnchantment & { level: number }) | null;
  setSelectedEnchantment: Dispatch<SetStateAction<TEnchantmentContext["selectedEnchantment"]>>;
  selectedSublimation: TWakfuSublimation | null;
  setSelectedSublimation: Dispatch<SetStateAction<TEnchantmentContext["selectedSublimation"]>>;
};

const Context = createContext<TEnchantmentContext | undefined>(undefined);

export const useEnchantmentContext = () => {
  const contextValue = useContext(Context);
  if (!contextValue) {
    throw new Error("useEnchantmentContext must be used within a EnchantmentProvider");
  }
  return contextValue;
};

export type TEnchantmentProviderProps = {
  children: ReactNode;
};

export const EnchantmentProvider = ({ children }: TEnchantmentProviderProps) => {
  const setCursor = useCursorManager();
  const [selectedEnchantment, setSelectedEnchantment] = useState<TEnchantmentContext["selectedEnchantment"]>(null);
  const [selectedSublimation, setSelectedSublimation] = useState<TEnchantmentContext["selectedSublimation"]>(null);

  useGlobalClickListener({
    excludeTags: ["enchantmentSlot", "enchantmentItem", "sublimationItem"],
    onClickAway: (evt) => {
      if (selectedEnchantment) {
        evt.preventDefault();
        evt.stopPropagation();
        setSelectedEnchantment(null);
        setCursor(null);
      }
    },
  });

  useGlobalClickListener({
    excludeTags: ["enchantmentItem", "sublimationSlot", "sublimationItem"],
    onClickAway: (evt) => {
      if (selectedSublimation) {
        evt.preventDefault();
        evt.stopPropagation();
        setSelectedSublimation(null);
        setCursor(null);
      }
    },
  });

  return (
    <Context.Provider
      value={{ selectedEnchantment, setSelectedEnchantment, selectedSublimation, setSelectedSublimation }}
    >
      {children}
    </Context.Provider>
  );
};
