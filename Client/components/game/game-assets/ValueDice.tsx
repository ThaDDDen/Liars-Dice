import { ImageSourcePropType } from "react-native";
import styled from "styled-components/native";
import dice1 from "../../../assets/images/white_dice/white_dice_1.png";
import dice2 from "../../../assets/images/white_dice/white_dice_2.png";
import dice3 from "../../../assets/images/white_dice/white_dice_3.png";
import dice4 from "../../../assets/images/white_dice/white_dice_4.png";
import dice5 from "../../../assets/images/white_dice/white_dice_5.png";
import dice6 from "../../../assets/images/white_dice/white_dice_6.png";

interface Props {
  value: number;
  size: number;
}

const Dice = ({ value, size }: Props) => {
  const soureArray: ImageSourcePropType[] = [dice1, dice2, dice3, dice4, dice5, dice6];

  return <DiceImg source={soureArray[value - 1]} size={size} />;
};

export default Dice;

const DiceImg = styled.Image<{ size: number }>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  resize-mode: contain;
`;
