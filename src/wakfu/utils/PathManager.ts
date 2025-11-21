import path from "node:path";
import { app } from "electron";

let baseDir: string | null = null;

export function initializePathManager() {
  if (import.meta.env.VITE_PORTABLE_BUILD !== "true") {
    baseDir = app.getPath("userData");
  } else {
    baseDir = "";
  }
}

export function getBasePath(): string {
  if (baseDir === null) {
    throw new Error("PathManager not initialized. Call initializePathManager() first.");
  }
  return baseDir;
}

export function resolvePath(...paths: string[]): string {
  const base = getBasePath();
  if (base) {
    return path.join(base, ...paths);
  }
  return path.join(...paths);
}
