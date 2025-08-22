import { Box } from "@mui/material";
import { useRef, useState } from "react";
import { ElectronEvents } from "src/electron/types";
import { StackGrid } from "src/front/components/Layout/StackGrid";
import { Popover } from "src/front/components/Navigation/Popover";
import { BreedFaceIcon } from "src/front/components/Wakfu/BreedFaceIcon";
import { sendElectronEvent } from "src/front/hooks/electron";
import { isNumber } from "src/types/utils";
import { WakfuBreed } from "src/wakfu/types/breed";
import { useBuildDetailsContext } from "../../context";
import { BuildDetailsBreedRoot, buildDetailsBreedClasses } from "./styles";

export const BuildDetailsBreed = () => {
  const build = useBuildDetailsContext();
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <BuildDetailsBreedRoot className={buildDetailsBreedClasses.root} ref={anchorRef} onClick={() => setOpen(true)}>
        <BreedFaceIcon width={44}>{build.breed}</BreedFaceIcon>
      </BuildDetailsBreedRoot>
      <Popover
        open={open}
        anchorEl={anchorRef.current}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setOpen(false)}
      >
        <Box sx={{ width: 46 * 6 + 8 * 5, p: 1 }}>
          <StackGrid columns={6} gap={1}>
            {Object.values(WakfuBreed).map(
              (breed) =>
                isNumber(breed) && (
                  <BuildDetailsBreedRoot
                    className={buildDetailsBreedClasses.root}
                    onClick={() => {
                      sendElectronEvent(ElectronEvents.BuildSetBreed, { buildId: build.id, breed });
                      setOpen(false);
                    }}
                  >
                    <BreedFaceIcon height={44}>{breed}</BreedFaceIcon>
                  </BuildDetailsBreedRoot>
                ),
            )}
          </StackGrid>
        </Box>
      </Popover>
    </>
  );
};
