import { styled } from "@mui/material";
import { RarityBorders } from "./constants";

const Prefix = "CardItem";

export const cardItemClasses = {
  root: `${Prefix}-root`,
  header: `${Prefix}-header`,
  headerIcons: `${Prefix}-headerIcons`,
  content: `${Prefix}-content`,
  gfxAndActions: `${Prefix}-gfxAndActions`,
  gfx: `${Prefix}-gfx`,
  stats: `${Prefix}-stats`,
  statsRow: `${Prefix}-statsRow`,
  shiny: `${Prefix}-shiny`,
};

export const CardItemRoot = styled("div", { shouldForwardProp: (prop) => prop !== "rarity" })<{ rarity: number }>(
  ({ theme, rarity }) => ({
    [`&.${cardItemClasses.root}`]: {
      backgroundColor: theme.palette.surface[100],
      borderImageSource: `url(wakfu/${RarityBorders[rarity]}.png)`,
      borderImageSlice: "26",
      borderImageWidth: "26px",
      borderImageOutset: "8px",
      borderImageRepeat: "round",
      gap: theme.spacing(1),
      padding: theme.spacing(1, 1.5, 1.75),
      position: "relative",
    },
    [`& .${cardItemClasses.header}`]: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingBottom: theme.spacing(0.5),
    },
    [`& .${cardItemClasses.headerIcons}`]: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: theme.spacing(0.5),
    },
    [`& .${cardItemClasses.content}`]: {
      display: "flex",
      flexDirection: "row",
      gap: theme.spacing(1.5),
    },
    [`& .${cardItemClasses.gfxAndActions}`]: {
      display: "flex",
      flexDirection: "column",
      flex: "0 0 64px",
    },
    [`& .${cardItemClasses.gfx}`]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 64,
      height: 64,
      backgroundColor: theme.palette.surface[200],
      boxShadow: theme.palette.mode === "light" ? "inset 0 0 8px grey" : "inset 0 0 8px black",
      borderRadius: "8px",
    },
    [`& .${cardItemClasses.stats}`]: {
      flex: "1",
      display: "flex",
      flexDirection: "column",
    },
    [`& .${cardItemClasses.statsRow}`]: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing(0.5),
      padding: theme.spacing(0, 1),
      border: theme.palette.mode === "light" ? "1px solid rgba(0, 0, 0, 0.12)" : "1px solid rgba(255, 255, 255, 0.12)",
      borderTopWidth: 0,
      borderBottomWidth: 0,
      "&:first-of-type": {
        borderTopWidth: 1,
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
      },
      "&:last-of-type": {
        borderBottomWidth: 1,
        borderBottomLeftRadius: "8px",
        borderBottomRightRadius: "8px",
      },
      "&:nth-of-type(2n)": {
        backgroundColor: theme.palette.surface[250],
      },
      "&:nth-of-type(2n+1)": {
        backgroundColor: theme.palette.surface[150],
      },
    },
    [`& .${cardItemClasses.shiny}`]: {
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
  }),
);
