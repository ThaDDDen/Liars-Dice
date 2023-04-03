import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useUser } from "../../contexts/UserContext";
import Slide from "./Slide";
import Slider from "./Slider";

interface Props {
  navigate: () => void;
}
const OnBoarding = ({ navigate }: Props) => {
  const { colors } = useTheme();
  const { setFirstVisit } = useUser();
  const slides = [
    {
      color: colors.primary,
      title: "Welcome",
      description: "Join the millions who love to play Liars Dice!",
      picture: require("../../assets/images/logo.png"),
    },
    {
      color: colors.secondary,
      title: "Friends",
      description: "Adding friends is easy and allows you to play and chat  with them anytime!",
      picture: require("../../assets/images/TwoDice.png"),
    },
    {
      color: colors.surface,
      title: "Personalize",
      description: "Create your own avatar to show off your personality and choose from one of the many color themes!",
      picture: require("../../assets/images/Avatars.png"),
    },
    {
      color: colors.background,
      title: "Customize",
      description: "Join or create a game with settings to your own liking.",
      picture: require("../../assets/images/Customize.png"),
    },
    {
      color: colors.primary,
      title: "Statistics",
      description: "Track your progress with our detailed game statistics!",
      picture: require("../../assets/images/Statistics.png"),
    },
    {
      color: colors.secondary,
      title: "Get started",
      description: "Thanks for completing the onboarding, lets create an account and start your experience",
      picture: require("../../assets/images/Statistics.png"),
    },
  ];

  const [index, setIndex] = useState(0);
  const prev = slides[index - 1];
  const next = slides[index + 1];

  return (
    <Slider key={index} index={index} setIndex={setIndex} prev={prev && <Slide slide={prev} />} next={next && <Slide slide={next} />}>
      <>
        <View style={{ zIndex: 1002, top: 50, right: 20, alignItems: "flex-end" }}>
          <Pressable onPress={() => setFirstVisit(false)}>
            <Text variant="bodyMedium">SKIP</Text>
          </Pressable>
        </View>
        <Slide slide={slides[index]!} />
        {index === 5 && (
          <View style={{ zIndex: 1001, position: "absolute", bottom: 0 }}>
            <Pressable
              onPress={() => {
                navigate();
                setFirstVisit(false);
              }}
            >
              <Text variant="displaySmall">Create account</Text>
            </Pressable>
          </View>
        )}
      </>
    </Slider>
  );
};

export default OnBoarding;
