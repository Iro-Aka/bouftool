import { AbilitiesCategories, type EnumAbilities, EnumAbilitiesCategories } from "../types/ability";

export const getAbilityCategory = (ability: EnumAbilities) => {
  for (const category of Object.values(EnumAbilitiesCategories)) {
    if (AbilitiesCategories[category].abilities.includes(ability)) {
      return category;
    }
  }
  return null;
};

export const getUsedAbilitiesPoints = (
  abilities: Partial<Record<EnumAbilities, number>>,
  category: EnumAbilitiesCategories,
) => {
  let points = 0;
  for (const ability of AbilitiesCategories[category].abilities) {
    points += abilities[ability] ?? 0;
  }
  return points;
};

export const getAbilitiesCategoryPoints = (category: EnumAbilitiesCategories, level: number) => {
  return Math.max(
    0,
    Math.floor(
      (level - AbilitiesCategories[category].firstPointLevel) / AbilitiesCategories[category].nextPointsEveryLevels,
    ) + 1,
  );
};

export const getCurrentAbilitiesCategoryPoints = (
  abilities: Partial<Record<EnumAbilities, number>>,
  category: EnumAbilitiesCategories,
  level: number,
) => {
  const availablePoints = getAbilitiesCategoryPoints(category, level);
  const usedPoints = getUsedAbilitiesPoints(abilities, category);
  return availablePoints - usedPoints;
};
