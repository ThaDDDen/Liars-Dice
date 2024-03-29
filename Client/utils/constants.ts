/* eslint-disable @typescript-eslint/no-empty-function */
import { Dimensions, StyleProp, ViewStyle } from "react-native";
import { LoadedProfile, Profile, Statistics } from "../types/types";

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

export const SEVEN_SEAT_TABLE = [
  { position: "absolute", top: Dimensions.get("window").width * 0.05, left: 1, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", top: Dimensions.get("window").width * 0.05, right: 1, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", top: Dimensions.get("window").width * 0.45, right: -34, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", bottom: Dimensions.get("window").width * 0.25, right: -34, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", bottom: Dimensions.get("window").width * -0.05, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", bottom: Dimensions.get("window").width * 0.25, left: -34, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", top: Dimensions.get("window").width * 0.45, left: -34, alignItems: "center" } as StyleProp<ViewStyle>,
];

export const SIX_SEAT_TABLE = [
  { position: "absolute", top: Dimensions.get("window").width * 0.05, left: 15, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", top: Dimensions.get("window").width * 0.05, right: 15, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", top: Dimensions.get("window").width * 0.37, right: -20, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", bottom: Dimensions.get("window").width * 0.05, right: 15, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", bottom: Dimensions.get("window").width * 0.05, left: 15, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", top: Dimensions.get("window").width * 0.37, left: -20, alignItems: "center" } as StyleProp<ViewStyle>,
];

export const FIVE_SEAT_TABLE = [
  { position: "absolute", top: Dimensions.get("window").width * 0.05, left: 15, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", top: Dimensions.get("window").width * 0.05, right: 15, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", bottom: Dimensions.get("window").width * 0.25, right: -20, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", bottom: Dimensions.get("window").width * -0.05, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", bottom: Dimensions.get("window").width * 0.25, left: -20, alignItems: "center" } as StyleProp<ViewStyle>,
];

export const FOUR_SEAT_TABLE = [
  { position: "absolute", top: Dimensions.get("window").width * 0.05, left: 1, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", top: Dimensions.get("window").width * 0.05, right: 1, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", bottom: Dimensions.get("window").width * 0.05, right: 1, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", bottom: Dimensions.get("window").width * 0.05, left: 1, alignItems: "center" } as StyleProp<ViewStyle>,
];

export const THREE_SEAT_TABLE = [
  { position: "absolute", top: Dimensions.get("window").width * 0.15, left: -5, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", top: Dimensions.get("window").width * 0.15, right: -5, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", bottom: Dimensions.get("window").width * -0.05, alignItems: "center" } as StyleProp<ViewStyle>,
];

export const TWO_SEAT_TABLE = [
  { position: "absolute", top: Dimensions.get("window").width * 0.05, left: 1, alignItems: "center" } as StyleProp<ViewStyle>,
  { position: "absolute", bottom: Dimensions.get("window").width * 0.05, right: 1, alignItems: "center" } as StyleProp<ViewStyle>,
];

export const initialProfileState: Profile = {
  id: "",
  userName: "",
  avatarCode: "",
  statistics: {} as Statistics,
};

export const initialLoadedProfileState: LoadedProfile = {
  profile: {} as Profile,
  onAddFriend: () => {},
  onRemoveFriend: () => {},
  onInvite: () => {},
  onKick: () => {},
};

export const valuesToWords = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
  "twenty",
  "twenty-one",
  "twenty-two",
  "twenty-three",
  "twenty-four",
  "twenty-five",
  "twenty-six",
  "twenty-seven",
  "twenty-eight",
  "twenty-nine",
  "thirty",
  "thirty-one",
  "thirty-two",
  "thirty-three",
  "thirty-four",
  "thirty-five",
  "thirty-six",
  "thirty-seven",
  "thirty-eight",
  "thirty-nine",
  "forty",
  "forty-one",
  "forty-two",
  "forty-three",
  "forty-four",
  "forty-five",
  "forty-six",
  "forty-seven",
  "forty-eight",
  "forty-nine",
  "fifty",
  "fifty-one",
  "fifty-two",
  "fifty-three",
  "fifty-four",
  "fifty-five",
  "fifty-six",
  "fifty-seven",
  "fifty-eight",
  "fifty-nine",
  "sixty",
];

export const diceValues = ["twoes", "threes", "fours", "fives", "sixes"];

export const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const INITIAL_GAME_PROPERTIES = {
  gameHost: false,
  dice: [],
  hasRolled: false,
  isOut: false,
};

export const INITIAL_STATISTICS_PROPERTIES: Statistics = {
  userId: "",
  ones: 0,
  twoes: 0,
  threes: 0,
  fours: 0,
  fives: 0,
  sixes: 0,
  roundsWon: 0,
  calls: 0,
  straights: 0,
  gamesPlayed: 0,
  gamesWon: 0,
};

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

export const INVOKE_ACCEPT_FRIEND_REQUEST = "AcceptFriendRequest";

export const INVOKE_SEND_FRIEND_REQUEST = "SendFriendRequest";

export const INVOKE_REMOVE_FRIEND = "RemoveFriend";

export const RECEIVE_USER = "ReceiveUser";

export const RECEIVE_MESSAGE = "ReceiveMessage";

export const RECEIVE_GAME_INVITATION = "ReceiveGameInvitation";

export const RECEIVE_ALREADY_CONNECTED = "AlreadyConnected";

export const RECEIVE_SNACK = "ReceiveSnack";

export const RECEIVE_CONNECTED_USERS = "ConnectedUsers";

export const RECEIVE_GAME = "ReceiveGame";

export const RECEIVE_KICKED = "Kicked";

export const RECEIVE_JOIN_REQUEST = "ReceiveJoinRequest";

export const RECEIVE_FRIEND_REQUEST = "ReceiveFriendRequest";

export const RECEIVE_FRIENDS = "ReceiveFriends";
