import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";
import DrawerContent from "../components/layout/DrawerContent";
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
const Drawer = createDrawerNavigator<RootStackParams>();

const RootNavigation = () => {
  const { currentUser } = useUser(); // just to try, will make userContext to set currentUser
  const { colors } = useTheme();

  if (currentUser === initialUserState) {
    return (
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="LogIn" component={LogInScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      </RootStack.Navigator>
    );
  }

  return (
    <Drawer.Navigator
      screenOptions={{ drawerStyle: { backgroundColor: colors.surface } }}
      initialRouteName="BottomTabStack"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <RootStack.Screen name="BottomTabStack" component={BottomTabStack} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
};

export default RootNavigation;
