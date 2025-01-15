import { ENUM_THEME_DARK, ENUM_THEME_LIGHT } from "@/enums/theme";
import { Light_Theme } from "./lightTheme";
import { Dark_Theme } from "./darkTheme";

export default function getThemeObject(themeCode: string) {
  switch (themeCode) {
    case ENUM_THEME_LIGHT:
      return Light_Theme;
    case ENUM_THEME_DARK:
      return Dark_Theme;
    default:
      return Light_Theme;
  }
}
