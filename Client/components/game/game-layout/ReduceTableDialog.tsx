import React from "react";
import { Portal, Text } from "react-native-paper";
import { useConnection } from "../../../contexts/ConnectionContext";
import { useGame } from "../../../contexts/GameContext";
import { useUser } from "../../../contexts/UserContext";
import { INVOKE_START_GAME, INVOKE_UPDATE_GAME_SETTINGS } from "../../../utils/constants";
import CustomDialog from "../../layout/CustomDialog";

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
      <CustomDialog
        visible={dialogVisible}
        headerLabel={"GAME NOT FULL"}
        content={
          <Text style={{ fontFamily: "Manrope-SemiBold", letterSpacing: 0.25, lineHeight: 23, textAlign: "center" }}>
            You are about to start the game with seats still avalible. You can reduce the amount of seats and start the game or wait for more people
            to join.
          </Text>
        }
        leftButtonLabel={"START"}
        leftButtonAction={reduceSeatsAndStart}
        rightButtonLabel={"WAIT"}
        rightButtonAction={() => setDialogVisible(false)}
      />
    </Portal>
  );
};

export default ReduceTableDialog;
