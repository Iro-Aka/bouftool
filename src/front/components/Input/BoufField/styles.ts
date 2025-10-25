import { FormControl, inputBaseClasses, styled } from "@mui/material";

const Prefix = "BoufField";

export const boufFieldClasses = {
  root: `${Prefix}-root`,
  label: `${Prefix}-label`,
  input: `${Prefix}-input`,
  inputWithoutLabel: `${Prefix}-inputWithoutLabel`,
};

export const BoufFieldRoot = styled(FormControl)(({ theme }) => ({
  [`&.${boufFieldClasses.root}`]: {
    [`& .${boufFieldClasses.label}`]: {
      marginLeft: theme.spacing(0.25),
    },
    [`& .${boufFieldClasses.input}`]: {
      backgroundColor: theme.palette.background.default,
      border: `1px solid ${theme.palette.border.light}`,
      borderRadius: "8px",
      marginTop: theme.spacing(2.25),
      padding: theme.spacing(0.5, 1),
      "&.Mui-focused": {
        borderColor: theme.palette.primary.main,
      },
      [`& .${inputBaseClasses.input}`]: {
        padding: theme.spacing(0.25, 0),
      },
      [`&.${boufFieldClasses.inputWithoutLabel}`]: {
        marginTop: 0,
      },
    },
  },
}));
