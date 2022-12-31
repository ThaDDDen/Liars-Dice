import { Audio } from "expo-av";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import AllSounds, { SoundObject } from "../utils/sounds";

interface SoundContextValue {
  allSounds: SoundObject[];
  playWinnerSound: () => void;
  playRollDice: () => void;
}

const SoundContext = createContext<SoundContextValue>({
  allSounds: [],
  playWinnerSound: () => console.warn("No provier found."),
  playRollDice: () => console.warn("No provier found."),
});

interface Props {
  children: ReactNode;
}

function SoundProvider({ children }: Props) {
  const [allSounds, setAllSounds] = useState<SoundObject[]>(AllSounds);
  const [music, setMusic] = useState<Audio.Sound>();

  useEffect(() => {
    return music
      ? () => {
          music.unloadAsync();
        }
      : undefined;
  }, [music]);

  const playWinnerSound = async () => {
    const { sound, status } = await Audio.Sound.createAsync(allSounds[0].sound);
    setMusic(sound);
    await sound.playAsync();
  };
  const playRollDice = async () => {
    const { sound, status } = await Audio.Sound.createAsync(allSounds[1].sound);
    setMusic(sound);
    await sound.playAsync();
  };

  return (
    <SoundContext.Provider
      value={{
        allSounds,
        playWinnerSound,
        playRollDice,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export const useSound = () => useContext(SoundContext);

export default SoundProvider;
