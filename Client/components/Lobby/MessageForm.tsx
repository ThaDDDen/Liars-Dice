import React, { useState } from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import styled from "styled-components/native";
import { useConnection } from "../../contexts/ConnectionContext";

const MessageForm = () => {
  const [message, setMessage] = useState("");
  const { connection } = useConnection();

  const handleSendMessage = () => {
    connection.invoke("SendMessage", message);
    setMessage("");
  };

  return (
    <View style={{ width: "100%", paddingHorizontal: 10, flexDirection: "row", justifyContent: "center" }}>
      <Input placeholder="Type something.." value={message} onChangeText={(message) => setMessage(message)} />
      <IconButton icon="send" iconColor="#2ec4b6" size={25} onPress={() => handleSendMessage()} />
    </View>
  );
};

export default MessageForm;

const Input = styled.TextInput`
  color: black;
  background-color: white;
  font-size: 16px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 10px;
  flex: 1;
`;
