import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
      primary: {
        100: "#f2f0f0",//default-->on dark background (text)
        200: "#e0e0e0",
        300: "#c2c2c2",
        400: "#a3a3a3",
        500: "#141414",
        600: "#666666",
        700: "#525252",
        800: "#292929",
        900: "#000000",
      },
      blueAccent: {
        100: "#EEF6FF", //#AFDEFF
        200: "#8FC2FF",
        300: "#6EA7FF",
        400: "#4A8CFF",
        500: "#1373E6", //app-color
        600: "#0052BB",
        700: "#00389A",
        800: "#00217B",
        900: "#151632",
      },
    }
    : {
      primary: {
        100: "#000000",//default-->on light background (text)
        200: "#292929",
        300: "#525252",
        400: "#666666",
        500: "#141414",
        600: "#a3a3a3",
        700: "#c2c2c2",
        800: "#e0e0e0",
        900: "#f2f0f0",
      },
      blueAccent: {
        100: "#151632",
        200: "#00217B",
        300: "#00389A",
        400: "#0052BB",
        500: "#1373E6", //app-color
        600: "#4A8CFF",
        700: "#6EA7FF",
        800: "#8FC2FF",
        900: "#EEF6FF",//#AFDEFF
      },
    }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {// palette values for dark mode
          primary: {
            100: colors.primary[100],
            200: colors.primary[200],
            300: colors.primary[300],
            400: colors.primary[400],
            main: colors.primary[500],
            600: colors.primary[600],
            700: colors.primary[700],
            800: colors.primary[800],
            900: colors.primary[900]
          },
          secondary: {
            100: colors.blueAccent[100],
            200: colors.blueAccent[200],
            300: colors.blueAccent[300],
            400: colors.blueAccent[400],
            main: colors.blueAccent[500],
            600: colors.blueAccent[600],
            700: colors.blueAccent[700],
            800: colors.blueAccent[800],
            900: colors.blueAccent[900]
          },
          neutral: {
            dark: colors.primary[700],
            main: colors.primary[500],
            light: colors.primary[100],
          },
          background: {
            default: colors.primary[900],
          },
        } : {// palette values for light mode
          primary: {
            100: colors.primary[100],
            200: colors.primary[200],
            300: colors.primary[300],
            400: colors.primary[400],
            main: colors.primary[500],
            600: colors.primary[600],
            700: colors.primary[700],
            800: colors.primary[800],
            900: colors.primary[900]
          },
          secondary: {
            100: colors.blueAccent[100],
            200: colors.blueAccent[200],
            300: colors.blueAccent[300],
            400: colors.blueAccent[400],
            main: colors.blueAccent[500],
            600: colors.blueAccent[600],
            700: colors.blueAccent[700],
            800: colors.blueAccent[800],
            900: colors.blueAccent[900]
          },
          neutral: {
            dark: colors.primary[700],
            main: colors.primary[500],
            light: colors.primary[100],
          },
          background: {
            default: "#fcfcfc",
          },
        }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 16, //1rem
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: "4rem", //64px
        color: colors.primary[100],
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: "3rem", //48px
        color: colors.primary[100],
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: "2rem", //36px
        color: colors.primary[100],
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: "1.8rem", //28px
        color: colors.primary[100],
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: "1.3rem", //20px
        color: colors.primary[100],
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: "1rem", //16px
        color: colors.primary[100],
      },
      body1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: "0.9rem", //14px
        color: colors.primary[100],
      },
      body2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: "0.8rem", //12px
        color: colors.primary[100],
      },
      caption: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: "0.6rem",//10px
        color: colors.primary[100],
        "& a": {
          textDecoration: "none",
        },
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => { },
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};