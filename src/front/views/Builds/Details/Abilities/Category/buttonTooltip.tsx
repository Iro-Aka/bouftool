import { Stack, Typography } from "@mui/material";

export type TAbilitiesCategoryButtonTooltipProps = {
  type: "add" | "remove";
};

export const AbilitiesCategoryButtonTooltip = ({ type }: TAbilitiesCategoryButtonTooltipProps) => {
  return (
    <Stack>
      {type === "add" && (
        <>
          <Typography variant="caption">Ajouter 1 point</Typography>
          <Typography variant="caption">Shift: Ajouter 10 points</Typography>
          <Typography variant="caption">Alt: Ajouter le nombre maximum de points</Typography>
        </>
      )}
      {type === "remove" && (
        <>
          <Typography variant="caption">Retirer 1 point</Typography>
          <Typography variant="caption">Shift: Retirer 10 points</Typography>
          <Typography variant="caption">Alt: Retirer tous les points</Typography>
        </>
      )}
    </Stack>
  );
};
