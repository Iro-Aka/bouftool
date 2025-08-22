import TuneIcon from "@mui/icons-material/Tune";
import { StackRow, stackRowClasses } from "src/front/components/Layout/StackRow";
import { useSearchItemsPreferencesContext } from "../contexts/preferences";
import { SearchItemsMasteryPreferences } from "./mastery";
import { SearchItemsResistancePreferences } from "./resistance";

export const SearchItemsPreferences = () => {
  const { preferences, dispatchPreferences } = useSearchItemsPreferencesContext();

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
