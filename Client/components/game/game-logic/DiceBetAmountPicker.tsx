import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import ScrollPicker from "react-native-wheel-scrollview-picker";

interface Props {
  setDiceAmount: React.Dispatch<React.SetStateAction<number>>;
  dicePickerAmount: number[];
}

const DiceBetAmountPicker = ({ setDiceAmount, dicePickerAmount }: Props) => {
  const { colors } = useTheme();

  return (
    <View style={{ height: 70, width: 40 }}>
      <ScrollPicker
        dataSource={dicePickerAmount}
        selectedIndex={0}
        renderItem={(dice, index) => {
          return <Text key={index}>{dice}</Text>;
        }}
        onValueChange={(dice, selectedIndex) => {
          setDiceAmount(dice as number);
        }}
        wrapperHeight={70}
        wrapperColor="transparent"
        itemHeight={25}
        highlightColor={colors.primary}
        highlightBorderWidth={1}
      />
    </View>
  );
};

export default DiceBetAmountPicker;
