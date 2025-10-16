import { getWakfuState, WakfuStateActionId } from "../states/definitions";
import { EnumWakfuState } from "../states/types";
import type { EnumWakfuGamedataType, TWakfuGamedataTypes } from "../store/types";
import { ElementOnXStats, WakfuStatEffects } from "./effects";
import { getWakfuStatForMapping, WakfuStatMapping } from "./mapping";
import { EnumWakfuStat, type TElementalPreferences, type TWakfuStats } from "./types";

export class WakfuStats {
  private stats: TWakfuStats;

  private static baseMergeStats(merged: WakfuStats, b: WakfuStats) {
    for (const [stat, value] of Object.entries(b.stats)) {
      merged.stats[stat as EnumWakfuStat] = (merged.stats[stat as EnumWakfuStat] ?? 0) + value;
    }
    return merged;
  }

  public static copy(stats: WakfuStats) {
    return new WakfuStats({ ...stats.stats });
  }

  public static merge(a: WakfuStats, b: WakfuStats): WakfuStats {
    const merged = WakfuStats.copy(a);
    WakfuStats.baseMergeStats(merged, b);
    return merged;
  }

  public static fromGamedata(
    level: number,
    data: TWakfuGamedataTypes[EnumWakfuGamedataType.Items]["definition"]["equipEffects"],
  ) {
    const stats = new WakfuStats();
    for (const effect of data) {
      if (effect.effect.definition.actionId === WakfuStateActionId) {
        const state = getWakfuState(level, effect.effect.definition.params);
        if (state) {
          stats.add(state.state, state.level);
        }
      } else {
        const stat = getWakfuStatForMapping(effect.effect.definition.actionId, effect.effect.definition.params);
        if (stat !== null) {
          if (WakfuStatMapping[stat].gainActionId?.includes(effect.effect.definition.actionId)) {
            stats.add(stat, effect.effect.definition.params[0] + effect.effect.definition.params[1] * level);
          } else if (WakfuStatMapping[stat].lossActionId?.includes(effect.effect.definition.actionId)) {
            stats.remove(stat, effect.effect.definition.params[0] + effect.effect.definition.params[1] * level);
          }
        }
      }
    }
    return stats;
  }

  constructor(stats?: TWakfuStats) {
    this.stats = stats ?? {};
  }

  public get(stat: EnumWakfuStat | EnumWakfuState) {
    return this.stats[stat] ?? 0;
  }

  public set(stat: EnumWakfuStat | EnumWakfuState, value: number) {
    this.stats[stat] = value;
  }

  public add(stat: EnumWakfuStat | EnumWakfuState, value: number) {
    this.stats[stat] = (this.stats[stat] ?? 0) + value;
  }

  public remove(stat: EnumWakfuStat | EnumWakfuState, value: number) {
    this.stats[stat] = (this.stats[stat] ?? 0) - value;
  }

  public delete(stat: EnumWakfuStat | EnumWakfuState) {
    delete this.stats[stat];
  }

  // biome-ignore lint/suspicious/useAdjacentOverloadSignatures: Don't mix up static and instance methods
  public merge(other: WakfuStats): WakfuStats {
    return WakfuStats.baseMergeStats(this, other);
  }

  public compare(others: WakfuStats[]): WakfuStats {
    const delta = new WakfuStats();
    for (const other of others) {
      for (const stat of Object.values(EnumWakfuStat)) {
        const diff = this.get(stat) - other.get(stat);
        if (diff !== 0) {
          delta.set(stat, diff);
        }
      }
      for (const state of Object.values(EnumWakfuState)) {
        const diff = this.get(state) - other.get(state);
        if (diff !== 0) {
          delta.set(state, diff);
        }
      }
    }
    return delta;
  }

  public applyEffects() {
    for (const effect of Object.values(WakfuStatEffects)) {
      effect(this);
    }
    return this;
  }

  public toApplyEffects(): WakfuStats {
    const applied = WakfuStats.copy(this);
    applied.applyEffects();
    return applied;
  }

  public applyElementalPreferences(preferences: TElementalPreferences) {
    for (const elementOnX of ElementOnXStats) {
      const value = this.get(elementOnX.stat);
      if (value !== 0) {
        for (let i = 0; i < elementOnX.count; i++) {
          this.add(elementOnX.mapping ? elementOnX.mapping[preferences[i]] : preferences[i], value);
        }
      }
      this.delete(elementOnX.stat);
    }
    return this;
  }

  public toApplyElementalPreferences(preferences: TElementalPreferences): WakfuStats {
    const applied = WakfuStats.copy(this);
    applied.applyElementalPreferences(preferences);
    return applied;
  }

  public toObject() {
    return { ...this.stats };
  }
}
