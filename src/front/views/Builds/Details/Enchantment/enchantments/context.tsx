import { createContext, type Dispatch, type ReactNode, type SetStateAction, useContext, useState } from "react";
import { useCursorManager } from "src/front/components/CursorManager";
import { useGlobalClickListener } from "src/front/hooks/useGlobalClickListener";
import type { TWakfuEnchantment } from "../types";

export type TEnchantmentContext = {
  selectedEnchantment: (TWakfuEnchantment & { level: number }) | null;
  setSelectedEnchantment: Dispatch<SetStateAction<TEnchantmentContext["selectedEnchantment"]>>;
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

  useGlobalClickListener({
    excludeTags: ["enchantmentSlot", "enchantmentItem"],
    onClickAway: (evt) => {
      if (selectedEnchantment) {
        evt.preventDefault();
        evt.stopPropagation();
        setSelectedEnchantment(null);
        setCursor(null);
      }
    },
  });

  return <Context.Provider value={{ selectedEnchantment, setSelectedEnchantment }}>{children}</Context.Provider>;
};
