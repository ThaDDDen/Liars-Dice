import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Dialog, Portal, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useConnection } from "../../contexts/ConnectionContext";
import { useGame } from "../../contexts/GameContext";
import { useUser } from "../../contexts/UserContext";
import { INVOKE_ROLL_DICE, INVOKE_SET_BET } from "../../utils/constants";
import Background from "../layout/Background";
import Button from "../layout/Button";
import OnlineUserCard from "../Lobby/OnlineUserCard";
import ValueDice from "./assets/ValueDice";
import DiceBetAmountPicker from "./DiceBetAmountPicker";
import DiceBetValuePicker from "./DiceBetValuePicker";
import GameChat from "./GameChat";
import GameHeader from "./GameHeader";
import Table from "./Table";
import UserHand from "./UserHand";

const GameLobby = () => {
  const { game } = useGame();
  const { currentUser } = useUser();
  const { connection, connectedUsers } = useConnection();
  const { colors } = useTheme();

  const [show, setShow] = useState(false);

  //BET VALUES AND AMOUNT
  const [diceAmount, setDiceAmount] = useState<number>(1);
  const [diceValue, setDiceValue] = useState<2 | 3 | 4 | 5 | 6>(2);

  //PICKER ARRAY VALUES AND AMOUNT
  const [dicePickerAmount, setDicePickerAmount] = useState<number[]>([]);
  const [dicePickerValue, setDicePickerValue] = useState<number[]>([]);

  const chatModalize = useRef<Modalize>(null);
  const usersOnlineModalize = useRef<Modalize>(null);

  useEffect(() => {
    if (game.currentBetter)
      if (currentUser.userName === game.currentBetter.userName) {
        console.log(game.currentBetter.userName);

        setShow(true);
      }
  }, [game]);

  useEffect(() => {
    if (game.currentBet) {
      if (game.currentBet.diceValue == 6) {
        setDiceAmount(game.currentBet.diceAmount + 1);
        setDiceValue(2);
      } else {
        setDiceAmount(game.currentBet.diceAmount);
        setDiceValue((game.currentBet.diceValue + 1) as 2 | 3 | 4 | 5 | 6);
      }
    }
  }, [game]);

  // --------- SET ALLOWED DICE AMOUNT PICKER ARRAY --------
  useEffect(() => {
    const diceAmountArr: number[] = [];
    const diceInPlay = game.players.map((x) => x.dice.length).reduce((x, c) => x + c, 0);

    if (game.currentBet) {
      var allowedDiceAmount = game.currentBet.diceAmount;

      if (game.currentBet.diceValue === 6) {
        for (let index = game.currentBet.diceAmount + 1; index <= diceInPlay; index++) {
          diceAmountArr.push(index);
        }
      } else {
        for (let index = allowedDiceAmount; index <= diceInPlay; index++) {
          diceAmountArr.push(index);
        }
      }
    } else {
      for (let index = 1; index <= diceInPlay; index++) {
        diceAmountArr.push(index);
      }
    }
    setDicePickerAmount(diceAmountArr);
  }, [game.currentBet]);

  // ------ SET ALLOWED DICE VALUE PICKER ARRAY ------
  useEffect(() => {
    const diceValArr: number[] = [];

    if (game.currentBet) {
      if (diceAmount === game.currentBet.diceAmount) {
        for (let index = game.currentBet.diceValue + 1; index < 7; index++) {
          diceValArr.push(index);
        }
      } else {
        for (let index = 2; index < 7; index++) {
          diceValArr.push(index);
        }
      }
    } else {
      for (let index = 2; index < 7; index++) {
        diceValArr.push(index);
      }
    }
    setDicePickerValue(diceValArr);
  }, [diceAmount]);

  //------- OPEN MODAL FUNCTIONS -------

  const openChatModal = () => {
    chatModalize.current?.open();
  };

  const openOnlineUsersModal = () => {
    usersOnlineModalize.current?.open();
  };

  const isFirstRound = () => {
    var diceInPlay = game.players.map((x) => x.dice.length).reduce((x, c) => x + c, 0);

    return diceInPlay === game.players.length * game.diceCount;
  };

  return (
    <Background>
      <GameHeader openChatModal={openChatModal} />
      <Table openOnlineUsersModal={openOnlineUsersModal} />
      {game.gameStarted && (
        <GameBar>
          {!currentUser.hasRolled && (
            <Button
              title={"roll"}
              mode={"contained"}
              onPress={() => {
                connection.invoke(INVOKE_ROLL_DICE, currentUser);
              }}
            />
          )}
          {currentUser.hasRolled && <UserHand dice={game.players.find((x) => x.userName === currentUser.userName)?.dice} />}
        </GameBar>
      )}

      <Modalize ref={chatModalize} rootStyle={{}} modalStyle={{ backgroundColor: colors.surface }} adjustToContentHeight>
        <GameChat />
      </Modalize>

      <Modalize ref={usersOnlineModalize} rootStyle={{}} modalStyle={{ backgroundColor: colors.surface, padding: 5 }} adjustToContentHeight>
        <OnlinePlayersText variant="titleMedium">Invite players:</OnlinePlayersText>
        {connectedUsers.map((user, index) => (
          <OnlineUserCard key={index} userConnection={user} closeModal={() => usersOnlineModalize.current?.close()} />
        ))}
      </Modalize>

      <Portal>
        <Dialog visible={show}>
          <Dialog.Title>Your turn!</Dialog.Title>
          <Dialog.Content>
            <View style={{ flexDirection: "row", paddingHorizontal: 80, justifyContent: "space-around", marginBottom: 20 }}>
              <DiceBetAmountPicker setDiceAmount={setDiceAmount} dicePickerAmount={dicePickerAmount} />
              <DiceBetValuePicker setDiceValue={setDiceValue} dicePickerValue={dicePickerValue} defaultValue={diceValue} />
            </View>
            {game.currentBet && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text variant="bodyLarge">
                  {game.currentBet.better.userName} bet {game.currentBet.diceAmount} x
                </Text>
                <ValueDice value={game.currentBet.diceValue} size={20} />
              </View>
            )}
          </Dialog.Content>
          <Dialog.Actions style={{ flexDirection: "column" }}>
            <Button
              mode="text"
              onPress={() => {
                connection.invoke(INVOKE_SET_BET, { gameName: game.gameName, better: currentUser, diceAmount: diceAmount, diceValue: diceValue });
                setShow(false);
              }}
              title="Bet"
            />
            {game.currentBet && (
              <Button
                mode="text"
                onPress={() => {
                  setShow(false);
                }}
                title="Call"
              />
            )}
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Background>
  );
};

export default GameLobby;

const GameBar = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  justify-content: space-around;
`;

const OnlinePlayersText = styled(Text)`
  margin: 0 0 10px 5px;
`;
