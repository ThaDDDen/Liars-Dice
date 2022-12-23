import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme, Theme as NavigationTheme } from "@react-navigation/native";
import { MD3DarkTheme as PaperDarkTheme, MD3LightTheme as PaperLightTheme, MD3Theme as PaperTheme } from "react-native-paper";

import { ColorSchemeName } from "react-native";

// if we want more themes add in ,"theme1" | "theme2" | "theme3">
export type AppColorSchemeName = Record<keyof ColorSchemeName, "theme1">;

export type Theme = NavigationTheme & PaperTheme;

export const LightTheme: Theme = {
  ...PaperLightTheme,
  ...NavigationLightTheme,
  colors: {
    ...PaperLightTheme.colors,
    ...NavigationLightTheme.colors,
    primary: "rgb(0, 104, 116)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(150, 241, 255)",
    onPrimaryContainer: "rgb(0, 31, 36)",
    secondary: "rgb(74, 98, 103)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(205, 231, 236)",
    onSecondaryContainer: "rgb(5, 31, 35)",
    tertiary: "rgb(82, 94, 125)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(217, 226, 255)",
    onTertiaryContainer: "rgb(14, 27, 55)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(15, 69, 83)",
    onBackground: "rgb(25, 28, 29)",
    surface: "rgb(250, 253, 253)",
    onSurface: "rgb(25, 28, 29)",
    surfaceVariant: "rgb(219, 228, 230)",
    onSurfaceVariant: "rgb(63, 72, 74)",
    outline: "rgb(111, 121, 122)",
    outlineVariant: "rgb(191, 200, 202)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(46, 49, 50)",
    inverseOnSurface: "rgb(239, 241, 241)",
    inversePrimary: "rgb(79, 216, 235)",
    elevation: {
      level0: "transparent",
      level1: "rgb(238, 246, 246)",
      level2: "rgb(230, 241, 242)",
      level3: "rgb(223, 237, 238)",
      level4: "rgb(220, 235, 237)",
      level5: "rgb(215, 232, 234)",
    },
    surfaceDisabled: "rgba(25, 28, 29, 0.12)",
    onSurfaceDisabled: "rgba(25, 28, 29, 0.38)",
    backdrop: "rgba(41, 50, 52, 0.4)",
  },
};

export const DarkTheme: Theme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: "rgb(119, 209, 255)",
    onPrimary: "rgb(0, 53, 73)",
    primaryContainer: "rgb(0, 77, 104)",
    onPrimaryContainer: "rgb(194, 232, 255)",
    secondary: "rgb(181, 201, 215)",
    onSecondary: "rgb(32, 51, 61)",
    secondaryContainer: "rgb(54, 73, 84)",
    onSecondaryContainer: "rgb(209, 229, 243)",
    tertiary: "rgb(201, 193, 234)",
    onTertiary: "rgb(49, 44, 76)",
    tertiaryContainer: "rgb(72, 66, 100)",
    onTertiaryContainer: "rgb(229, 222, 255)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(25, 28, 30)",
    onBackground: "rgb(225, 226, 229)",
    surface: "rgb(25, 28, 30)",
    onSurface: "rgb(225, 226, 229)",
    surfaceVariant: "rgb(65, 72, 77)",
    onSurfaceVariant: "rgb(192, 199, 205)",
    outline: "rgb(138, 146, 151)",
    inverseSurface: "rgb(225, 226, 229)",
    inverseOnSurface: "rgb(46, 49, 51)",
    inversePrimary: "rgb(0, 102, 136)",
    elevation: {
      level0: "transparent",
      level1: "rgb(30, 37, 41)",
      level2: "rgb(33, 43, 48)",
      level3: "rgb(35, 48, 55)",
      level4: "rgb(36, 50, 57)",
      level5: "rgb(38, 53, 62)",
    },
    surfaceDisabled: "rgba(225, 226, 229, 0.12)",
    onSurfaceDisabled: "rgba(225, 226, 229, 0.38)",
    backdrop: "rgba(42, 49, 54, 0.4)",
  },
};

export const Theme1: Theme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: "rgb(136, 212, 152)",
    onPrimary: "rgb(24, 56, 0)",
    primaryContainer: "rgb(26, 147, 111)", // color of active bottomTab
    onPrimaryContainer: "rgb(170, 247, 112)",
    secondary: "rgb(190, 203, 174)", // rgb(190, 203, 174)
    onSecondary: "rgb(41, 52, 32)",
    secondaryContainer: "rgb(89, 149, 237)", // the color on container of view inside view. ex. LobbyChatWindow, Generate avatar button
    onSecondaryContainer: "rgb(255, 173, 5)", // the color of text on secondarycontainer
    tertiary: "rgb(160, 207, 206)",
    onTertiary: "rgb(0, 55, 54)",
    tertiaryContainer: "rgb(30, 78, 77)",
    onTertiaryContainer: "rgb(187, 236, 234)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(17, 75, 95)",
    onBackground: "rgb(227, 227, 220)",
    surface: "rgb(26, 147, 111)",
    onSurface: "rgb(227, 227, 220)", // rgb(107, 39, 55) // rgb(227, 227, 220)OLD
    surfaceVariant: "rgb(68, 72, 62)",
    onSurfaceVariant: "rgb(196, 200, 186)",
    outline: "rgb(142, 146, 134)",
    outlineVariant: "rgb(68, 72, 62)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(227, 227, 220)",
    inverseOnSurface: "rgb(47, 49, 44)",
    inversePrimary: "rgb(51, 107, 0)",
    elevation: {
      //rgb(26, 147, 111) surface
      level0: "transparent",
      level1: "rgb(32, 157, 114)", //surface(+6,+10,+3)
      level2: "rgb(35, 165, 31)", //level1(+3,+5,+2)
      level3: "rgb(39, 171, 34)", //level2(+4, +6, +3)
      level4: "rgb(40, 173, 35)", //level3(+1,+2,+1)
      level5: "rgb(42, 177, 36)", //level4(+2,+4,+1)
    },
    surfaceDisabled: "rgba(227, 227, 220, 0.12)",
    onSurfaceDisabled: "rgba(227, 227, 220, 0.38)",
    backdrop: "rgba(45, 50, 40, 0.4)",
  },
};

export function getTheme(scheme: AppColorSchemeName) {
  switch (scheme) {
    case "dark":
      return DarkTheme;
    case "light":
      return LightTheme;
    case "theme1":
      return Theme1;
  }
}
