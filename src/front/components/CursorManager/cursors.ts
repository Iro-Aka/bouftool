export const AvailableCursors = {
  EnchantmentRedFull: "wakfu/enchantments/shardRedFull.png",
  EnchantmentBlueFull: "wakfu/enchantments/shardBlueFull.png",
  EnchantmentGreenFull: "wakfu/enchantments/shardGreenFull.png",
} as const satisfies Record<string, string>;

export type TAvailableCursor = keyof typeof AvailableCursors;
