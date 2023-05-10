import multiavatar from "@multiavatar/multiavatar";
import React from "react";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";

const PlayersButton = () => {
  return (
    <View style={{ width: 40, height: 40 }}>
      <SvgXml xml={multiavatar("awdawd")} width={25} height={25} style={{ position: "absolute", left: 0, bottom: 0 }} />
      <SvgXml xml={multiavatar("awdawddd")} width={25} height={25} style={{ position: "absolute", right: 0, bottom: 0 }} />
      <SvgXml xml={multiavatar("a2dwad")} width={25} height={25} style={{ position: "absolute", alignSelf: "center", top: 0 }} />
    </View>
  );
};

export default PlayersButton;
