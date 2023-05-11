import React, { ReactNode } from "react";
import styled from "styled-components/native";

interface Props {
  color: string;
  children: ReactNode;
}

const ChatBubble = ({ color, children }: Props) => {
  return (
    <Bubble color={color}>
      <BubbleArrow color={color} />
      {children}
    </Bubble>
  );
};

export default ChatBubble;

const Bubble = styled.View<{ color: string }>`
  position: absolute;
  z-index: 2000;
  width: 65px;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: ${({ color }) => color};
  padding: 5px;
  border-radius: 20px;
  top: -40px;
  left: 15px;
  justify-content: center;
`;

const BubbleArrow = styled.View<{ color: string }>`
  width: 20px;
  height: 20px;
  background-color: ${({ color }) => color};
  position: absolute;
  transform: rotate(60deg);
  bottom: -2px;
  left: 15px;
`;
