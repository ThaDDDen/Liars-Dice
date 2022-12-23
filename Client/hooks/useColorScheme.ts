import { useColorScheme as _useColorScheme } from "react-native";
import { AppColorSchemeName } from "../theme";

export default function useColorScheme(theme?: AppColorSchemeName): NonNullable<AppColorSchemeName> {
  const colorScheme = _useColorScheme() as NonNullable<AppColorSchemeName>;
  if (theme === "light") return "light";
  else if (theme === "dark") return "dark";
  else if (theme === "theme1") return "theme1";
  else if (theme === "thadtheme") return "thadtheme";
  else return colorScheme;
}
