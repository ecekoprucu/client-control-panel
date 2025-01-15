import { Theme } from "@mui/material";

export const sxTextInput = {
  title: (theme: Theme) => ({
    color: theme.palette.primary.main,
    fontSize: "1rem",
    fontWeight: "bold",
    top: -16,
    left: 8,
    backgroundColor: "white",
    zIndex: 9,
    p: theme.spacing(0.5),
  }),
};
