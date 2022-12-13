import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";
import { BottomTabStackParams } from "../navigation/BottomTabStackNavigator";
import { RootStackParams } from "../navigation/RootStackNavigator";

export type HomeNavProps = CompositeScreenProps<BottomTabScreenProps<RootStackParams>, NativeStackScreenProps<BottomTabStackParams>>;

const HomeScreen = ({ navigation }: HomeNavProps) => {
  return (
    <View>
      <Text>Home</Text>
      <Button color="gray" title="log in" onPress={() => navigation.navigate("BottomTabStack")} />
      <Button color="gray" title="Register" onPress={() => navigation.navigate("Register")} />
    </View>
  );
};

export default HomeScreen;
