import React from "react";
import { Dimensions, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import table from "../../../assets/images/table.png";
import { THREE_SEAT_TABLE } from "../../../utils/constants";
import PlayerCard from "../game-layout/PlayerCard";
import { TableBackground, TableOverlay } from "../game-layout/Table";

const Calling = () => {
  const { colors } = useTheme();
  const names = ["Sture", "Göte", "Lennart"];
  return (
    <Container backgroundColor={colors.secondary}>
      <Text variant="displaySmall" style={{ fontFamily: "Manrope-SemiBold" }}>
        Calling
      </Text>
      <Text variant="bodyLarge" style={{ fontFamily: "Manrope-SemiBold", marginVertical: 10, textAlign: "center" }}>
        When a player calls the previous bid, all players reveal their dice. If the called bid is correct (i.e., there are at least as many dice of
        the relevant value as the bid suggests), the caller loses a dice. If the bid is incorrect, the player who made the bid loses a dice instead.
        The winner gets to start the following round!
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
              {index === 2 && (
                <ChatBubble color={colors.primary}>
                  <ChatBubbleArrow color={colors.primary}></ChatBubbleArrow>
                  <Text style={{ fontFamily: "Manrope-Bold", fontSize: 15 }}>CALL!</Text>
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

export default Calling;

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
