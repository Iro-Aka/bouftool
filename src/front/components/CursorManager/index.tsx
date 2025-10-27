import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useStableCallback } from "src/front/hooks/useStableCallback";

const resizeCursorImage = (imageUrl: string, size: number = 32): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, size, size);
      resolve(canvas.toDataURL());
    };
    img.src = imageUrl;
  });
};

export type TCursorManagerContext = (cursorUrl: string | null) => Promise<void>;

const Context = createContext<TCursorManagerContext | undefined>(undefined);

export const useCursorManager = () => {
  const contextValue = useContext(Context);
  if (!contextValue) {
    throw new Error("useCursorManager must be used within a CursorManager");
  }
  return contextValue;
};

export type TCursorManagerProps = {
  children: React.ReactNode;
};

export const CursorManager = ({ children }: TCursorManagerProps) => {
  const styleElementRef = useRef<HTMLStyleElement | null>(null);
  const [currentCursor, setCurrentCursor] = useState<string | null>(null);

  const setCursor = useStableCallback(async (cursorUrl: string | null) => {
    if (cursorUrl === null) {
      setCurrentCursor(null);
    } else {
      const resizedCursor = await resizeCursorImage(cursorUrl, 24);
      setCurrentCursor(`url('${resizedCursor}') 12 12, auto`);
    }
  });

  useEffect(() => {
    if (styleElementRef.current) {
      if (currentCursor) {
        styleElementRef.current.textContent = `
          body * {
            cursor: ${currentCursor} !important;
          };
          body *:hover {
            cursor: ${currentCursor} !important;
          };
        `;
      } else {
        styleElementRef.current.textContent = "";
      }
    }
  }, [currentCursor]);

  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.setAttribute("type", "text/css");
    document.head.appendChild(styleElement);
    styleElementRef.current = styleElement;
    return () => {
      styleElementRef.current = null;
      styleElement.remove();
    };
  }, []);

  return <Context.Provider value={setCursor}>{children}</Context.Provider>;
};
