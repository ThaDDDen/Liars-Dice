import { View } from "react-native";
import { useUser } from "../contexts/UserContext";
import ChatMessage from "./ChatMessage";

const LobbyChat = () => {
  const { messages } = useUser();

  return (
    <View>
      {messages.map((userMessage, index) => (
        <View key={index}>
          <ChatMessage userMessage={userMessage} />
        </View>
      ))}
    </View>
  );
};

export default LobbyChat;
