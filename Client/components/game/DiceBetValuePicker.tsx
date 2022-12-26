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

  //IN GET INDEX dicePickerValue have differentLengths all the time depending on what the dicePickerAmount is.
  // ex defaultValue: 6 can sometimes have index 0 if previous player placed a bet of 2 x 6.
  // and if you put dicePickerAmount on the same Amount of dice as the prev better index of defaultValue becomes 0.

  //some solution thought, when changeing amount to the same amount as the currentBet.diceAmount we
  //should not change the index in the value picker somehow.
  //maybe not setThe Values onCHange in the pickers. set the values from the picker on the betbutton and invoke
  //still logic shiet with the pickers

  const getIndex = () => {
    const index = dicePickerValue.findIndex((v) => v === defaultValue);

    dicePickerValue.forEach((element, index) => {
      console.log("element in array: " + " " + element + " " + "index: " + index);
    });

    //WIERD DEBUGGING
    switch (defaultValue) {
      case 6: {
        const indexof = dicePickerValue.findIndex((v) => v == 6);

        console.log(`index of 6": ${indexof}`);
        return indexof;
      }
      case 5: {
        const indexof = dicePickerValue.findIndex((v) => v == 5);

        console.log(`index of 5": ${indexof}`);
        return indexof;
      }
      case 4: {
        const indexof = dicePickerValue.findIndex((v) => v == 4);

        console.log(`index of 4": ${indexof}`);
        return indexof;
      }
      case 3: {
        const indexof = dicePickerValue.findIndex((v) => v == 3);

        console.log(`index of 3": ${indexof}`);
        return indexof;
      }
      case 2: {
        const indexof = dicePickerValue.findIndex((v) => v == 2);

        console.log(`index of 2": ${indexof}`);
        return indexof;
      }
    }

    // return index === 4 ? 0 : index;
  };

  return (
    <View style={{ height: 70, width: 40 }}>
      <ScrollPicker
        dataSource={dicePickerValue}
        selectedIndex={getIndex()}
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
