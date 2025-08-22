import { AbilitiesDefinitions, EnumAbilities } from "src/wakfu/types/ability";
import { getAbilityCategory, getCurrentAbilitiesCategoryPoints } from "src/wakfu/utils/abilities";
import { initializeStats } from "../utils";

export class WakfuAbilities {
  private level: number;
  private abilities: Partial<Record<EnumAbilities, number>> = {};

  constructor(level: number) {
    this.level = level;
  }

  public addAbilityLevel(ability: EnumAbilities, level: number): void {
    const category = getAbilityCategory(ability);
    if (!category) {
      return;
    }
    const availablePoints = getCurrentAbilitiesCategoryPoints(this.abilities, category, this.level);
    const realLevels = Math.min(availablePoints, level);
    const value = (this.abilities[ability] ?? 0) + realLevels;
    this.abilities[ability] =
      AbilitiesDefinitions[ability].maxLevel > 0 ? Math.min(value, AbilitiesDefinitions[ability].maxLevel) : value;
  }

  public removeAbilityLevel(ability: EnumAbilities, level: number): void {
    this.abilities[ability] = Math.max(0, (this.abilities[ability] ?? 0) - level);
  }

  public resetAbilities(): void {
    this.abilities = {};
  }

  public getAbilities(): Partial<Record<EnumAbilities, number>> {
    return this.abilities;
  }

  public getStats() {
    const stats = initializeStats();
    for (const abilities of Object.values(EnumAbilities)) {
      const level = this.abilities[abilities] ?? 0;
      const definition = AbilitiesDefinitions[abilities];
      for (const effect of definition.effects) {
        stats[effect.stats] += effect.scaling * level;
      }
    }
    return stats;
  }
}
