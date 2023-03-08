import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme, Theme as NavigationTheme } from "@react-navigation/native";
import { configureFonts, MD3DarkTheme as PaperDarkTheme, MD3LightTheme as PaperLightTheme, MD3Theme as PaperTheme } from "react-native-paper";
// import {MD3Dar}

import { ColorSchemeName, Platform } from "react-native";

// if we want more themes add in ,"theme1" | "theme2" | "theme3">
export type AppColorSchemeName = Record<keyof ColorSchemeName, "theme1" | "thadtheme">;

export type Theme = NavigationTheme & PaperTheme;

Platform.select({
  web: 'Manrope-Regular, "Helvetica Neue", Helvetica, Arial, sans-serif',
  ios: "System",
  default: "sans-serif", // and 'sans-serif-medium' for `fontWeight:"500"`
});

const fontConfig = {
  fontFamily: "Manrope-Regular",
  titleSmall: {
    fontFamily: "Manrope-Medium",
  },
  titleMedium: {
    fontFamily: "Manrope-Medium",
  },
  labelSmall: {
    fontFamily: "Manrope-Medium",
    letterSpacing: 1,
    fontSize: 13,
  },
  labelMedium: {
    fontFamily: "Manrope-Bold",
    fontSize: 16,
  },
  labelLarge: {
    fontFamily: "Manrope-Medium",
  },
};

export const LightTheme: Theme = {
  ...PaperLightTheme,
  ...NavigationLightTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...PaperLightTheme.colors,
    ...NavigationLightTheme.colors,
    primary: "rgb(145, 66, 119)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(255, 216, 236)",
    onPrimaryContainer: "rgb(59, 0, 45)",
    secondary: "rgb(112, 87, 101)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(251, 217, 234)",
    onSecondaryContainer: "rgb(41, 21, 33)",
    tertiary: "rgb(128, 84, 62)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(255, 219, 203)",
    onTertiaryContainer: "rgb(49, 19, 3)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(255, 251, 255)",
    onBackground: "rgb(31, 26, 29)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(31, 26, 29)",
    surfaceVariant: "rgb(240, 222, 229)",
    onSurfaceVariant: "rgb(79, 68, 73)",
    outline: "rgb(129, 115, 122)",
    outlineVariant: "rgb(211, 194, 201)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(52, 47, 49)",
    inverseOnSurface: "rgb(249, 238, 241)",
    inversePrimary: "rgb(255, 174, 222)",
    elevation: {
      level0: "transparent",
      level1: "rgb(250, 242, 248)",
      level2: "rgb(246, 236, 244)",
      level3: "rgb(243, 231, 240)",
      level4: "rgb(242, 229, 239)",
      level5: "rgb(240, 225, 236)",
    },
    surfaceDisabled: "rgba(31, 26, 29, 0.12)",
    onSurfaceDisabled: "rgba(31, 26, 29, 0.38)",
    backdrop: "rgba(56, 45, 51, 0.4)",
  },
};

export const DarkTheme: Theme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: "rgb(255, 120, 42)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(22, 21, 69)",
    onPrimaryContainer: "rgb(255, 255, 255)",
    secondary: "rgb(14, 206, 159)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(87, 64, 77)",
    onSecondaryContainer: "rgb(251, 217, 234)",
    tertiary: "rgb(244, 186, 158)",
    onTertiary: "rgb(75, 39, 20)",
    tertiaryContainer: "rgb(101, 61, 40)",
    onTertiaryContainer: "rgb(255, 219, 203)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(1, 2, 40)",
    onBackground: "rgb(234, 224, 227)",
    surface: "rgb(53, 50, 113)",
    onSurface: "rgb(234, 224, 227)",
    surfaceVariant: "rgb(22, 21, 69)",
    onSurfaceVariant: "rgb(211, 194, 201)",
    outline: "rgb(156, 141, 147)",
    outlineVariant: "rgb(79, 68, 73)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(234, 224, 227)",
    inverseOnSurface: "rgb(52, 47, 49)",
    inversePrimary: "rgb(145, 66, 119)",
    elevation: {
      level0: "transparent",
      level1: "rgb(53, 50, 113)",
      level2: "rgb(49, 38, 44)",
      level3: "rgb(56, 42, 50)",
      level4: "rgb(58, 44, 52)",
      level5: "rgb(62, 47, 56)",
    },
    surfaceDisabled: "rgba(234, 224, 227, 0.12)",
    onSurfaceDisabled: "rgba(234, 224, 227, 0.38)",
    backdrop: "rgba(56, 45, 51, 0.4)",
  },
};

export const Theme1: Theme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  fonts: configureFonts({ config: fontConfig }),
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

export const ThadTheme: Theme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: "rgb(71, 129, 137)",
    onPrimary: "rgb(255,255,255)",
    primaryContainer: "rgb(26, 147, 255)", // color of active bottomTab
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
    background: "rgb(17, 37, 48)",
    onBackground: "rgb(227, 227, 220)",
    surface: "rgb(183, 91, 140)",
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
      level0: "transparent",
      level1: "rgb(188, 100, 151)", // +5, +9, +11
      level2: "rgb(191, 106, 158)", // +3, +6, +7
      level3: "rgb(193, 111, 165)", // +2, +5, +7
      level4: "rgb(194, 113, 167)", // +1, +2, +2
      level5: "rgb(196, 116, 172)", // +2, +3, +5
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
    case "thadtheme":
      return ThadTheme;
  }
}
