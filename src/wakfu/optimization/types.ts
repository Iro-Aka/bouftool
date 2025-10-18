import type { WakfuItem } from "../items";
import type { EnumWakfuRarity } from "../items/rarity";
import type { EnumWakfuEquipmentPosition, EnumWakfuItemType } from "../itemTypes/types";
import type { TElementalPreferences } from "../stats/types";
import type { TItemScorerConfig } from "./utils/ItemScorer";

export enum EnumConstraintType {
  Blocking = "BLOCKING",
  Objective = "OBJECTIVE",
}

export type TConstraintEvaluationResult = {
  satisfied: boolean;
  message?: string;
  penalty?: number;
};

export type TBuildOptimizationConfig = {
  statWeights: TItemScorerConfig;

  elementalPreferences: TElementalPreferences;

  preserveEquipment?: {
    keepAll?: boolean;
    keepSlots?: EnumWakfuEquipmentPosition[];
  };

  algorithm?: {
    maxIterations?: number;
    neighborsPerIteration?: number;
    acceptanceThreshold?: number;
    tabuListSize?: number;
    solutionCount?: number;
    randomSeed?: number;
    runs?: number;
  };

  levelConstraints?: {
    minLevel?: number;
    maxLevel?: number;
  };

  itemFilters?: {
    excludeItems?: number[];
    excludeItemTypes?: EnumWakfuItemType[];
    excludeRarities?: EnumWakfuRarity[];
  };
};

export type TBuildCandidateEquipment = {
  [K in EnumWakfuEquipmentPosition]?: WakfuItem | null;
};

export type TBuildOptimizationResult = {
  equipment: TBuildCandidateEquipment;
  score: number;
  valid: boolean;
  meetsObjectives: boolean;
  penalties: number;
  violations: string[];
};

export type TOptimizationProgress = {
  currentIteration: number;
  totalIterations: number;
  bestScore: number;
  validSolutionsFound: number;
  startTime: number;
  elapsedTime: number;
};

export type TOptimizationProgressCallback = (progress: TOptimizationProgress) => void;

export const DEFAULT_ALGORITHM_PARAMS = {
  maxIterations: 4000,
  neighborsPerIteration: 40,
  acceptanceThreshold: 0.02,
  tabuListSize: 400,
  solutionCount: 5,
  runs: 4,
} as const;

export enum EnumStatConstraintType {
  MinBlocking = "min_blocking",
  MaxBlocking = "max_blocking",
  Objective = "objective",
}
