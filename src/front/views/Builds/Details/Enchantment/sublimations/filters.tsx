import { Button } from "@mui/material";
import clsx from "clsx";
import type { Dispatch, SetStateAction } from "react";
import { StackRow } from "src/front/components/Layout/StackRow";
import { ItemIcon } from "src/front/components/Wakfu/ItemIcon";
import { BaseSublimationIconGfxId, EpicSublimationIconGfxId, RelicSublimationIconGfxId } from "../constants";

export type TListSublimationsFiltersProps = {
  filters: {
    text: string;
    rarityEpic: boolean;
    rarityRelic: boolean;
  };
  setFilters: Dispatch<
    SetStateAction<{
      text: string;
      rarityEpic: boolean;
      rarityRelic: boolean;
    }>
  >;
};

export const ListSublimationsFilters = ({ filters, setFilters }: TListSublimationsFiltersProps) => {
  return (
    <StackRow>
      <Button
        variant="push"
        className={clsx({
          "Mui-selected": !filters.rarityEpic && !filters.rarityRelic,
        })}
        onClick={() => setFilters((prev) => ({ ...prev, rarityEpic: false, rarityRelic: false }))}
        data-global-click="sublimationItem"
      >
        <ItemIcon width={26}>{BaseSublimationIconGfxId}</ItemIcon>
      </Button>
      <Button
        variant="push"
        className={clsx({
          "Mui-selected": filters.rarityEpic,
        })}
        onClick={() => setFilters((prev) => ({ ...prev, rarityEpic: true, rarityRelic: false }))}
        data-global-click="sublimationItem"
      >
        <ItemIcon width={26}>{EpicSublimationIconGfxId}</ItemIcon>
      </Button>
      <Button
        variant="push"
        className={clsx({
          "Mui-selected": filters.rarityRelic,
        })}
        onClick={() => setFilters((prev) => ({ ...prev, rarityEpic: false, rarityRelic: true }))}
        data-global-click="sublimationItem"
      >
        <ItemIcon width={26}>{RelicSublimationIconGfxId}</ItemIcon>
      </Button>
    </StackRow>
  );
};
