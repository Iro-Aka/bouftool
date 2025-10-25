import { useCallback, useEffect, useRef, useState } from "react";
import type { ElectronEvents, ElectronEventsMain, ElectronEventsRenderer } from "src/electron/types";

export type SendElectronEvent<E extends ElectronEvents> = (
  args: ElectronEventsMain[E],
) => Promise<ElectronEventsRenderer[E]>;

// biome-ignore lint/suspicious/noExplicitAny: Generic record
const ElectronPendingRequests: Record<string, (value: any) => void> = {};

export const useElectronEvent = <E extends ElectronEvents>(event: E, global = false) => {
  const currentPendingRequest = useRef<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ElectronEventsRenderer[E] | null>(null);

  const send = useCallback(
    (payload: ElectronEventsMain[E]) => {
      setLoading(true);
      const id = crypto.randomUUID();
      currentPendingRequest.current = id;
      return new Promise<ElectronEventsRenderer[E]>((resolve) => {
        ElectronPendingRequests[id] = resolve;
        window.electron.send(event, { id, payload });
      });
    },
    [event],
  );

  useEffect(() => {
    const listener = window.electron.addListener(event, (pkg) => {
      if (pkg.id === null) {
        setResponse(pkg.payload);
      } else if (global || pkg.id === currentPendingRequest.current) {
        setLoading(false);
        setResponse(pkg.payload);
      }
      const resolve = pkg.id ? ElectronPendingRequests[pkg.id] : null;
      if (resolve) {
        resolve(pkg.payload);
        // biome-ignore lint/style/noNonNullAssertion: id is defined here
        delete ElectronPendingRequests[pkg.id!];
      }
    });
    return () => window.electron.removeListener(event, listener);
  }, [global, event]);

  return [send, response, loading] as const;
};

export const sendElectronEvent = <E extends ElectronEvents>(event: E, payload: ElectronEventsMain[E]) =>
  new Promise<ElectronEventsRenderer[E]>((resolve) => {
    const id = crypto.randomUUID();
    const listener = window.electron.addListener(event, (response) => {
      if (response.id === id) {
        resolve(response.payload);
        window.electron.removeListener(event, listener);
      }
    });
    window.electron.send(event, { id, payload });
  });
