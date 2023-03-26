import React, { useState } from "react";
import { Image, LayoutChangeEvent, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useTheme } from "react-native-paper";
import diceOne from "../../assets/images/white_dice/white_dice_1.png";
import diceTwo from "../../assets/images/white_dice/white_dice_2.png";
import diceThree from "../../assets/images/white_dice/white_dice_3.png";
import diceFour from "../../assets/images/white_dice/white_dice_4.png";
import diceFive from "../../assets/images/white_dice/white_dice_5.png";
import diceSix from "../../assets/images/white_dice/white_dice_6.png";
import { Statistics as StatisticsType } from "../../types/types";

interface Props {
  statistics: StatisticsType;
}

const Statistics = ({ statistics }: Props) => {
  const { colors } = useTheme();
  const [containerWidth, setContainerWidth] = useState(0);

  const rolledDice = [statistics.ones, statistics.twoes, statistics.threes, statistics.fours, statistics.fives, statistics.sixes];

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
    // height: 200,
    backgroundGradientFrom: colors.primaryContainer,
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: colors.primaryContainer,
    backgroundGradientToOpacity: 1,

    fillShadowGradientFrom: colors.primary,
    fillShadowGradientFromOpacity: 1,
    fillShadowGradientFromOffset: 1,
    fillShadowGradientToOpacity: 1,
    fillShadowGradientToOffset: 1,
    fillShadowGradientTo: colors.onPrimary,
    propsForLabels: {
      fontSize: 17,
    },
    color: () => colors.onBackground,
    strokeWidth: 0, // optional, default 3
    barPercentage: 1,
    decimalPlaces: 0,
    barRadius: 5,
  };

  const onLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
    console.log(containerWidth);
  };

  return (
    <>
      {/* <View style={{ marginLeft: 10, marginTop: 10, flexDirection: "row", alignItems: "baseline" }}>
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
      </View> */}
      <View style={{ justifyContent: "center", alignItems: "center" }} onLayout={onLayout}>
        {/* <Text>Dice statistics</Text> */}
        <BarChart
          style={{ borderRadius: 10, paddingRight: 0 }}
          data={data2}
          width={containerWidth}
          height={200}
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          fromZero
          yAxisLabel=""
          yAxisSuffix=""
          // xLabelsOffset={-8}
          // segments={15}
          showBarTops={false}
          withInnerLines={false}
          withHorizontalLabels={false}
          withVerticalLabels={false}
          showValuesOnTopOfBars
          withCustomBarColorFromData={false}
          flatColor={true}
        />
        <View style={{ flexDirection: "row", width: containerWidth, marginTop: -30 }}>
          <Image source={diceOne} style={{ width: 30, height: 30, marginHorizontal: containerWidth / 23 }} />
          <Image source={diceTwo} style={{ width: 30, height: 30, marginHorizontal: containerWidth / 23 }} />
          <Image source={diceThree} style={{ width: 30, height: 30, marginHorizontal: containerWidth / 23 }} />
          <Image source={diceFour} style={{ width: 30, height: 30, marginHorizontal: containerWidth / 23 }} />
          <Image source={diceFive} style={{ width: 30, height: 30, marginHorizontal: containerWidth / 23 }} />
          <Image source={diceSix} style={{ width: 30, height: 30, marginHorizontal: containerWidth / 23 }} />
        </View>
      </View>
    </>
  );
};

export default Statistics;
