import React, { useContext } from 'react';
import "./AdminDashboard.scss";
import { PageHeading } from "../../components";
import { useNavigate } from 'react-router-dom';
import {useEffect} from 'react';
import { USER_ROLES } from "../../constants/appConstants";
import { AppContext } from "../../state-management/app-context";
import {ACTION_TYPES, STATES } from "../../state-management/constants";
import { UsersListItem } from "../../components/UsersListItem/UsersListItem";
import { UserEditPopup } from "../../components/UserEditPopup/UserEditPopup";
import { API_ENDPOINTS } from '../../constants/apiConstants';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const {data, dispatch } = useContext(AppContext);
  const user = data[STATES.CURRENT_USER];
  const [ showPopup, setShowPopup ] = React.useState(false);
  const [ userToEditObj, setUserToEditObj ] = React.useState(null);
  const [ websiteUsers, setWebsiteUsers ] = React.useState(null);
  const [ errStatus, setErrStatus ] = React.useState(false);
  const [ userRoleOfSpecificUser, setUserRoleOfSpecificUser ] = React.useState("Normal-User");


  const handleUsersListItemClick = (usernameToEdit) => {
     const userObj = websiteUsers.find(u => u.user_name === usernameToEdit)
    setUserToEditObj(userObj);
    setUserRoleOfSpecificUser(userObj.user_role)
    setShowPopup(true);
  };

  const retriveAllUsers = async () => {
    setErrStatus(false);
    dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: true });
    try{
      const res = await fetch(API_ENDPOINTS.ADMIN_LISTS_USERS,{
        credentials: 'include',
      });
      const resJson = await res.json();
      if(resJson.isSuccess === true){
        setWebsiteUsers(resJson.payload);
        dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });
      }else{
        throw resJson;
      }
    }catch(err){
      console.log(err);
      setErrStatus(true);
      dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });
    }
  }

  const handleDeleteUser = async (username) => {
    setErrStatus(false);
    setShowPopup(false);
    dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: true });
    try{
      const res = await fetch(API_ENDPOINTS.ADMIN_DELETES_USER,{
        method: 'DELETE',
        headers: { "Content-Type": "application/json"},
        credentials: 'include',
        body: JSON.stringify({username})
    });
      const resJson = await res.json();
      if(resJson.isSuccess === true){
        dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });
        retriveAllUsers();
      }else{
        throw resJson;
      }
    }catch(err){
      console.log(err);
      setErrStatus(true);
      dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });
    }
  }

  const handleUserRoleChange = async (username, userRole) => {
    setErrStatus(false);
    setShowPopup(false);
    dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: true });
    try{
      const res = await fetch(API_ENDPOINTS.ADMIN_UPDATES_USER,{
        method: 'PUT',
        headers: { "Content-Type": "application/json"},
        credentials: 'include',
        body: JSON.stringify({username, userRole})
    });
      const resJson = await res.json();
      if(resJson.isSuccess === true){
        dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });
        retriveAllUsers();
      }else{
        throw resJson;
      }
    }catch(err){
      console.log(err);
      setErrStatus(true);
      dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });
    }
  }

  useEffect(() => {
    if (((user.userRole === USER_ROLES.ADMIN) && data[STATES.IS_LOGGED_IN]) !== true ) {
      navigate('/');
    }else{
      retriveAllUsers();
    }
  }, []);


  return (
    <div className="admin-dashboard-container">
      <PageHeading heading="Admin Dashboard" />
      <br />
      { websiteUsers && websiteUsers.map((websiteUser) => (
        <UsersListItem 
          username={websiteUser.user_name}  
          displayName={JSON.parse(websiteUser.meta_data).displayName}
          dp={JSON.parse(websiteUser.meta_data).dp}
          email={JSON.parse(websiteUser.meta_data).email}
          userRole={websiteUser.user_role}
          handleUsersListItemClick={handleUsersListItemClick}
          />
      )) }
      { showPopup && <UserEditPopup
        username={userToEditObj.user_name}  
        displayName={JSON.parse(userToEditObj.meta_data).displayName}
        dp={JSON.parse(userToEditObj.meta_data).dp}
        email={JSON.parse(userToEditObj.meta_data).email}
        setShowPopup={setShowPopup}
        handleDeleteUser={handleDeleteUser}
        handleUserRoleChange={handleUserRoleChange}
        userRoleState={userRoleOfSpecificUser}
        setUserRoleState={setUserRoleOfSpecificUser}
      /> }
      { errStatus && <div><br /><p>Sorry, something went wrong. Please try again.</p></div> }
    </div>
  );
};
