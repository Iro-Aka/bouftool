import { useCallback, useRef } from "react";

// biome-ignore lint/suspicious/noExplicitAny: Generic function
export const useStableCallback = <T extends (...args: any[]) => any>(callback: T) => {
  const ref = useRef(callback);
  ref.current = callback;
  return useCallback((...args: Parameters<T>): ReturnType<T> => {
    return ref.current(...args);
  }, []);
};
