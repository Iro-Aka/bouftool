import fs from "node:fs/promises";
import path from "node:path";
import { isErrnoException } from "src/types/utils";
import { WakfuData } from "../data";
import type { WakfuItem } from "../data/item";
import { WakfuBreed } from "../types/breed";
import { WakfuEquipmentPosition } from "../types/itemType";
import {
  isWakfuBuild,
  isWakfuBuildEquippedPositionStatus,
  type TWakfuBuild,
  type TWakfuPreferences,
  WakfuBuildEquippedPositionStatus,
} from "./types";

const defaultWakfuPreferences: TWakfuPreferences = {
  mastery: {
    elementsPriority: [],
    backMastery: false,
    berserkMastery: false,
    criticalMastery: false,
    healingMastery: false,
    meleeMastery: false,
    rangeMastery: false,
  },
  resistance: {
    elementsPriority: [],
  },
};

export class WakfuBuild {
  private static readonly FolderPath = "builds";
  private static builds: WakfuBuild[] = [];
  private static buildsMap: Map<number, WakfuBuild> = new Map();
  private id: number;
  private name: string = "";
  private breed: WakfuBreed = WakfuBreed.Feca;
  private level: number = 1;
  private preferences: TWakfuPreferences = defaultWakfuPreferences;
  private items: Record<WakfuEquipmentPosition, WakfuItem | WakfuBuildEquippedPositionStatus> = {
    [WakfuEquipmentPosition.Head]: WakfuBuildEquippedPositionStatus.Empty,
    [WakfuEquipmentPosition.Back]: WakfuBuildEquippedPositionStatus.Empty,
    [WakfuEquipmentPosition.Neck]: WakfuBuildEquippedPositionStatus.Empty,
    [WakfuEquipmentPosition.Shoulders]: WakfuBuildEquippedPositionStatus.Empty,
    [WakfuEquipmentPosition.Chest]: WakfuBuildEquippedPositionStatus.Empty,
    [WakfuEquipmentPosition.Belt]: WakfuBuildEquippedPositionStatus.Empty,
    [WakfuEquipmentPosition.LeftHand]: WakfuBuildEquippedPositionStatus.Empty,
    [WakfuEquipmentPosition.RightHand]: WakfuBuildEquippedPositionStatus.Empty,
    [WakfuEquipmentPosition.Legs]: WakfuBuildEquippedPositionStatus.Empty,
    [WakfuEquipmentPosition.FirstWeapon]: WakfuBuildEquippedPositionStatus.Empty,
    [WakfuEquipmentPosition.SecondWeapon]: WakfuBuildEquippedPositionStatus.Empty,
    [WakfuEquipmentPosition.Accessory]: WakfuBuildEquippedPositionStatus.Empty,
    [WakfuEquipmentPosition.Pet]: WakfuBuildEquippedPositionStatus.Empty,
    [WakfuEquipmentPosition.Mount]: WakfuBuildEquippedPositionStatus.Empty,
  };
  private timeout: NodeJS.Timeout | null = null;
  private savePromise: Promise<void> | null = null;
  private savePromiseResolve: (() => void) | null = null;

  public static getBuilds(): WakfuBuild[] {
    return WakfuBuild.builds;
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

  public static async loadBuilds(): Promise<WakfuBuild[]> {
    try {
      WakfuBuild.builds = [];
      WakfuBuild.buildsMap.clear();
      const files = await fs.readdir(WakfuBuild.FolderPath);
      for (const file of files) {
        if (file.endsWith(".json")) {
          const build = new WakfuBuild(Number(file));
          await build.loadBuild();
          WakfuBuild.builds.push(build);
          WakfuBuild.buildsMap.set(build.id, build);
        }
      }
      return WakfuBuild.builds;
    } catch (error) {
      console.error("Error loading builds:", error);
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
          items: {
            [WakfuEquipmentPosition.Head]: getItemForSave(WakfuEquipmentPosition.Head),
            [WakfuEquipmentPosition.Back]: getItemForSave(WakfuEquipmentPosition.Back),
            [WakfuEquipmentPosition.Neck]: getItemForSave(WakfuEquipmentPosition.Neck),
            [WakfuEquipmentPosition.Shoulders]: getItemForSave(WakfuEquipmentPosition.Shoulders),
            [WakfuEquipmentPosition.Chest]: getItemForSave(WakfuEquipmentPosition.Chest),
            [WakfuEquipmentPosition.Belt]: getItemForSave(WakfuEquipmentPosition.Belt),
            [WakfuEquipmentPosition.LeftHand]: getItemForSave(WakfuEquipmentPosition.LeftHand),
            [WakfuEquipmentPosition.RightHand]: getItemForSave(WakfuEquipmentPosition.RightHand),
            [WakfuEquipmentPosition.Legs]: getItemForSave(WakfuEquipmentPosition.Legs),
            [WakfuEquipmentPosition.FirstWeapon]: getItemForSave(WakfuEquipmentPosition.FirstWeapon),
            [WakfuEquipmentPosition.SecondWeapon]: getItemForSave(WakfuEquipmentPosition.SecondWeapon),
            [WakfuEquipmentPosition.Accessory]: getItemForSave(WakfuEquipmentPosition.Accessory),
            [WakfuEquipmentPosition.Pet]: getItemForSave(WakfuEquipmentPosition.Pet),
            [WakfuEquipmentPosition.Mount]: getItemForSave(WakfuEquipmentPosition.Mount),
          },
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
        this.items = {
          [WakfuEquipmentPosition.Head]: getItemForLoad(WakfuEquipmentPosition.Head),
          [WakfuEquipmentPosition.Back]: getItemForLoad(WakfuEquipmentPosition.Back),
          [WakfuEquipmentPosition.Neck]: getItemForLoad(WakfuEquipmentPosition.Neck),
          [WakfuEquipmentPosition.Shoulders]: getItemForLoad(WakfuEquipmentPosition.Shoulders),
          [WakfuEquipmentPosition.Chest]: getItemForLoad(WakfuEquipmentPosition.Chest),
          [WakfuEquipmentPosition.Belt]: getItemForLoad(WakfuEquipmentPosition.Belt),
          [WakfuEquipmentPosition.LeftHand]: getItemForLoad(WakfuEquipmentPosition.LeftHand),
          [WakfuEquipmentPosition.RightHand]: getItemForLoad(WakfuEquipmentPosition.RightHand),
          [WakfuEquipmentPosition.Legs]: getItemForLoad(WakfuEquipmentPosition.Legs),
          [WakfuEquipmentPosition.FirstWeapon]: getItemForLoad(WakfuEquipmentPosition.FirstWeapon),
          [WakfuEquipmentPosition.SecondWeapon]: getItemForLoad(WakfuEquipmentPosition.SecondWeapon),
          [WakfuEquipmentPosition.Accessory]: getItemForLoad(WakfuEquipmentPosition.Accessory),
          [WakfuEquipmentPosition.Pet]: getItemForLoad(WakfuEquipmentPosition.Pet),
          [WakfuEquipmentPosition.Mount]: getItemForLoad(WakfuEquipmentPosition.Mount),
        };
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
  }

  public getBreed(): WakfuBreed {
    return this.breed;
  }

  public setBreed(breed: WakfuBreed): void {
    this.breed = breed;
  }

  public getLevel(): number {
    return this.level;
  }

  public setLevel(level: number): void {
    this.level = level;
  }

  public getPreferences(): TWakfuPreferences {
    return this.preferences;
  }

  public setPreferences(preferences: TWakfuPreferences): void {
    this.preferences = preferences;
  }
}
