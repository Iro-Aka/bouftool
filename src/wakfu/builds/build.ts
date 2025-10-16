import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { WakfuAbilities } from "../abilities";
import type { EnumAbilities } from "../abilities/types";
import type { WakfuItem } from "../items";
import { EnumWakfuEquipmentPosition } from "../itemTypes/types";
import { WakfuStats } from "../stats";
import { EnumWakfuStat, type TElementalPreferences } from "../stats/types";
import { WakfuStore } from "../store";
import { FileHandler } from "../utils/FileHandler";
import { EnumWakfuStatsBonuses, StatsBonuses } from "./bonus";
import { WakfuCharacter } from "./character";
import type {
  TWakfuBuildDisplay,
  TWakfuBuildMinimalDisplay,
  TWakfuBuildRaw,
  TWakfuBuildStuff,
  TWakfuBuildStuffDisplay,
} from "./types";

const DefaultStuff: TWakfuBuildStuff = {
  [EnumWakfuEquipmentPosition.Accessory]: { preferences: null, item: null, disabled: 0 },
  [EnumWakfuEquipmentPosition.Back]: { preferences: null, item: null, disabled: 0 },
  [EnumWakfuEquipmentPosition.Belt]: { preferences: null, item: null, disabled: 0 },
  [EnumWakfuEquipmentPosition.Chest]: { preferences: null, item: null, disabled: 0 },
  [EnumWakfuEquipmentPosition.FirstWeapon]: { preferences: null, item: null, disabled: 0 },
  [EnumWakfuEquipmentPosition.Head]: { preferences: null, item: null, disabled: 0 },
  [EnumWakfuEquipmentPosition.LeftHand]: { preferences: null, item: null, disabled: 0 },
  [EnumWakfuEquipmentPosition.Legs]: { preferences: null, item: null, disabled: 0 },
  [EnumWakfuEquipmentPosition.Mount]: { preferences: null, item: null, disabled: 0 },
  [EnumWakfuEquipmentPosition.Neck]: { preferences: null, item: null, disabled: 0 },
  [EnumWakfuEquipmentPosition.Pet]: { preferences: null, item: null, disabled: 0 },
  [EnumWakfuEquipmentPosition.RightHand]: { preferences: null, item: null, disabled: 0 },
  [EnumWakfuEquipmentPosition.SecondWeapon]: { preferences: null, item: null, disabled: 0 },
  [EnumWakfuEquipmentPosition.Shoulders]: { preferences: null, item: null, disabled: 0 },
};

const DefaultElementalPreferences: TElementalPreferences = [
  EnumWakfuStat.FireMastery,
  EnumWakfuStat.WaterMastery,
  EnumWakfuStat.EarthMastery,
  EnumWakfuStat.AirMastery,
];

const DefaultStatsBonuses: Record<EnumWakfuStatsBonuses, boolean> = {
  [EnumWakfuStatsBonuses.Guild]: false,
  [EnumWakfuStatsBonuses.HavenWorld]: false,
};

export class WakfuBuild {
  private static BuildsMap: Map<string, WakfuBuild> = new Map();
  private character: WakfuCharacter;
  private id: string;
  private name: string;
  private level: number;
  private abilities: WakfuAbilities;
  private stuff: TWakfuBuildStuff = DefaultStuff;
  private elementalPreferences: TElementalPreferences = DefaultElementalPreferences;
  private bonuses: Record<EnumWakfuStatsBonuses, boolean> = DefaultStatsBonuses;
  private fileHandler: FileHandler<TWakfuBuildRaw>;

  private static getFilePath(characterId: string, buildId: string): string {
    return path.join(WakfuCharacter.CharactersDir, characterId, `${buildId}.json`);
  }

  public static async create(character: WakfuCharacter, name: string, level: number) {
    const id = randomUUID();
    const wakfuBuild = new WakfuBuild(character, id, name, level);
    await wakfuBuild.save(true);
    return wakfuBuild;
  }

  public static async loadBuilds(character: WakfuCharacter) {
    const builds: WakfuBuild[] = [];
    const buildsFiles = await fs.readdir(path.join(WakfuCharacter.CharactersDir, character.getId()));
    for (const buildFile of buildsFiles) {
      if (buildFile !== "character.json" && buildFile.endsWith(".json")) {
        const filename = path.basename(buildFile, ".json");
        const build = new WakfuBuild(character, filename, "", 245);
        await build.load();
        builds.push(build);
      }
    }
    return builds;
  }

  public static getById(buildId: string) {
    return WakfuBuild.BuildsMap.get(buildId) || null;
  }

  private constructor(character: WakfuCharacter, id: string, name: string, level: number) {
    this.character = character;
    this.id = id;
    this.name = name;
    this.level = level;
    this.abilities = new WakfuAbilities(level);
    this.fileHandler = new FileHandler(WakfuBuild.getFilePath(character.getId(), id));
    WakfuBuild.BuildsMap.set(id, this);
  }

  private save(skipTimeout: boolean = false) {
    return this.fileHandler.write(
      {
        id: this.id,
        name: this.name,
        level: this.level,
        abilities: this.abilities.getAbilities(),
        stuff: Object.values(EnumWakfuEquipmentPosition).reduce<TWakfuBuildRaw["stuff"]>(
          (acc, position) => {
            const equipment = this.stuff[position];
            acc[position] = {
              preferences: equipment.preferences,
              item: equipment.item?.getId() ?? null,
              disabled: equipment.disabled,
            };
            return acc;
          },
          {} as TWakfuBuildRaw["stuff"],
        ),
        elementalPreferences: this.elementalPreferences,
        bonuses: this.bonuses,
      } satisfies TWakfuBuildRaw,
      skipTimeout,
    );
  }

  private async load() {
    const result = await this.fileHandler.read();
    this.id = result.id;
    this.name = result.name;
    this.level = result.level;
    this.abilities = new WakfuAbilities(result.level, result.abilities);
    this.stuff = Object.values(EnumWakfuEquipmentPosition).reduce((acc, position) => {
      acc[position] = {
        preferences: result.stuff[position].preferences,
        item: result.stuff[position].item ? WakfuStore.getInstance().getItemById(result.stuff[position].item) : null,
        disabled: result.stuff[position].disabled,
      };
      return acc;
    }, {} as TWakfuBuildStuff);
    this.elementalPreferences = result.elementalPreferences;
    this.bonuses = result.bonuses;
  }

  public delete() {
    WakfuBuild.BuildsMap.delete(this.id);
    this.fileHandler.delete();
  }

  public getItemsDisablingPosition(position: EnumWakfuEquipmentPosition): WakfuItem[] {
    const items: WakfuItem[] = [];
    for (const equipmentPosition of Object.values(EnumWakfuEquipmentPosition)) {
      const equipment = this.stuff[equipmentPosition];
      if (equipment.item?.getItemType().isPositionDisabled(position)) {
        items.push(equipment.item);
      }
    }
    return items;
  }

  public isEquipped(position: EnumWakfuEquipmentPosition): boolean {
    const equipment = this.stuff[position];
    return equipment.item !== null;
  }

  public getEquippedItem(position: EnumWakfuEquipmentPosition) {
    const equipment = this.stuff[position];
    return equipment.item;
  }

  public unequipItem(position: EnumWakfuEquipmentPosition) {
    const equipment = this.stuff[position];
    if (equipment.item === null) {
      return false;
    }
    for (const disabledPosition of equipment.item.getItemType().getEquipmentDisabledPositions()) {
      --this.stuff[disabledPosition].disabled;
    }
    this.stuff[position].item = null;
    this.save();
    return true;
  }

  public equipItem(position: EnumWakfuEquipmentPosition, item: WakfuItem) {
    const equipment = this.stuff[position];
    if (equipment.disabled > 0) {
      return false;
    }
    if (equipment.item !== null) {
      this.unequipItem(position);
    }
    equipment.item = item;
    for (const disabledPosition of item.getItemType().getEquipmentDisabledPositions()) {
      this.unequipItem(disabledPosition);
      ++this.stuff[disabledPosition].disabled;
    }
    this.save();
    return true;
  }

  public getStats() {
    const stats = new WakfuStats({
      [EnumWakfuStat.HealthPoint]: 50 + this.level * 10,
      [EnumWakfuStat.ActionPoint]: 6,
      [EnumWakfuStat.MovementPoint]: 3,
      [EnumWakfuStat.WakfuPoint]: 6,
      [EnumWakfuStat.CriticalHit]: 3,
      [EnumWakfuStat.Control]: 1,
    });
    stats.merge(this.abilities.getStats());
    for (const bonus of Object.values(EnumWakfuStatsBonuses)) {
      if (this.bonuses[bonus]) {
        stats.merge(StatsBonuses[bonus]);
      }
    }
    for (const position of Object.values(EnumWakfuEquipmentPosition)) {
      const equipment = this.stuff[position];
      if (equipment.item === null) {
        continue;
      }
      if (equipment.preferences) {
        stats.merge(equipment.item.getStats().toApplyElementalPreferences(equipment.preferences));
      } else {
        stats.merge(equipment.item.getStats());
      }
    }
    stats.applyElementalPreferences(this.elementalPreferences);
    stats.applyEffects();
    return stats;
  }

  public getStatsWithoutEquipment() {
    const stats = new WakfuStats({
      [EnumWakfuStat.HealthPoint]: 50 + this.level * 10,
      [EnumWakfuStat.ActionPoint]: 6,
      [EnumWakfuStat.MovementPoint]: 3,
      [EnumWakfuStat.WakfuPoint]: 6,
      [EnumWakfuStat.CriticalHit]: 3,
      [EnumWakfuStat.Control]: 1,
    });
    stats.merge(this.abilities.getStats());
    for (const bonus of Object.values(EnumWakfuStatsBonuses)) {
      if (this.bonuses[bonus]) {
        stats.merge(StatsBonuses[bonus]);
      }
    }

    stats.applyElementalPreferences(this.elementalPreferences);
    stats.applyEffects();
    return stats;
  }

  public getId(): string {
    return this.id;
  }

  public getLevel(): number {
    return this.level;
  }

  public getAbilities(): WakfuAbilities {
    return this.abilities;
  }

  public getElementalPreferences(): TElementalPreferences {
    return this.elementalPreferences;
  }

  public setName(name: string) {
    this.name = name;
    this.save();
  }

  public setLevel(level: number) {
    this.level = level;
    this.save();
  }

  public setBonuses(bonuses: Record<EnumWakfuStatsBonuses, boolean>) {
    this.bonuses = bonuses;
    this.save();
  }

  public setElementalPreferences(preferences: TElementalPreferences) {
    this.elementalPreferences = preferences;
    this.save();
  }

  public addAbilityLevel(abilityId: EnumAbilities, level: number = 1) {
    this.abilities.addAbilityLevel(abilityId, level);
    this.save();
  }

  public removeAbilityLevel(abilityId: EnumAbilities, level: number = 1) {
    this.abilities.removeAbilityLevel(abilityId, level);
    this.save();
  }

  public toDisplay(): TWakfuBuildDisplay {
    return {
      id: this.id,
      characterId: this.character.getId(),
      characterName: this.character.getName(),
      characterBreed: this.character.getBreed(),
      name: this.name,
      level: this.level,
      bonuses: this.bonuses,
      abilities: this.abilities.getAbilities(),
      elementalPreferences: this.elementalPreferences,
      stuff: Object.values(EnumWakfuEquipmentPosition).reduce<TWakfuBuildStuffDisplay>((acc, position) => {
        acc[position] = {
          item: this.stuff[position].item?.toObject() || null,
          disabled: this.stuff[position].disabled > 0,
        };
        return acc;
      }, {} as TWakfuBuildStuffDisplay),
      stats: this.getStats().toObject(),
    };
  }

  public toMinimalDisplay(): TWakfuBuildMinimalDisplay {
    return {
      id: this.id,
      name: this.name,
      level: this.level,
      stuff: Object.values(EnumWakfuEquipmentPosition).reduce<TWakfuBuildStuffDisplay>((acc, position) => {
        acc[position] = {
          item: this.stuff[position].item?.toObject() || null,
          disabled: this.stuff[position].disabled > 0,
        };
        return acc;
      }, {} as TWakfuBuildStuffDisplay),
    };
  }
}
