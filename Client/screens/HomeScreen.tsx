import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable } from "react-native";
import { Text } from "react-native-paper";
import Home from "../components/Home";
import OnBoarding from "../components/onboarding/OnBoarding";
import useAsyncStorage from "../hooks/useAsyncStorage";
import { BottomTabStackParams } from "../navigation/BottomTabStackNavigator";
import { RootStackParams } from "../navigation/RootStackNavigator";

export type HomeNavProps = CompositeScreenProps<BottomTabScreenProps<RootStackParams>, NativeStackScreenProps<BottomTabStackParams>>;

const HomeScreen = ({ navigation, route }: HomeNavProps) => {
  const [firstVisit, setFirstVisit] = useAsyncStorage("firstVisit", true);

  return (
    <>
      {firstVisit ? (
        <OnBoarding
          navigate={() => {
            navigation.navigate("Register");
          }}
          setFirstVisit={setFirstVisit}
        />
      ) : (
        <>
          <Home navigation={navigation} route={route} />
          <Pressable onPress={() => setFirstVisit(true)}>
            <Text variant="bodySmall">reset</Text>
          </Pressable>
        </>
      )}
    </>
  );
};

export default HomeScreen;
