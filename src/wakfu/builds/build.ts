import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { WakfuAbilities } from "../abilities";
import type { EnumAbilities } from "../abilities/types";
import { EnchantableEquipmentPositions } from "../enchantment/constants";
import type { WakfuItem } from "../items";
import { EnumWakfuRarity } from "../items/rarity";
import { EnumWakfuEquipmentPosition } from "../itemTypes/types";
import { WakfuStats } from "../stats";
import { EnumWakfuStat, type TElementalPreferences } from "../stats/types";
import { WakfuStore } from "../store";
import { FileHandler } from "../utils/FileHandler";
import { EnumWakfuStatsBonuses, StatsBonuses } from "./bonus";
import { WakfuCharacter } from "./character";
import type {
  TWakfuBuildDisplay,
  TWakfuBuildEnchantments,
  TWakfuBuildMinimalDisplay,
  TWakfuBuildRaw,
  TWakfuBuildStuff,
  TWakfuBuildStuffDisplay,
} from "./types";

const DefaultEnchantments: TWakfuBuildEnchantments = {
  sublimationEpic: null,
  sublimationRelic: null,
  [EnumWakfuEquipmentPosition.Head]: {
    enchantments: [null, null, null, null],
    sublimation: null,
  },
  [EnumWakfuEquipmentPosition.Shoulders]: {
    enchantments: [null, null, null, null],
    sublimation: null,
  },
  [EnumWakfuEquipmentPosition.Neck]: {
    enchantments: [null, null, null, null],
    sublimation: null,
  },
  [EnumWakfuEquipmentPosition.Chest]: {
    enchantments: [null, null, null, null],
    sublimation: null,
  },
  [EnumWakfuEquipmentPosition.LeftHand]: {
    enchantments: [null, null, null, null],
    sublimation: null,
  },
  [EnumWakfuEquipmentPosition.RightHand]: {
    enchantments: [null, null, null, null],
    sublimation: null,
  },
  [EnumWakfuEquipmentPosition.Belt]: {
    enchantments: [null, null, null, null],
    sublimation: null,
  },
  [EnumWakfuEquipmentPosition.Legs]: {
    enchantments: [null, null, null, null],
    sublimation: null,
  },
  [EnumWakfuEquipmentPosition.Back]: {
    enchantments: [null, null, null, null],
    sublimation: null,
  },
  [EnumWakfuEquipmentPosition.FirstWeapon]: {
    enchantments: [null, null, null, null],
    sublimation: null,
  },
};

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
  private enchantments: TWakfuBuildEnchantments = DefaultEnchantments;
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

  private toRaw(): TWakfuBuildRaw {
    return {
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
      enchantments: EnchantableEquipmentPositions.reduce(
        (acc, position) => {
          acc[position] = {
            enchantments:
              this.enchantments[position]?.enchantments.map((e) =>
                e ? { id: e.enchantment.getId(), level: e.level, anyColor: e.anyColor } : null,
              ) ?? [],
            sublimation: this.enchantments[position]?.sublimation
              ? this.enchantments[position].sublimation.getId()
              : null,
          };
          return acc;
        },
        {
          sublimationEpic: this.enchantments.sublimationEpic ? this.enchantments.sublimationEpic.getId() : null,
          sublimationRelic: this.enchantments.sublimationRelic ? this.enchantments.sublimationRelic.getId() : null,
        } as TWakfuBuildRaw["enchantments"],
      ),
    } satisfies TWakfuBuildRaw;
  }

  private fromRaw(buildData: TWakfuBuildRaw, skipId: boolean = false) {
    const store = WakfuStore.getInstance();
    if (!skipId) {
      this.id = buildData.id;
    }
    this.name = buildData.name;
    this.level = buildData.level;
    this.abilities = new WakfuAbilities(buildData.level, buildData.abilities);
    this.stuff = Object.values(EnumWakfuEquipmentPosition).reduce((acc, position) => {
      acc[position] = {
        preferences: buildData.stuff[position].preferences,
        item: buildData.stuff[position].item ? store.getItemById(buildData.stuff[position].item) : null,
        disabled: buildData.stuff[position].disabled,
      };
      return acc;
    }, {} as TWakfuBuildStuff);
    this.elementalPreferences = buildData.elementalPreferences;
    this.bonuses = buildData.bonuses;
    if (buildData.enchantments) {
      this.enchantments = EnchantableEquipmentPositions.reduce(
        (acc, position) => {
          acc[position] = {
            enchantments: [
              buildData.enchantments[position]?.enchantments[0] || null,
              buildData.enchantments[position]?.enchantments[1] || null,
              buildData.enchantments[position]?.enchantments[2] || null,
              buildData.enchantments[position]?.enchantments[3] || null,
            ].map((e) => {
              const enchantment = e ? store.getEnchantmentById(e.id) : null;
              if (e && enchantment) {
                return { enchantment, level: e.level, anyColor: e.anyColor };
              }
              return null;
            }) as TWakfuBuildEnchantments[(typeof EnchantableEquipmentPositions)[number]]["enchantments"],
            sublimation: buildData.enchantments[position]?.sublimation
              ? store.getSublimationById(buildData.enchantments[position].sublimation)
              : null,
          };
          return acc;
        },
        {
          sublimationEpic: buildData.enchantments.sublimationEpic
            ? store.getSublimationById(buildData.enchantments.sublimationEpic)
            : null,
          sublimationRelic: buildData.enchantments.sublimationRelic
            ? store.getSublimationById(buildData.enchantments.sublimationRelic)
            : null,
        } as TWakfuBuildEnchantments,
      );
    }
  }

  private save(skipTimeout: boolean = false) {
    return this.fileHandler.write(this.toRaw(), skipTimeout);
  }

  private async load() {
    const result = await this.fileHandler.read();
    this.fromRaw(result);
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
    for (const position of EnchantableEquipmentPositions) {
      for (const enchantmentData of this.enchantments[position].enchantments) {
        if (enchantmentData) {
          stats.merge(
            enchantmentData.enchantment.getEffect(
              enchantmentData.level,
              position as (typeof EnchantableEquipmentPositions)[number],
            ),
          );
        }
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

  public assignEnchantment(
    position: (typeof EnchantableEquipmentPositions)[number],
    slot: number,
    enchantmentId: number | null,
    enchantmentLevel: number,
    anyColor: boolean = false,
  ) {
    if (!enchantmentId) {
      this.enchantments[position].enchantments[slot] = null;
    } else {
      const enchantment = WakfuStore.getInstance().getEnchantmentById(enchantmentId);
      if (!enchantment) {
        throw new Error(`Enchantment with ID ${enchantmentId} not found`);
      }
      this.enchantments[position].enchantments[slot] = { enchantment, level: enchantmentLevel, anyColor };
    }
    this.save();
  }

  public assignSublimation(position: (typeof EnchantableEquipmentPositions)[number], sublimationId: number | null) {
    if (!sublimationId) {
      this.enchantments[position].sublimation = null;
    } else {
      const sublimation = WakfuStore.getInstance().getSublimationById(sublimationId);
      if (!sublimation) {
        throw new Error(`Sublimation with ID ${sublimationId} not found`);
      }
      this.enchantments[position].sublimation = sublimation;
    }
    this.save();
  }

  assignUniqueSublimation(sublimationId: number) {
    const sublimation = WakfuStore.getInstance().getSublimationById(sublimationId);
    if (!sublimation) {
      throw new Error(`Sublimation with ID ${sublimationId} not found`);
    }
    if (sublimation.isRarityEpic()) {
      this.enchantments.sublimationEpic = sublimation;
    } else if (sublimation.isRarityRelic()) {
      this.enchantments.sublimationRelic = sublimation;
    } else {
      throw new Error(`Sublimation with ID ${sublimationId} is not epic or relic`);
    }
    this.save();
  }

  unassignUniqueSublimation(rarity: EnumWakfuRarity.Epic | EnumWakfuRarity.Relic) {
    if (rarity === EnumWakfuRarity.Epic) {
      this.enchantments.sublimationEpic = null;
    } else if (rarity === EnumWakfuRarity.Relic) {
      this.enchantments.sublimationRelic = null;
    }
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
      enchantments: EnchantableEquipmentPositions.reduce<TWakfuBuildDisplay["enchantments"]>(
        (acc, position) => {
          const enchantmentData = this.enchantments[position];
          acc[position as (typeof EnchantableEquipmentPositions)[number]] = {
            enchantments: enchantmentData.enchantments.map((e) =>
              e
                ? { id: e.enchantment.getId(), level: e.level, color: e.enchantment.getColor(), anyColor: e.anyColor }
                : null,
            ),
            sublimation: enchantmentData.sublimation
              ? {
                  id: enchantmentData.sublimation.getId(),
                  name: enchantmentData.sublimation.getName(),
                  gfxId: enchantmentData.sublimation.getGfxId(),
                  colorPattern: enchantmentData.sublimation.getColorPattern(),
                }
              : null,
          };
          return acc;
        },
        {
          sublimationEpic: this.enchantments.sublimationEpic
            ? {
                id: this.enchantments.sublimationEpic.getId(),
                name: this.enchantments.sublimationEpic.getName(),
                gfxId: this.enchantments.sublimationEpic.getGfxId(),
              }
            : null,
          sublimationRelic: this.enchantments.sublimationRelic
            ? {
                id: this.enchantments.sublimationRelic.getId(),
                name: this.enchantments.sublimationRelic.getName(),
                gfxId: this.enchantments.sublimationRelic.getGfxId(),
              }
            : null,
        } as TWakfuBuildDisplay["enchantments"],
      ),
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

  public serializeToBase64(): string {
    const buildData = this.toRaw();
    const jsonString = JSON.stringify(buildData);
    return Buffer.from(jsonString, "utf-8").toString("base64");
  }

  public static async deserializeFromBase64(character: WakfuCharacter, base64String: string): Promise<WakfuBuild> {
    const jsonString = Buffer.from(base64String, "base64").toString("utf-8");
    const buildData: TWakfuBuildRaw = JSON.parse(jsonString);
    const build = await WakfuBuild.create(character, buildData.name, buildData.level);
    build.fromRaw(buildData, true);
    await build.save(true);
    return build;
  }
}
