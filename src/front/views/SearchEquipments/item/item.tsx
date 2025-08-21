import { Box, Stack, Typography } from "@mui/material";
import { StackGrid } from "src/front/components/Layout/StackGrid";
import { RarityIcon } from "src/front/components/Wakfu/RarityIcon";
import type { TWakfuItemDisplay } from "src/wakfu/types/items";
import { Rarity } from "src/wakfu/types/rarity";
import { ItemTypeIcon } from "../../../components/Wakfu/ItemTypeIcon";
import { EquipmentEffectLabel } from "./effect";
import { SearchEquipmentsItemEquip } from "./equip";
import { ItemCard, itemCardClasses } from "./styles";

export type SearchEquipmentsItemProps = {
  item: TWakfuItemDisplay;
  onEquipItem?: (itemId: number) => void;
};

export const SearchEquipmentsItem = ({ item, onEquipItem }: SearchEquipmentsItemProps) => {
  return (
    <ItemCard className={itemCardClasses.root} rarity={item.rarity}>
      <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", pb: 0.5 }}>
        <Typography variant="subtitle2">{item.title}</Typography>
        <Stack sx={{ flexDirection: "row", gap: 0.5 }}>
          {(item.rarity === Rarity.Epic || item.rarity === Rarity.Relic) && (
            <RarityIcon height={24}>{item.rarity}</RarityIcon>
          )}
          <ItemTypeIcon height={24}>{item.itemTypeId}</ItemTypeIcon>
        </Stack>
      </Stack>
      <Stack sx={{ flexDirection: "row", gap: 1.5 }}>
        <Stack sx={{ flex: "0 0 64px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              backgroundColor: (theme) => (theme.palette.mode === "light" ? "grey.250" : "grey.800"),
              boxShadow: (theme) => (theme.palette.mode === "light" ? "inset 0 0 8px grey" : "inset 0 0 8px black"),
              borderRadius: "8px",
            }}
          >
            <img src={`wakfu/items/${item.gfxId}.png`} alt={item.title ?? "item"} width={58} height={58} />
          </Box>
          <Typography variant="caption">Niv. {item.level}</Typography>
          <StackGrid columns={2} gap={0.5}>
            <SearchEquipmentsItemEquip onEquipItem={onEquipItem} itemId={item.id} />
            <SearchEquipmentsItemEquip onEquipItem={onEquipItem} itemId={item.id} />
            <SearchEquipmentsItemEquip onEquipItem={onEquipItem} itemId={item.id} />
            <SearchEquipmentsItemEquip onEquipItem={onEquipItem} itemId={item.id} />
          </StackGrid>
        </Stack>
        <Stack sx={{ flex: 1 }}>
          {item.equipEffectsLabels.map((effectLabel, index) => (
            <Box
              // biome-ignore lint/suspicious/noArrayIndexKey: No issue
              key={index}
              sx={{
                px: 1,
                borderLeft: (theme) =>
                  theme.palette.mode === "light"
                    ? "1px solid rgba(0, 0, 0, 0.12)"
                    : "1px solid rgba(255, 255, 255, 0.12)",
                borderRight: (theme) =>
                  theme.palette.mode === "light"
                    ? "1px solid rgba(0, 0, 0, 0.12)"
                    : "1px solid rgba(255, 255, 255, 0.12)",
                "&:nth-of-type(2n)": {
                  backgroundColor: (theme) => (theme.palette.mode === "light" ? "grey.350" : "grey.750"),
                },
                "&:nth-of-type(2n+1)": {
                  backgroundColor: (theme) => (theme.palette.mode === "light" ? "grey.250" : "grey.850"),
                },
                "&:first-of-type": {
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                  borderTop: (theme) =>
                    theme.palette.mode === "light"
                      ? "1px solid rgba(0, 0, 0, 0.12)"
                      : "1px solid rgba(255, 255, 255, 0.12)",
                },
                "&:last-of-type": {
                  borderBottomLeftRadius: "8px",
                  borderBottomRightRadius: "8px",
                  borderBottom: (theme) =>
                    theme.palette.mode === "light"
                      ? "1px solid rgba(0, 0, 0, 0.12)"
                      : "1px solid rgba(255, 255, 255, 0.12)",
                },
              }}
            >
              <Typography variant="body1" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <EquipmentEffectLabel effect={effectLabel} />
              </Typography>
            </Box>
          ))}
        </Stack>
      </Stack>
      {item.id === 31242 && <div className={itemCardClasses.shiny} />}
    </ItemCard>
  );
};
