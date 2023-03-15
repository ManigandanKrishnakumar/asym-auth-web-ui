import { Button } from "../Button/Button";
import "./AccountCreationPage.scss"

export const AccountCreationPage = ({ 
    username, 
    displayPicture, 
    emailID, 
    personalInfo, 
    handleCreateAccount, 
    setDisplayPicture,
    setEmailID,
    setPersonalInfo
}) => {

    return (
        <div className="account-creation-page">
            <br />
            <p>Username <b>{ username }</b> is available!</p>
            <br />
            <h4>Add Profile's Details</h4>
            <br />
            <form>
                <label>Choose your Display Picture:</label>
                <br />
                <input 
                    type="file"
                    value = {displayPicture}
                    onChange = {(e) => setDisplayPicture(e.target.value)}
                />
                <br />
                <br />
                <label>Enter your Email ID:</label>
                <br />
                <input 
                    type="email"
                    value = {emailID}
                    onChange = {(e) => setEmailID(e.target.value)}
                />
                <br />
                <br />
                <label>Enter your Personal Info:</label>
                <br />
                <input 
                    type="text"
                    value = {personalInfo}
                    onChange = {(e) => setPersonalInfo(e.target.value)}
                />
                <br />
                <br />
                <Button label="Create Account" onClick={handleCreateAccount}/>
            </form>
        </div>
    );
}