import { Slider } from "@miblanchard/react-native-slider";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import styled from "styled-components/native";

interface Props {
  betTime: number;
  setBetTime: React.Dispatch<React.SetStateAction<number>>;
}

const BetTimeSlider = ({ betTime, setBetTime }: Props) => {
  return (
    <Container>
      <View style={{ flex: 1 }}>
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
            maximumValue={1000}
          />
        </View>
      </View>
    </Container>
  );
};

export default BetTimeSlider;

const Container = styled.View`
  flex-direction: row;
  padding-left: 5px;
  border-radius: 10px;
  align-items: center;
  margin-bottom: 10px;
`;
