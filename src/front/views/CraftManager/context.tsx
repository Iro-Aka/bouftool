import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { ElectronEvents } from "src/electron/types";
import type { TreeNode } from "src/front/components/TreeView";
import { useElectronEvent } from "src/front/hooks/electron";
import type { TCraftItem } from "src/wakfu/craftManager/types";
import { ItemActions } from "./ItemsList/ItemActions";
import { craftItemsToTreeNodes } from "./utils";

export type TCraftManagerContext = {
  items: TCraftItem[];
  treeNodes: TreeNode[];
  markAllIngredientsById: (ingredientId: number) => void;
};

const Context = createContext<TCraftManagerContext | undefined>(undefined);

export const useCraftManagerContext = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useCraftManagerContext must be used within a CraftManagerContextProvider");
  }
  return context;
};

export type TItemToCraftProviderProps = {
  children: ReactNode;
};

export const CraftManagerContextProvider = ({ children }: TItemToCraftProviderProps) => {
  const [getItems, craftItems] = useElectronEvent(ElectronEvents.CraftManagerGetItems);
  const [removeFromCraft] = useElectronEvent(ElectronEvents.CraftManagerRemoveItem);
  const [setQuantity] = useElectronEvent(ElectronEvents.CraftManagerSetItemQuantity);
  const [markIngredientAsCrafted] = useElectronEvent(ElectronEvents.CraftManagerMarkIngredientAsCrafted);
  const [unmarkIngredientAsCrafted] = useElectronEvent(ElectronEvents.CraftManagerUnmarkIngredientAsCrafted);
  const [markAllIngredients] = useElectronEvent(ElectronEvents.CraftManagerMarkAllIngredientsById);

  const [items, SetItems] = useState<TCraftItem[]>([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: load one time
  useLayoutEffect(() => {
    getItems(undefined);
  }, []);

  useEffect(() => {
    if (craftItems) {
      SetItems(craftItems);
    }
  }, [craftItems]);

  const removeItem = useCallback(
    (itemId: number) => {
      const itemIndex = items.findIndex((item) => item.item.id === itemId) ?? -1;
      if (itemIndex >= 0) {
        removeFromCraft({ itemId });

        const newItems = [...items];
        newItems.splice(itemIndex, 1);
        SetItems(newItems);
      }
    },
    [items, removeFromCraft],
  );

  const setItemQuantity = useCallback(
    (itemId: number, quantity: number) => {
      const itemIndex = items.findIndex((item) => item.item.id === itemId) ?? -1;
      if (itemIndex >= 0) {
        setQuantity({ itemId, quantity });

        getItems(undefined);
      }
    },
    [items, setQuantity, getItems],
  );

  const markAsCrafted = useCallback(
    (itemId: number, path: number[]) => {
      markIngredientAsCrafted({ itemId, path });
      getItems(undefined);
    },
    [markIngredientAsCrafted, getItems],
  );

  const unmarkAsCrafted = useCallback(
    (itemId: number, path: number[]) => {
      unmarkIngredientAsCrafted({ itemId, path });
      getItems(undefined);
    },
    [unmarkIngredientAsCrafted, getItems],
  );

  const markAllIngredientsById = useCallback(
    (ingredientId: number) => {
      markAllIngredients({ ingredientId });
      getItems(undefined);
    },
    [markAllIngredients, getItems],
  );

  const treeNodes = useMemo(() => {
    return craftItemsToTreeNodes(items, (first, craftItem, path) =>
      ItemActions(
        first,
        craftItem,
        () => removeItem(craftItem.item.id),
        (quantity) => setItemQuantity(craftItem.item.id, quantity),
        () => markAsCrafted(craftItem.item.id, path),
        () => unmarkAsCrafted(craftItem.item.id, path),
      ),
    );
  }, [items, removeItem, setItemQuantity, markAsCrafted, unmarkAsCrafted]);

  const contextValue = useMemo(
    () => ({
      items,
      treeNodes,
      markAllIngredientsById,
    }),
    [items, treeNodes, markAllIngredientsById],
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
