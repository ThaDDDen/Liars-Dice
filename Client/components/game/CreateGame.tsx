import { Formik } from "formik";
import React, { useState } from "react";
import { View } from "react-native";
import { Button as PaperButton, IconButton, Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useConnection } from "../../contexts/ConnectionContext";
import { useUser } from "../../contexts/UserContext";
import { GameSettings } from "../../types/types";
import Background from "../layout/Background";
import SettingsHeader from "./assets/GameSettingsHeader";
import SmallDice from "./SmallDice";

const CreateGame = () => {
  const [diceAmount, setDiceAmount] = useState(6);
  const [playerCount, setPlayerCount] = useState(5);
  const { connection } = useConnection();
  const { currentUser } = useUser();
  const { colors } = useTheme();

  const playerCountArray = [1, 2, 3, 4, 5, 6, 7, 8];

  const playerCountSelector = playerCountArray.map((number, index) => {
    return (
      <Text
        key={index}
        variant={number === playerCount ? "headlineLarge" : "headlineMedium"}
        style={{ marginHorizontal: 8, color: number === playerCount ? colors.primary : colors.onSurface }}
      >
        {number}
      </Text>
    );
  });

  return (
    <Background>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <SettingsHeader />
      </View>
      <SettingsContainer>
        <Formik
          initialValues={{ GameName: "", dice: 6 }}
          onSubmit={(values) => {
            connection.invoke("CreateGame", { gameName: values.GameName, diceCount: diceAmount, playerCount: 5 } as GameSettings, currentUser);
          }}
        >
          {({ handleChange, handleSubmit, values, errors }) => {
            return (
              <>
                <Surface style={{ paddingHorizontal: 10, paddingVertical: 10, borderRadius: 10, marginBottom: 10 }}>
                  <Text variant="labelLarge">Game name</Text>
                  <Input value={values.GameName} onChangeText={handleChange("GameName")} />
                </Surface>

                <Surface style={{ paddingHorizontal: 10, paddingVertical: 10, borderRadius: 10, marginBottom: 10 }}>
                  <Text variant="labelLarge">Dice count</Text>
                  <DiceSettings>
                    <IconButton
                      style={{ borderRadius: 5, backgroundColor: colors.surfaceVariant }}
                      icon="minus"
                      size={20}
                      onPress={() => diceAmount !== 1 && setDiceAmount((prev) => prev - 1)}
                    />
                    <DiceContainer>
                      <>
                        {Array.from({ length: diceAmount }, (value, key) => (
                          <SmallDice key={key} />
                        ))}
                      </>
                    </DiceContainer>
                    <IconButton
                      style={{ borderRadius: 5, backgroundColor: colors.surfaceVariant }}
                      icon="plus"
                      size={20}
                      onPress={() => diceAmount !== 6 && setDiceAmount((prev) => prev + 1)}
                    />
                  </DiceSettings>
                </Surface>
                <Surface style={{ paddingHorizontal: 10, paddingVertical: 10, borderRadius: 10, marginBottom: 10 }}>
                  <View>
                    <Text variant="labelLarge">Player count</Text>
                  </View>
                  <PlayerSetting>
                    <IconButton
                      style={{ borderRadius: 5, backgroundColor: colors.surfaceVariant }}
                      icon="minus"
                      size={20}
                      onPress={() => playerCount !== 1 && setPlayerCount((prev) => prev - 1)}
                    />
                    <PlayerContainer>{playerCountSelector}</PlayerContainer>
                    <IconButton
                      style={{ borderRadius: 5, backgroundColor: colors.surfaceVariant }}
                      icon="plus"
                      size={20}
                      onPress={() => playerCount !== 8 && setPlayerCount((prev) => prev + 1)}
                    />
                  </PlayerSetting>
                </Surface>

                <CreateGameButton mode="contained" uppercase onPress={() => handleSubmit()}>
                  <Text>Create Game</Text>
                </CreateGameButton>
              </>
            );
          }}
        </Formik>
      </SettingsContainer>
    </Background>
  );
};

export default CreateGame;

const CreateGameButton = styled(PaperButton)`
  border-radius: 5px;
`;

const SettingsContainer = styled.View`
  padding: 10px;
`;

const Input = styled.TextInput`
  background: white;
  border-radius: 5px;
  border: solid 1px black;
  padding: 8px;
  font-size: 18px;
`;

const DiceSettings = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const DiceContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const PlayerSetting = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const PlayerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
