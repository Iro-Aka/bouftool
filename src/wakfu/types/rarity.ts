export enum Rarity {
  Old = 0,
  Uncommon = 1,
  Rare = 2,
  Mythic = 3,
  Legendary = 4,
  Relic = 5,
  Memory = 6,
  Epic = 7,
}

export const isRarity = (value: unknown): value is Rarity => {
  return typeof value === "number" && value in Rarity;
};
