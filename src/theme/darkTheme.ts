import { createTheme } from "@mui/material";

export const Dark_Theme = createTheme({
    palette: {
        mode: "dark",
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