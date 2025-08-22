import { EnumAbilities } from "src/wakfu/types/ability";
import { WakfuStats } from "src/wakfu/types/action";

export const AbilitiesDisplay: Record<EnumAbilities, { icon: WakfuStats; label: string; description?: string }> = {
  [EnumAbilities.PercentHp]: {
    icon: WakfuStats.HealingReceived,
    label: "% Point de vie",
  },
  [EnumAbilities.Resistance]: {
    icon: WakfuStats.Resistance,
    label: "Résistance élémentaire",
    description: "Résistance aux dégâts de tous les éléments.",
  },
  [EnumAbilities.Barrier]: {
    icon: WakfuStats.Armor,
    label: "Barrière",
  },
  [EnumAbilities.HealingReceived]: {
    icon: WakfuStats.HealingReceived,
    label: "% Soins reçus",
  },
  [EnumAbilities.PercentHpToArmor]: {
    icon: WakfuStats.Armor,
    label: "% Points de vie en armure",
  },
  [EnumAbilities.Mastery]: {
    icon: WakfuStats.Mastery,
    label: "Maîtrise élémentaire",
    description: "Bonus aux dégâts de tous les éléments.",
  },
  [EnumAbilities.MeleeMastery]: {
    icon: WakfuStats.MeleeMastery,
    label: "Maîtrise mêlée",
    description:
      "La maîtrise mêlée s'ajoute à la maîtrise élémentaire pour amplifier les dommages infligés aux cibles se trouvant à 2 cases et moins de l'attaquant.",
  },
  [EnumAbilities.RangeMastery]: {
    icon: WakfuStats.DistanceMastery,
    label: "Maîtrise à distance",
    description:
      "La maîtrise à distance s'ajoute à la maîtrise élémentaire pour amplifier les dommages infligés aux cibles se trouvant 3 cases et plus de l'attaquant.",
  },
  [EnumAbilities.Hp]: {
    icon: WakfuStats.PV,
    label: "Points de vie",
  },
  [EnumAbilities.Lock]: {
    icon: WakfuStats.Lock,
    label: "Tacle",
    description:
      "Le tacle augmente votre capacité à maintenir un adversaire au contact. Cette caractéristique est contre-balancée par l'esquive de votre adversaire.",
  },
  [EnumAbilities.Dodge]: {
    icon: WakfuStats.Dodge,
    label: "Esquive",
    description:
      "L'esquive augmente votre capacité à vous éloigner d'un adversaire au contact. Cette caractéristique est contre-balancée par le tacle de votre adversaire.",
  },
  [EnumAbilities.Initiative]: {
    icon: WakfuStats.Initiative,
    label: "Initiative",
    description:
      "Augmente votre score d'initiative et celui de votre équipe.\n\nLe premier combattant à jouer est celui appartenant à l'équipe ayant le plus d'initiative. Les combattants se succèdent ensuite, d'une équipe puis de l'autre, par ordre d'initiative (de la plus haute à la plus basse).\n\nLes invocations jouent juste après leur invocateur.",
  },
  [EnumAbilities.LockAndDodge]: {
    icon: WakfuStats.Lock,
    label: "Tacle et Esquive",
  },
  [EnumAbilities.Willpower]: {
    icon: WakfuStats.Willpower,
    label: "Volonté",
    description: "Augmente votre capacité à retirer des PA et PM, ainsi que votre résistance aux pertes de PA et PM.",
  },
  [EnumAbilities.CriticalRate]: {
    icon: WakfuStats.CriticalRate,
    label: "% Coup critique",
    description:
      "Chaque point en Coup critique augmente de 1% vos chances de réaliser un coup critique. Les coups critiques augmentent les dommages infligés de 25%.",
  },
  [EnumAbilities.Block]: {
    icon: WakfuStats.Block,
    label: "% Parade",
    description: "Chaque point en Parade augmente de 1% vos chances de réduire de 20% les dommages reçus.",
  },
  [EnumAbilities.CriticalMastery]: {
    icon: WakfuStats.CriticalMastery,
    label: "Maîtrise critique",
    description:
      "La Maîtrise critique s'ajoute à la Maîtrise élémentaire pour amplifier les dommages infligés en coup critique.",
  },
  [EnumAbilities.BackMastery]: {
    icon: WakfuStats.BackMastery,
    label: "Maîtrise dos",
    description:
      "La Maîtrise dos s'ajoute à la Maîtrise élémentaire pour amplifier les dommages infligés dans le dos de la cible.",
  },
  [EnumAbilities.BerserkMastery]: {
    icon: WakfuStats.BerserkMastery,
    label: "Maîtrise berserk",
    description:
      "La Maîtrise berserk s'ajoute à la Maîtrise élémentaire pour amplifier les dommages infligés lorsque vous avez moins de 50% de vos PV max.",
  },
  [EnumAbilities.HealingMastery]: {
    icon: WakfuStats.HealingMastery,
    label: "Maîtrise soin",
    description: "La Maîtrise soin s'ajoute à la Maîtrise élémentaire pour augmenter l'efficacité des sorts de soins.",
  },
  [EnumAbilities.BackResistance]: {
    icon: WakfuStats.BackResistance,
    label: "Résistance dos",
    description: "La Résistance dos diminue les dégâts des attaques subies dans le dos.",
  },
  [EnumAbilities.CriticalResistance]: {
    icon: WakfuStats.CriticalResistance,
    label: "Résistance critique",
    description: "La Résistance critique diminue les dommages des attaques critiques subies.",
  },
  [EnumAbilities.Ap]: {
    icon: WakfuStats.PA,
    label: "Point d'action",
  },
  [EnumAbilities.MpAndMastery]: {
    icon: WakfuStats.PM,
    label: "Point de mouvement et dégâts",
  },
  [EnumAbilities.RangeAndMastery]: {
    icon: WakfuStats.Range,
    label: "Portée et dégâts",
  },
  [EnumAbilities.Wp]: {
    icon: WakfuStats.PW,
    label: "Point de Wakfu",
  },
  [EnumAbilities.ControlAndMastery]: {
    icon: WakfuStats.Control,
    label: "Contrôle et dégâts",
  },
  [EnumAbilities.FinalDamage]: {
    icon: WakfuStats.FinalDamage,
    label: "% Dommages infligés",
    description: "Augmente en pourcentage tous les dommages que vous infligez.",
  },
  [EnumAbilities.MajorResistance]: {
    icon: WakfuStats.Resistance,
    label: "Résistance élémentaire",
    description: "Résistance aux dégâts de tous les éléments.",
  },
};
