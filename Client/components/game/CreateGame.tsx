import { Formik } from "formik";
import React, { useState } from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useConnection } from "../../contexts/ConnectionContext";
import { useSnackBar } from "../../contexts/SnackContext";
import { useUser } from "../../contexts/UserContext";
import { GameSettings } from "../../types/types";
import { INVOKE_CREATE_GAME } from "../../utils/constants";
import Background from "../layout/Background";
import Button from "../layout/Button";
import ContentCard from "../layout/ContentCard";
import GameSettingsHeader from "./game-assets/GameSettingsHeader";
import BetTimeSlider from "./game-settings/BetTimeSlider";
import DicePicker from "./game-settings/DicePicker";
import PlayerPicker from "./game-settings/PlayerPicker";

const CreateGame = () => {
  const [diceAmount, setDiceAmount] = useState(6);
  const [playerCount, setPlayerCount] = useState(5);
  const [betTime, setBetTime] = useState<number>(30);
  const { setResponseMessage } = useSnackBar();
  const { connection } = useConnection();
  const { currentUser } = useUser();
  const { colors } = useTheme();

  return (
    <Background>
      <GameSettingsHeader />

      <SettingsContainer>
        <Formik
          initialValues={{ GameName: `${currentUser.userName}'s game` }}
          onSubmit={(values) => {
            if (values.GameName && values.GameName.length >= 3 && values.GameName.length <= 15) {
              connection.invoke(
                INVOKE_CREATE_GAME,
                { gameName: values.GameName, diceCount: diceAmount, playerCount: playerCount, betTime: betTime } as GameSettings,
                currentUser
              );
            } else {
              setResponseMessage({ status: "Error", message: "The game name must be between 3-10 characters long." });
            }
          }}
        >
          {({ handleChange, handleSubmit, values }) => {
            return (
              <ContentBackground backgroundColor={colors.surface}>
                <ContentHeader backgroundColor={colors.primaryContainer}>
                  <Text style={{ fontFamily: "Manrope-Regular", fontSize: 15 }}>GAME SETTINGS</Text>
                </ContentHeader>
                <View>
                  <ContentCard compact borderColor={colors.primaryContainer} label="Game name">
                    <InputContainer>
                      <Input value={values.GameName} onChangeText={handleChange("GameName")} />
                    </InputContainer>
                  </ContentCard>

                  <ContentCard compact borderColor={colors.primaryContainer} label="Dice count">
                    <DicePicker diceAmount={diceAmount} setDiceAmount={setDiceAmount} />
                  </ContentCard>

                  <ContentCard compact borderColor={colors.primaryContainer} label="Betting time">
                    <BetTimeSlider betTime={betTime} setBetTime={setBetTime} />
                  </ContentCard>

                  <ContentCard compact borderColor={colors.primaryContainer} label="Player count">
                    <PlayerPicker playerCount={playerCount} setPlayerCount={setPlayerCount} />
                  </ContentCard>
                </View>

                <Button
                  title={"Create Game"}
                  mode={"contained"}
                  buttonColor={colors.primary}
                  onPress={() => handleSubmit()}
                  styles={{ marginHorizontal: 70, marginBottom: 30, marginTop: 10 }}
                />
              </ContentBackground>
            );
          }}
        </Formik>
      </SettingsContainer>
    </Background>
  );
};

export default CreateGame;

const ContentBackground = styled.View<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  margin: -20px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  bottom: 0;
`;

const ContentHeader = styled.View<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 15px;
  margin: -15px 10px 15px 10px;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
`;

const SettingsContainer = styled.View`
  padding: 10px;
  flex: 1;
  flex-direction: column-reverse;
`;

const InputContainer = styled.View`
  flex-direction: row;
  border: 1px solid black;
  border-radius: 5px;
  background: white;
  margin: 0 8px;
  margin-top: 10px;
`;

const Input = styled.TextInput`
  flex: 1;
  padding: 5px 10px;
  font-size: 18px;
`;
