import React, { useState } from "react";
import { Dimensions, ImageBackground } from "react-native";
import styled from "styled-components/native";
import table from "../../../assets/images/table.png";
import { useConnection } from "../../../contexts/ConnectionContext";
import { useGame } from "../../../contexts/GameContext";
import { useSnackBar } from "../../../contexts/SnackContext";
import { useUser } from "../../../contexts/UserContext";
import { INVOKE_START_GAME } from "../../../utils/constants";
import Button from "../../layout/Button";
import RoundInfo from "../game-logic/RoundInfo";
import PlaceHolders from "./PlaceHolders";
import Players from "./Players";
import ReduceTableDialog from "./ReduceTableDialog";

interface Props {
  setBetTime: React.Dispatch<React.SetStateAction<number>>;
}

const Table = ({ setBetTime }: Props) => {
  const { game } = useGame();
  const { currentUser } = useUser();
  const { setSnackMessage } = useSnackBar();
  const { connection } = useConnection();
  const [tableNotFullDialogVisible, setTableNotFullDialogVisible] = useState(false);

  const tableHeight = game.playerCount > 6 ? 0.6 : game.playerCount > 4 ? 0.4 : 0.35;

  const startGame = () => {
    if (game.players.length === 1) {
      setSnackMessage({ status: "Error", message: "You can't play with yourself!" });
      return;
    }
    if (game.playerCount !== game.players.length) {
      setTableNotFullDialogVisible(true);
    } else {
      connection.invoke(INVOKE_START_GAME, currentUser);
    }
  };

  return (
    <TableContainer>
      <TableBackground
        source={table}
        resizeMode="cover"
        width={Dimensions.get("window").width * 0.7}
        height={Dimensions.get("window").height * tableHeight}
      />
      <TableOverlay width={Dimensions.get("window").width * 0.7} height={Dimensions.get("window").height * tableHeight}>
        <Players setBetTime={setBetTime} />
        <PlaceHolders />
        <RoundInfo />
        {!game.gameStarted && currentUser.gameProperties.gameHost && <Button title={"START GAME"} mode="contained" onPress={startGame} />}
      </TableOverlay>
      <ReduceTableDialog dialogVisible={tableNotFullDialogVisible} setDialogVisible={setTableNotFullDialogVisible} />
    </TableContainer>
  );
};

export default Table;

const TableContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TableBackground = styled(ImageBackground)<{ width: number; height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  justify-content: center;
  border-radius: 1000px;
  border-width: 20px;
  overflow: hidden;
  border-color: #513624;
`;

const TableOverlay = styled.View<{ width: number; height: number }>`
  position: absolute;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  align-items: center;
  justify-content: center;
`;
