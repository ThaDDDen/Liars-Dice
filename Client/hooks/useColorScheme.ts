import { useColorScheme as _useColorScheme } from "react-native";
import { AppColorSchemeName } from "../theme";

export default function useColorScheme(theme?: AppColorSchemeName): NonNullable<AppColorSchemeName> {
  const colorScheme = _useColorScheme() as NonNullable<AppColorSchemeName>;
  if (theme === "flashbang") return "flashbang";
  else if (theme === "twilight") return "twilight";
  else if (theme === "moss") return "moss";
  else if (theme === "mocca") return "mocca";
  else return colorScheme;
}
