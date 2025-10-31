import fs from "node:fs/promises";
import path from "node:path";
import Ajv, { type ValidateFunction } from "ajv";
import { isArray } from "src/types/utils";
import { WakfuGamedataSchemas } from "../resolvers";
import type { EnumWakfuGamedataType, TPickWakfuGamedata, TWakfuGamedataTypes } from "../types";

export class WakfuFile<GamedataTypes extends readonly EnumWakfuGamedataType[]> {
  private static readonly FolderPath = "gamedata";
  private validators: Map<GamedataTypes[number], ValidateFunction>;

  constructor(...gamedataTypes: GamedataTypes) {
    this.validators = new Map();
    const ajvInstance = new Ajv();
    for (const gdType of gamedataTypes) {
      this.validators.set(gdType, ajvInstance.compile(WakfuGamedataSchemas[gdType]));
    }
  }

  private async readData(path: string) {
    try {
      const data = await fs.readFile(path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading data:", error);
    }
  }

  private async readVersion(): Promise<string> {
    const data = await this.readData(`${WakfuFile.FolderPath}/version.json`);
    if (data && typeof data === "object" && "version" in data && typeof data.version === "string") {
      return data.version;
    } else {
      throw new Error("Invalid version data");
    }
  }

  private async readGamedataByType<Type extends GamedataTypes[number]>(
    type: Type,
  ): Promise<TWakfuGamedataTypes[Type][]> {
    const filePath = path.join(WakfuFile.FolderPath, `${type}.json`);
    const data = await this.readData(filePath);
    const validator = this.validators.get(type);
    if (!validator) {
      throw new Error(`No validator found for type ${type}`);
    }
    if (isArray(data) && data.every((item) => validator(item))) {
      return data as TWakfuGamedataTypes[Type][];
    } else {
      throw new Error(`Invalid data for ${type}`);
    }
  }

  public async getGamedata(): Promise<{
    version: string;
    gamedata: TPickWakfuGamedata<GamedataTypes>;
  }> {
    const version = await this.readVersion();
    const gamedata = {} as TPickWakfuGamedata<GamedataTypes>;
    for (const gdType of this.validators.keys()) {
      gamedata[gdType] = await this.readGamedataByType(gdType);
    }
    return {
      version,
      gamedata,
    };
  }

  public async saveGamedata(version: string, gamedata: TPickWakfuGamedata<GamedataTypes>) {
    await fs.mkdir(WakfuFile.FolderPath, { recursive: true });
    await fs.writeFile(`${WakfuFile.FolderPath}/version.json`, JSON.stringify({ version }, null, 2), {
      encoding: "utf-8",
    });
    for (const [type, data] of Object.entries(gamedata)) {
      await fs.writeFile(path.join(WakfuFile.FolderPath, `${type}.json`), JSON.stringify(data, null, 2), {
        encoding: "utf-8",
      });
    }
  }
}
