import { ENUM_PREFERRED_THEME, ENUM_THEME_LIGHT } from "@/enums/theme";

// theme
export const USER_THEME = localStorage.getItem(ENUM_PREFERRED_THEME) ?? ENUM_THEME_LIGHT;