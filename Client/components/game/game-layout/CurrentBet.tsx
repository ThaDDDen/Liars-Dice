import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { GameBet } from "../../../types/types";
import ContentCard from "../../layout/ContentCard";
import UserAvatar from "../../Lobby/UserAvatar";
import ValueDice from "../game-assets/ValueDice";

interface Props {
  bet: GameBet;
}

const CurrentBet = ({ bet }: Props) => {
  return (
    <ContentCard title={`${bet.better.userName} raised`}>
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4, justifyContent: "space-around" }}>
        <View style={{ marginLeft: 10 }}>
          <UserAvatar avatarCode={bet.better.avatarCode} size={80} />
        </View>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Text variant="displaySmall">{bet.diceAmount} x </Text>
            <ValueDice value={bet.diceValue} size={40} />
          </View>
        </View>
      </View>
    </ContentCard>
  );
};

export default CurrentBet;

const styles = StyleSheet.create({});
