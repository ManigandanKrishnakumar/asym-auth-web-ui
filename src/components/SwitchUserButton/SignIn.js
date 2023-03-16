import { ACTION_TYPES} from "../../state-management/constants";
import { useNavigate } from 'react-router-dom';
import { AppError } from "../../models/AppError";


export const SignIn = (dispatch, userInfo) => {
  //const navigate = useNavigate();
  console.log('bleh');
  dispatch({ type: ACTION_TYPES.SET_LOGIN_STATUS, payload: true });
  dispatch({ type: ACTION_TYPES.SET_CURRENT_USER, payload: userInfo.payload });
  dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });
  dispatch({ type: ACTION_TYPES.SET_ERROR_STATUS, payload: null});
  //navigate('/');
  };
    

export const Retry = (dispatch, callback) => {
  dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false});
  dispatch({ type: ACTION_TYPES.SET_LOGIN_STATUS, payload: false });
  dispatch({ type: ACTION_TYPES.SET_ERROR_STATUS, payload: new AppError("Authentication failed.", callback) });
};

