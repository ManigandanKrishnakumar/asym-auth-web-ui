import React, { useContext } from "react";
import "./Error.scss";
import { AppContext } from "../../state-management/app-context";
import { ACTION_TYPES } from "../../state-management/constants";

export const Error = ({error}) => {
  
  const {dispatch} = useContext(AppContext)

  const onCancel = () => {
    
    dispatch({type: ACTION_TYPES.SET_ERROR_STATUS, payload: null});
  }


  return (
    <div className="loader-container">
      <div className="loader-content primary">
      <h1>{error.errorMessage}</h1>
      <button type="button" id="retry-btn" onClick={error.callback}>Retry</button>
      <button type="button" id="cancel-btn" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};
