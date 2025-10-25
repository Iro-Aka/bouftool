import { Box } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";
import { AvailableCursors, type TAvailableCursor } from "./cursors";

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

export type TCursorManagerContext = (cursor: TAvailableCursor | null) => void;

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
  const [currentCursor, setCurrentCursor] = useState<TAvailableCursor | null>(null);
  const [loadedCursor, setLoadedCursor] = useState<string>("auto");

  useEffect(() => {
    if (currentCursor) {
      const cursorUrl = AvailableCursors[currentCursor];
      resizeCursorImage(cursorUrl, 24).then((resizedCursor) => {
        setLoadedCursor(`url('${resizedCursor}') 12 12, auto`);
      });
    } else {
      setLoadedCursor("auto");
    }
  }, [currentCursor]);

  return (
    <Context.Provider value={setCurrentCursor}>
      <Box
        {...(currentCursor && {
          sx: {
            cursor: `${loadedCursor} !important`,
            "& *": { cursor: `${loadedCursor} !important` },
            "& *:hover": { cursor: `${loadedCursor} !important` },
          },
        })}
      >
        {children}
      </Box>
    </Context.Provider>
  );
};
