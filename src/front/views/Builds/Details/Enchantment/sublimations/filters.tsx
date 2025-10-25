import { Button } from "@mui/material";
import clsx from "clsx";
import type { Dispatch, SetStateAction } from "react";
import { StackRow } from "src/front/components/Layout/StackRow";
import { ItemIcon } from "src/front/components/Wakfu/ItemIcon";

const BaseSublimationIconGfxId = 81228822;
const EpicSublimationIconGfxId = 81224130;
const RelicSublimationIconGfxId = 81224136;

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
      >
        <ItemIcon width={26}>{BaseSublimationIconGfxId}</ItemIcon>
      </Button>
      <Button
        variant="push"
        className={clsx({
          "Mui-selected": filters.rarityEpic,
        })}
        onClick={() => setFilters((prev) => ({ ...prev, rarityEpic: true, rarityRelic: false }))}
      >
        <ItemIcon width={26}>{EpicSublimationIconGfxId}</ItemIcon>
      </Button>
      <Button
        variant="push"
        className={clsx({
          "Mui-selected": filters.rarityRelic,
        })}
        onClick={() => setFilters((prev) => ({ ...prev, rarityEpic: false, rarityRelic: true }))}
      >
        <ItemIcon width={26}>{RelicSublimationIconGfxId}</ItemIcon>
      </Button>
    </StackRow>
  );
};
