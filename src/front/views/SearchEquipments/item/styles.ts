import { styled } from "@mui/material";
import { RarityBorders } from "./constants";

const PREFIX = "ItemCard";

export const itemCardClasses = {
  root: `${PREFIX}-root`,
  shiny: `${PREFIX}-shiny`,
};

type ItemCardProps = {
  rarity: number;
};

export const ItemCard = styled("div", { shouldForwardProp: (prop) => prop !== "rarity" })<ItemCardProps>(
  ({ theme, rarity }) => ({
    [`&.${itemCardClasses.root}`]: {
      height: "100%",
      position: "relative",
      backgroundColor: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
      padding: theme.spacing(1, 1.5),
      gap: theme.spacing(1),
      borderImageSource: `url(wakfu/${RarityBorders[rarity]}.png)`,
      borderImageSlice: "26",
      borderImageWidth: "26px",
      borderImageOutset: "8px",
      borderImageRepeat: "round",
      [`& .${itemCardClasses.shiny}`]: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        background:
          "linear-gradient(120deg, \
            rgba(255,255,255,0) 40%,\
            rgba(255,255,255,0.10) 42%,\
            rgba(255,255,255,0.25) 44%,\
            rgba(255,255,255,0.35) 46%,\
            rgba(255,255,255,0.40) 50%,\
            rgba(255,255,255,0.35) 52%,\
            rgba(255,255,255,0.25) 54%,\
            rgba(255,255,255,0.10) 56%,\
            rgba(255,255,255,0) 60%\
          )",
        backgroundSize: "300% 100%",
        animation: "shiny-move 5.5s linear infinite",
        opacity: 0.5,
        "@keyframes shiny-move": {
          "0%": {
            backgroundPosition: "-150% 0",
          },
          "100%": {
            backgroundPosition: "150% 0",
          },
        },
      },
    },
  }),
);
