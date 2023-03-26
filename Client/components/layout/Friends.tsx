import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Badge } from "react-native-paper";
import { useConnection } from "../../contexts/ConnectionContext";
import { useUser } from "../../contexts/UserContext";
import OnlineUserCard from "../Lobby/OnlineUserCard";

interface Props {
  searchText?: string;
}
const Friends = ({ searchText }: Props) => {
  const { currentUser } = useUser();
  const { connectedUsers } = useConnection();

  const filteredFriends = searchText
    ? currentUser.friends.filter((friend) => friend.userName.toLowerCase().includes(searchText.toLowerCase()))
    : currentUser.friends;

  return currentUser.friends.length > 0 ? (
    <ScrollView style={{ maxHeight: 200, width: "100%", paddingTop: 10 }}>
      {filteredFriends.map((friend) => (
        <View key={friend.id}>
          <OnlineUserCard user={friend} online={connectedUsers.find((user) => user.userName === friend.userName) !== undefined} />
          {connectedUsers.find((user) => user.userName === friend.userName) && (
            <Badge size={10} style={{ position: "absolute", top: 2, left: 32, backgroundColor: "limegreen" }} />
          )}
        </View>
      ))}
    </ScrollView>
  ) : (
    <Text>You don&apos;t have any friends yet.</Text>
  );
};

export default Friends;
