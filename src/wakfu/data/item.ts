import { WakfuActionId, WakfuStats, wakfuStatsToWakfuActionId } from "../types/action";
import type { TWakfuItemDisplay, TWakfuItemParsed } from "../types/items";
import type { TWakfuItemType } from "../types/itemType";
import type { WakfuLang } from "../types/utils";
import { ItemIdOverrideLevel, ItemTypesOverrideLevel, WakfuData } from "./index";

export enum WakfuParamIndex {
  EffectValue = 1,
  ElementCount = 2,
  OnXElementsFire = 3,
  OnXElementsWater = 4,
  OnXElementsEarth = 5,
  OnXElementsAir = 6,
}

export class WakfuItem {
  public item: TWakfuItemParsed;
  public lang: WakfuLang;

  constructor(item: TWakfuItemParsed, lang: WakfuLang) {
    this.item = item;
    this.lang = lang;
  }

  private getRealParamIndex = (index: number): number => {
    return (index - 1) * 2;
  };

  private getParamValue(params: number[], index: number) {
    const realIndex = this.getRealParamIndex(index);
    const paramLevel =
      ItemIdOverrideLevel[this.item.id] || ItemTypesOverrideLevel[this.item.itemTypeId] || this.item.level || 100;
    return params[realIndex] + (params[realIndex + 1] ?? 0) * paramLevel;
  }

  private setParamValue(params: number[], index: number, value: number, levelScaling?: number) {
    const realIndex = this.getRealParamIndex(index);
    params[realIndex] = value;
    if (levelScaling) {
      params[realIndex + 1] = levelScaling;
    }
    return params;
  }

  private setOnXParamValues(params: number[], values: { fire: boolean; water: boolean; earth: boolean; air: boolean }) {
    this.setParamValue(params, WakfuParamIndex.OnXElementsFire, values.fire ? 1 : 0);
    this.setParamValue(params, WakfuParamIndex.OnXElementsWater, values.water ? 1 : 0);
    this.setParamValue(params, WakfuParamIndex.OnXElementsEarth, values.earth ? 1 : 0);
    this.setParamValue(params, WakfuParamIndex.OnXElementsAir, values.air ? 1 : 0);
  }

  public findEquipEffect(actionId: WakfuActionId, params?: { paramIndex: number; value: number }[]) {
    for (const equipEffect of this.item.equipEffects) {
      if (equipEffect.actionId === actionId) {
        if (params) {
          for (const { paramIndex, value } of params) {
            if (this.getParamValue(equipEffect.params, paramIndex) !== value) {
              return undefined;
            }
          }
        }
        return equipEffect;
      }
    }
  }

  public getId(): number {
    return this.item.id;
  }

  public getTitle(): string {
    return this.item.title?.[this.lang] ?? "Undefined";
  }

  public getLevel(): number {
    return this.item.level;
  }

  public getItemTypeId(): number {
    return this.item.itemTypeId;
  }

  public getItemType(): TWakfuItemType | undefined {
    return WakfuData.getInstance().getItemTypesMap().get(this.item.itemTypeId);
  }

  public getRarity(): number {
    return this.item.rarity;
  }

  public getGfxId(): number {
    return this.item.gfxId;
  }

  public getStats(stats: WakfuStats): number {
    const statsToActionId = wakfuStatsToWakfuActionId[stats];
    const gainEffect = this.findEquipEffect(statsToActionId.gain, statsToActionId.params);
    const lossEffect = statsToActionId.loss && this.findEquipEffect(statsToActionId.loss, statsToActionId.params);
    const gainValue = gainEffect ? this.getParamValue(gainEffect.params, WakfuParamIndex.EffectValue) : 0;
    const lossValue = lossEffect ? this.getParamValue(lossEffect.params, WakfuParamIndex.EffectValue) : 0;
    return gainValue - lossValue;
  }

  public getMasteryXElements(): { value: number; count: number; elementsSelected: boolean } | null {
    const masteryXElemEffect = this.findEquipEffect(WakfuActionId.MasteryOnXElements);
    if (masteryXElemEffect) {
      return {
        value: this.getParamValue(masteryXElemEffect.params, WakfuParamIndex.EffectValue),
        count: this.getParamValue(masteryXElemEffect.params, WakfuParamIndex.ElementCount),
        elementsSelected: masteryXElemEffect.params.length > this.getRealParamIndex(WakfuParamIndex.ElementCount + 1),
      };
    }
    return null;
  }

  public setMasteryXElements(
    elements: (WakfuStats.MasteryFire | WakfuStats.MasteryWater | WakfuStats.MasteryEarth | WakfuStats.MasteryAir)[],
  ): boolean {
    const masteryXElemEffect = this.findEquipEffect(WakfuActionId.MasteryOnXElements);
    if (masteryXElemEffect) {
      if (elements.length !== this.getParamValue(masteryXElemEffect.params, WakfuParamIndex.ElementCount)) {
        return false;
      }
      this.setOnXParamValues(masteryXElemEffect.params, {
        fire: elements.includes(WakfuStats.MasteryFire),
        water: elements.includes(WakfuStats.MasteryWater),
        earth: elements.includes(WakfuStats.MasteryEarth),
        air: elements.includes(WakfuStats.MasteryAir),
      });
    }
    return true;
  }

  public getResistanceXElements(): { value: number; count: number; elementsSelected: boolean } | null {
    const resistanceXElemEffect = this.findEquipEffect(WakfuActionId.ResistanceOnXElements);
    if (resistanceXElemEffect) {
      return {
        value: this.getParamValue(resistanceXElemEffect.params, WakfuParamIndex.EffectValue),
        count: this.getParamValue(resistanceXElemEffect.params, WakfuParamIndex.ElementCount),
        elementsSelected:
          resistanceXElemEffect.params.length > this.getRealParamIndex(WakfuParamIndex.ElementCount + 1),
      };
    }
    return null;
  }

  public setResistanceXElements(
    elements: (
      | WakfuStats.ResistanceFire
      | WakfuStats.ResistanceWater
      | WakfuStats.ResistanceEarth
      | WakfuStats.ResistanceAir
    )[],
  ): boolean {
    const resistanceXElemEffect = this.findEquipEffect(WakfuActionId.ResistanceOnXElements);
    if (resistanceXElemEffect) {
      if (elements.length !== this.getParamValue(resistanceXElemEffect.params, WakfuParamIndex.ElementCount)) {
        return false;
      }
      this.setOnXParamValues(resistanceXElemEffect.params, {
        fire: elements.includes(WakfuStats.ResistanceFire),
        water: elements.includes(WakfuStats.ResistanceWater),
        earth: elements.includes(WakfuStats.ResistanceEarth),
        air: elements.includes(WakfuStats.ResistanceAir),
      });
    }
    return true;
  }

  public toDisplay(): TWakfuItemDisplay {
    return {
      id: this.item.id,
      level: this.item.level,
      itemTypeId: this.item.itemTypeId,
      rarity: this.item.rarity,
      gfxId: this.item.gfxId,
      equipEffectsLabels: this.item.equipEffectsLabels,
      title: this.getTitle(),
    };
  }
}
