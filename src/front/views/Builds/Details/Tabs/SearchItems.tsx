import { SearchEquipments } from "src/front/views/SearchEquipments";
import { useBuildDetailsContext } from "../context";
import { ModalEquipConflict } from "../ModalEquipConflict";

export const BuildSearchItems = () => {
  const build = useBuildDetailsContext();

  return (
    <>
      <SearchEquipments buildId={build.id} controlled />
      <ModalEquipConflict />
    </>
  );
};
