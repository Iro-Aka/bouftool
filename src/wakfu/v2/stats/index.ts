import { isArray } from "src/types/utils";
import { WakfuStatEffects } from "./effects";
import {
  type EnumWakfuStat,
  EnumWakfuVariableStat,
  isWakfuStat,
  isWakfuVariableStat,
  type TElementalPreferences,
  type TWakfuStats,
} from "./types";

export class WakfuStats {
  private stats: TWakfuStats;

  private static baseMergeStats(merged: WakfuStats, b: WakfuStats) {
    for (const [stat, value] of Object.entries(b.stats)) {
      if (isArray(value)) {
        const mergedValue = merged.stats[stat as EnumWakfuVariableStat];
        if (mergedValue) {
          mergedValue.push(...value.map((v) => ({ ...v })));
        } else {
          merged.stats[stat as EnumWakfuVariableStat] = [...value.map((v) => ({ ...v }))];
        }
      } else {
        const mergedValue = merged.stats[stat as EnumWakfuStat];
        if (mergedValue) {
          mergedValue.value += value.value;
        } else {
          merged.stats[stat as EnumWakfuStat] = { ...value };
        }
      }
    }
    return merged;
  }

  public static copy(stats: WakfuStats) {
    const newStats: TWakfuStats = {};
    for (const [stat, value] of Object.entries(stats.stats)) {
      if (isArray(value)) {
        newStats[stat as EnumWakfuVariableStat] = value!.map((s) => ({ ...s }));
      } else {
        newStats[stat as EnumWakfuStat] = { ...value };
      }
    }
    return new WakfuStats(newStats);
  }

  public static merge(a: WakfuStats, b: WakfuStats): WakfuStats {
    const merged = WakfuStats.copy(a);
    WakfuStats.baseMergeStats(merged, b);
    return merged;
  }

  constructor(stats?: TWakfuStats) {
    this.stats = stats ?? {};
  }

  public get<Stat extends EnumWakfuStat | EnumWakfuVariableStat>(
    stat: Stat,
  ): Stat extends EnumWakfuVariableStat ? { value: number; option: number }[] : { value: number } {
    const value = this.stats[stat];
    if (!value) {
      // biome-ignore lint/suspicious/noExplicitAny: Typescript being dumb
      return isWakfuVariableStat(stat) ? ([{ value: 0, option: 0 }] as any) : ({ value: 0 } as any);
    }
    return value;
  }

  public set(stat: EnumWakfuStat, value: number): void;
  public set(stat: EnumWakfuVariableStat, value: number, option: number): void;
  public set(stat: EnumWakfuStat | EnumWakfuVariableStat, value: number, option?: number) {
    if (isWakfuVariableStat(stat)) {
      this.stats[stat] = [{ value, option: option ?? 0 }];
    } else {
      this.stats[stat] = { value };
    }
  }

  public add(stat: EnumWakfuStat, value: number): void;
  public add(stat: EnumWakfuVariableStat, value: number, option: number): void;
  public add(stat: EnumWakfuStat | EnumWakfuVariableStat, value: number, option?: number) {
    if (isWakfuVariableStat(stat)) {
      if (this.stats[stat]) {
        this.stats[stat].push({ value, option: option ?? 0 });
      } else {
        this.stats[stat] = [{ value, option: option ?? 0 }];
      }
    } else if (isWakfuStat(stat)) {
      if (this.stats[stat]) {
        this.stats[stat].value += value;
      } else {
        this.stats[stat] = { value };
      }
    }
  }

  public remove(stat: EnumWakfuStat | EnumWakfuVariableStat) {
    delete this.stats[stat];
  }

  // biome-ignore lint/suspicious/useAdjacentOverloadSignatures: Don't mix up static and instance methods
  public merge(other: WakfuStats): WakfuStats {
    return WakfuStats.baseMergeStats(this, other);
  }

  public applyEffects() {
    for (const effect of Object.values(WakfuStatEffects)) {
      effect(this);
    }
  }

  public applyElementalPreferences(preferences: TElementalPreferences) {
    const variableElementalMastery = this.get(EnumWakfuVariableStat.VariableElementalMastery);
    for (const masteries of variableElementalMastery) {
      for (let i = 0; i < masteries.option; i++) {
        this.add(preferences[i], masteries.value);
      }
    }
    const variableElementalResistance = this.get(EnumWakfuVariableStat.VariableResistanceMastery);
    for (const resistances of variableElementalResistance) {
      for (let i = 0; i < resistances.option; i++) {
        this.add(preferences[i], resistances.value);
      }
    }
    this.remove(EnumWakfuVariableStat.VariableElementalMastery);
    this.remove(EnumWakfuVariableStat.VariableResistanceMastery);
  }
}
