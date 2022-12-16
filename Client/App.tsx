import ConnectionProvider from "./contexts/ConnectionContext";
import UserProvider from "./contexts/UserContext";
import Navigation from "./navigation";

export default function App() {
  return (
    <UserProvider>
      <ConnectionProvider>
        <Navigation />
      </ConnectionProvider>
    </UserProvider>
  );
}
