import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { User } from "../components/LogIn";
import HomeScreen from "../screens/HomeScreen";
import LogInScreen from "../screens/LogInScreen";
import RegisterScreen from "../screens/RegisterScreen";
import BottomTabStack from "./BottomTabStackNavigator";

export type RootStackParams = {
  Home: undefined;
  LogIn: undefined;
  Register: undefined;
  BottomTabStack: undefined;
};

export const RootStack = createNativeStackNavigator<RootStackParams>();

const RootNavigation = () => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(); // just to try, will make userContext to set currentUser

  return (
    <RootStack.Navigator initialRouteName="Home">
      {!currentUser ? (
        <>
          <RootStack.Screen name="Home" component={HomeScreen} />
          <RootStack.Screen name="LogIn" component={LogInScreen} />
          <RootStack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <RootStack.Screen name="BottomTabStack" component={BottomTabStack} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigation;
