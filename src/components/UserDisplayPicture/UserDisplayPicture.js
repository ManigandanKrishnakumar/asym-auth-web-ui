import React, { useContext } from "react";
import { AppContext } from "../../state-management/app-context";
import { STATES } from "../../state-management/constants";

import "./UserDisplayPicture.scss";

export const UserDisplayPicture = ({ source }) => {
  return (
    <div className="dp-container">
      <img className="dp-image" src={source} />
    </div>
  );
};
