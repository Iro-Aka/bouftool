import { useReducer } from "react";
import type { WakfuStats } from "src/wakfu/types/action";
import { searchItemsPreferencesReducer } from "./reducer";

export type TSearchItemsPreferences = {
  mastery: {
    elementsPriority: (
      | WakfuStats.MasteryFire
      | WakfuStats.MasteryEarth
      | WakfuStats.MasteryWater
      | WakfuStats.MasteryAir
    )[];
    meleeRangeMastery: WakfuStats.MeleeMastery | WakfuStats.DistanceMastery | null;
    subMasteries: (
      | WakfuStats.CriticalMastery
      | WakfuStats.BackMastery
      | WakfuStats.BerserkMastery
      | WakfuStats.HealingMastery
    )[];
  };
  resistance: {
    elementsPriority: (
      | WakfuStats.ResistanceFire
      | WakfuStats.ResistanceEarth
      | WakfuStats.ResistanceWater
      | WakfuStats.ResistanceAir
    )[];
  };
};

const defaultPreferences: TSearchItemsPreferences = {
  mastery: {
    elementsPriority: [],
    meleeRangeMastery: null,
    subMasteries: [],
  },
  resistance: {
    elementsPriority: [],
  },
};

export const useSearchItemsPreferences = () => {
  const [preferences, dispatchPreferences] = useReducer(searchItemsPreferencesReducer, defaultPreferences);

  return {
    preferences,
    dispatchPreferences,
  };
};
