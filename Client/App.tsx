import ConnectionProvider from "./contexts/ConnectionContext";
import Navigation from "./navigation";

export default function App() {
  return (
    <ConnectionProvider>
      <Navigation />
    </ConnectionProvider>
  );
}
