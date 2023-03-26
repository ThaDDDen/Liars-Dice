import React from "react";
import { View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useGame } from "../../../contexts/GameContext";

interface Props {
  isPlaying: boolean;
  setBetTime: React.Dispatch<React.SetStateAction<number>>;
}

const CountDownCircle = ({ isPlaying, setBetTime }: Props) => {
  const { game } = useGame();
  return (
    <View style={{ position: "absolute" }}>
      <CountdownCircleTimer
        size={60}
        strokeWidth={5}
        isPlaying={isPlaying}
        duration={game.betTime}
        colors={["#1eef41", "#d3ef1e", "#efa21e", "#ef1e1e"]}
        colorsTime={[22.5, 15, 7.5, 0]}
        onComplete={() => {
          setBetTime(0);
          return { shouldRepeat: false };
        }}
        onUpdate={(remainingTime) => setBetTime(remainingTime)}
        updateInterval={0}
      />
    </View>
  );
};

export default CountDownCircle;
