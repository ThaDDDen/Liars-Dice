import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import ScrollPicker from "react-native-wheel-scrollview-picker";

interface Props {
  setDiceValue: React.Dispatch<React.SetStateAction<2 | 3 | 4 | 5 | 6>>;
  dicePickerValue: number[];
  defaultValue: number;
}

const DiceBetValuePicker = ({ setDiceValue, dicePickerValue, defaultValue }: Props) => {
  const { colors } = useTheme();

  return (
    <View style={{ height: 70, width: 40 }}>
      <ScrollPicker
        dataSource={dicePickerValue}
        selectedIndex={0}
        renderItem={(dice, index) => {
          return <Text key={index}>{dice}</Text>;
        }}
        onValueChange={(dice, selectedIndex) => {
          setDiceValue(dice as 2 | 3 | 4 | 5 | 6);
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

export default DiceBetValuePicker;
