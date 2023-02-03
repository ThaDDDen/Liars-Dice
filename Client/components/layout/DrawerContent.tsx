import { DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Badge, Drawer, IconButton, List, Switch, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useConnection } from "../../contexts/ConnectionContext";
import { initialGameState, useGame } from "../../contexts/GameContext";
import { useUser } from "../../contexts/UserContext";
import { User } from "../../types/types";
import { INITIAL_GAME_PROPERTIES, INVOKE_LEAVE_GAME, INVOKE_UPDATE_GAME_SETTINGS } from "../../utils/constants";
import PlayOrderSorter from "../game/game-settings/PlayOrderSorter";
import OnlineUserCard from "../Lobby/OnlineUserCard";
import Button from "./Button";

const DrawerContent = (props: DrawerContentComponentProps) => {
  const { connectedUsers } = useConnection();
  const { logout, setToken, setLobbyMessages, currentUser, setGameMessages, setCurrentUser } = useUser();
  const { connection } = useConnection();
  const { game, setGame } = useGame();
  const { closeConnection } = useConnection();
  const { colors } = useTheme();
  const [diceCount, setDiceCount] = useState(0);
  const [playerCount, setPlayerCount] = useState(0);
  const [orderSorterVisible, setOrderSorterVisible] = useState(false);
  const navigation = useNavigation();
  const [isSoundEffectsOn, setIsSoundEffectsOn] = React.useState(false);

  useEffect(() => {
    if (game !== initialGameState) {
      setDiceCount(game.diceCount);
      setPlayerCount(game.playerCount);
    }
  }, [game]);

  const changesMade = diceCount !== game.diceCount || playerCount !== game.playerCount;

  const handleToggleSoundEffects = () => setIsSoundEffectsOn(!isSoundEffectsOn);

  const handleLogout = () => {
    logout();
    setToken("");
    setLobbyMessages([]);
    setGame(initialGameState);
    closeConnection();
  };

  const handleLeaveGame = () => {
    setGame(initialGameState);
    setGameMessages([]);
    setCurrentUser({ ...currentUser, gameProperties: INITIAL_GAME_PROPERTIES });
    currentUser.gameProperties.gameHost = false;
    connection.invoke(INVOKE_LEAVE_GAME, currentUser);
  };

  const updatePlayerOrder = (players: User[]) => {
    connection.invoke("UpdatePlayerOrder", players);
  };

  // HELLO FUTURE THADD. CLEAN UP RENDERING. EXTRACT COMPONENTS AND ADD STYLED COMPONENTS. STOP BEEING LAZY PLx!1

  return (
    <>
      <DrawerContentScrollView {...props}>
        {game !== initialGameState && (
          <List.Section>
            <View style={{ paddingHorizontal: 5 }}>
              <Drawer.Section title="Game">
                {currentUser.gameProperties.gameHost && !game.gameStarted && (
                  <>
                    <SettingsRow>
                      <Setting variant="bodyMedium">Number of dice: {diceCount}</Setting>
                      <SettingsButton
                        icon="minus"
                        onPress={() => {
                          diceCount !== 1 && setDiceCount((prev) => prev - 1);
                        }}
                      />
                      <SettingsButton
                        icon="plus"
                        onPress={() => {
                          diceCount !== 6 && setDiceCount((prev) => prev + 1);
                        }}
                      />
                    </SettingsRow>
                    <SettingsRow>
                      <Setting variant="bodyMedium">Max number of players: {playerCount}</Setting>
                      <SettingsButton
                        icon="minus"
                        onPress={() => {
                          playerCount !== 2 && setPlayerCount((prev) => prev - 1);
                        }}
                      />
                      <SettingsButton
                        icon="plus"
                        onPress={() => {
                          playerCount !== 8 && setPlayerCount((prev) => prev + 1);
                        }}
                      />
                    </SettingsRow>
                    {changesMade && (
                      <SettingsRow>
                        <Button
                          toLower
                          title="Save changes"
                          icon="content-save"
                          onPress={() => {
                            connection.invoke(INVOKE_UPDATE_GAME_SETTINGS, {
                              gameName: game.gameName,
                              diceCount: diceCount,
                              playerCount: playerCount,
                            });
                            navigation.dispatch(DrawerActions.toggleDrawer());
                          }}
                          mode="text"
                          styles={{ marginBottom: 0 }}
                        />
                      </SettingsRow>
                    )}
                    <SettingsRow>
                      <Pressable onPress={() => setOrderSorterVisible(true)} style={{ paddingVertical: 5 }}>
                        <Text>Change Play Order</Text>
                      </Pressable>
                    </SettingsRow>
                  </>
                )}
                <SettingsRow>
                  <Pressable onPress={() => handleLeaveGame()} style={{ paddingVertical: 5 }}>
                    <Text>Leave Game</Text>
                  </Pressable>
                </SettingsRow>
              </Drawer.Section>
              <Drawer.Section title="Settings">
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginLeft: 15,
                    marginRight: 5,
                    marginTop: -10,
                  }}
                >
                  <Text>Sound effects</Text>
                  <Switch value={isSoundEffectsOn} onValueChange={handleToggleSoundEffects} />
                </View>
              </Drawer.Section>
            </View>
          </List.Section>
        )}
        <List.Accordion title="Players Online">
          <ScrollView style={{ maxHeight: 200, width: "100%", paddingTop: 10, backgroundColor: colors.elevation.level2 }}>
            {connectedUsers.map((user, index) => (
              <OnlineUserCard online key={user.id} user={user} />
            ))}
          </ScrollView>
        </List.Accordion>
        <Drawer.Section title="Friends">
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginLeft: 15,
              marginRight: 5,
              marginTop: -10,
            }}
          >
            {currentUser.friends.length > 0 ? (
              <ScrollView style={{ maxHeight: 200, width: "100%", paddingTop: 10 }}>
                {currentUser.friends.map((friend) => (
                  <View key={friend.id}>
                    <OnlineUserCard user={friend} online={connectedUsers.find((user) => user.userName === friend.userName) !== undefined} />
                    {connectedUsers.find((user) => user.userName === friend.userName) && (
                      <Badge size={10} style={{ position: "absolute", top: 2, left: 32, backgroundColor: "limegreen" }} />
                    )}
                  </View>
                ))}
              </ScrollView>
            ) : (
              <Text>You don't have any friends yet.</Text>
            )}
          </View>
        </Drawer.Section>
      </DrawerContentScrollView>
      <Button styles={{ margin: 10 }} onPress={() => handleLogout()} mode="outlined" title="Log out" />

      <PlayOrderSorter orderSorterVisible={orderSorterVisible} setOrderSorterVisible={setOrderSorterVisible} updatePlayerOrder={updatePlayerOrder} />
    </>
  );
};

export default DrawerContent;

const SettingsRow = styled.View`
  flex-direction: row;
  padding-left: 15px;
  border-radius: 10px;
  align-items: center;
  margin-bottom: 10px;
`;

const Setting = styled(Text)`
  flex: 1;
`;

const SettingsButton = styled(IconButton)`
  margin: 0;
`;
