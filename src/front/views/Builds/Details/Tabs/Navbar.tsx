import { Button, buttonClasses, Typography } from "@mui/material";
import { StackRow } from "src/front/components/Layout/StackRow";
import { EnumBuildDetailsTabs } from "./index";

export type TBuildDetailsNavbarProps = {
  selectedTab: EnumBuildDetailsTabs;
  onTabChange: (tab: EnumBuildDetailsTabs) => void;
};

export const BuildDetailsNavbar = ({ selectedTab, onTabChange }: TBuildDetailsNavbarProps) => {
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
          <Button
            variant="text"
            color="inherit"
            className={selectedTab === EnumBuildDetailsTabs.Equipments ? "Mui-selected" : undefined}
            onClick={() => onTabChange(EnumBuildDetailsTabs.Equipments)}
          >
            <Typography variant="subtitle2" sx={{ textTransform: "none" }}>
              Equipements
            </Typography>
          </Button>
          <Button
            variant="text"
            color="inherit"
            className={selectedTab === EnumBuildDetailsTabs.Abilities ? "Mui-selected" : undefined}
            onClick={() => onTabChange(EnumBuildDetailsTabs.Abilities)}
          >
            <Typography variant="subtitle2" sx={{ textTransform: "none" }}>
              Aptitudes
            </Typography>
          </Button>
          {/* <Button
            variant="text"
            color="inherit"
            className={selectedTab === EnumBuildDetailsTabs.Optimizer ? "Mui-selected" : undefined}
            onClick={() => onTabChange(EnumBuildDetailsTabs.Optimizer)}
          >
            <Typography variant="subtitle2" sx={{ textTransform: "none" }}>
              Optimiseur
            </Typography>
          </Button> */}
        </StackRow>
      </StackRow>
    </StackRow>
  );
};
