import React, { useState } from "react";
import { Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useUser } from "../../contexts/UserContext";
import Button from "../layout/Button";
import Slide from "../slider/Slide";
import Slider from "../slider/Slider";
import Calling from "./game-rules/Calling";
import Customize from "./game-rules/Customize";
import FirstRound from "./game-rules/FirstRound";
import GameOver from "./game-rules/GameOver";
import HowToPlay from "./game-rules/HowToPlay";
import JokerStraights from "./game-rules/JokerStraights";
import RaiseCall from "./game-rules/RaiseCall";

const GameRules = () => {
  const { colors } = useTheme();
  const { setPromptGameRules } = useUser();

  const slides = [
    {
      color: colors.primary,
      title: "",
      description: "",
      element: <HowToPlay />,
    },
    {
      color: colors.secondary,
      title: "",
      description: "",
      element: <Customize />,
    },
    {
      color: colors.surface,
      title: "",
      description: "",
      element: <FirstRound />,
    },
    {
      color: colors.primary,
      title: "",
      description: "",
      element: <RaiseCall />,
    },
    {
      color: colors.secondary,
      title: "",
      description: "",
      element: <Calling />,
    },
    {
      color: colors.surface,
      title: "",
      description: "",
      element: <JokerStraights />,
    },
    {
      color: colors.primary,
      title: "",
      description: "",
      element: <GameOver />,
    },
  ];

  const [index, setIndex] = useState(0);
  const prev = slides[index - 1];
  const next = slides[index + 1];

  return (
    <Slider key={index} index={index} setIndex={setIndex} prev={prev && <Slide slide={prev} />} next={next && <Slide slide={next} />}>
      <>
        <SkipButtonContainer>
          <SkipButton onPress={() => setPromptGameRules(false)} backgroundColor={colors.primary} borderColor={colors.primaryContainer}>
            <Text variant="bodyMedium">SKIP</Text>
          </SkipButton>
        </SkipButtonContainer>
        <Slide slide={slides[index]} />
        {index === 6 && (
          <Button
            title="Lets go!"
            onPress={() => setPromptGameRules(false)}
            buttonColor={colors.surface}
            mode="contained"
            styles={{ zIndex: 1000, position: "absolute", bottom: 30, alignSelf: "center" }}
          />
        )}
      </>
    </Slider>
  );
};

export default GameRules;

const SkipButtonContainer = styled.View`
  z-index: 1002;
  top: 50px;
  right: 20px;
  position: absolute;
`;
const SkipButton = styled.Pressable<{ backgroundColor: string; borderColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 3px 10px;
  border-radius: 20px;
  border: 2px solid ${({ borderColor }) => borderColor};
`;
