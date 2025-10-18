import type { WakfuBuild } from "../../builds/build";
import type { WakfuItem } from "../../items";
import { EnumWakfuEquipmentPosition, EnumWakfuItemType } from "../../itemTypes/types";
import { WakfuStore } from "../../store";
import { BuildCandidate } from "../BuildCandidate";
import type { ConstraintManager } from "../constraints/ConstraintManager";
import type {
  TBuildOptimizationConfig,
  TBuildOptimizationResult,
  TOptimizationProgress,
  TOptimizationProgressCallback,
} from "../types";
import { DEFAULT_ALGORITHM_PARAMS } from "../types";
import { SeededRandom } from "../utils/SeededRandom";

export class RandomizedLocalSearch {
  private readonly config: TBuildOptimizationConfig;
  private readonly constraintManager: ConstraintManager;
  private readonly build: WakfuBuild;
  private readonly store: WakfuStore;
  private readonly random: SeededRandom;

  private tabuList: Set<string> = new Set();

  private availableItemsByPosition: Map<EnumWakfuEquipmentPosition, WakfuItem[]> = new Map();

  constructor(build: WakfuBuild, config: TBuildOptimizationConfig, constraintManager: ConstraintManager) {
    this.build = build;
    this.config = config;
    this.constraintManager = constraintManager;
    this.store = WakfuStore.getInstance();
    this.random = new SeededRandom(config.algorithm?.randomSeed);
    this.initializeAvailableItems();
  }

  private createInitialCandidate(): BuildCandidate {
    const preserveConfig = this.config.preserveEquipment;

    if (preserveConfig?.keepAll) {
      return BuildCandidate.fromBuild(this.build, this.config.statWeights);
    }

    if (preserveConfig?.keepSlots && preserveConfig.keepSlots.length > 0) {
      return BuildCandidate.fromBuildPartial(this.build, this.config.statWeights, preserveConfig.keepSlots);
    }

    return BuildCandidate.empty(this.build, this.config.statWeights);
  }

  // private createGreedyInitialCandidate(): BuildCandidate {
  //   const itemScorer = new ItemScorer(this.config.statWeights, this.config.elementalPreferences);
  //   const candidate = BuildCandidate.empty(this.build, this.config.statWeights);

  //   const scoredItemsByPosition = new Map<EnumWakfuEquipmentPosition, Array<{ item: WakfuItem; score: number }>>();

  //   for (const [position, items] of this.availableItemsByPosition.entries()) {
  //     if (this.shouldPreserveSlot(position)) {
  //       const currentItem = this.build.getEquippedItem(position);
  //       if (currentItem) {
  //         candidate.equipItem(position, currentItem);
  //       }
  //       continue;
  //     }

  //     const scoredItems = itemScorer.scoreItems(items);

  //     scoredItems.sort((a, b) => b.score - a.score);
  //     scoredItemsByPosition.set(position, scoredItems);
  //   }

  //   for (const [position, scoredItems] of scoredItemsByPosition.entries()) {
  //     if (scoredItems.length > 0) {
  //       const bestItem = scoredItems[0].item;
  //       candidate.equipItem(position, bestItem);
  //     }
  //   }

  //   return candidate;
  // }

  private initializeAvailableItems(): void {
    const buildLevel = this.build.getLevel();
    const minLevel = this.config.levelConstraints?.minLevel ?? 0;
    const maxLevel = this.config.levelConstraints?.maxLevel ?? buildLevel;
    const excludeItems = new Set(this.config.itemFilters?.excludeItems ?? []);
    const excludeItemTypes = new Set(this.config.itemFilters?.excludeItemTypes ?? []).add(EnumWakfuItemType.Mount);
    const excludeRarities = new Set(this.config.itemFilters?.excludeRarities ?? []);

    for (const position of Object.values(EnumWakfuEquipmentPosition)) {
      const items = this.store.getItems((item) => {
        const itemType = item.getItemType().getId();
        const isPet = itemType === EnumWakfuItemType.Pet;

        if (!isPet && (item.getLevel() < minLevel || item.getLevel() > maxLevel)) {
          return false;
        }

        if (!item.getItemType().getEquipmentPositions().includes(position)) {
          return false;
        }

        if (excludeItems.has(item.getId())) {
          return false;
        }
        if (excludeItemTypes.has(item.getItemType().getId())) {
          return false;
        }
        if (!isPet && excludeRarities.has(item.getRarity())) {
          return false;
        }

        return true;
      });

      this.availableItemsByPosition.set(position, items);
    }
  }

  public optimize(progressCallback?: TOptimizationProgressCallback): TBuildOptimizationResult[] {
    const maxIterations = this.config.algorithm?.maxIterations ?? DEFAULT_ALGORITHM_PARAMS.maxIterations;
    const solutionCount = this.config.algorithm?.solutionCount ?? DEFAULT_ALGORITHM_PARAMS.solutionCount;

    console.log("Initial candidate creation");
    const initialCandidate = this.createInitialCandidate();
    console.log("Initial candidate score:", initialCandidate.getScore());
    let currentCandidate = initialCandidate;

    const topSolutions: BuildCandidate[] = [initialCandidate];

    const startTime = Date.now();

    for (let iteration = 0; iteration < maxIterations; iteration++) {
      const neighbors = this.generateNeighbors(currentCandidate);

      let bestNeighbor: BuildCandidate | null = null;
      let bestNeighborScore = -Infinity;

      for (const neighbor of neighbors) {
        const hash = neighbor.getHash();
        if (this.tabuList.has(hash)) {
          continue;
        }

        const evaluation = neighbor.evaluate(this.constraintManager);

        if (!evaluation.valid) {
          continue;
        }

        const score = evaluation.score;

        if (score > bestNeighborScore) {
          bestNeighbor = neighbor;
          bestNeighborScore = score;
        }
      }

      if (bestNeighbor) {
        const acceptanceThreshold =
          this.config.algorithm?.acceptanceThreshold ?? DEFAULT_ALGORITHM_PARAMS.acceptanceThreshold;
        const currentScore = currentCandidate.getScore();

        if (bestNeighborScore > currentScore || this.random.random() < acceptanceThreshold) {
          currentCandidate = bestNeighbor;

          this.addToTabuList(currentCandidate.getHash());

          this.updateTopSolutions(topSolutions, currentCandidate, solutionCount);
        }
      }

      if (progressCallback) {
        const progress: TOptimizationProgress = {
          currentIteration: iteration + 1,
          totalIterations: maxIterations,
          bestScore: topSolutions[0]?.getScore() ?? 0,
          validSolutionsFound: topSolutions.length,
          startTime,
          elapsedTime: Date.now() - startTime,
        };
        progressCallback(progress);
      }
    }

    const results = topSolutions.map((candidate) => candidate.evaluate(this.constraintManager));
    return results.sort((a, b) => b.score - a.score);
  }

  private generateNeighbors(candidate: BuildCandidate): BuildCandidate[] {
    const neighbors: BuildCandidate[] = [];
    const neighborsCount =
      this.config.algorithm?.neighborsPerIteration ?? DEFAULT_ALGORITHM_PARAMS.neighborsPerIteration;

    const positions = Object.values(EnumWakfuEquipmentPosition);

    for (let i = 0; i < neighborsCount; i++) {
      const neighbor = candidate.clone();

      const modificationsCount = this.random.randomInt(1, 4);

      for (let j = 0; j < modificationsCount; j++) {
        const position = this.random.randomChoice(positions);

        if (this.shouldPreserveSlot(position)) {
          continue;
        }

        const availableItems = this.availableItemsByPosition.get(position) || [];
        if (availableItems.length > 0) {
          const randomItem = this.random.randomChoice(availableItems);
          neighbor.equipItem(position, randomItem);
        } else {
          neighbor.equipItem(position, null);
        }
      }

      neighbors.push(neighbor);
    }

    return neighbors;
  }

  private shouldPreserveSlot(position: EnumWakfuEquipmentPosition): boolean {
    const preserveConfig = this.config.preserveEquipment;

    if (!preserveConfig) {
      return false;
    }

    if (preserveConfig.keepAll) {
      return true;
    }

    if (preserveConfig.keepSlots?.includes(position)) {
      return true;
    }

    return false;
  }

  private addToTabuList(hash: string): void {
    const tabuSize = this.config.algorithm?.tabuListSize ?? DEFAULT_ALGORITHM_PARAMS.tabuListSize;

    this.tabuList.add(hash);

    if (this.tabuList.size > tabuSize) {
      const firstKey = this.tabuList.values().next().value;
      if (firstKey) {
        this.tabuList.delete(firstKey);
      }
    }
  }

  private updateTopSolutions(topSolutions: BuildCandidate[], candidate: BuildCandidate, maxCount: number): void {
    if (topSolutions.some((s) => s.equals(candidate))) {
      return;
    }

    topSolutions.push(candidate);

    topSolutions.sort((a, b) => b.getScore() - a.getScore());

    if (topSolutions.length > maxCount) {
      topSolutions.splice(maxCount);
    }
  }
}
