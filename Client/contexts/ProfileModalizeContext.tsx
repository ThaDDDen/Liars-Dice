import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Surface, Text, Tooltip, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import ContentCard from "../components/layout/ContentCard";
import ProfileAvatar from "../components/profile/ProfileAvatar";
import Statistics from "../components/profile/Statistics";
import { Profile, User } from "../types/types";
import { initialProfileState, INVOKE_INVITE_PLAYER, INVOKE_KICK_PLAYER, INVOKE_REMOVE_FRIEND, INVOKE_SEND_FRIEND_REQUEST } from "../utils/constants";
import { useConnection } from "./ConnectionContext";
import { initialGameState, useGame } from "./GameContext";
import { initialUserState, useUser } from "./UserContext";

interface Props {
  children: ReactNode;
}

interface ProfileModalizeContext {
  loadedProfile: Profile;
  setLoadedProfile: React.Dispatch<React.SetStateAction<Profile>>;
  setFetchUser: React.Dispatch<React.SetStateAction<User>>;
}

const ProfileModalizeContext = createContext<ProfileModalizeContext>({
  loadedProfile: {} as Profile,
  setLoadedProfile: () => console.warn("No provider found."),
  setFetchUser: () => console.warn("No provider found."),
});

const ProfileModalizeProvider = ({ children }: Props) => {
  const [loadedProfile, setLoadedProfile] = useState(initialProfileState);
  const { colors } = useTheme();
  const { currentUser } = useUser();
  const { game } = useGame();
  const { connection } = useConnection();
  const [fetchingProfile, setFetchingProfile] = useState(false);
  const [fetchUser, setFetchUser] = useState<User>(initialUserState);

  const profileModalize = useRef<Modalize>(null);

  const isFriend = currentUser.friends.find((f) => f.id === loadedProfile.id);

  useEffect(() => {
    if (fetchUser !== initialUserState) {
      setFetchingProfile(true);
      const fetchStatistics = async () => {
        const response = await fetch(`http://192.168.0.4:5141/api/Statistics/GetStatisticsByProfileId/${fetchUser.id}`);
        const jsonData = await response.json();

        setLoadedProfile({
          id: fetchUser.id,
          userName: fetchUser.userName,
          avatarCode: fetchUser.avatarCode,
          statistics: jsonData,
        });

        setFetchingProfile(false);
      };

      fetchStatistics();
    }
  }, [fetchUser]);

  useEffect(() => {
    if (loadedProfile !== initialProfileState) {
      openProfileModalize();
    }
  }, [loadedProfile]);

  const unloadProfile = () => {
    setLoadedProfile(initialProfileState);
  };

  const handleInvitePlayer = () => {
    connection.invoke(INVOKE_INVITE_PLAYER, currentUser, loadedProfile.userName);
  };

  const handleKickPlayer = () => {
    connection.invoke(INVOKE_KICK_PLAYER, loadedProfile.id);
  };

  const handleSendFriendRequest = () => {
    connection.invoke(INVOKE_SEND_FRIEND_REQUEST, currentUser.id, loadedProfile.id);
  };

  const handleRemoveFriend = () => {
    connection.invoke(INVOKE_REMOVE_FRIEND, currentUser.id, loadedProfile.id);
  };

  const openProfileModalize = () => {
    profileModalize.current?.open();
  };

  const closeProfileModalize = () => {
    profileModalize.current?.close();
  };

  const handleSendFriendRequest = () => {
    if (!isFriend) {
      connection.invoke(INVOKE_SEND_FRIEND_REQUEST, currentUser.id, loadedProfile.id);
    } else {
      connection.invoke(INVOKE_REMOVE_FRIEND, currentUser.id, loadedProfile.id);
    }
    closeProfileModalize();
  };

  const handleLeftButtonPress = () => {
    if (currentUser.userName !== loadedProfile.userName && !game.players.find((p) => p.userName === loadedProfile.userName)) {
      handleInvitePlayer();
      closeProfileModalize();
    } else {
      handleKickPlayer();
      closeProfileModalize();
    }
  };

  return (
    <ProfileModalizeContext.Provider value={{ loadedProfile, setLoadedProfile, setFetchUser }}>
      <>
        {children}
        {loadedProfile !== initialProfileState && (
          <Modalize
            onClose={() => {
              unloadProfile();
              setFetchUser(initialUserState);
            }}
            ref={profileModalize}
            rootStyle={{}}
            modalStyle={{ shadowColor: "transparent", backgroundColor: "transparent" }}
            withHandle={false}
            adjustToContentHeight
          >
            {loadedProfile !== initialProfileState && (
              <ModalContent>
                <ProfileAvatar profile={loadedProfile} />
                <ModalBackground backgroundColor={colors.primaryContainer}>
                  <TopButtons>
                    {game === initialGameState ? (
                      <View style={{ flex: 1 }}>
                        <Tooltip enterTouchDelay={0} title="You need to create a game in order to invite players">
                          <LeftButton backgroundColor={colors.surface}>
                            <LeftButtonText textColor={"grey"}>INVITE</LeftButtonText>
                          </LeftButton>
                        </Tooltip>
                      </View>
                    ) : (
                      <LeftButton
                        disabled={currentUser.gameProperties.gameHost ? false : true}
                        backgroundColor={colors.surface}
                        onPress={() => handleLeftButtonPress()}
                      >
                        <LeftButtonText textColor={currentUser.gameProperties.gameHost ? colors.onPrimary : colors.surfaceDisabled}>
                          {game !== initialGameState &&
                          currentUser.userName !== loadedProfile.userName &&
                          !game.players.find((p) => p.userName === loadedProfile.userName)
                            ? "INVITE"
                            : "KICK"}
                        </LeftButtonText>
                      </LeftButton>
                    )}
                    <RightButton backgroundColor={colors.secondary} onPress={() => handleSendFriendRequest()}>
                      <RightButtonText>{isFriend ? "UNFRIEND" : "ADD FRIEND"}</RightButtonText>
                    </RightButton>
                  </TopButtons>
                  <ContentCard borderColor="#161545" label="rolls">
                    <Statistics statistics={loadedProfile.statistics} />
                  </ContentCard>
                </ModalBackground>
              </ModalContent>
            )}
          </Modalize>
        )}
      </>
    </ProfileModalizeContext.Provider>
  );
};

export const useProfileModalize = () => useContext(ProfileModalizeContext);

export default ProfileModalizeProvider;

const ModalContent = styled.View`
  flex: 1;
`;

const ModalBackground = styled.View<{ backgroundColor: string }>`
  flex: 1;
  background-color: ${({ backgroundColor }) => backgroundColor};
  margin-top: 50px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
`;

const TopButtons = styled(Surface)`
  border-radius: 15px;
  margin: -40px 10px 5px 10px;
  flex-direction: row;
`;

const LeftButton = styled.Pressable<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  flex: 1;
  border-radius: 15px;
  align-items: center;
  padding: 5px 10px 10px 10px;
`;

const RightButton = styled.Pressable<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  flex: 1;
  border-radius: 15px;
  align-items: center;
  padding: 5px 10px 10px 10px;
  border-top-left-radius: 0px;
`;

const LeftButtonText = styled(Text)<{ textColor: string }>`
  font-size: 26px;
  font-family: "Manrope-Bold";
  color: ${({ textColor }) => textColor};
`;

const RightButtonText = styled(Text)`
  font-size: 26px;
  font-family: "Manrope-Bold";
`;
