import CloseIcon from "@mui/icons-material/Close";
import { Button, InputAdornment, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { wakfuStatsLabels } from "src/front/constants/stats";
import { SearchItemsFilterStatsOperator } from "src/wakfu/search/types";
import { WakfuStats } from "src/wakfu/types/action";
import { SidePopover } from "../../../../components/Navigation/SidePopover";
import { StatsIcon } from "../../../../components/Wakfu/StatsIcon";
import type { TSearchItemsFiltersForm } from "../index";
import { StatsFiltersCardsOperator } from "./operator";

const Stats: Record<string, WakfuStats[]> = {
  Main: [
    WakfuStats.PV,
    WakfuStats.PW,
    WakfuStats.PA,
    WakfuStats.PM,
    WakfuStats.Range,
    WakfuStats.Control,
    WakfuStats.Initiative,
    WakfuStats.Dodge,
    WakfuStats.Lock,
    WakfuStats.Willpower,
  ],
  Mastery: [
    WakfuStats.Mastery,
    WakfuStats.MasteryFire,
    WakfuStats.MasteryEarth,
    WakfuStats.MasteryWater,
    WakfuStats.MasteryAir,
    WakfuStats.CriticalMastery,
    WakfuStats.BackMastery,
    WakfuStats.MeleeMastery,
    WakfuStats.DistanceMastery,
    WakfuStats.BerserkMastery,
    WakfuStats.CriticalRate,
  ],
  Resistance: [
    WakfuStats.Resistance,
    WakfuStats.ResistanceFire,
    WakfuStats.ResistanceWater,
    WakfuStats.ResistanceEarth,
    WakfuStats.ResistanceAir,
    WakfuStats.CriticalResistance,
    WakfuStats.BackResistance,
    WakfuStats.ArmorGiven,
    WakfuStats.ArmorReceived,
    WakfuStats.HealingMastery,
    WakfuStats.Block,
  ],
};

export type TStatsFilters = {
  value: TSearchItemsFiltersForm["stats"];
  onChange: (value: TSearchItemsFiltersForm["stats"]) => void;
};

export const StatsFilters = ({ value, onChange }: TStatsFilters) => {
  return (
    <SidePopover label={<StatsIcon>{WakfuStats.PV}</StatsIcon>} slotProps={{ button: { sx: { height: "41px" } } }}>
      <Stack sx={{ flexDirection: "row" }}>
        {Object.keys(Stats).map((key) => (
          <ToggleButtonGroup key={key} orientation="vertical" variant="push">
            {Stats[key].map((stat) => (
              <ToggleButton
                key={stat}
                value={stat}
                selected={Boolean(value[stat])}
                onChange={() => {
                  if (value[stat]) {
                    onChange({ ...value, [stat]: undefined });
                  } else {
                    onChange({
                      ...value,
                      [stat]: {
                        value: 1,
                        operator: SearchItemsFilterStatsOperator.GreaterThanOrEqual,
                      },
                    });
                  }
                }}
              >
                <StatsIcon>{stat}</StatsIcon>
                <Typography variant="caption">{wakfuStatsLabels[stat].fr}</Typography>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        ))}
      </Stack>
    </SidePopover>
  );
};

export const StatsFiltersCards = ({ value, onChange }: TStatsFilters) => {
  const children: ReactNode[] = [];
  for (const key in Stats) {
    for (const stat of Stats[key]) {
      if (value[stat]) {
        children.push(
          <TextField
            key={stat}
            size="small"
            value={value[stat].value}
            onChange={(e) => onChange({ ...value, [stat]: { ...value[stat], value: e.target.value } })}
            slotProps={{
              input: {
                startAdornment: (
                  <StatsFiltersCardsOperator
                    stat={stat}
                    operator={value[stat]?.operator}
                    onChange={(operator) => onChange({ ...value, [stat]: { ...value[stat], operator } })}
                  />
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      color="inherit"
                      sx={{ p: "2px", minWidth: 0 }}
                      onClick={() => onChange({ ...value, [stat]: undefined })}
                    >
                      <CloseIcon sx={{ fontSize: "16px" }} />
                    </Button>
                  </InputAdornment>
                ),
              },
            }}
            sx={{ flex: "0 0 180px" }}
          />,
        );
      }
    }
  }
  if (children.length < 1) {
    return null;
  }
  return children;
};
