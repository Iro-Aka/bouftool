import { Button, buttonClasses, Typography } from "@mui/material";
import { StackRow } from "src/front/components/Layout/StackRow";

export const BuildDetailsNavbar = () => {
  return (
    <StackRow
      sx={{
        flex: "0 0 auto",
        gap: 1,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        justifyContent: "space-between",
      }}
    >
      <StackRow>
        <StackRow sx={{ gap: "0 !important", [`& .${buttonClasses.root}`]: { borderRadius: 0 } }}>
          <Button variant="text" color="inherit" className="Mui-selected">
            <Typography variant="subtitle2" sx={{ textTransform: "none" }}>
              Equipements
            </Typography>
          </Button>
        </StackRow>
      </StackRow>
    </StackRow>
  );
};
