// React
import { useEffect, useState } from "react";

// Router
import { Outlet } from "react-router-dom";

// MUI
import { ThemeProvider, responsiveFontSizes } from "@mui/material";

// Redux
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import getThemeObject from "@/theme";

const MasterPage = () => {
    const themeCode = useSelector((state: IRootState) => state.theme.themeCode);
    const [muiTheme, setMuiTheme] = useState(getThemeObject(themeCode));
    
    useEffect(() => {
        setMuiTheme(responsiveFontSizes(getThemeObject(themeCode)));
    }, [themeCode]);
    
    return (
        <ThemeProvider theme={muiTheme}>
            <Outlet />
        </ThemeProvider>
    );
}

export default MasterPage;