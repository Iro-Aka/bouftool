import type { JSONSchema } from "json-schema-to-ts";
import { EnumWakfuEnchantmentColor } from "src/wakfu/enchantment/types";
import { WakfuI18nSchema } from "./i18n";

const WakfuEffectSchema = {
  type: "object",
  properties: {
    effect: {
      type: "object",
      properties: {
        definition: {
          type: "object",
          properties: {
            id: { type: "number" },
            actionId: { type: "number" },
            areaShape: { type: "number" },
            areaSize: {
              type: "array",
              items: { type: "number" },
            },
            params: {
              type: "array",
              items: { type: "number" },
            },
          },
          required: ["id", "actionId", "areaShape", "areaSize", "params"],
        },
        description: WakfuI18nSchema,
      },
      required: ["definition"],
    },
  },
  required: ["effect"],
} as const satisfies JSONSchema;

const WakfuItemEffectSchema = {
  type: "object",
  properties: {
    ...WakfuEffectSchema.properties,
    subEffects: {
      type: "array",
      items: WakfuEffectSchema,
    },
  },
  required: ["effect"],
} as const satisfies JSONSchema;

export const WakfuItemSchema = {
  type: "object",
  properties: {
    definition: {
      type: "object",
      properties: {
        item: {
          type: "object",
          properties: {
            id: { type: "number" },
            level: { type: "number" },
            baseParameters: {
              type: "object",
              properties: {
                itemTypeId: { type: "number" },
                itemSetId: { type: "number" },
                rarity: { type: "number" },
                bindType: { type: "number" },
                minimumShardSlotNumber: { type: "number" },
                maximumShardSlotNumber: { type: "number" },
              },
              required: [
                "itemTypeId",
                "itemSetId",
                "rarity",
                "bindType",
                "minimumShardSlotNumber",
                "maximumShardSlotNumber",
              ],
            },
            useParameters: {
              type: "object",
              properties: {
                useCostAp: { type: "number" },
                useCostMp: { type: "number" },
                useCostWp: { type: "number" },
                useRangeMin: { type: "number" },
                useRangeMax: { type: "number" },
                useTestFreeCell: { type: "boolean" },
                useTestLos: { type: "boolean" },
                useTestOnlyLine: { type: "boolean" },
                useTestNoBorderCell: { type: "boolean" },
                useWorldTarget: { type: "number" },
              },
              required: [
                "useCostAp",
                "useCostMp",
                "useCostWp",
                "useRangeMin",
                "useRangeMax",
                "useTestFreeCell",
                "useTestLos",
                "useTestOnlyLine",
                "useTestNoBorderCell",
                "useWorldTarget",
              ],
            },
            graphicParameters: {
              type: "object",
              properties: {
                gfxId: { type: "number" },
                femaleGfxId: { type: "number" },
              },
              required: ["gfxId", "femaleGfxId"],
            },
            shardsParameters: {
              type: "object",
              properties: {
                color: { type: "number" },
                doubleBonusPosition: { type: "array", items: { type: "number" } },
                shardLevelingCurve: { type: "array", items: { type: "number" } },
                shardLevelRequirement: { type: "array", items: { type: "number" } },
              },
              required: ["color", "doubleBonusPosition", "shardLevelingCurve", "shardLevelRequirement"],
            },
            sublimationParameters: {
              type: "object",
              properties: {
                slotColorPattern: {
                  type: "array",
                  items: {
                    type: "number",
                    enum: Object.values(EnumWakfuEnchantmentColor).filter((v) => typeof v === "number"),
                  },
                  maxItems: 3,
                },
                isEpic: { type: "boolean" },
                isRelic: { type: "boolean" },
              },
              required: ["slotColorPattern", "isEpic", "isRelic"],
            },
            properties: {
              type: "array",
              items: { type: "number" },
            },
          },
          required: ["id", "level", "baseParameters", "useParameters", "graphicParameters", "properties"],
        },
        useEffects: {
          type: "array",
          items: WakfuItemEffectSchema,
        },
        useCriticalEffects: {
          type: "array",
          items: WakfuItemEffectSchema,
        },
        equipEffects: {
          type: "array",
          items: WakfuItemEffectSchema,
        },
      },
      required: ["item", "useEffects", "useCriticalEffects", "equipEffects"],
    },
    title: WakfuI18nSchema,
    description: WakfuI18nSchema,
  },
  required: ["definition"],
} as const satisfies JSONSchema;
