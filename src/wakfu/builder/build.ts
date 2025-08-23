import fs from "node:fs/promises";
import path from "node:path";
import { isErrnoException } from "src/types/utils";
import { EnumStatsBonuses, StatsBonuses } from "../constants/statsBonuses";
import { WakfuData } from "../data";
import type { WakfuItem } from "../data/item";
import { type EnumAbilities, isEnumAbilities } from "../types/ability";
import { isWakfuStats, WakfuStats } from "../types/action";
import { WakfuBreed } from "../types/breed";
import { WakfuEquipmentPosition } from "../types/itemType";
import { WakfuAbilities } from "./abilities";
import {
  isWakfuBuild,
  isWakfuBuildEquippedPositionStatus,
  type TWakfuBuild,
  type TWakfuBuildPreferences,
  WakfuBuildEquippedPositionStatus,
} from "./types";
import { floorEveryValues, initializeStats, setEquipmentPositionRecord } from "./utils";

const defaultWakfuPreferences: TWakfuBuildPreferences = {
  mastery: [WakfuStats.MasteryFire, WakfuStats.MasteryWater, WakfuStats.MasteryEarth, WakfuStats.MasteryAir],
  resistance: [
    WakfuStats.ResistanceFire,
    WakfuStats.ResistanceWater,
    WakfuStats.ResistanceEarth,
    WakfuStats.ResistanceAir,
  ],
};

export class WakfuBuild {
  private static readonly FolderPath = "builds";
  private static builds: WakfuBuild[] = [];
  private static buildsMap: Map<number, WakfuBuild> = new Map();
  private id: number;
  private name: string = "";
  private breed: WakfuBreed = WakfuBreed.Feca;
  private level: number = 245;
  private preferences: TWakfuBuildPreferences = defaultWakfuPreferences;
  private items: Record<WakfuEquipmentPosition, WakfuItem | WakfuBuildEquippedPositionStatus> =
    setEquipmentPositionRecord(() => WakfuBuildEquippedPositionStatus.Empty);
  private abilities: WakfuAbilities = new WakfuAbilities(this.level);
  private bonuses = {
    [EnumStatsBonuses.HavenWorld]: false,
    [EnumStatsBonuses.Guild]: false,
  };
  private timeout: NodeJS.Timeout | null = null;
  private savePromise: Promise<void> | null = null;
  private savePromiseResolve: (() => void) | null = null;

  public static getBuilds() {
    return WakfuBuild.builds.map((build) => {
      const getItemToDisplay = (position: WakfuEquipmentPosition) => {
        const item = build.items[position];
        return isWakfuBuildEquippedPositionStatus(item) ? item : item.toDisplay();
      };
      return {
        id: build.getId(),
        name: build.getName(),
        breed: build.getBreed(),
        level: build.getLevel(),
        items: setEquipmentPositionRecord(getItemToDisplay),
      };
    });
  }

  public static getBuildById(id: number): WakfuBuild | undefined {
    return WakfuBuild.buildsMap.get(id);
  }

  public static async createBuild(): Promise<WakfuBuild> {
    const build = new WakfuBuild(Date.now());
    WakfuBuild.builds.push(build);
    WakfuBuild.buildsMap.set(build.id, build);
    await build.saveBuild();
    return build;
  }

  public static async deleteBuild(buildId: number): Promise<boolean> {
    const build = WakfuBuild.getBuildById(buildId);
    if (!build) {
      throw new Error(`Build with ID ${buildId} not found`);
    }
    WakfuBuild.builds = WakfuBuild.builds.filter((b) => b !== build);
    WakfuBuild.buildsMap.delete(buildId);
    await fs.rm(path.join(WakfuBuild.FolderPath, `${buildId}.json`));
    return true;
  }

  public static async loadBuilds(): Promise<WakfuBuild[]> {
    try {
      WakfuBuild.builds = [];
      WakfuBuild.buildsMap.clear();
      const files = await fs.readdir(WakfuBuild.FolderPath);
      for (const file of files) {
        if (file.endsWith(".json")) {
          const build = new WakfuBuild(Number.parseInt(file, 10));
          await build.loadBuild();
          WakfuBuild.builds.push(build);
          WakfuBuild.buildsMap.set(build.id, build);
        }
      }
      return WakfuBuild.builds;
    } catch (error) {
      if (isErrnoException(error) && error.code === "ENOENT") {
        console.warn("No builds found.");
      } else {
        console.error("Error loading builds:", error);
      }
      return [];
    }
  }

  private constructor(id: number) {
    this.id = id;
  }

  public saveBuild(): Promise<void> {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (!this.savePromise) {
      this.savePromise = new Promise<void>((resolve) => {
        this.savePromiseResolve = resolve;
      });
    }
    this.timeout = setTimeout(async () => {
      try {
        const getItemForSave = (position: WakfuEquipmentPosition) => {
          return isWakfuBuildEquippedPositionStatus(this.items[position])
            ? this.items[position]
            : this.items[position].getId();
        };
        const json = {
          name: this.name,
          breed: this.breed,
          level: this.level,
          preferences: this.preferences,
          items: setEquipmentPositionRecord(getItemForSave),
          abilities: this.abilities.getAbilities(),
          bonuses: this.bonuses,
        } satisfies TWakfuBuild;
        const filePath = path.join(WakfuBuild.FolderPath, `${this.id}.json`);
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, JSON.stringify(json, null, 2));
      } catch (error) {
        console.error("Error saving build:", error);
      }
      this.timeout = null;
      if (this.savePromiseResolve) {
        this.savePromiseResolve();
        this.savePromiseResolve = null;
        this.savePromise = null;
      }
    }, 1000);
    return this.savePromise;
  }

  public async loadBuild(): Promise<void> {
    try {
      const data = await fs.readFile(path.join(WakfuBuild.FolderPath, `${this.id}.json`), "utf-8");
      const json = JSON.parse(data);
      if (isWakfuBuild(json)) {
        const getItemForLoad = (position: WakfuEquipmentPosition) => {
          const item = json.items[position];
          return isWakfuBuildEquippedPositionStatus(item)
            ? item
            : (WakfuData.getInstance().getItemById(item) ?? WakfuBuildEquippedPositionStatus.Empty);
        };
        this.name = json.name;
        this.breed = json.breed;
        this.level = json.level;
        this.preferences = json.preferences;
        this.items = setEquipmentPositionRecord(getItemForLoad);
        this.abilities = new WakfuAbilities(this.level);
        for (const [key, value] of Object.entries(json.abilities)) {
          if (isEnumAbilities(key)) {
            this.abilities.addAbilityLevel(key, value);
          }
        }
        this.bonuses = json.bonuses;
      }
    } catch (error) {
      if (isErrnoException(error) && error.code === "ENOENT") {
        console.error("Build not found:", this.id, error);
      } else if (error instanceof SyntaxError) {
        console.error("Error parsing build JSON:", this.id, error);
      }
      console.error("Error loading build:", error);
    }
  }

  public getEquippedItems(): Record<WakfuEquipmentPosition, WakfuItem | WakfuBuildEquippedPositionStatus> {
    return this.items;
  }

  public isEquipped(position: WakfuEquipmentPosition): boolean {
    const item = this.items[position];
    return !isWakfuBuildEquippedPositionStatus(item);
  }

  public getEquippedItem(position: WakfuEquipmentPosition): WakfuItem | null {
    const item = this.items[position];
    return isWakfuBuildEquippedPositionStatus(item) ? null : item;
  }

  public unequipItem(position: WakfuEquipmentPosition): boolean {
    const item = this.items[position];
    if (isWakfuBuildEquippedPositionStatus(item)) {
      return false;
    }
    const itemType = item.getItemType();
    if (!itemType) {
      return false;
    }
    this.items[position] = WakfuBuildEquippedPositionStatus.Empty;
    for (const pos of itemType.equipmentDisabledPositions) {
      if (this.items[pos] === WakfuBuildEquippedPositionStatus.Disabled) {
        this.items[pos] = WakfuBuildEquippedPositionStatus.Empty;
      }
    }
    this.saveBuild();
    return true;
  }

  public equipItem(item: WakfuItem, position: WakfuEquipmentPosition): boolean {
    const itemType = item.getItemType();
    if (
      !itemType ||
      !itemType.equipmentPositions.includes(position) ||
      this.items[position] === WakfuBuildEquippedPositionStatus.Disabled
    ) {
      return false;
    }
    this.unequipItem(position);
    for (const pos of itemType.equipmentDisabledPositions) {
      this.unequipItem(pos);
      this.items[pos] = WakfuBuildEquippedPositionStatus.Disabled;
    }
    this.items[position] = item;
    this.saveBuild();
    return true;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
    this.saveBuild();
  }

  public getBreed(): WakfuBreed {
    return this.breed;
  }

  public setBreed(breed: WakfuBreed): void {
    this.breed = breed;
    this.saveBuild();
  }

  public getLevel(): number {
    return this.level;
  }

  public setLevel(level: number): void {
    this.level = level;
    this.abilities.setLevel(level);
    this.saveBuild();
  }

  public getPreferences() {
    return this.preferences;
  }

  public setMasteryPreferences(preferences: TWakfuBuildPreferences["mastery"]): void {
    this.preferences.mastery = preferences;
    this.saveBuild();
  }

  public setResistancePreferences(preferences: TWakfuBuildPreferences["resistance"]): void {
    this.preferences.resistance = preferences;
    this.saveBuild();
  }

  public getAbilities(): WakfuAbilities {
    return this.abilities;
  }

  public addAbilityLevel(ability: EnumAbilities, level: number): void {
    this.abilities.addAbilityLevel(ability, level);
    this.saveBuild();
  }

  public removeAbilityLevel(ability: EnumAbilities, level: number): void {
    this.abilities.removeAbilityLevel(ability, level);
    this.saveBuild();
  }

  public setBonuses(bonuses: TWakfuBuild["bonuses"]): void {
    this.bonuses = bonuses;
    this.saveBuild();
  }

  public getItemStats(item: WakfuItem) {
    const stats = initializeStats();
    for (const stat of Object.values(WakfuStats)) {
      if (!isWakfuStats(stat)) {
        continue;
      }
      const value = item.getStats(stat);
      switch (stat) {
        case WakfuStats.Mastery:
          stats[WakfuStats.MasteryFire] = stats[WakfuStats.MasteryFire] + value;
          stats[WakfuStats.MasteryWater] = stats[WakfuStats.MasteryWater] + value;
          stats[WakfuStats.MasteryEarth] = stats[WakfuStats.MasteryEarth] + value;
          stats[WakfuStats.MasteryAir] = stats[WakfuStats.MasteryAir] + value;
          break;
        case WakfuStats.Resistance:
          stats[WakfuStats.ResistanceFire] = stats[WakfuStats.ResistanceFire] + value;
          stats[WakfuStats.ResistanceWater] = stats[WakfuStats.ResistanceWater] + value;
          stats[WakfuStats.ResistanceEarth] = stats[WakfuStats.ResistanceEarth] + value;
          stats[WakfuStats.ResistanceAir] = stats[WakfuStats.ResistanceAir] + value;
          break;
        default:
          stats[stat] = stats[stat] + value;
          break;
      }
    }
    const masteryXElem = item.getMasteryXElements();
    if (masteryXElem) {
      for (let i = 0; i < masteryXElem.count; i++) {
        stats[this.preferences.mastery[i]] = stats[this.preferences.mastery[i]] + masteryXElem.value;
      }
    }
    const resistanceXElem = item.getResistanceXElements();
    if (resistanceXElem) {
      for (let i = 0; i < resistanceXElem.count; i++) {
        stats[this.preferences.resistance[i]] = stats[this.preferences.resistance[i]] + resistanceXElem.value;
      }
    }
    floorEveryValues(stats);
    return stats;
  }

  public getEquipmentsStats() {
    const stats = initializeStats();
    stats[WakfuStats.PV] = 50 + this.level * 10;
    stats[WakfuStats.PA] = 6;
    stats[WakfuStats.PM] = 3;
    stats[WakfuStats.PW] = 6;
    stats[WakfuStats.CriticalRate] = 3;
    stats[WakfuStats.Control] = 1;
    const abilitiesStats = this.abilities.getStats();
    for (const stat of Object.values(WakfuStats)) {
      if (!isWakfuStats(stat)) {
        continue;
      }
      let value = 0;
      for (const position of Object.values(WakfuEquipmentPosition)) {
        const item = this.items[position];
        if (isWakfuBuildEquippedPositionStatus(item)) {
          continue;
        }
        value += item.getStats(stat);
      }
      for (const bonus of Object.values(EnumStatsBonuses)) {
        if (this.bonuses[bonus] && StatsBonuses[bonus][stat] !== undefined) {
          value += StatsBonuses[bonus][stat];
        }
      }
      value += abilitiesStats[stat] || 0;
      switch (stat) {
        case WakfuStats.Mastery:
          stats[WakfuStats.MasteryFire] = stats[WakfuStats.MasteryFire] + value;
          stats[WakfuStats.MasteryWater] = stats[WakfuStats.MasteryWater] + value;
          stats[WakfuStats.MasteryEarth] = stats[WakfuStats.MasteryEarth] + value;
          stats[WakfuStats.MasteryAir] = stats[WakfuStats.MasteryAir] + value;
          break;
        case WakfuStats.Resistance:
          stats[WakfuStats.ResistanceFire] = stats[WakfuStats.ResistanceFire] + value;
          stats[WakfuStats.ResistanceWater] = stats[WakfuStats.ResistanceWater] + value;
          stats[WakfuStats.ResistanceEarth] = stats[WakfuStats.ResistanceEarth] + value;
          stats[WakfuStats.ResistanceAir] = stats[WakfuStats.ResistanceAir] + value;
          break;
        default:
          stats[stat] = stats[stat] + value;
          break;
      }
    }
    for (const position of Object.values(WakfuEquipmentPosition)) {
      const item = this.items[position];
      if (isWakfuBuildEquippedPositionStatus(item)) {
        continue;
      }
      const masteryXElem = item.getMasteryXElements();
      if (masteryXElem) {
        for (let i = 0; i < masteryXElem.count; i++) {
          stats[this.preferences.mastery[i]] = stats[this.preferences.mastery[i]] + masteryXElem.value;
        }
      }
      const resistanceXElem = item.getResistanceXElements();
      if (resistanceXElem) {
        for (let i = 0; i < resistanceXElem.count; i++) {
          stats[this.preferences.resistance[i]] = stats[this.preferences.resistance[i]] + resistanceXElem.value;
        }
      }
    }
    stats[WakfuStats.PV] += (stats[WakfuStats.PercentHp] / 100) * stats[WakfuStats.PV];
    stats[WakfuStats.Armor] += (stats[WakfuStats.PercentHpToArmor] / 100) * stats[WakfuStats.PV];
    floorEveryValues(stats);
    return stats;
  }

  public toDisplay() {
    const getItemForDisplay = (position: WakfuEquipmentPosition) => {
      const item = this.items[position];
      return isWakfuBuildEquippedPositionStatus(item) ? item : item.toDisplay();
    };
    return {
      id: this.getId(),
      name: this.getName(),
      breed: this.getBreed(),
      level: this.getLevel(),
      preferences: this.getPreferences(),
      items: setEquipmentPositionRecord(getItemForDisplay),
      stats: this.getEquipmentsStats(),
      abilities: this.abilities.getAbilities(),
      bonuses: this.bonuses,
    };
  }
}
