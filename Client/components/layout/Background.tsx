import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import styled from "styled-components/native";

interface Props {
  children: ReactNode;
}

const Background = ({ children }: Props) => {
  return (
    <SafeAreaView mode="margin" style={{ flex: 1, justifyContent: "center" }}>
      <AppBackground>{children}</AppBackground>
    </SafeAreaView>
  );
};

export default Background;

const AppBackground = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  padding: 10px;
  padding-top: 0px;
`;
