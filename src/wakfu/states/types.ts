export enum EnumWakfuState {
  EtoiEskeutula = "EtoiEskeutula",
  AuraDeLamour = "AuraDeLamour",
  PeaceAndLove = "PeaceAndLove",
  LeDemiPayAime = "LeDemiPayAime",
  EmblemeIop = "EmblemeIop",
  EmblemeCra = "EmblemeCra",
  EmblemeSacrieur = "EmblemeSacrieur",
  EmblemeEcaflip = "EmblemeEcaflip",
  EmblemeEniripsa = "EmblemeEniripsa",
  EmblemeSadida = "EmblemeSadida",
  EmblemeXelor = "EmblemeXelor",
  EmblemeEnutrof = "EmblemeEnutrof",
  EmblemeRoublard = "EmblemeRoublard",
  EmblemePandawa = "EmblemePandawa",
  EmblemeFeca = "EmblemeFeca",
  EmblemeOsamodas = "EmblemeOsamodas",
  EmblemeSteamer = "EmblemeSteamer",
  EmblemeSram = "EmblemeSram",
  EmblemeZobal = "EmblemeZobal",
  InsigneMerydes = "InsigneMerydes",
  Muraille50 = "Muraille50",
  Muraille75 = "Muraille75",
  Vivacite90 = "Vivacite90",
  Requinquage25 = "Requinquage25",
  Requinquage33 = "Requinquage33",
  Requinquage50 = "Requinquage50",
  Requinquage66 = "Requinquage66",
  Requinquage75 = "Requinquage75",
  TransfertTellurique = "TransfertTellurique",
  Berserk50 = "Berserk50",
  Berserk75 = "Berserk75",
  Rage = "Rage",
  Fortification = "Fortification",
  PacteAnatharI = "PacteAnatharI",
  PacteAnatharII = "PacteAnatharII",
  PacteAnatharIII = "PacteAnatharIII",
  PacteAnatharIV = "PacteAnatharIV",
  PacteAnatharV = "PacteAnatharV",
  Eternite = "Eternite",
  Dofushu = "Dofushu",
  DofusIvoire = "DofusIvoire",
  DofusPrismatique = "DofusPrismatique",
  DofusTurquoise = "DofusTurquoise",
}

export const isWakfuState = (value: string): value is EnumWakfuState => {
  return EnumWakfuState[value as keyof typeof EnumWakfuState] !== undefined;
};

export type TWakfuStateDefinition = {
  id: number;
  levelMax: number;
  effects: { value: number; levelScaling: number }[];
};
