import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";

const ProfileStatistics = () => {
  const { colors } = useTheme();
  return (
    <StatisticsContainer backgroundColor={colors.primary}>
      <Text style={{ color: colors.onPrimary, marginLeft: 10 }} variant="labelLarge">
        Statistics
      </Text>
      <View style={{ marginLeft: 10, marginTop: 10, flexDirection: "row", alignItems: "baseline" }}>
        <Entypo name="trophy" size={30} color="#FFFF47" />
        <Text style={{ color: colors.onPrimary, marginLeft: 10, marginRight: "auto" }} variant="headlineSmall">
          Games won
        </Text>
        <Text style={{ color: colors.onPrimary, marginRight: 15 }} variant="headlineSmall">
          4
        </Text>
      </View>
      <View style={{ marginLeft: 10, marginTop: 10, paddingLeft: 3, flexDirection: "row", alignItems: "baseline" }}>
        <FontAwesome5 name="dice-five" size={30} color="#ffafcc" />
        <Text style={{ color: colors.onPrimary, marginLeft: 10, marginRight: "auto" }} variant="headlineSmall">
          Games played
        </Text>
        <Text style={{ color: colors.onPrimary, marginRight: 15 }} variant="headlineSmall">
          18
        </Text>
      </View>
    </StatisticsContainer>
  );
};

export default ProfileStatistics;

const StatisticsContainer = styled.View<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 10px 5px;
  border-radius: 10px;
  margin: 5px 0;
`;
