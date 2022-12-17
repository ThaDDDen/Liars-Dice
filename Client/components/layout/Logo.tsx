import React from "react";
import styled from "styled-components/native";
import logo from "../../assets/images/liars_dice_logo.png";

interface Props {
  size: string;
}

const Logo = ({ size }: Props) => {
  return <HomeLogo size={size} source={logo} />;
};

export default Logo;

const HomeLogo = styled.Image<{ size: string }>`
  ${(props) => props.size === "small" && "height: 15%;"}
  ${(props) => props.size === "medium" && "height: 30%;"}
  ${(props) => props.size === "large" && "height: 45%;"}
  resize-mode: contain;
`;
