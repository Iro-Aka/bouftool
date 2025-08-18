import TuneIcon from "@mui/icons-material/Tune";
import type { Dispatch, SetStateAction } from "react";
import { StackRow, stackRowClasses } from "src/front/components/Layout/StackRow";
import type { TSearchItemsSort } from "src/wakfu/search/types";
import { useSearchItemsPreferences } from "./logics";
import { SearchItemsMasteryPreferences } from "./mastery";
import { SearchItemsResistancePreferences } from "./resistance";

export type TSearchItemsPreferencesProps = {
  onChange: Dispatch<SetStateAction<TSearchItemsSort>>;
};

export const SearchItemsPreferences = ({ onChange }: TSearchItemsPreferencesProps) => {
  const { preferences, dispatchPreferences } = useSearchItemsPreferences(onChange);

  return (
    <StackRow
      sx={{
        [`& .${stackRowClasses.root}`]: {
          bgcolor: "surface.150",
          px: 1,
          py: 0.5,
          borderRadius: 2,
        },
        flexWrap: "wrap",
      }}
    >
      <TuneIcon />
      <SearchItemsMasteryPreferences value={preferences.mastery} dispatchPreferences={dispatchPreferences} />
      <SearchItemsResistancePreferences value={preferences.resistance} dispatchPreferences={dispatchPreferences} />
    </StackRow>
  );
};
