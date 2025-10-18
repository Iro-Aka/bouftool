import { ElectronEventManager } from "../../electron/events/manager";
import { ElectronEvents } from "../../electron/types";
import type { WakfuBuild } from "../builds/build";
import type { WakfuItem } from "../items";
import { EnumWakfuRarity } from "../items/rarity";
import type { EnumWakfuEquipmentPosition, EnumWakfuItemType } from "../itemTypes/types";
import type { EnumWakfuStat } from "../stats/types";
import {
  EquipmentConflictConstraint,
  MaxItemsPerRarityConstraint,
  MaxStatConstraint,
  MinStatConstraint,
  NoDuplicateRingConstraint,
} from "./constraints";
import { LocalSearchOptimizer } from "./LocalSearchOptimizer";
import { EnumConstraintType, EnumStatConstraintType, type TBuildOptimizationConfig } from "./types";

export type OptimizationConfig = {
  statConstraints: Array<{
    stat: string;
    value: number;
    type: EnumStatConstraintType;
    penalty?: number;
  }>;
  statWeights: Array<{
    stat: EnumWakfuStat;
    weight: number;
  }>;
  levelConstraints: {
    minLevel: number;
    maxLevel: number;
  };
  excludeItemTypes: EnumWakfuItemType[];
  excludeRarities: EnumWakfuRarity[];
  preserveEquipment: {
    keepAll: boolean;
    keepSlots: EnumWakfuEquipmentPosition[];
  };
};

export const lauchOptimization = (build: WakfuBuild, config: OptimizationConfig) => {
  try {
    //TODO: actually be a Record<EnumWakfuStat, number>
    const statWeights: Partial<Record<EnumWakfuStat, number>> = {};
    for (const weight of config.statWeights) {
      statWeights[weight.stat] = weight.weight;
    }

    const optimizationConfig: TBuildOptimizationConfig = {
      statWeights: statWeights as Record<EnumWakfuStat, number>,
      elementalPreferences: build.getElementalPreferences(),
      levelConstraints: {
        minLevel: config.levelConstraints.minLevel,
        maxLevel: config.levelConstraints.maxLevel,
      },
      itemFilters: {
        excludeItemTypes: config.excludeItemTypes,
        excludeRarities: config.excludeRarities,
      },
      preserveEquipment: {
        keepAll: config.preserveEquipment.keepAll,
        keepSlots: config.preserveEquipment.keepSlots,
      },
    };

    const optimizer = new LocalSearchOptimizer(build, optimizationConfig);

    for (const constraint of config.statConstraints) {
      if (constraint.type === EnumStatConstraintType.MinBlocking) {
        optimizer.addConstraint(
          new MinStatConstraint(constraint.stat as EnumWakfuStat, constraint.value, EnumConstraintType.Blocking),
        );
      } else if (constraint.type === EnumStatConstraintType.MaxBlocking) {
        optimizer.addConstraint(
          new MaxStatConstraint(constraint.stat as EnumWakfuStat, constraint.value, EnumConstraintType.Blocking),
        );
      } else {
        optimizer.addConstraint(
          new MinStatConstraint(
            constraint.stat as EnumWakfuStat,
            constraint.value,
            EnumConstraintType.Objective,
            constraint.penalty ?? 1000,
          ),
        );
      }
    }

    optimizer.addConstraint(new NoDuplicateRingConstraint(EnumConstraintType.Blocking));
    optimizer.addConstraint(new EquipmentConflictConstraint(EnumConstraintType.Blocking));
    optimizer.addConstraint(new MaxItemsPerRarityConstraint(EnumWakfuRarity.Epic, 1, EnumConstraintType.Blocking));
    optimizer.addConstraint(new MaxItemsPerRarityConstraint(EnumWakfuRarity.Relic, 1, EnumConstraintType.Blocking));

    const results = optimizer.optimize((progress) => {
      ElectronEventManager.send(ElectronEvents.BuildOptimizeProgress, {
        currentIteration: progress.currentIteration,
        totalIterations: progress.totalIterations,
        bestScore: progress.bestScore,
      });
    });

    const formattedResults = results.map((result) => {
      const equipment: Record<string, ReturnType<WakfuItem["toObject"]> | null> = {};
      for (const [position, item] of Object.entries(result.equipment)) {
        equipment[position] = item ? item.toObject() : null;
      }

      return {
        equipment,
        score: result.score,
        valid: result.valid,
        meetsObjectives: result.meetsObjectives,
        violations: result.violations,
      };
    });

    ElectronEventManager.send(ElectronEvents.BuildOptimizeResult, formattedResults);
  } catch (error) {
    console.error("Optimization error:", error);
    ElectronEventManager.send(ElectronEvents.BuildOptimizeResult, []);
  }
};
