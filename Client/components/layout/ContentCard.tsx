import React, { ReactNode } from "react";
import { Surface, Text } from "react-native-paper";
import styled from "styled-components/native";

interface Props {
  title: string;
  children: ReactNode;
}

const ContentCard = ({ title, children }: Props) => {
  return (
    <Container>
      <Title variant="labelLarge">{title}</Title>
      {children}
    </Container>
  );
};

export default ContentCard;

const Container = styled(Surface)`
  padding: 10px 5px;
  border-radius: 10px;
  margin: 5px 0;
`;

const Title = styled(Text)`
  margin-left: 10px;
`;
