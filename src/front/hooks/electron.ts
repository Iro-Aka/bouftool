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
    window.electron.receive(event, (payload) => {
      setLoading(false);
      setResponse(payload);
    });
  }, [event]);

  return [send, response, loading] as const;
};

export const sendElectronEvent = <E extends ElectronEvents>(event: E, payload: ElectronEventsMain[E]) =>
  new Promise<ElectronEventsRenderer[E]>((resolve) => {
    window.electron.send(event, payload);
    window.electron.receive(event, (response) => {
      resolve(response);
    });
  });
