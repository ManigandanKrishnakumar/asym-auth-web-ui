import { Button } from "../Button/Button";
import "./AccountCreationPage.scss"

export const AccountCreationPage = ({ 
    username, 
    displayPicture, 
    emailID, 
    displayName, 
    handleCreateAccount, 
    setDisplayPicture,
    setEmailID,
    setDisplayName
}) => {

    return (
        <div className="account-creation-page">
            <br />
            <p>Username <b>{ username }</b> is available!</p>
            <br />
            <h4>Add Profile's Details</h4>
            <br />
            <form>
                <label>Choose your DP:</label>
                <br />
                <input 
                    type="file"
                    value = {displayPicture}
                    onChange = {(e) => setDisplayPicture(e.target.value)}
                />
                <br />
                <br />
                <label>Enter your Display Name:</label>
                <br />
                <input 
                    type="text"
                    value = {displayName}
                    onChange = {(e) => setDisplayName(e.target.value)}
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
                <Button label="Create Account" onClick={handleCreateAccount}/>
            </form>
        </div>
    );
}