import React from "react";
import { Button as PaperButton } from "react-native-paper";

interface Props {
  title: string;
  mode: "text" | "outlined" | "contained";
  onPress: () => void;
}
const Button = ({ title, mode, onPress }: Props) => {
  return (
    <PaperButton style={{ borderRadius: 5, marginBottom: 20 }} mode={mode} onPress={onPress} uppercase>
      {title}
    </PaperButton>
  );
};

export default Button;
