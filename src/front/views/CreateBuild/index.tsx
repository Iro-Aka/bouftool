import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { StackRow } from "src/front/components/Layout/StackRow";
import type { WakfuBreed } from "src/wakfu/types/breed";
import { SelectBreed } from "./breed";

export const CreateBuild = () => {
  const [breed, setBreed] = useState<WakfuBreed | null>(null);

  return (
    <Stack sx={{ flex: 1, alignItems: "center", p: 2 }}>
      <Stack sx={{ flex: "0 1 400px", bgcolor: "surface.100", borderRadius: 2, p: 2, gap: 1 }}>
        <Typography variant="subtitle2">Nouveau Build</Typography>
        <StackRow sx={{ "&&": { alignItems: "stretch" } }}>
          <SelectBreed value={breed} onChange={setBreed} />
          <Stack sx={{ gap: 2 }}>
            <TextField label="Nom du build" size="small" />
            <TextField label="Niveau" size="small" />
          </Stack>
        </StackRow>
        <Button variant="push" sx={{ alignSelf: "center" }}>
          Créer
        </Button>
      </Stack>
    </Stack>
  );
};
