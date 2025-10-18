import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ElectronEvents } from "src/electron/types";
import { ItemIcon } from "src/front/components/Wakfu/ItemIcon";
import { sendElectronEvent, useElectronEvent } from "src/front/hooks/electron";
import { useBuildDetailsContext } from "src/front/views/Builds/Details/context";
import { EnumWakfuRarity } from "src/wakfu/items/rarity";
import { type EnumWakfuEquipmentPosition, EnumWakfuItemType } from "src/wakfu/itemTypes/types";
import { EnumWakfuStat } from "src/wakfu/stats/types";
import type { WakfuItem } from "../../../../../wakfu/items";
import { EnumStatConstraintType } from "../../../../../wakfu/optimization/types";
import { getWakfuStatLabel } from "../../../../../wakfu/stats/i18n/label";
import { WakfuLevelsRange } from "../../../../../wakfu/utils/constants";
import { EnumWakfuLang } from "../../../../../wakfu/utils/types";

type TStatConstraint = {
  stat: EnumWakfuStat;
  value: number;
  type: EnumStatConstraintType;
  penalty?: number;
};

type TStatWeight = {
  stat: EnumWakfuStat;
  weight: number;
};

const Stats = [
  EnumWakfuStat.HealthPoint,
  EnumWakfuStat.WakfuPoint,
  EnumWakfuStat.ActionPoint,
  EnumWakfuStat.MovementPoint,
  EnumWakfuStat.Range,
  EnumWakfuStat.Control,
  EnumWakfuStat.Initiative,
  EnumWakfuStat.Dodge,
  EnumWakfuStat.Lock,
  EnumWakfuStat.Willpower,
  EnumWakfuStat.ElementalMastery,
  EnumWakfuStat.FireMastery,
  EnumWakfuStat.WaterMastery,
  EnumWakfuStat.EarthMastery,
  EnumWakfuStat.AirMastery,
  EnumWakfuStat.CriticalMastery,
  EnumWakfuStat.RearMastery,
  EnumWakfuStat.MeleeMastery,
  EnumWakfuStat.DistanceMastery,
  EnumWakfuStat.BerserkMastery,
  EnumWakfuStat.CriticalHit,
  EnumWakfuStat.ElementalResistance,
  EnumWakfuStat.FireResistance,
  EnumWakfuStat.WaterResistance,
  EnumWakfuStat.EarthResistance,
  EnumWakfuStat.AirResistance,
  EnumWakfuStat.CriticalResistance,
  EnumWakfuStat.RearResistance,
  EnumWakfuStat.ArmorGiven,
  EnumWakfuStat.ArmorReceived,
  EnumWakfuStat.HealingMastery,
  EnumWakfuStat.Block,
];

export const BuildOptimizer = () => {
  const build = useBuildDetailsContext();

  const levelsRange = WakfuLevelsRange.find(
    (range) => range.min <= (build?.level ?? 245) && range.max >= (build?.level ?? 245),
  );

  // Configuration de base
  const [minLevel, setMinLevel] = useState(levelsRange?.min ?? 1);
  const [maxLevel, setMaxLevel] = useState(build?.level ?? 230);
  const [keepAll, setKeepAll] = useState(false);
  const [keepSlots, setKeepSlots] = useState<EnumWakfuEquipmentPosition[]>([]);

  // Contraintes de statistiques
  const [statConstraints, setStatConstraints] = useState<TStatConstraint[]>([]);
  const [newConstraintStat, setNewConstraintStat] = useState<EnumWakfuStat | "">("");
  const [newConstraintValue, setNewConstraintValue] = useState(0);
  const [newConstraintType, setNewConstraintType] = useState<EnumStatConstraintType>(
    EnumStatConstraintType.MinBlocking,
  );
  const [newConstraintPenalty, setNewConstraintPenalty] = useState(200);

  // Poids des statistiques
  const [statWeights, setStatWeights] = useState<TStatWeight[]>([]);
  const [newWeightStat, setNewWeightStat] = useState<EnumWakfuStat | "">("");
  const [newWeightValue, setNewWeightValue] = useState(1.0);

  // Filtres
  const [excludeItemTypes, setExcludeItemTypes] = useState<EnumWakfuItemType[]>([]);
  const [excludeRarities, setExcludeRarities] = useState<EnumWakfuRarity[]>([]);

  // État de l'optimisation
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);

  // Résultats de l'optimisation
  type TOptimizationResult = {
    equipment: Record<string, ReturnType<WakfuItem["toObject"]> | null>;
    score: number;
    valid: boolean;
    meetsObjectives: boolean;
    violations: string[];
  };
  const [optimizationResults, setOptimizationResults] = useState<TOptimizationResult[]>([]);
  const [showResultsModal, setShowResultsModal] = useState(false);

  // Écouter les événements de progression et de résultats
  const [, progressData] = useElectronEvent(ElectronEvents.BuildOptimizeProgress, true);
  const [, resultsData] = useElectronEvent(ElectronEvents.BuildOptimizeResult, true);

  useEffect(() => {
    if (progressData) {
      setProgress({
        current: progressData.currentIteration,
        total: progressData.totalIterations,
      });
    }
  }, [progressData]);

  useEffect(() => {
    console.log("Received optimization results:", resultsData);
    if (resultsData && Array.isArray(resultsData) && resultsData.length > 0) {
      setOptimizationResults(resultsData);
      setShowResultsModal(true);
      setIsOptimizing(false);
      setProgress(null);
    }
  }, [resultsData]);

  const handleAddConstraint = () => {
    if (newConstraintStat === "") return;

    setStatConstraints([
      ...statConstraints,
      {
        stat: newConstraintStat,
        value: newConstraintValue,
        type: newConstraintType,
        penalty: newConstraintType === EnumStatConstraintType.Objective ? newConstraintPenalty : undefined,
      },
    ]);
    setNewConstraintStat("");
    setNewConstraintValue(0);
  };

  const handleRemoveConstraint = (index: number) => {
    setStatConstraints(statConstraints.filter((_, i) => i !== index));
  };

  const handleAddWeight = () => {
    if (newWeightStat === "") return;

    setStatWeights([
      ...statWeights,
      {
        stat: newWeightStat,
        weight: newWeightValue,
      },
    ]);
    setNewWeightStat("");
    setNewWeightValue(1.0);
  };

  const handleRemoveWeight = (index: number) => {
    setStatWeights(statWeights.filter((_, i) => i !== index));
  };

  const handleOptimize = async () => {
    if (!build) return;

    const config = {
      statConstraints: statConstraints.map((c) => ({
        stat: c.stat,
        value: c.value,
        type: c.type,
        penalty: c.penalty,
      })),
      statWeights: statWeights.map((w) => ({
        stat: w.stat,
        weight: w.weight,
      })),
      levelConstraints: {
        minLevel,
        maxLevel,
      },
      excludeItemTypes,
      excludeRarities,
      preserveEquipment: {
        keepAll,
        keepSlots,
      },
      algorithmParams: {
        maxIterations: 5000,
        neighborsPerIteration: 30,
        acceptanceThreshold: 0.02,
        tabuListSize: 200,
        solutionCount: 5,
        runs: 3,
      },
    };

    setIsOptimizing(true);
    setProgress({ current: 0, total: 4000 * 4 });

    try {
      await sendElectronEvent(ElectronEvents.BuildOptimize, {
        buildId: build.id,
        config,
      });
    } catch (error) {
      console.error("Optimization error:", error);
      setIsOptimizing(false);
      setProgress(null);
    }
  };

  const handleEquipBuild = async (result: TOptimizationResult) => {
    if (!build) return;

    try {
      // Équiper chaque item du résultat
      for (const [position, item] of Object.entries(result.equipment)) {
        if (item) {
          await sendElectronEvent(ElectronEvents.BuildEquipItem, {
            buildId: build.id,
            itemId: item.id,
            position: position as EnumWakfuEquipmentPosition,
          });
        } else {
          // Déséquiper si l'item est null
          await sendElectronEvent(ElectronEvents.BuildUnequipItem, {
            buildId: build.id,
            position: position as EnumWakfuEquipmentPosition,
          });
        }
      }
      setShowResultsModal(false);
    } catch (error) {
      console.error("Error equipping build:", error);
    }
  };

  if (!build) {
    return null;
  }

  return (
    <>
      <Stack sx={{ flex: 1, overflow: "auto", p: 2, gap: 2 }}>
        {/* Contraintes de statistiques */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Contraintes de statistiques
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Les contraintes bloquantes invalident les solutions qui ne les respectent pas. Les contraintes d'objectif
            appliquent une pénalité.
          </Typography>

          <Stack spacing={2} sx={{ mt: 2 }}>
            {statConstraints.map((constraint, index) => (
              <Chip
                key={constraint.stat}
                label={`${constraint.stat} ${constraint.type === EnumStatConstraintType.Objective ? "~" : constraint.type === EnumStatConstraintType.MinBlocking ? ">=" : "<="} ${constraint.value}${
                  constraint.penalty ? ` (pénalité: ${constraint.penalty})` : ""
                }`}
                onDelete={() => handleRemoveConstraint(index)}
                color={constraint.type === EnumStatConstraintType.Objective ? "warning" : "error"}
              />
            ))}

            <Stack direction="row" spacing={1}>
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Statistique</InputLabel>
                <Select
                  value={newConstraintStat}
                  label="Statistique"
                  onChange={(e) => setNewConstraintStat(e.target.value as EnumWakfuStat)}
                >
                  <MenuItem value="">
                    <em>Sélectionner</em>
                  </MenuItem>
                  {Stats.map((stat) => (
                    <MenuItem key={stat} value={stat}>
                      {getWakfuStatLabel(stat, EnumWakfuLang.French)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                size="small"
                type="number"
                label="Valeur"
                value={newConstraintValue}
                onChange={(e) => setNewConstraintValue(Number(e.target.value))}
              />

              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Type</InputLabel>
                <Select
                  value={newConstraintType}
                  label="Type"
                  onChange={(e) => setNewConstraintType(e.target.value as EnumStatConstraintType)}
                >
                  <MenuItem value={EnumStatConstraintType.MinBlocking}>Minimum Bloquant</MenuItem>
                  <MenuItem value={EnumStatConstraintType.MaxBlocking}>Maximum Bloquant</MenuItem>
                  <MenuItem value={EnumStatConstraintType.Objective}>Objectif</MenuItem>
                </Select>
              </FormControl>

              {newConstraintType === EnumStatConstraintType.Objective && (
                <TextField
                  size="small"
                  type="number"
                  label="Pénalité"
                  value={newConstraintPenalty}
                  onChange={(e) => setNewConstraintPenalty(Number(e.target.value))}
                />
              )}

              <Button variant="contained" onClick={handleAddConstraint}>
                Ajouter
              </Button>
            </Stack>
          </Stack>
        </Paper>

        {/* Poids des statistiques */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Poids des statistiques
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Définissez l'importance relative de chaque statistique dans le score global.
          </Typography>

          <Stack spacing={2} sx={{ mt: 2 }}>
            {statWeights.map((weight, index) => (
              <Chip
                key={`${weight.stat}`}
                label={`${weight.stat}: ${weight.weight}`}
                onDelete={() => handleRemoveWeight(index)}
                color="primary"
              />
            ))}

            <Stack direction="row" spacing={1}>
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Statistique</InputLabel>
                <Select
                  value={newWeightStat}
                  label="Statistique"
                  onChange={(e) => setNewWeightStat(e.target.value as EnumWakfuStat)}
                >
                  <MenuItem value="">
                    <em>Sélectionner</em>
                  </MenuItem>
                  {Stats.map((stat) => (
                    <MenuItem key={stat} value={stat}>
                      {getWakfuStatLabel(stat, EnumWakfuLang.French)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                size="small"
                type="number"
                label="Poids"
                value={newWeightValue}
                onChange={(e) => setNewWeightValue(Number(e.target.value))}
                slotProps={{ htmlInput: { step: 0.1 } }}
              />

              <Button variant="contained" onClick={handleAddWeight}>
                Ajouter
              </Button>
            </Stack>
          </Stack>
        </Paper>

        {/* Niveau d'items */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Niveau d'items
          </Typography>
          <Stack direction="row" spacing={2}>
            <TextField
              size="small"
              type="number"
              label="Niveau minimum"
              value={minLevel}
              onChange={(e) => setMinLevel(Number(e.target.value))}
              slotProps={{ htmlInput: { min: 1, max: 245 } }}
            />
            <TextField
              size="small"
              type="number"
              label="Niveau maximum"
              value={maxLevel}
              onChange={(e) => setMaxLevel(Number(e.target.value))}
              slotProps={{ htmlInput: { min: 1, max: 245 } }}
            />
          </Stack>
        </Paper>

        {/* Préservation d'équipement */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Préservation d'équipement
          </Typography>
          <FormControlLabel
            control={<Checkbox checked={keepAll} onChange={(e) => setKeepAll(e.target.checked)} />}
            label="Garder tout l'équipement actuel"
          />
          {/* TODO: Add slot selection */}
        </Paper>

        {/* Filtres de types d'items */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Exclusion de types d'items
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Sélectionnez les types d'items à exclure de l'optimisation.
          </Typography>

          <FormControl fullWidth size="small" sx={{ mt: 2 }}>
            <InputLabel>Types d'items exclus</InputLabel>
            <Select
              multiple
              value={excludeItemTypes}
              label="Types d'items exclus"
              onChange={(e) => setExcludeItemTypes(e.target.value as EnumWakfuItemType[])}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={EnumWakfuItemType[value]} size="small" />
                  ))}
                </Box>
              )}
            >
              <MenuItem value={EnumWakfuItemType.Pet}>Familier</MenuItem>
              <MenuItem value={EnumWakfuItemType.Mount}>Monture</MenuItem>
              <MenuItem value={EnumWakfuItemType.Emblem}>Emblème</MenuItem>
            </Select>
          </FormControl>
        </Paper>

        {/* Filtres de raretés */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Exclusion de raretés
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Sélectionnez les raretés d'items à exclure de l'optimisation.
          </Typography>

          <FormControl fullWidth size="small" sx={{ mt: 2 }}>
            <InputLabel>Raretés exclues</InputLabel>
            <Select
              multiple
              value={excludeRarities}
              label="Raretés exclues"
              onChange={(e) => setExcludeRarities(e.target.value as EnumWakfuRarity[])}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={EnumWakfuRarity[value]} size="small" />
                  ))}
                </Box>
              )}
            >
              <MenuItem value={EnumWakfuRarity.Old}>Ancient Objet</MenuItem>
              <MenuItem value={EnumWakfuRarity.Uncommon}>Inhabituel</MenuItem>
              <MenuItem value={EnumWakfuRarity.Rare}>Rare</MenuItem>
              <MenuItem value={EnumWakfuRarity.Mythic}>Mythique</MenuItem>
              <MenuItem value={EnumWakfuRarity.Legendary}>Légendaire</MenuItem>
              <MenuItem value={EnumWakfuRarity.Relic}>Relique</MenuItem>
              <MenuItem value={EnumWakfuRarity.Memory}>Souvenir</MenuItem>
              <MenuItem value={EnumWakfuRarity.Epic}>Épique</MenuItem>
            </Select>
          </FormControl>
        </Paper>

        <Divider />

        {/* Bouton d'optimisation */}
        <Box>
          <Button
            variant="contained"
            size="large"
            onClick={handleOptimize}
            disabled={isOptimizing || statWeights.length === 0}
          >
            {isOptimizing ? "Optimisation en cours..." : "Lancer l'optimisation"}
          </Button>

          {progress && (
            <>
              <LinearProgress variant="determinate" value={(progress.current / progress.total) * 100} sx={{ mt: 2 }} />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Progression: {progress.current} / {progress.total} (
                {((progress.current / progress.total) * 100).toFixed(1)}
                %)
              </Typography>
            </>
          )}
        </Box>
      </Stack>

      {/* Modal de résultats */}
      <Dialog open={showResultsModal} onClose={() => setShowResultsModal(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Typography variant="h5">Résultats de l'optimisation</Typography>
          <Typography variant="body2" color="text.secondary">
            {optimizationResults.length} builds trouvés
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {optimizationResults.map((result, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={`result-${result.score}-${index}`}>
                <Card variant="outlined">
                  <CardContent>
                    <Stack spacing={1}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h6">Build #{index + 1}</Typography>
                        <Chip label={`Score: ${result.score.toFixed(0)}`} color="primary" size="small" />
                      </Box>

                      {!result.valid && (
                        <Alert severity="error" sx={{ mt: 1 }}>
                          Build invalide (contraintes bloquantes non respectées)
                        </Alert>
                      )}

                      {result.valid && !result.meetsObjectives && (
                        <Alert severity="warning" sx={{ mt: 1 }}>
                          Objectifs non atteints
                        </Alert>
                      )}

                      {result.violations.length > 0 && (
                        <Box>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Violations:
                          </Typography>
                          {result.violations.map((violation) => (
                            <Typography key={violation} variant="caption" display="block" color="error">
                              • {violation}
                            </Typography>
                          ))}
                        </Box>
                      )}

                      <Divider />

                      <Typography variant="body2" fontWeight="bold">
                        Équipement:
                      </Typography>
                      <Grid container spacing={1}>
                        {Object.entries(result.equipment).map(([position, item]) => (
                          <Grid size={{ xs: 6 }} key={position}>
                            {item ? (
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <ItemIcon width={32} height={32}>
                                  {item.gfxId}
                                </ItemIcon>
                                <Box sx={{ flex: 1, overflow: "hidden" }}>
                                  <Typography variant="caption" noWrap>
                                    {position}
                                  </Typography>
                                  <Typography variant="body2" noWrap>
                                    {item.title.fr}
                                  </Typography>
                                </Box>
                              </Box>
                            ) : (
                              <Typography variant="caption" color="text.secondary">
                                {position}: Vide
                              </Typography>
                            )}
                          </Grid>
                        ))}
                      </Grid>
                    </Stack>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => handleEquipBuild(result)}
                      disabled={!result.valid}
                    >
                      Équiper ce build
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};
