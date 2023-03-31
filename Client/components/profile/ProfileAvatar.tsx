import multiavatar from "@multiavatar/multiavatar";
import React, { useState } from "react";
import { Dimensions, Pressable, View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import styled from "styled-components/native";
import { useGame } from "../../contexts/GameContext";
import { useUser } from "../../contexts/UserContext";
import { Profile } from "../../types/types";
import { putSaveAvatar } from "../../utils/authFunctions";
import { initialProfileState } from "../../utils/constants";
import ValueDice from "../game/game-assets/ValueDice";

interface Props {
  profile?: Profile;
}

const ProfileAvatar = ({ profile }: Props) => {
  const { currentUser, token, setCurrentUser } = useUser();
  const [randomAvatarCode, setRandomAvatarCode] = useState("");
  const { game } = useGame();
  const { colors } = useTheme();
  const deviceWidth = Dimensions.get("window").width;

  const generateRandomAvatarCode = () => {
    const randomNumber = Math.random() * (474747474747 - 100000000000) + 100000000000;
    setRandomAvatarCode(Math.floor(randomNumber).toString());
  };

  const saveAvatar = async () => {
    if (await putSaveAvatar(randomAvatarCode, token)) {
      const userCopy = currentUser;
      userCopy.avatarCode = randomAvatarCode;
      setCurrentUser(userCopy);
      setRandomAvatarCode("");
    }
  };

  return (
    <View>
      {profile && profile !== initialProfileState ? (
        <Container>
          <SvgXml xml={multiavatar(profile.avatarCode)} width={deviceWidth / 2.6} height={deviceWidth / 2.6} />

          <View style={{ position: "absolute", top: 0, transform: [{ translateX: -10 }] }}>
            {game.players.find((p) => p.userName === profile.userName) && (
              <ValueDice value={game.players.find((p) => p.userName === profile.userName)?.gameProperties.dice.length} size={45} />
            )}
          </View>
        </Container>
      ) : (
        <Container>
          {randomAvatarCode && (
            <IconButton
              containerColor={colors.error}
              mode="contained"
              size={50}
              iconColor={colors.background}
              onPress={() => setRandomAvatarCode("")}
              icon="undo"
            />
          )}
          <Pressable onPress={() => generateRandomAvatarCode()}>
            <SvgXml
              xml={multiavatar(randomAvatarCode ? randomAvatarCode : currentUser.avatarCode)}
              width={deviceWidth / 2.6}
              height={deviceWidth / 2.6}
            />
          </Pressable>
          {randomAvatarCode && (
            <IconButton
              containerColor={colors.secondary}
              mode="contained"
              size={50}
              iconColor={colors.background}
              onPress={() => saveAvatar()}
              icon="content-save-outline"
            />
          )}
        </Container>
      )}
      <NameContainer backgroundColor={colors.primary} borderColor={colors.background}>
        <Text style={{ fontFamily: "Manrope-SemiBold", fontSize: 15, color: colors.onPrimary }}>
          {profile !== initialProfileState && profile !== undefined ? profile.userName : currentUser.userName}
        </Text>
      </NameContainer>
    </View>
  );
};

export default ProfileAvatar;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin: 25px 0;
`;

const NameContainer = styled.View<{ backgroundColor: string; borderColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 5px 15px;
  border-radius: 25px;
  position: absolute;
  bottom: 10px;
  border-width: 3px;
  border-color: ${({ borderColor }) => borderColor};
  align-self: center;
`;
