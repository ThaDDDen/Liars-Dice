// COMPONENT IS CURRENTLY UNUSED

import multiavatar from "@multiavatar/multiavatar";
import React, { useState } from "react";
import { View } from "react-native";
import { Chip } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import styled from "styled-components/native";
import { useUser } from "../../contexts/UserContext";
import { putSaveAvatar } from "../../utils/authFunctions";

const AvatarPicker = () => {
  const { currentUser, token, setCurrentUser } = useUser();
  const [randomAvatarCode, setRandomAvatarCode] = useState("");

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
    <Container>
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
    </Container>
  );
};

export default AvatarPicker;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
