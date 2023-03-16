import React, { useContext } from "react";
import { CiLogout } from "react-icons/ci";
import { User } from "../../models/User";
import { deleteToken } from "../../services/SignIn"; 
import { AppContext } from "../../state-management/app-context";
import { ACTION_TYPES, STATES } from "../../state-management/constants";
import { UserDisplayPicture } from "../UserDisplayPicture/UserDisplayPicture";

import "./UserPreview.scss";

export const UserPreview = () => {
  const { data, dispatch } = useContext(AppContext);
  const user = data[STATES.CURRENT_USER];

  const onLogout = () => {
    deleteToken();
    dispatch({ type: ACTION_TYPES.SET_LOGIN_STATUS, payload: false });
    dispatch({ type: ACTION_TYPES.SET_CURRENT_USER, payload: new User() });
    console.log("Log Out");
  };

  if (!data[STATES.IS_LOGGED_IN]) {
    return null;
  }

  return (
    <div className="user-preview-container">
      <UserDisplayPicture source={user.dp} />
      <p className="display-name">{user.displayName}</p>
      <p className="role">{`${user.userRole} user`}</p>
      <CiLogout id="logout-button" onClick={onLogout} />
    </div>
  );
};
