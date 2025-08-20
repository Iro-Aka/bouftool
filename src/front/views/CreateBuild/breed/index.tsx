import { Box, Button } from "@mui/material";
import type { ReactNode } from "react";
import { StackGrid } from "src/front/components/Layout/StackGrid";
import { BreedFaceIcon } from "src/front/components/Wakfu/BreedFaceIcon";
import { isNumber } from "src/types/utils";
import { WakfuBreed } from "src/wakfu/types/breed";

const WakfuBreedArray = Object.values(WakfuBreed).filter(isNumber);

export type TSelectBreedProps = {
  value: WakfuBreed | null;
  onChange: (breed: WakfuBreed | null) => void;
};

export const SelectBreed = ({ value, onChange }: TSelectBreedProps) => {
  const children: ReactNode[] = [];
  for (const breed of WakfuBreedArray) {
    const selected = breed === value;
    children.push(
      <Button
        sx={{
          p: 0,
          borderRadius: 0,
          border: "1px solid rgba(0, 0, 0, 0.12)",
          "&:hover .HoverEffect": { display: "block" },
        }}
        onClick={() => onChange(breed)}
      >
        <BreedFaceIcon width="100%">{breed}</BreedFaceIcon>
        <Box
          className="HoverEffect"
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            bgcolor: "rgba(255,255,255,0.12)",
            display: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            ...(selected
              ? {
                  boxShadow: (theme) =>
                    theme.palette.mode === "light" ? `inset 0 0 1px 3px gold` : "inset 0 0 1px 2px white",
                }
              : { bgcolor: "rgba(0, 0, 0, 0.24)" }),
          }}
        />
      </Button>,
    );
  }

  return (
    <StackGrid columns={3} sx={{ width: "200px" }}>
      {children}
    </StackGrid>
  );
};
