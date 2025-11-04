import { Typography } from "@mui/material";

export const I18nHelperTooltip = {
  SearchItemsPreferences: () => (
    <Typography variant="body2">
      Sélectionner vos préférences de recherche d'équipements.
      <br />
      <br />
      Ces préférences seront utilisées pour trier les résultats de recherche afin de mettre en avant les équipements
      correspondant le mieux à vos critères.
    </Typography>
  ),
  SearchItemsFilters: () => (
    <Typography variant="body2">
      Appliquer des filtres pour affiner les résultats de recherche d'équipements.
      <br />
      <br />
      Tous les filtres appliqués devront être respectés lors de la recherche.
    </Typography>
  ),
  BuildEnchantments: () => (
    <Typography variant="body2">
      Pour enchanter un équipement, sélectionner un enchantement ou une sublimation dans les listes correspondantes.
      <br />
      <br />
      Pour faire d'une chasse, une chasse blanche, faite clique droit sur la chasse concernée.
      <br />
      <br />
      Si les conditions d'enchantement (niveau de l'enchantement par rapport à l'équipement) ou d'une sublimation
      (couleurs non respectées) alors les chasses seront affichées comme vide.
    </Typography>
  ),
} as const;
