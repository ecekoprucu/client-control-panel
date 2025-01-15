import { createTheme } from "@mui/material/styles";
import { orange } from "@mui/material/colors";

export const Dark_Theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    orange: {
      main: orange[800],
      light: orange[200],
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  leftMenu: {
    width: 280,
  },
});
