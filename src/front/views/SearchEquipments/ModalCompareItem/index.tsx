import { Button, Dialog, DialogActions, DialogContent, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { ElectronEvents } from "src/electron/types";
import { useElectronEvent } from "src/front/hooks/electron";
import { ModalCompareItemCard } from "./card";

export const ModalCompareItem = () => {
  const [, results] = useElectronEvent(ElectronEvents.BuildCompareItem);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (results) {
      setOpen(true);
    }
  }, [results]);

  if (!results) {
    return null;
  }
  return (
    <Dialog open={open} onClose={() => setOpen(false)} slotProps={{ paper: { sx: { width: 600, maxWidth: "100%" } } }}>
      <DialogContent sx={{ overflowY: "auto", overflowX: "hidden" }}>
        <Stack sx={{ gap: 1.5 }}>
          {results.map((result, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <ModalCompareItemCard key={index} results={result} />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="push" onClick={() => setOpen(false)}>
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};
