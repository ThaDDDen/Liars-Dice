import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

const Statistics = () => {
  return (
    <>
      <View style={{ marginLeft: 10, marginTop: 10, flexDirection: "row", alignItems: "baseline" }}>
        <Entypo name="trophy" size={30} color="#FFFF47" />
        <Text style={{ marginLeft: 10, marginRight: "auto" }} variant="headlineSmall">
          Games won
        </Text>
        <Text style={{ marginRight: 15 }} variant="headlineSmall">
          4
        </Text>
      </View>
      <View style={{ marginLeft: 10, marginTop: 10, paddingLeft: 3, flexDirection: "row", alignItems: "baseline" }}>
        <FontAwesome5 name="dice-five" size={30} color="#ffafcc" />
        <Text style={{ marginLeft: 10, marginRight: "auto" }} variant="headlineSmall">
          Games played
        </Text>
        <Text style={{ marginRight: 15 }} variant="headlineSmall">
          18
        </Text>
      </View>
    </>
  );
};

export default Statistics;
