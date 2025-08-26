import type { TWakfuDescription } from "src/wakfu/types/description";
import type { WakfuStats } from "../stats";
import type { EnumWakfuStat, EnumWakfuVariableStat } from "../stats/types";
import type { EnumWakfuRarity } from "./rarity";

export class WakfuItem {
  private id: number;
  private level: number;
  private itemTypeId: number;
  private rarity: EnumWakfuRarity;
  private gfxId: number;
  private stats: WakfuStats;
  private title: TWakfuDescription;
  private description: TWakfuDescription;

  constructor(
    id: number,
    level: number,
    itemTypeId: number,
    rarity: EnumWakfuRarity,
    gfxId: number,
    stats: WakfuStats,
    title: TWakfuDescription,
    description: TWakfuDescription,
  ) {
    this.id = id;
    this.level = level;
    this.itemTypeId = itemTypeId;
    this.rarity = rarity;
    this.gfxId = gfxId;
    this.stats = stats;
    this.title = title;
    this.description = description;
  }

  public getId(): number {
    return this.id;
  }

  public getLevel(): number {
    return this.level;
  }

  public getItemTypeId(): number {
    return this.itemTypeId;
  }

  public getRarity(): EnumWakfuRarity {
    return this.rarity;
  }

  public getGfxId(): number {
    return this.gfxId;
  }

  public getStats(): WakfuStats {
    return this.stats;
  }

  public getStat(stat: EnumWakfuStat | EnumWakfuVariableStat) {
    return this.stats.get(stat);
  }

  public getTitle(): TWakfuDescription {
    return this.title;
  }

  public getDescription(): TWakfuDescription {
    return this.description;
  }
}
