import { Formik } from "formik";
import React, { useState } from "react";
import styled from "styled-components/native";
import { useConnection } from "../../contexts/ConnectionContext";
import { useSnackBar } from "../../contexts/SnackContext";
import { useUser } from "../../contexts/UserContext";
import { GameSettings } from "../../types/types";
import { INVOKE_CREATE_GAME } from "../../utils/constants";
import Background from "../layout/Background";
import Button from "../layout/Button";
import ContentCard from "../layout/ContentCard";
import GameSettingsHeader from "../layout/GameSettingsHeader";
import DicePicker from "./game-settings/DicePicker";
import PlayerPicker from "./game-settings/PlayerPicker";

const CreateGame = () => {
  const [diceAmount, setDiceAmount] = useState(6);
  const [playerCount, setPlayerCount] = useState(5);
  const { setResponseMessage } = useSnackBar();
  const { connection } = useConnection();
  const { currentUser } = useUser();

  return (
    <Background>
      <GameSettingsHeader />
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
                  <InputContainer>
                    <Input value={values.GameName} onChangeText={handleChange("GameName")} />
                  </InputContainer>
                </ContentCard>

                <ContentCard title="Dice count">
                  <DicePicker diceAmount={diceAmount} setDiceAmount={setDiceAmount} />
                </ContentCard>

                <ContentCard title="Player count">
                  <PlayerPicker playerCount={playerCount} setPlayerCount={setPlayerCount} />
                </ContentCard>

                <Button title={"Create Game"} mode={"contained"} onPress={() => handleSubmit()} styles={{ marginTop: 10 }} />
              </>
            );
          }}
        </Formik>
      </SettingsContainer>
    </Background>
  );
};

export default CreateGame;

const SettingsContainer = styled.View`
  padding: 10px;
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
