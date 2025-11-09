import { List, ListItem, Typography } from "@mui/material";
import type { WakfuItem } from "src/wakfu/items";
import type { TElementalPreferences } from "src/wakfu/stats/types";
import { StackGrid } from "../../Layout/StackGrid";
import { ItemTypeIcon } from "../ItemTypeIcon";
import { RarityIcon } from "../RarityIcon";
import { StatsIcon } from "../StatsIcon";
import { SearchItemsCompare } from "./actions/compare";
import { SearchItemsEncyclopedia } from "./actions/encyclopedia";
import { SearchEquipmentsItemEquip } from "./actions/equip";
import { SearchItemsRecipes } from "./actions/recipes";
import { CardItemDisplayedRarity } from "./constants";
import { CardItemStats } from "./stats";
import { CardItemRoot, cardItemClasses } from "./styles";

export type TCardItemProps = {
  item: ReturnType<WakfuItem["toObject"]>;
  buildId?: string;
  displayActions?: boolean;
  constraints?: string[];
  elementalPreferences?: TElementalPreferences;
};

export const CardItem = ({ item, buildId, displayActions, constraints, elementalPreferences }: TCardItemProps) => {
  return (
    <CardItemRoot className={cardItemClasses.root} rarity={item.rarity}>
      <div className={cardItemClasses.header}>
        <Typography variant="subtitle2">{item.title.fr}</Typography>
        <div className={cardItemClasses.headerIcons}>
          {CardItemDisplayedRarity.has(item.rarity) && <RarityIcon height={24}>{item.rarity}</RarityIcon>}
          <ItemTypeIcon height={24}>{item.itemType.id}</ItemTypeIcon>
        </div>
      </div>
      <div className={cardItemClasses.content}>
        <div className={cardItemClasses.gfxAndActions}>
          <div className={cardItemClasses.gfx}>
            <img src={`wakfu/items/${item.gfxId}.png`} alt={item.title.fr ?? "item"} width={58} height={58} />
          </div>
          <Typography variant="caption">Niv. {item.level}</Typography>
          {displayActions && (
            <StackGrid columns={2} gap={0.5}>
              <SearchEquipmentsItemEquip buildId={buildId} itemId={item.id} />
              <SearchItemsCompare itemId={item.id} buildId={buildId} />
              <SearchItemsEncyclopedia itemId={item.id} itemTypeId={item.itemType.id} />
              <SearchItemsRecipes item={item} />
            </StackGrid>
          )}
          {elementalPreferences && (
            <StackGrid columns={4} gap={0.25} sx={{ bgcolor: "surface.200", p: 0.25, borderRadius: "8px" }}>
              {elementalPreferences.map((preference) => (
                <StatsIcon key={preference}>{preference}</StatsIcon>
              ))}
            </StackGrid>
          )}
        </div>
        <CardItemStats stats={item.stats} />
      </div>
      {constraints && constraints.length > 0 && (
        <List sx={{ listStyleType: "disc", pt: 2, pl: 2 }} disablePadding>
          {constraints.map((constraint, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: No other valid keys available
            <ListItem key={index} sx={{ display: "list-item", "&::marker": { color: "error.main" } }} disablePadding>
              <Typography variant="caption" color="error">
                {constraint}
              </Typography>
            </ListItem>
          ))}
        </List>
      )}
    </CardItemRoot>
  );
};
