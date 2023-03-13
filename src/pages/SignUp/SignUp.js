import React from "react";
import { useNavigate } from 'react-router-dom';
import { PageHeading } from "../../components";
import { AccountCreationPage } from "../../components/AccountCreationPage/AccountCreationPage";
import { CheckUsernameForm } from "../../components/CheckUsernameForm/CheckUsernameForm";
import { AsymAuth } from "../../asym-auth-client-sdk/asym-auth-client";

export const SignUp = () => {
    const [ username, setUsername ] = React.useState('');
    const [ unavailableUsername, setUnavailableUsername ] = React.useState('');
    const [ emptyUsername, setEmptyUsername ] = React.useState(false);
    const [ publicKey, setPublicKey ] = React.useState('');
    const [ displayPicture, setDisplayPicture ] = React.useState('');
    const [ emailID, setEmailID ] = React.useState('');
    const [ personalInfo, setPersonalInfo ] = React.useState('');
    const [ nameAvailable, setNameAvailable ] = React.useState(false);
    const [ checkInitiated, setCheckInitiated ] = React.useState(false);
    const [ errStatus, setErrStatus ] = React.useState(false);
    const [ accountCreated, setAccountCreated ] = React.useState(false);
    const [ checkCompleted, setCheckCompleted ] = React.useState(false);
    const navigate = useNavigate();
    const asymAuth = new AsymAuth();


    const handleUsernameChange = (changedUsername) => {
        setUsername(changedUsername);
        setCheckInitiated(false);
        setEmptyUsername(false);
    }

    const handleFetch = async (dataObj, apiURL) => {
        try{
            const res = await fetch(apiURL, 
            {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(dataObj)
            });
            const resJson = await res.json();
            console.log(resJson);
            return resJson;
        }catch(err){
            console.log(err);
            setErrStatus(true);
        }
    }
    
    const handleCheckAvailability = async (e) => {
        setErrStatus(false);
        e.preventDefault();
        if( username === '' ){
            setEmptyUsername(true);
            setCheckInitiated(false);
        } else {
            const userObj = { username };
            const resJson = await handleFetch(userObj, 'http://localhost:6000/api/user/check-username');
            try{
                if(resJson.isSuccess && resJson.payload.is_available === 0){
                    setNameAvailable(true);
                    setCheckInitiated(true);
                    setCheckCompleted(true);
                }else if(resJson.isSuccess && resJson.payload.is_available === 1){
                    setNameAvailable(false);
                    setCheckInitiated(true);
                    setUnavailableUsername(username);
                    setUsername('');
                }else{
                    throw "Error! Check Availalbility failed!"
                }
            }catch(err){
                console.log(err);
                setErrStatus(true);
            }
        }
    }

    const handleCreateAccount = async (e) => {
        setErrStatus(false);
        e.preventDefault();
        try{
            const metaData = { displayPicture, emailID, personalInfo };
            const response = await asymAuth.createAccountKeyPair(username);
            //console.log(response.payload);
            //console.log(typeof(response.payload));
            setPublicKey(JSON.stringify(response.payload));
            const dataObj = { username, publicKey : JSON.stringify(response.payload), metaData };
            console.log(dataObj);
            const resJson = await handleFetch(dataObj, 'http://localhost:6000/api/user/create-user');
            if(resJson.isSuccess){
                setAccountCreated(true);
                setCheckInitiated(false);
            }else{
                throw "Error! Account creation Failed!"
            }
        }catch(err){
            console.log(err);
            setAccountCreated(false);
            setErrStatus(true);
        }
    }

    return (
        <div name="">
            <PageHeading heading="Sign Up" />
            { !checkCompleted &&
                <div>
                    <CheckUsernameForm 
                        username={username} 
                        handleUsernameChange={handleUsernameChange} 
                        handleCheckAvailability = {handleCheckAvailability} />
                </div>
            }
            { checkInitiated && (nameAvailable && 
                <div>
                    <AccountCreationPage 
                        username={username}  
                        displayPicture={displayPicture} 
                        emailID={emailID} 
                        personalInfo={personalInfo} 
                        handleCreateAccount={handleCreateAccount}
                        setDisplayPicture={setDisplayPicture}
                        setEmailID={setEmailID}
                        setPersonalInfo={setPersonalInfo}
                        />
                </div>
            )}
            { checkInitiated && (!nameAvailable && <div><br /><p>Username <b>{unavailableUsername}</b> is not available! Please try again!</p></div>) }
            { emptyUsername && <div><br /><p>Username cannot be empty!</p></div> }
            { errStatus && <p>Sorry, something went wrong. Please try again.</p> }
            { accountCreated && navigate('/') }         
        </div>
    );
};
