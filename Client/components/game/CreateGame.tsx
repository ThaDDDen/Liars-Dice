import { Formik } from "formik";
import React, { useState } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { useConnection } from "../../contexts/ConnectionContext";
import { useGame } from "../../contexts/GameContext";
import { useUser } from "../../contexts/UserContext";
import { GameSettings } from "../../types/types";
import Background from "../layout/Background";
import SmallDice from "./SmallDice";

const CreateGame = () => {
  const [createGame, setCreateGame] = useState(false);
  const [joimGame, setJoinGame] = useState(false);
  const [diceAmount, setDiceAmount] = useState(6);
  const { connection } = useConnection();
  const { currentUser } = useUser();
  const [showGame, setShowGame] = useState(false);
  const { game } = useGame();

  return (
    <Background>
      <ButtonContainer>
        <CreateGameButton
          onPress={() => {
            setCreateGame((prev) => !prev), setJoinGame(false);
            2;
          }}
        >
          <Text>Create Game</Text>
        </CreateGameButton>
        <JoinGameButton
          onPress={() => {
            setJoinGame((prev) => !prev), setCreateGame(false);
          }}
        >
          <Text>Join Game</Text>
        </JoinGameButton>
      </ButtonContainer>
      {createGame && (
        <SettingsContainer>
          <Formik
            initialValues={{ GameName: "", dice: 6 }}
            onSubmit={(values) => {
              connection.invoke("CreateGame", { gameName: values.GameName, diceCount: diceAmount, playerCount: 5 } as GameSettings, currentUser),
                setShowGame(true);
            }}
          >
            {({ handleChange, handleSubmit, values, errors }) => {
              return (
                <>
                  <Input placeholder="Game name" value={values.GameName} onChangeText={handleChange("GameName")} />

                  <DiceSettings>
                    <RemoveDiceButton onPress={() => diceAmount !== 1 && setDiceAmount((prev) => prev - 1)}>
                      <Text>-</Text>
                    </RemoveDiceButton>
                    <DiceContainer>
                      <>
                        {Array.from({ length: diceAmount }, (value, key) => (
                          <SmallDice key={key} />
                        ))}
                      </>
                    </DiceContainer>
                    <AddDiceButton onPress={() => diceAmount !== 6 && setDiceAmount((prev) => prev + 1)}>
                      <Text>+</Text>
                    </AddDiceButton>
                    {game && <Text>{game.gameName}</Text>}
                  </DiceSettings>

                  <CreateGameButton onPress={() => handleSubmit()}>
                    <Text>Create Game</Text>
                  </CreateGameButton>
                </>
              );
            }}
          </Formik>
        </SettingsContainer>
      )}
      {joimGame && (
        <View>
          <Text>JoinGame</Text>
          <Formik
            initialValues={{ GameName: "" }}
            onSubmit={(values) => {
              connection.invoke("JoinGame", currentUser, values.GameName);
            }}
          >
            {({ handleChange, handleSubmit, values, errors }) => {
              return (
                <>
                  <Input placeholder="Game name" value={values.GameName} onChangeText={handleChange("GameName")} />
                  <CreateGameButton onPress={() => handleSubmit()}>
                    <Text>Join Game</Text>
                  </CreateGameButton>
                </>
              );
            }}
          </Formik>
        </View>
      )}
    </Background>
  );
};

export default CreateGame;

const ButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  /* background: red; ; */
`;
const CreateGameButton = styled.Pressable`
  height: 40px;
  width: 100px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  background-color: lightseagreen;
  margin: 0px 10px;
`;

const JoinGameButton = styled.Pressable`
  height: 40px;
  width: 100px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  background-color: lightgoldenrodyellow;
  margin: 0px 10px;
`;

const SettingsContainer = styled.View`
  padding: 20px;
`;
const Input = styled.TextInput`
  background: white;
  border-radius: 5px;
  border: solid 1px black;
  padding: 8px;
`;

const DiceSettings = styled.View`
  /* background: lightcoral; */
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0;
`;

const DiceContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* margin: 0 25px; */
  min-width: 55%;
`;

const AddDiceButton = styled.Pressable`
  background-color: green;
  height: 50px;
  width: 50px;
  padding: 10px 20px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

const RemoveDiceButton = styled.Pressable`
  background-color: red;
  height: 50px;
  width: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;
