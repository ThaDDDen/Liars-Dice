import { Formik } from "formik";
import React, { useState } from "react";
import { View } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import styled from "styled-components/native";
import { useConnection } from "../../contexts/ConnectionContext";
import { useSnackBar } from "../../contexts/SnackContext";
import { useUser } from "../../contexts/UserContext";
import { GameSettings } from "../../types/types";
import { INVOKE_CREATE_GAME } from "../../utils/constants";
import Background from "../layout/Background";
import ContentCard from "../layout/ContentCard";
import SettingsHeader from "./assets/GameSettingsHeader";
import DicePicker from "./DicePicker";
import PlayerPicker from "./PlayerPicker";

const CreateGame = () => {
  const [diceAmount, setDiceAmount] = useState(6);
  const [playerCount, setPlayerCount] = useState(5);
  const { setResponseMessage } = useSnackBar();
  const { connection } = useConnection();
  const { currentUser } = useUser();

  return (
    <Background>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <SettingsHeader />
      </View>
      <SettingsContainer>
        <Formik
          initialValues={{ GameName: "" }}
          onSubmit={(values) => {
            if (values.GameName && values.GameName.length >= 3 && values.GameName.length <= 10) {
              connection.invoke(
                INVOKE_CREATE_GAME,
                { gameName: values.GameName, diceCount: diceAmount, playerCount: playerCount } as GameSettings,
                currentUser
              );
            } else {
              setResponseMessage({ status: "Error", message: "The game name must be between 3-10 characters long." });
            }
          }}
        >
          {({ handleChange, handleSubmit, values, errors }) => {
            return (
              <>
                <ContentCard title="Game name">
                  <Input value={values.GameName} onChangeText={handleChange("GameName")} />
                </ContentCard>

                <ContentCard title="Dice count">
                  <DicePicker diceAmount={diceAmount} setDiceAmount={setDiceAmount} />
                </ContentCard>

                <ContentCard title="Player count">
                  <PlayerPicker playerCount={playerCount} setPlayerCount={setPlayerCount} />
                </ContentCard>

                <CreateGameButton mode="contained" uppercase onPress={() => handleSubmit()}>
                  Create Game
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
