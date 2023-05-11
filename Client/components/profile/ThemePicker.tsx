import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";
import { useTheme as contextTheme } from "../../contexts/ThemeContext";

const ThemePicker = () => {
  const { theme, setTheme } = contextTheme();
  const [selectedTheme, setSelectedTheme] = useState(1);
  const { colors } = useTheme();

  useEffect(() => {
    if (selectedTheme === themes.length) setSelectedTheme(0);
    if (selectedTheme < 0) setSelectedTheme(themes.length);
  }, [selectedTheme]);

  //add the new theme name in this array
  const themes = ["flashbang", "twilight", "moss", "mocca"];
  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
      <IconButton
        icon="arrow-left-bold-circle-outline"
        iconColor={colors.secondary}
        style={{ margin: 0 }}
        size={30}
        onPress={() => {
          setSelectedTheme((prev) => prev + 1);
          setTheme(themes[selectedTheme]);
        }}
      />
      <Text variant="titleLarge" style={{ color: colors.secondary }}>
        {theme.toUpperCase()}
      </Text>
      <IconButton
        icon="arrow-right-bold-circle-outline"
        iconColor={colors.secondary}
        style={{ margin: 0 }}
        size={30}
        onPress={() => {
          setSelectedTheme((prev) => prev + 1);
          setTheme(themes[selectedTheme]);
        }}
      />
    </View>
  );
};

export default ThemePicker;
