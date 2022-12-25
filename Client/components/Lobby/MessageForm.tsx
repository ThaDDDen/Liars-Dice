import React, { useState } from "react";
import { View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useConnection } from "../../contexts/ConnectionContext";
import { INVOKE_SEND_MESSAGE } from "../../utils/constants";

interface Props {
  chatName: string;
}

const MessageForm = ({ chatName }: Props) => {
  const [message, setMessage] = useState("");
  const { connection } = useConnection();
  const { colors } = useTheme();

  const handleSendMessage = () => {
    if (message) {
      connection.invoke(INVOKE_SEND_MESSAGE, chatName, message);
      setMessage("");
    }
  };

  return (
    <View style={{ width: "100%", marginTop: 10, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
      <InputContainer>
        <Input
          placeholder="Type something.."
          value={message}
          returnKeyType="send"
          onSubmitEditing={() => handleSendMessage()}
          onChangeText={(message) => setMessage(message)}
        />
      </InputContainer>
      <IconButton icon="send" iconColor={colors.primary} size={25} onPress={() => handleSendMessage()} style={{ margin: 0 }} />
    </View>
  );
};

export default MessageForm;

const Input = styled.TextInput`
  color: black;
  font-size: 16px;
  padding: 8px;
`;

const InputContainer = styled.View`
  background-color: white;
  border-radius: 5px;
  border: 1px solid black;
  justify-content: center;
  flex: 1;
`;
