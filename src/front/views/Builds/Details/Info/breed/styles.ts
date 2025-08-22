import { ButtonBase, styled } from "@mui/material";

const Prefix = "BuildDetailsBreed";

export const buildDetailsBreedClasses = {
  root: `${Prefix}-root`,
};

export const BuildDetailsBreedRoot = styled(ButtonBase)(({ theme }) => ({
  [`&.${buildDetailsBreedClasses.root}`]: {
    position: "relative",
    border: `1px solid ${theme.palette.border.light}`,
    borderRadius: "8px",
    overflow: "hidden",
    "&:hover:after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: theme.palette.action.hover,
    },
  },
}));
