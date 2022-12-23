import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { useTheme as contextTheme } from "../../contexts/ThemeContext";

const ThemePicker = () => {
  const { theme, setTheme } = contextTheme();
  const [selectedTheme, setSelectedTheme] = useState(1);

  useEffect(() => {
    if (selectedTheme === themes.length) setSelectedTheme(0);
    if (selectedTheme < 0) setSelectedTheme(themes.length);
  }, [selectedTheme]);

  //add the new theme name in this array
  const themes = ["light", "dark", "theme1", "thadtheme"];
  return (
    <View>
      <Text variant="labelLarge" style={{ alignSelf: "center" }}>
        Theme
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
        <IconButton
          icon="arrow-left-bold-circle-outline"
          style={{ margin: 0 }}
          size={30}
          onPress={() => {
            setSelectedTheme((prev) => prev + 1);
            setTheme(themes[selectedTheme]);
          }}
        />
        <Text variant="titleLarge">{theme.charAt(0).toUpperCase() + theme.slice(1)}</Text>
        <IconButton
          icon="arrow-right-bold-circle-outline"
          style={{ margin: 0 }}
          size={30}
          onPress={() => {
            setSelectedTheme((prev) => prev + 1);
            setTheme(themes[selectedTheme]);
          }}
        />
      </View>
    </View>
  );
};

export default ThemePicker;
