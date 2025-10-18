import { WakfuStatIcons } from "../stats/icons";
import { EnumWakfuStat } from "../stats/types";
import { WakfuStatesDefinitions } from "./definitions";
import { EnumWakfuState, type TWakfuStateDefinition } from "./types";

const tagStatIcon = (stat: EnumWakfuStat) => `{icon ${WakfuStatIcons[stat]}}`;
const tagState = (state: EnumWakfuState) => `{state ${WakfuStatesDefinitions[state].id}}`;

export const WakfuStateDescriptions: Record<EnumWakfuState, string> = {
  [EnumWakfuState.EtoiEskeutula]: "À chaque début de tour, le porteur a 50% de chance de gagner ou de perdre un PA.",
  [EnumWakfuState.AuraDeLamour]: `Combat: 1% d'appliquer l'état ${tagState(EnumWakfuState.PeaceAndLove)} en recevant un coup.`,
  [EnumWakfuState.PeaceAndLove]: "Vole 100% des Dommages infligés.",
  [EnumWakfuState.LeDemiPayAime]: "+1 PM un tour sur deux.",
  [EnumWakfuState.EmblemeIop]: "",
  [EnumWakfuState.EmblemeCra]: "",
  [EnumWakfuState.EmblemeSacrieur]: "",
  [EnumWakfuState.EmblemeEcaflip]: "",
  [EnumWakfuState.EmblemeEniripsa]: "",
  [EnumWakfuState.EmblemeSadida]: "",
  [EnumWakfuState.EmblemeXelor]: "",
  [EnumWakfuState.EmblemeEnutrof]: "",
  [EnumWakfuState.EmblemeRoublard]: "",
  [EnumWakfuState.EmblemePandawa]: "",
  [EnumWakfuState.EmblemeFeca]: "",
  [EnumWakfuState.EmblemeOsamodas]: "",
  [EnumWakfuState.EmblemeSteamer]: "",
  [EnumWakfuState.EmblemeSram]: "",
  [EnumWakfuState.EmblemeZobal]: "",
  [EnumWakfuState.InsigneMerydes]: "",
  [EnumWakfuState.Muraille50]: "Lorsque PV inférieurs à 50%% :\n%d Résistance Élémentaire",
  [EnumWakfuState.Muraille75]: "Lorsque PV inférieurs à 75%% :\n%d Résistance Élémentaire",
  [EnumWakfuState.Vivacite90]: "Lorsque les PV sont supérieurs à 90%% :\n%d Maîtrise Élémentaire",
  [EnumWakfuState.Requinquage25]: "Lorsque les PV sont inférieurs à 25%%, en début de tour :\nSoin : %d",
  [EnumWakfuState.Requinquage33]: "Lorsque les PV sont inférieurs à 33%%, en début de tour :\nSoin : %d",
  [EnumWakfuState.Requinquage50]: "Lorsque les PV sont inférieurs à 50%%, en début de tour :\nSoin : %d",
  [EnumWakfuState.Requinquage66]: "Lorsque les PV sont inférieurs à 66%%, en début de tour :\nSoin : %d",
  [EnumWakfuState.Requinquage75]: "Lorsque les PV sont inférieurs à 75%%, en début de tour :\nSoin : %d",
  [EnumWakfuState.Berserk50]: "Lorsque les PV sont inférieurs à 50%% :\n%d Maîtrise Élémentaire",
  [EnumWakfuState.Berserk75]: "Lorsque les PV sont inférieurs à 75%% :\n%d Maîtrise Élémentaire",
  [EnumWakfuState.TransfertTellurique]: `En début de combat :\n
    Augmentation des Résistances ${tagStatIcon(EnumWakfuStat.FireMastery)}${tagStatIcon(EnumWakfuStat.WaterMastery)}${tagStatIcon(EnumWakfuStat.AirMastery)} de %d%% du total de la Résistance ${tagStatIcon(EnumWakfuStat.EarthMastery)}\n
    Perte de %d%% du total de la Résistance ${tagStatIcon(EnumWakfuStat.EarthMastery)}`,
  [EnumWakfuState.Rage]: "+%d Maîtrise pour 1% de PV manquants",
  [EnumWakfuState.Fortification]: "+%d Résistance Élémentaire pour 1% de PV manquants",
  [EnumWakfuState.PacteAnatharI]:
    "+5% Dommages infligés lorsque le porteur respecte certaines conditions (varient chaque tour).\nTour impair : Le porteur est à distance\nTour pair : Le porteur est en mêlée",
  [EnumWakfuState.PacteAnatharII]:
    "+5% Dommages infligés lorsque le porteur respecte certaines conditions (varient chaque tour).\nTour impair : Le sort est en zone\nTour pair : Le sort est monocible",
  [EnumWakfuState.PacteAnatharIII]:
    "Lorsque le porteur de l'état commence son tour avec 80% de ses PV ou plus :\n15% Soins réalisés\n15% Armure donnée\n-50 Résistance élémentaire",
  [EnumWakfuState.PacteAnatharIV]:
    "Lorsque le porteur de l'état commence son tour avec 80% de ses PV ou plus :\n1 Portée\n-40 Résistance élémentaire",
  [EnumWakfuState.PacteAnatharV]:
    "Lorsque le porteur de l'état commence son tour avec 80% de ses PV ou plus :\n10% Dommages infligés\n-50 Résistance élémentaire",
  [EnumWakfuState.Eternite]:
    "Au début de chaque tour du porteur de l'état, il gagne, par élément :\n-800 à un coup reçu ou +800 à un coup donné (1x par tour)",
  [EnumWakfuState.Dofushu]:
    "À chaque sort lancé, applique Dofushu :\nLes sorts lancés doivent coûter au moins 1PA\nSi le joueur finit son tour avec Dofushu au niveau 5 : 60 Résistance élémentaire",
  [EnumWakfuState.DofusIvoire]:
    "Au début de chaque tour du porteur de l'état, il gagne par élément :\n-200% du niveau à un coup reçu ou +200% du niveau à un coup donné (1x par tour)",
  [EnumWakfuState.DofusPrismatique]: "Accorde +2 PA un tour sur deux",
  [EnumWakfuState.DofusTurquoise]:
    "Pour chaque coup critique occasionnée :\n1% Dommages infligés et soins réalisés pendant 3 tours.\nCumulable 10 fois.",
};

export const getWakfuStateEffectLabel = (
  state: EnumWakfuState,
  level: number,
  effects: TWakfuStateDefinition["effects"],
) => {
  let rawText = WakfuStateDescriptions[state];
  for (const effect of effects) {
    const value = effect.value + effect.levelScaling * level;
    if (value % 1 === 0) {
      rawText = rawText.replace("%d", String(value));
    } else {
      rawText = rawText.replace("%d", value.toFixed(2));
    }
  }
  return rawText;
};
