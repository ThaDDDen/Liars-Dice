import React from "react";
import { Dimensions, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import table from "../../../assets/images/table.png";
import { THREE_SEAT_TABLE } from "../../../utils/constants";
import ValueDice from "../game-assets/ValueDice";
import PlayerCard from "../game-layout/PlayerCard";
import { TableBackground, TableOverlay } from "../game-layout/Table";

const HowToPlay = () => {
  const { colors } = useTheme();
  const names = ["Sture", "Göte", "Lennart"];
  return (
    <Container backgroundColor={colors.primary}>
      <Text variant="displaySmall" style={{ fontFamily: "Manrope-SemiBold" }}>
        How to play
      </Text>
      <Text variant="bodyLarge" style={{ fontFamily: "Manrope-SemiBold", marginVertical: 20, textAlign: "center" }}>
        Liars Dice is a classic dice game that can be played with a 2-8 people and can be enjoyed by players of all ages! The goal of the game is to
        outsmart your opponents by making bids about the number of dice that are showing a certain face value!
      </Text>
      <View>
        <TableBackground
          source={table}
          resizeMode="cover"
          width={Dimensions.get("window").width * 0.7}
          height={Dimensions.get("window").height * 0.35}
        />
        <TableOverlay width={Dimensions.get("window").width * 0.7} height={Dimensions.get("window").height * 0.35}>
          {Array.from({ length: 3 }, (value, index) => (
            <View key={index} style={THREE_SEAT_TABLE[index]}>
              {index === 0 && (
                <ChatBubble color={colors.secondary}>
                  <ChatBubbleArrow color={colors.secondary} />
                  <Text style={{ fontFamily: "Manrope-Bold", fontSize: 15 }}>
                    6 x <ValueDice value={5} size={15} />
                  </Text>
                </ChatBubble>
              )}
              <PlayerCard name={names[index]} />
            </View>
          ))}
        </TableOverlay>
      </View>
    </Container>
  );
};

export default HowToPlay;

const Container = styled.View<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;

const ChatBubble = styled.View<{ color: string }>`
  position: absolute;
  z-index: 5000;
  width: 65px;
  flex-direction: row;
  flex-wrap: nowrap;
  background-color: ${({ color }) => color};
  padding: 5px;
  border-radius: 20px;
  top: -40px;
  left: 15px;
  justify-content: center;
`;

const ChatBubbleArrow = styled.View<{ color: string }>`
  width: 20px;
  height: 20px;
  position: absolute;
  background-color: ${({ color }) => color};
  transform: rotate(60deg);
  bottom: -2px;
  left: 15px;
`;
