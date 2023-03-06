import { AsymAuth } from "../asym-auth-client-sdk";
import { User } from "../models/User";

export const STATES = {
  IS_LOGGED_IN: "isLoggedIn",
  ASYM_AUTH: "asymAuth",
  CURRENT_USER: "currentUser",
};

export const INITIAL_STATE = {
  [STATES.IS_LOGGED_IN]: false,
  [STATES.ASYM_AUTH]: new AsymAuth(),
  [STATES.CURRENT_USER]: new User(),
};

export const ACTION_TYPES = {
  SET_LOGIN_STATUS: "setLoginStatus",
  SET_CURRENT_USER: "setCurrentUser",
};
