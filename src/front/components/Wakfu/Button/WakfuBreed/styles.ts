import { ButtonBase, styled } from "@mui/material";

const Prefix = "WakfuBreedButton";

export const buttonWakfuBreedClasses = {
  root: `${Prefix}-root`,
  breedFace: `${Prefix}-breedFace`,
};

export const ButtonWakfuBreedRoot = styled(ButtonBase)(({ theme }) => ({
  [`&.${buttonWakfuBreedClasses.root}`]: {
    position: "relative",
    border: `1px solid ${theme.palette.border.light}`,
    borderRadius: "8px",
    overflow: "hidden",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.075)",
    },
    "&:hover:after": {
      position: "absolute",
      content: '""',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-selected": {
      boxShadow: theme.palette.mode === "light" ? `0 0 0 1px black` : `0 0 0 1px white`,
      "&:after": {
        position: "absolute",
        content: '""',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme.palette.action.selected,
      },
    },
    [`& .${buttonWakfuBreedClasses.breedFace}`]: {
      width: "100%",
      height: "100%",
    },
  },
}));
