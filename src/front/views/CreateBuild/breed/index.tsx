import { Button } from "@mui/material";
import type { ReactNode } from "react";
import { StackGrid } from "src/front/components/Layout/StackGrid";
import { BreedFaceIcon } from "src/front/components/Wakfu/BreedFaceIcon";
import { isNumber } from "src/types/utils";
import { WakfuBreed } from "src/wakfu/types/breed";

const WakfuBreedArray = Object.values(WakfuBreed).filter(isNumber);

export const SelectBreed = () => {
  const children: ReactNode[] = [];
  for (const breed of WakfuBreedArray) {
    children.push(
      <Button>
        <BreedFaceIcon width="100%" style={{}}>
          {breed}
        </BreedFaceIcon>
      </Button>,
    );
  }

  return (
    <StackGrid columns={6} sx={{ width: "450px" }}>
      {children}
    </StackGrid>
  );
};
