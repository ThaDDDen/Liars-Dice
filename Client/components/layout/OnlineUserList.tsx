import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import OnlineUserCard from "../Lobby/OnlineUserCard";
import { useConnection } from "../../contexts/ConnectionContext";

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
      {filteredOnlineUsers.map((user, index) => (
        <OnlineUserCard online key={user.id} user={user} />
      ))}
    </ScrollView>
  );
};

export default OnlineUserList;

const styles = StyleSheet.create({});
