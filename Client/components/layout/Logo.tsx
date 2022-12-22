import React from "react";
import styled from "styled-components/native";
import logo from "../../assets/images/liars_dice_logo.png";

interface Props {
  size: "small" | "medium" | "large";
}

const Logo = ({ size }: Props) => {
  return <HomeLogo size={size} source={logo} style={{ alignSelf: "center" }} />;
};

export default Logo;

const HomeLogo = styled.Image<{ size: string }>`
  ${(props) => props.size === "small" && "height: 15%;"}
  ${(props) => props.size === "medium" && "height: 30%;"}
  ${(props) => props.size === "large" && "height: 45%;"}
  resize-mode: contain;
`;
