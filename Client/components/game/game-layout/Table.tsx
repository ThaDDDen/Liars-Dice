import React from "react";
import { Dimensions, ImageBackground } from "react-native";
import styled from "styled-components/native";
import table from "../../../assets/images/table.png";
import { useGame } from "../../../contexts/GameContext";
import RoundInfo from "../game-logic/RoundInfo";
import PlaceHolders from "./PlaceHolders";
import Players from "./Players";

interface Props {
  openOnlineUsersModal: () => void;
  setBetTime: React.Dispatch<React.SetStateAction<number>>;
}

const Table = ({ openOnlineUsersModal, setBetTime }: Props) => {
  const { game } = useGame();

  const tableHeight = game.playerCount > 6 ? 0.6 : game.playerCount > 4 ? 0.4 : 0.35;

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
        <PlaceHolders openOnlineUsersModal={openOnlineUsersModal} />
        <RoundInfo />
      </TableOverlay>
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
