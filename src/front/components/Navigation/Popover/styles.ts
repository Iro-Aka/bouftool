import { Paper, type PaperProps, styled } from "@mui/material";

const Prefix = "Popover";

export const popoverPaperClasses = {
  root: `${Prefix}-paper-root`,
};

export type TPopoverPaperProps = PaperProps & {
  anchorPosition: { top: number; left: number };
};

export const PopoverPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "anchorPosition",
})<TPopoverPaperProps>(({ theme, anchorPosition }) => ({
  [`&.${popoverPaperClasses.root}`]: {
    position: "absolute",
    top: anchorPosition.top,
    left: anchorPosition.left,
    backgroundColor: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
    width: "max-content",
    overflow: "auto",
    maxHeight: "100%",
    maxWidth: "100%",
    boxShadow: theme.shadows[4],
    borderRadius: "8px",
  },
}));
