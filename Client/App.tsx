import { Provider as PaperProvider } from "react-native-paper";
import ConnectionProvider from "./contexts/ConnectionContext";
import UserProvider from "./contexts/UserContext";
import Navigation from "./navigation";

export default function App() {
  return (
    <PaperProvider>
      <UserProvider>
        <ConnectionProvider>
          <Navigation />
        </ConnectionProvider>
      </UserProvider>
    </PaperProvider>
  );
}
