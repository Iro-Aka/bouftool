import { Stack, TextField, Typography } from "@mui/material";
import { SelectBreed } from "./breed";

export const CreateBuild = () => {
  return (
    <Stack sx={{ flex: 1, alignItems: "center", p: 2 }}>
      <Stack sx={{ flex: "0 1 400px", bgcolor: "surface.100", borderRadius: 2, p: 2, gap: 1 }}>
        <Typography variant="subtitle2">Nouveau Build</Typography>
        <TextField label="Nom du build" size="small" />
        <SelectBreed />
      </Stack>
    </Stack>
  );
};
