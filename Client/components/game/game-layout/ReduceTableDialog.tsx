import { Dialog, Paragraph, Portal, Text } from "react-native-paper";
import { useConnection } from "../../../contexts/ConnectionContext";
import { useGame } from "../../../contexts/GameContext";
import { useUser } from "../../../contexts/UserContext";
import { INVOKE_START_GAME, INVOKE_UPDATE_GAME_SETTINGS } from "../../../utils/constants";
import Button from "../../layout/Button";

interface Props {
  dialogVisible: boolean;
  setDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReduceTableDialog = ({ dialogVisible, setDialogVisible }: Props) => {
  const { connection } = useConnection();
  const { game } = useGame();
  const { currentUser } = useUser();

  const reduceSeatsAndStart = () => {
    connection.invoke(INVOKE_UPDATE_GAME_SETTINGS, {
      gameName: game.gameName,
      diceCount: game.diceCount,
      playerCount: game.players.length,
      betTime: game.betTime,
    });
    connection.invoke(INVOKE_START_GAME, currentUser);
    setDialogVisible(false);
  };
  return (
    <Portal>
      <Dialog visible={dialogVisible}>
        <Dialog.Title>Table is not full!</Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            You are trying to start the game before all seats are taken. Would you like to reduce the amount of seats and start the game?
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions style={{ flexDirection: "column" }}>
          <Button mode="text" onPress={() => reduceSeatsAndStart()} title="Reduce seats and start!" />
          <Button mode="text" onPress={() => setDialogVisible(false)} title="Wait for more players!" />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ReduceTableDialog;
