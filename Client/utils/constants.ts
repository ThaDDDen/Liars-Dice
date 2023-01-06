import { Dimensions, StyleProp, ViewStyle } from "react-native";

export const EIGHT_SEAT_TABLE = [
  { position: "absolute", top: Dimensions.get("window").width * 0.05, left: 1, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", top: Dimensions.get("window").width * 0.05, right: 1, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", top: Dimensions.get("window").width * 0.37, right: -34, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", bottom: Dimensions.get("window").width * 0.37, right: -34, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", bottom: Dimensions.get("window").width * 0.05, right: 1, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", bottom: Dimensions.get("window").width * 0.05, left: 1, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", bottom: Dimensions.get("window").width * 0.37, left: -34, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", top: Dimensions.get("window").width * 0.37, left: -34, alignItems: "center" } as StyleProp<ViewStyle>,
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
  { position: "absolute", top: Dimensions.get("window").width * 0.05, left: 1, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", top: Dimensions.get("window").width * 0.05, right: 1, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", bottom: Dimensions.get("window").width * 0.05, right: 1, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", bottom: Dimensions.get("window").width * 0.05, left: 1, alignItems: "center" } as StyleProp<ViewStyle>,
];

export const BASE_URL = "http://192.168.0.4:5141/";

export const INVOKE_JOIN_LOBBY = "JoinLobby";

export const INVOKE_CREATE_GAME = "CreateGame";

export const INVOKE_JOIN_GAME = "JoinGame";

export const INVOKE_LEAVE_GAME = "LeaveGame";

export const INVOKE_SEND_MESSAGE = "SendMessage";

export const INVOKE_INVITE_PLAYER = "InvitePlayer";

export const INVOKE_ROLL_DICE = "RollDice";

export const INVOKE_UPDATE_GAME_SETTINGS = "UpdateGameSettings";

export const INVOKE_START_GAME = "StartGame";

export const INVOKE_SET_BET = "SetBet";

export const INVOKE_CALL = "Call";

export const INVOKE_KICK_PLAYER = "KickPlayer";

export const INVOKE_REQUEST_TO_JOIN_GAME = "RequestToJoinGame";

export const INVOKE_ACCEPT_JOIN_REQUEST = "AcceptJoinRequest";

export const RECEIVE_MESSAGE = "ReceiveMessage";

export const RECEIVE_GAME_INVITATION = "ReceiveGameInvitation";

export const RECEIVE_ALREADY_CONNECTED = "AlreadyConnected";

export const RECEIVE_ERROR = "ReceiveError";

export const RECEIVE_CONNECTED_USERS = "ConnectedUsers";

export const RECEIVE_GAME = "ReceiveGame";

export const RECEIVE_KICKED = "Kicked";

export const RECEIVE_JOIN_REQUEST = "ReceiveJoinRequest";
