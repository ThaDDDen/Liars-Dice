import React, { ReactNode } from "react";
import styled from "styled-components/native";

interface Props {
  children: ReactNode;
}

const Background = ({ children }: Props) => {
  return <AppBackground>{children}</AppBackground>;
};

export default Background;

const AppBackground = styled.ImageBackground`
  flex: 1;
  background-color: #0f4553;
  justify-content: center;
`;
