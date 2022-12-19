import multiavatar from "@multiavatar/multiavatar";
import React, { useState } from "react";
import { View } from "react-native";
import { Chip, Text, useTheme } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import styled from "styled-components/native";
import { putSaveAvatar } from "../../authUtils/authFunctions";
import { useUser } from "../../contexts/UserContext";

const ProfileAvatar = () => {
  const { currentUser, token, setCurrentUser } = useUser();
  const [randomAvatarCode, setRandomAvatarCode] = useState("");
  const { colors } = useTheme();

  const generateRandomAvatarCode = () => {
    var randomNumber = Math.random() * (474747474747 - 100000000000) + 100000000000;
    setRandomAvatarCode(Math.floor(randomNumber).toString());
  };

  const saveAvatar = async () => {
    if (await putSaveAvatar(randomAvatarCode, token)) {
      var userCopy = currentUser;
      userCopy.avatarCode = randomAvatarCode;
      setCurrentUser(userCopy);
      setRandomAvatarCode("");
    }
  };

  return (
    <AvatarContainer backgroundColor={colors.primary}>
      <Text style={{ color: colors.onPrimary, marginLeft: 10 }} variant="labelLarge">
        Avatar
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
        <SvgXml xml={multiavatar(randomAvatarCode ? randomAvatarCode : currentUser.avatarCode)} width={130} height={130} />
        <View>
          <Chip icon="shuffle-variant" onPress={() => generateRandomAvatarCode()}>
            Generate new avatar!
          </Chip>
          {randomAvatarCode && (
            <View>
              <Chip icon="content-save" onPress={() => saveAvatar()} style={{ marginTop: 5 }}>
                Save this avatar!
              </Chip>
              <Chip icon="arrow-u-left-top-bold" onPress={() => setRandomAvatarCode("")} style={{ marginTop: 5 }}>
                Undo
              </Chip>
            </View>
          )}
        </View>
      </View>
    </AvatarContainer>
  );
};

export default ProfileAvatar;

const AvatarContainer = styled.View<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 10px 5px;
  border-radius: 10px;
  margin: 5px 0;
`;
