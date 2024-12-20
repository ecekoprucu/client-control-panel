/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Theme,
  ThemeOptions,
  Palette,
  PaletteOptions,
} from "@mui/material/styles";

interface ExtraPalette {
  orange: {
    main: string;
    light?: string;
    dark?: string;
    contrastText?: string;
  };
}

interface ExtraTheme {
  foo?: {
    bar?: boolean;
  };
}

/**
 * Adding on extra palette properties
 */
declare module "@mui/material/styles/createPalette" {
  // This controls what appears when you use the theme variable inside sx, styled, etc.
  export interface Palette extends ExtraPalette {}
  // This controls what you are allowed to specify in `createTheme`.
  export interface PaletteOptions extends ExtraPalette {}
  // You need both to get the behavior you want.
}

/**
 * Adding on extra theme properties
 */
declare module "@mui/material/styles" {
  // This controls what appears when you use the theme variable inside sx, styled, etc.
  interface Theme extends ExtraTheme {}
  // This controls what you are allowed to specify in `createTheme`.
  interface ThemeOptions extends ExtraTheme {}
  // You need both to get the behavior you want.
}
