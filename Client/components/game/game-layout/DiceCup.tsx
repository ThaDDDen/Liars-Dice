import React from "react";
import { Pressable } from "react-native";
import styled from "styled-components/native";
import diceCup from "../../../assets/images/dicecup.png";

interface Props {
  onPress: () => void;
}

const DiceCup = ({ onPress }: Props) => {
  return (
    <Pressable onPress={() => onPress()}>
      <DiceCupImage source={diceCup} />
    </Pressable>
  );
};

export default DiceCup;

const DiceCupImage = styled.Image`
  height: 95px;
  width: 130px;
  margin-bottom: 10px;
`;
