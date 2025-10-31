import Ajv, { type ValidateFunction } from "ajv";
import { isArray } from "src/types/utils";
import { WakfuGamedataSchemas } from "../resolvers";
import type { EnumWakfuGamedataType, TPickWakfuGamedata, TWakfuGamedataTypes } from "../types";

export class WakfuAPI<GamedataTypes extends EnumWakfuGamedataType[]> {
  private static readonly VersionUrl = "https://wakfu.cdn.ankama.com/gamedata/config.json";
  private static readonly GamedataUrl = "https://wakfu.cdn.ankama.com/gamedata/{version}/{type}.json";
  private validators: Map<GamedataTypes[number], ValidateFunction>;

  constructor(...gamedataTypes: GamedataTypes) {
    this.validators = new Map();
    const ajvInstance = new Ajv();
    for (const gdType of gamedataTypes) {
      this.validators.set(gdType, ajvInstance.compile(WakfuGamedataSchemas[gdType]));
    }
  }

  private static async fetchData(url: string) {
    try {
      const response = await fetch(url);
      return response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  public static async fetchVersion(): Promise<string> {
    const data = await WakfuAPI.fetchData(WakfuAPI.VersionUrl);
    if (data && typeof data === "object" && "version" in data && typeof data.version === "string") {
      return data.version;
    } else {
      throw new Error("Invalid version data");
    }
  }

  private async fetchGamedataByType<Type extends GamedataTypes[number]>(
    type: Type,
    version: string,
  ): Promise<TWakfuGamedataTypes[Type][]> {
    const url = WakfuAPI.GamedataUrl.replace("{version}", version).replace("{type}", type);
    const data = await WakfuAPI.fetchData(url);
    const validator = this.validators.get(type);
    if (!validator) {
      throw new Error(`No validator found for type ${type}`);
    }
    if (
      isArray(data) &&
      data.every((item) => {
        const v = validator(item);
        if (!v) {
          console.error("Validation errors for item:", item, validator.errors);
        }
        return v;
      })
    ) {
      return data as TWakfuGamedataTypes[Type][];
    } else {
      throw new Error(`Invalid data for ${type}`);
    }
  }

  public async getGamedata(): Promise<{
    version: string;
    gamedata: TPickWakfuGamedata<GamedataTypes>;
  }> {
    const version = await WakfuAPI.fetchVersion();
    const gamedata = {} as TPickWakfuGamedata<GamedataTypes>;
    for (const gdType of this.validators.keys()) {
      gamedata[gdType] = await this.fetchGamedataByType(gdType, version);
    }
    return {
      version,
      gamedata,
    };
  }
}
