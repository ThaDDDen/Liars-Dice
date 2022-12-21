import { Dimensions, StyleProp, ViewStyle } from "react-native";

export const EIGHT_SEAT_TABLE = [
  { position: "absolute", top: Dimensions.get("window").width * 0.05, left: 15, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", top: Dimensions.get("window").width * 0.05, right: 15, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", top: Dimensions.get("window").width * 0.37, right: -20, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", bottom: Dimensions.get("window").width * 0.37, right: -20, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", bottom: Dimensions.get("window").width * 0.05, right: 15, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", bottom: Dimensions.get("window").width * 0.05, left: 15, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", bottom: Dimensions.get("window").width * 0.37, left: -20, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", top: Dimensions.get("window").width * 0.37, left: -20, alignItems: "center" } as StyleProp<ViewStyle>,
];

export const SIX_SEAT_TABLE = [
  { position: "absolute", top: Dimensions.get("window").width * 0.05, left: 15, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", top: Dimensions.get("window").width * 0.05, right: 15, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", top: Dimensions.get("window").width * 0.37, right: -20, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", bottom: Dimensions.get("window").width * 0.05, right: 15, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", bottom: Dimensions.get("window").width * 0.05, left: 15, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", top: Dimensions.get("window").width * 0.37, left: -20, alignItems: "center" } as StyleProp<ViewStyle>,
];

export const FOUR_SEAT_TABLE = [
  { position: "absolute", top: Dimensions.get("window").width * 0.05, left: 15, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", top: Dimensions.get("window").width * 0.05, right: 15, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", bottom: Dimensions.get("window").width * 0.05, right: 15, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", bottom: Dimensions.get("window").width * 0.05, left: 15, alignItems: "center" } as StyleProp<ViewStyle>,
];
