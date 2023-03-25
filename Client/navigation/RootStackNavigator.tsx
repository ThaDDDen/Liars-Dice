// import { MaterialIcons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";
import LeftDrawerContent from "../components/layout/LeftDrawerContent";
import RightDrawerContent from "../components/layout/RightDrawerContent";
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
  LeftSideDrawer: undefined;
};

export const RootStack = createNativeStackNavigator<RootStackParams>();
const RightDrawer = createDrawerNavigator<RootStackParams>();
const LeftDrawer = createDrawerNavigator<RootStackParams>();

const LeftDrawerScreen = () => {
  const { colors } = useTheme();
  return (
    <LeftDrawer.Navigator
      id={"leftDrawer"}
      screenOptions={{ drawerStyle: { backgroundColor: colors.surface }, drawerPosition: "left", drawerType: "back" }}
      drawerContent={(props) => <LeftDrawerContent {...props} />}
    >
      <RootStack.Screen name="BottomTabStack" component={BottomTabStack} options={{ headerShown: false }} />
    </LeftDrawer.Navigator>
  );
};

const RootNavigation = () => {
  const { currentUser } = useUser();
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
    <RightDrawer.Navigator
      id="rightDrawer"
      screenOptions={{
        drawerStyle: { backgroundColor: colors.surface },
        drawerPosition: "right",
        drawerType: "back",
      }}
      initialRouteName="BottomTabStack"
      drawerContent={(props) => <RightDrawerContent {...props} />}
    >
      <RightDrawer.Screen name="LeftSideDrawer" component={LeftDrawerScreen} options={{ headerShown: false }} />
    </RightDrawer.Navigator>
  );
};

export default RootNavigation;
