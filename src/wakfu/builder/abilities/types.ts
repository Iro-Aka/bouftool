import { isNumber, isObject } from "src/types/utils";
import { type EnumAbilities, isEnumAbilities } from "src/wakfu/types/ability";

export type TWakfuAbilities = Partial<Record<EnumAbilities, number>>;

export const isWakfuAbilities = (json: unknown): json is TWakfuAbilities => {
  if (!isObject(json)) {
    console.warn("Invalid JSON: Not an object");
    return false;
  }
  for (const key in json) {
    if (!isEnumAbilities(key)) {
      console.warn(`Invalid JSON: ${key} is not a valid EnumAbilities`);
      return false;
    }
    if (!isNumber((json as Record<EnumAbilities, unknown>)[key])) {
      console.warn(`Invalid JSON: ${key} is not a number`);
      return false;
    }
  }
  return true;
};
