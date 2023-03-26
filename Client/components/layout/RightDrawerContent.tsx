import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import DrawerContentCard from "./DrawerContentCard";
import Friends from "./Friends";
import OnlineUserList from "./OnlineUserList";

const RightDrawerContent = () => {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState("");

  return (
    <SafeAreaView>
      <View style={{ padding: 10 }}>
        <TextInput
          mode="outlined"
          outlineStyle={{ borderRadius: 25, borderWidth: 2 }}
          outlineColor={"transparent"}
          activeOutlineColor={colors.surface}
          placeholder={"Search..."}
          value={searchText}
          onChangeText={(e) => setSearchText(e)}
          textColor="white"
          placeholderTextColor={colors.onPrimaryContainer}
          style={{ fontSize: 16, paddingHorizontal: 10, backgroundColor: colors.primaryContainer, marginBottom: 20 }}
          underlineStyle={{ display: "none" }}
        />
        <DrawerContentCard title={"friends"} content={<Friends searchText={searchText} />} />
        <DrawerContentCard title={"players online"} content={<OnlineUserList searchText={searchText} />} />
      </View>
    </SafeAreaView>
  );
};

export default RightDrawerContent;
