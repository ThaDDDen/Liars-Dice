import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Text, useTheme } from "react-native-paper";
import { useUser } from "../../contexts/UserContext";

const Statistics = () => {
  const { currentUser } = useUser();
  const { colors } = useTheme();

  const rolledDice = [
    currentUser.statistics.ones,
    currentUser.statistics.twoes,
    currentUser.statistics.threes,
    currentUser.statistics.fours,
    currentUser.statistics.fives,
    currentUser.statistics.sixes,
  ];

  const data2 = {
    labels: ["ones", "twos", "threes", "fours", "fives", "sixes"],
    datasets: [
      {
        data: rolledDice,
        colors: [
          // (opacity = 1) => `#000000`,
          // (opacity = 0.2) => `#000000`,
          // (opacity = 1) => `#FFFFFF`,
          // (opacity = 1) => `#FFFFFF`,
          // (opacity = 1) => `#FFFFFF`,
          // (opacity = 1) => `#FFFFFF`,
          // (opacity = 1) => `#FFFFFF`,
          // (opacity = 1) => `#FFFFFF`,
          // (opacity = 1) => `#FFFFFF`,
        ],
      },
    ],
  };

  const chartConfig = {
    height: 200,
    backgroundGradientFrom: colors.surface,
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: colors.primary,
    backgroundGradientToOpacity: 0.4,

    fillShadowGradientFrom: colors.primary,
    fillShadowGradientFromOpacity: 1,
    fillShadowGradientFromOffset: 1,
    fillShadowGradientToOpacity: 1,
    fillShadowGradientToOffset: 1,
    fillShadowGradientTo: colors.onPrimary,
    color: (opacity = 1) => colors.onBackground,
    strokeWidth: 0, // optional, default 3
    barPercentage: 0.8,
    decimalPlaces: 0,
    propsForBackgroundLines: {
      strokeWidth: 0.2,
      stroke: colors.primary,
      strokeDasharray: "0",
    },
    barRadius: 5,
  };

  return (
    <>
      <View style={{ marginLeft: 10, marginTop: 10, flexDirection: "row", alignItems: "baseline" }}>
        <Entypo name="trophy" size={30} color="#FFFF47" />
        <Text style={{ marginLeft: 10, marginRight: "auto" }} variant="headlineSmall">
          Games won
        </Text>
        <Text style={{ marginRight: 15 }} variant="headlineSmall">
          {currentUser.statistics.gamesWon}
        </Text>
      </View>
      <View style={{ marginLeft: 10, marginTop: 10, paddingLeft: 3, flexDirection: "row", alignItems: "baseline" }}>
        <FontAwesome5 name="dice-five" size={30} color="#ffafcc" />
        <Text style={{ marginLeft: 10, marginRight: "auto" }} variant="headlineSmall">
          Games played
        </Text>
        <Text style={{ marginRight: 15 }} variant="headlineSmall">
          {currentUser.statistics.gamesPlayed}
        </Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>Dice statistics</Text>
        <BarChart
          style={{ borderRadius: 10, paddingRight: 0 }}
          data={data2}
          width={340}
          height={230}
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          fromZero
          yAxisLabel=""
          yAxisSuffix=""
          xLabelsOffset={-8}
          segments={10}
          showBarTops={false}
          withInnerLines={true}
          withHorizontalLabels={false}
          showValuesOnTopOfBars
          withCustomBarColorFromData={false}
          flatColor={true}
        />
      </View>
    </>
  );
};

export default Statistics;
