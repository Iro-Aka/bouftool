import { useCallback, useEffect, useState } from "react";
import type { ElectronEvents, ElectronEventsMain, ElectronEventsRenderer } from "src/electron/types";

export const useElectronEvent = <E extends ElectronEvents>(event: E) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ElectronEventsRenderer[E] | null>(null);

  const send = useCallback(
    (payload: ElectronEventsMain[E]) => {
      setLoading(true);
      window.electron.send(event, payload);
    },
    [event],
  );

  useEffect(() => {
    const listener = window.electron.addListener(event, (payload) => {
      setLoading(false);
      setResponse(payload);
    });
    return () => window.electron.removeListener(event, listener);
  }, [event]);

  return [send, response, loading] as const;
};

export const useFilteredElectronEvent = <E extends ElectronEvents>(
  event: E,
  filter: (payload: ElectronEventsRenderer[E]) => boolean,
) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ElectronEventsRenderer[E] | null>(null);

  const send = useCallback(
    (payload: ElectronEventsMain[E]) => {
      setLoading(true);
      window.electron.send(event, payload);
    },
    [event],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: Avoid depending on callback
  useEffect(() => {
    const listener = window.electron.addListener(event, (payload) => {
      if (payload && !filter(payload)) {
        return;
      }
      setLoading(false);
      setResponse(payload);
    });
    return () => window.electron.removeListener(event, listener);
  }, [event]);

  return [send, response, loading] as const;
};

export const sendElectronEvent = <E extends ElectronEvents>(event: E, payload: ElectronEventsMain[E]) =>
  new Promise<ElectronEventsRenderer[E]>((resolve) => {
    const listener = window.electron.addListener(event, (response) => {
      resolve(response);
      window.electron.removeListener(event, listener);
    });
    window.electron.send(event, payload);
  });
