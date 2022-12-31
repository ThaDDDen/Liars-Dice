import { AVPlaybackSource } from "expo-av";

export interface SoundObject {
  sound: AVPlaybackSource;
}

const AllSounds: SoundObject[] = [{ sound: require("../assets/sounds/winner.mp3") }, { sound: require("../assets/sounds/diceroll.mp3") }];

export default AllSounds;
