import type { EnumWakfuEnchantmentColor } from "../enchantment/types";
import type { TWakfuI18n } from "../utils/types";

export class WakfuSublimation {
  private id: number;
  private name: TWakfuI18n;
  private level: number;
  private maxLevel: number;
  private gfxId: number;
  private effectId: number;
  private colorPattern: EnumWakfuEnchantmentColor[];
  private rarityEpic: boolean;
  private rarityRelic: boolean;

  constructor(
    id: number,
    name: TWakfuI18n,
    level: number,
    maxLevel: number,
    gfxId: number,
    effectId: number,
    colorPattern: EnumWakfuEnchantmentColor[],
    rarityEpic: boolean,
    rarityRelic: boolean,
  ) {
    this.id = id;
    this.name = name;
    this.level = level;
    this.maxLevel = maxLevel;
    this.gfxId = gfxId;
    this.effectId = effectId;
    this.colorPattern = colorPattern;
    this.rarityEpic = rarityEpic;
    this.rarityRelic = rarityRelic;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): TWakfuI18n {
    return this.name;
  }

  public getLevel(): number {
    return this.level;
  }

  public getMaxLevel(): number {
    return this.maxLevel;
  }

  public getGfxId(): number {
    return this.gfxId;
  }

  public getEffectId(): number {
    return this.effectId;
  }

  public getColorPattern(): EnumWakfuEnchantmentColor[] {
    return this.colorPattern;
  }

  public isRarityEpic(): boolean {
    return this.rarityEpic;
  }

  public isRarityRelic(): boolean {
    return this.rarityRelic;
  }
}
