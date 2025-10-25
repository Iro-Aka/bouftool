import { useEffect } from "react";
import { ElectronEvents } from "src/electron/types";
import { useElectronEvent } from "src/front/hooks/electron";
import { ListEnchantments } from "./enchantments";
import { EnchantmentProvider } from "./enchantments/context";
import { EquipmentsEnchantments } from "./equipments";
import { BuildEnchantmentRoot, buildEnchantmentClasses } from "./styles";
import { ListSublimations } from "./sublimations";

export const BuildEnchantment = () => {
  const [getEnchantments, enchantment] = useElectronEvent(ElectronEvents.GetEnchantments);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Run once
  useEffect(() => {
    getEnchantments(undefined);
  }, []);

  if (!enchantment) {
    return null;
  }
  return (
    <EnchantmentProvider>
      <BuildEnchantmentRoot className={buildEnchantmentClasses.root}>
        <EquipmentsEnchantments enchantments={enchantment.enchantments} />
        <ListEnchantments
          shardLevelRequirement={enchantment.shardLevelRequirement}
          enchantments={enchantment.enchantments}
        />
        <ListSublimations sublimations={enchantment.sublimations} />
      </BuildEnchantmentRoot>
    </EnchantmentProvider>
  );
};
