import React, { useContext, useState } from "react";
import { updateUserInfo } from "../../services/EditUserInfo";
import './UpdateUserInfo.scss'
import { AppContext } from "../../state-management/app-context";
import { STATES } from "../../state-management/constants";

const UserInfo = () => {
  const {data} = useContext(AppContext);
  const user = data[STATES.CURRENT_USER];

    const [currentUser, setCurrentUser] = useState({
        displayName: user.displayName,
        email: user.email,
        displayPicture: user.dp,
      });

const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({
      ...currentUser,
      [name]: value,
    });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const metadata = {displayName: currentUser.displayName, email: currentUser.email, displayPicture: currentUser.displayPicture.toString('base64')};
        await updateUserInfo(user.username, metadata);
    }catch(error){
        console.log(error);
    }
}
  return (
    <div className="container">
    <form>
  <div className="row" style={{ marginTop: '20px'}}>
    <label for="displayname">Display Name:</label>
    <input type="text" id="displayName" name="displayName" value={currentUser.displayName} onChange = {handleChange}/>
  </div>
  <div className="row">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" value={currentUser.email} onChange = {handleChange} />
  </div>
  <div className="row">
    <label for="displaypicture">Display Picture:</label>
    <input type="file" id="displaypicture" name="displaypicture" value={currentUser.dp} onChange = {handleChange}/>
  </div>
  </form>
  <button type="submit" id ="update" onClick={handleSubmit}>Save Changes</button>
</div>
    );
};

export default UserInfo;
