import { Slider } from "@miblanchard/react-native-slider";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface Props {
  betTime: number;
  setBetTime: React.Dispatch<React.SetStateAction<number>>;
}

const BetTimeSlider = ({ betTime, setBetTime }: Props) => {
  return (
    <View style={{ marginTop: 20 }}>
      <Slider
        renderAboveThumbComponent={() => (
          <Text variant="titleMedium" style={{ marginBottom: -2, marginLeft: betTime >= 58 ? -5 : 0 }}>
            {betTime}s
          </Text>
        )}
        step={1}
        value={betTime as number}
        onValueChange={(value) => setBetTime(Number(value))}
        minimumValue={5}
        maximumValue={60}
      />
    </View>
  );
};

export default BetTimeSlider;

const styles = StyleSheet.create({});
