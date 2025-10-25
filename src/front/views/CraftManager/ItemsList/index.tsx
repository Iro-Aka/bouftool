import { Stack } from "@mui/material";
import { TreeView } from "../../../components/TreeView";
import { useCraftManagerContext } from "../context";

export const CraftItemsList = () => {
  const { treeNodes } = useCraftManagerContext();

  if (treeNodes.length === 0) {
    return null;
  }

  return (
    <Stack sx={{ flexBasis: "500px", borderRadius: "8px", gap: 1, overflowY: "auto" }}>
      <TreeView nodes={treeNodes} />
    </Stack>
  );
};
