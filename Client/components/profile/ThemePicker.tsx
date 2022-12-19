import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";
import { useTheme as contextTheme } from "../../contexts/ThemeContext";

const ThemePicker = () => {
  const { colors } = useTheme();
  const { theme, setTheme } = contextTheme();
  const [selectedTheme, setSelectedTheme] = useState(1);

  useEffect(() => {
    if (selectedTheme === themes.length) setSelectedTheme(0);
    if (selectedTheme < 0) setSelectedTheme(themes.length);
  }, [selectedTheme]);

  const themes = ["light", "dark"];
  return (
    <View>
      <Text variant="labelLarge" style={{ color: colors.onPrimary, alignSelf: "center" }}>
        Theme
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
        <IconButton
          icon="arrow-left-bold-circle-outline"
          iconColor={colors.onPrimary}
          style={{ margin: 0 }}
          size={30}
          onPress={() => {
            setSelectedTheme((prev) => prev + 1);
            setTheme(themes[selectedTheme]);
          }}
        />
        <Text variant="titleLarge" style={{ color: colors.onPrimary }}>
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </Text>
        <IconButton
          icon="arrow-right-bold-circle-outline"
          iconColor={colors.onPrimary}
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

const styles = StyleSheet.create({});
