import { createTheme } from "@mui/material";

export const Light_Theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main: "#dc004e",
        },
    },
    typography: {
        fontFamily: "Roboto, sans-serif",
    },
})