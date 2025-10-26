import { styled } from "@mui/material";

const Prefix = "BuildEnchantment";

export const buildEnchantmentClasses = {
  root: `${Prefix}-root`,
  equipments: `${Prefix}-equipments`,
  equipmentsRow: `${Prefix}-equipmentsRow`,
};

export const BuildEnchantmentRoot = styled("div")(({ theme }) => ({
  [`&.${buildEnchantmentClasses.root}`]: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-evenly",
    padding: theme.spacing(2),
    gap: theme.spacing(2),
    overflow: "hidden",
  },
}));
