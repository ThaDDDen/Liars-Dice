import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Button as PaperBut } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import styled from "styled-components/native";

interface Props {
  title: string;
  mode: "text" | "outlined" | "contained";
  onPress: () => void;
  toLower?: boolean;
  styles?: StyleProp<ViewStyle>;
  compact?: boolean;
  icon?: IconSource;
}
const Button = ({ title, mode, onPress, toLower, styles, compact, icon }: Props) => {
  return (
    <PaperButton compact={compact} style={styles} mode={mode} onPress={onPress} uppercase={!toLower} icon={icon}>
      {title}
    </PaperButton>
  );
};

export default Button;

const PaperButton = styled(PaperBut)`
  border-radius: 5px;
`;
