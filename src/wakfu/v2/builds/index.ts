import { WakfuEquipmentPosition } from "src/wakfu/types/itemType";
import type { WakfuAbilities } from "../abilities";
import type { WakfuItem } from "../items";
import { WakfuStats } from "../stats";
import type { TElementalPreferences } from "../stats/types";

export class WakfuBuild {
  private abilities: WakfuAbilities;
  private stuff: Record<WakfuEquipmentPosition, { preferences: TElementalPreferences | null; item: WakfuItem }>;
  private elementalPreferences: TElementalPreferences;

  constructor(
    abilities: WakfuAbilities,
    stuff: Record<WakfuEquipmentPosition, { preferences: TElementalPreferences | null; item: WakfuItem }>,
    elementalPreferences: TElementalPreferences,
  ) {
    this.abilities = abilities;
    this.stuff = stuff;
    this.elementalPreferences = elementalPreferences;
  }

  public getStats() {
    const stats = this.abilities.getStats();
    for (const position of Object.values(WakfuEquipmentPosition)) {
      const equipment = this.stuff[position];
      if (equipment.preferences) {
        const itemStats = WakfuStats.copy(equipment.item.getStats());
        itemStats.applyElementalPreferences(equipment.preferences);
        stats.merge(itemStats);
      } else {
        stats.merge(equipment.item.getStats());
      }
    }
    stats.applyElementalPreferences(this.elementalPreferences);
    stats.applyEffects();
    return stats;
  }
}
