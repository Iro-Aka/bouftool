import type { EnumWakfuEquipmentPosition } from "../itemTypes/types";
import { WakfuStats } from "../stats";
import type { TWakfuI18n } from "../utils/types";
import type { EnumWakfuEnchantmentColor, TWakfuEnchantmentEffect } from "./types";

export class WakfuEnchantment {
  private id: number;
  private label: TWakfuI18n;
  private color: EnumWakfuEnchantmentColor;
  private doubleBonusPositions: Set<EnumWakfuEquipmentPosition>;
  private effects: TWakfuEnchantmentEffect[];

  constructor(
    id: number,
    label: TWakfuI18n,
    color: EnumWakfuEnchantmentColor,
    doubleBonusPositions: EnumWakfuEquipmentPosition[],
    effects: TWakfuEnchantmentEffect[],
  ) {
    this.id = id;
    this.label = label;
    this.color = color;
    this.doubleBonusPositions = new Set<EnumWakfuEquipmentPosition>(doubleBonusPositions);
    this.effects = effects;
  }

  private getEffectIndex(level: number) {
    return Math.min(Math.ceil((level - 1) / 4), this.effects.length - 1);
  }

  public getEffectValue(level: number, position?: EnumWakfuEquipmentPosition): number {
    const effectIndex = this.getEffectIndex(level);
    const effect = this.effects[effectIndex];
    let value = effect.baseValue + effect.perLevelValue * level;
    if (position && this.doubleBonusPositions.has(position)) {
      value *= 2;
    }
    return value;
  }

  public getEffect(level: number, position?: EnumWakfuEquipmentPosition): WakfuStats {
    const effectIndex = this.getEffectIndex(level);
    const effect = this.effects[effectIndex];
    const stats = new WakfuStats();
    let value = effect.baseValue + effect.perLevelValue * level;
    if (position && this.doubleBonusPositions.has(position)) {
      value *= 2;
    }
    stats.add(effect.stat, value);
    return stats;
  }

  public getId(): number {
    return this.id;
  }

  public getLabel(): TWakfuI18n {
    return this.label;
  }

  public getColor(): EnumWakfuEnchantmentColor {
    return this.color;
  }

  public getDoubleBonusPositions(): Set<EnumWakfuEquipmentPosition> {
    return this.doubleBonusPositions;
  }
}
