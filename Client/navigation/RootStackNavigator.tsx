import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initialUserState, useUser } from "../contexts/UserContext";
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
  const { currentUser } = useUser(); // just to try, will make userContext to set currentUser

  return (
    <RootStack.Navigator initialRouteName="Home">
      {currentUser === initialUserState ? (
        <>
          <RootStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <RootStack.Screen name="LogIn" component={LogInScreen} options={{ headerShown: false }} />
          <RootStack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        </>
      ) : (
        <RootStack.Screen name="BottomTabStack" component={BottomTabStack} options={{ headerShown: false }} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigation;
