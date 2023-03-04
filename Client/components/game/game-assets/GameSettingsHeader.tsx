import React from "react";
import { Image } from "react-native";
import settingsHeader from "../../../assets/images/game_settings_header.png";

const SettingsHeader = () => {
  return <Image source={settingsHeader} style={{ alignSelf: "center", width: 300, resizeMode: "contain", marginHorizontal: 5 }} />;
};

export default SettingsHeader;
