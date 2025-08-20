import { BrowserWindow, ipcMain } from "electron";
import type { ElectronEvents, ElectronEventsMain, ElectronEventsRenderer } from "../types";

type EventReply<E extends ElectronEvents> = (payload: ElectronEventsRenderer[E]) => void;
type EventCallback<E extends ElectronEvents> = (reply: EventReply<E>, payload: ElectronEventsMain[E]) => void;

export class ElectronEventManager {
  static send<E extends ElectronEvents>(event: E, payload: ElectronEventsRenderer[E]): void {
    const win = BrowserWindow.getAllWindows()[0];
    if (win) {
      win.webContents.send(event, payload);
    }
  }

  public register<E extends ElectronEvents>(event: E, callback: EventCallback<E>): void {
    console.log("registering event:", event);
    ipcMain.handle(event, (evt, payload: ElectronEventsMain[E]) => {
      console.log("event received:", event, payload);
      console.time(`Event: ${event}`);
      callback((payload: ElectronEventsRenderer[E]) => {
        evt.sender.send(event, payload);
      }, payload);
      console.timeEnd(`Event: ${event}`);
    });
  }
}
