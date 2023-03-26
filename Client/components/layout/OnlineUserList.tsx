import React from "react";
import { ScrollView } from "react-native";
import { useConnection } from "../../contexts/ConnectionContext";
import OnlineUserCard from "../Lobby/OnlineUserCard";

interface Props {
  searchText?: string;
}

const OnlineUserList = ({ searchText }: Props) => {
  const { connectedUsers } = useConnection();

  const filteredOnlineUsers = searchText
    ? connectedUsers.filter((user) => user.userName.toLowerCase().includes(searchText.toLowerCase()))
    : connectedUsers;
  return (
    <ScrollView style={{ maxHeight: 200, width: "100%", paddingTop: 10 }}>
      {filteredOnlineUsers.map((user) => (
        <OnlineUserCard online key={user.id} user={user} />
      ))}
    </ScrollView>
  );
};

export default OnlineUserList;
