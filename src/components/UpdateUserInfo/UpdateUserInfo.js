import React, { useContext, useState } from "react";
import { updateUserInfo } from "../../services/EditUserInfo";
import './UpdateUserInfo.scss'
import { AppContext } from "../../state-management/app-context";
import { STATES } from "../../state-management/constants";
import { updatingUserInfo, ErrorupdatingUserInfo } from "./updatinguserinfo";
import { ACTION_TYPES} from "../../state-management/constants";

const UserInfo = () => {
  const {dispatch, data} = useContext(AppContext);
  
  const user = data[STATES.CURRENT_USER];
    const [currentUser, setCurrentUser] = useState({
        displayName: user.displayName || " ",
        email: user.email || " ",
        dp: user.dp || " ",
      });

const handleChange = (event) => {
  const { id, value} = event.target;

  if (id === "displaypicture") {
    const selectedfile = event.target.files;
    if (selectedfile.length > 0) {
      const [imageFile] = selectedfile;
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const srcData = fileReader.result;
        setCurrentUser({
          ...currentUser,
          dp: srcData,
        });
      };
      fileReader.readAsDataURL(imageFile);

  }
} else {
    setCurrentUser({
      ...currentUser,
      [id]: value,
    });
  }
  
};





 const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: true });
        const metadata = {displayName: currentUser.displayName, email: currentUser.email, dp: currentUser.dp};
        const userInfo = await updateUserInfo(user.username, metadata);
        updatingUserInfo(dispatch, data[STATES.CURRENT_USER], userInfo);
    }catch(error){
        ErrorupdatingUserInfo(dispatch);
    }
}
  return (
    <div className="container">
    <form>
    <div className="row" style={{ marginTop: '20px'}}>
    <div style={{fontWeight: "bold"}}>Username: {user.username}</div>
  </div>
  <div className="row">
    <label htmlFor="displayname">Display Name:</label>
    <input type="text" id="displayName" name="displayName" value={currentUser.displayName} onChange = {handleChange}/>
  </div>
  <div className="row">
    <label htmlFor="email">Email:</label>
    <input type="email" id="email" name="email" value={currentUser.email} onChange = {handleChange} />
  </div>
  <div className="row">
    <label>Display Picture:</label>
    <input type="file" id="displaypicture" name="file" onChange={handleChange}/>
  </div>
  </form>
  <button type="submit" id ="update" onClick={handleSubmit}>Save Changes</button>
</div>
    );
};

export default UserInfo;
