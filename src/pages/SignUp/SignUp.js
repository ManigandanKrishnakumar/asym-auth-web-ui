import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { PageHeading } from "../../components";
import { AccountCreationPage } from "../../components/AccountCreationPage/AccountCreationPage";
import { CheckUsernameForm } from "../../components/CheckUsernameForm/CheckUsernameForm";
import { ACTION_TYPES, STATES } from "../../state-management/constants";
import { AppContext } from "../../state-management/app-context";
import { API_ENDPOINTS } from "../../constants/apiConstants";

export const SignUp = () => {
    const [ username, setUsername ] = React.useState('');
    const [ unavailableUsername, setUnavailableUsername ] = React.useState('');
    const [ emptyUsername, setEmptyUsername ] = React.useState(false);
    const [ dp, setDP ] = React.useState('');
    const [ email, setEmail ] = React.useState('');
    const [ displayName, setDisplayName ] = React.useState('');
    const [ nameAvailable, setNameAvailable ] = React.useState(false);
    const [ checkInitiated, setCheckInitiated ] = React.useState(false);
    const [ errStatus, setErrStatus ] = React.useState(false);
    const [ windowsErrStatus1, setWindowsErrStatus1 ] = React.useState(false);
    const [ windowsErrStatus2, setWindowsErrStatus2 ] = React.useState(false);
    const [ windowsErrStatus3, setWindowsErrStatus3 ] = React.useState(false);
    const [ checkCompleted, setCheckCompleted ] = React.useState(false);
    const navigate = useNavigate();
    
    const { data, dispatch } = useContext(AppContext);
    const asymAuth = data[STATES.ASYM_AUTH];

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
            //console.log(resJson);
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
            dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: true });
            const userObj = { username };
            const resJson = await handleFetch(userObj, API_ENDPOINTS.CHECK_USERNAME);
            //const resJson = await handleFetch(userObj, 'http://localhost:6000/api/user/check-username');
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
                //console.log(err);
                setErrStatus(true);
            }
            dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });
        }
    }

    const handleCreateAccount = async (e) => {
        setErrStatus(false);
        setWindowsErrStatus1(false);
        setWindowsErrStatus2(false);
        e.preventDefault();
        let knownWinErr = false;
        let unknownWinErr = false;
        dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: true });
        try{
            const metaData = { displayName, email, dp };
            //const user = new User();
            const response = await asymAuth.createAccountKeyPair(username);
            if(!response.isSuccess){
                if(response.message === "Server Unreachable"){
                    setWindowsErrStatus1(true);
                    knownWinErr = true;
                }else if(response.message === "Authentication cancelled by the user"){
                    setWindowsErrStatus2(true);
                    knownWinErr = true;
                }else{
                    setWindowsErrStatus3(true);
                    unknownWinErr = true;
                }
                throw response.message;
            }
            //console.log(JSON.stringify(response)); //{"isSucess":false,"Message":"Server Unreachable"}
            const dataObj = { username, publicKey : response.payload, metaData };
            //console.log(dataObj);
            //const resJson = await handleFetch(dataObj, 'http://localhost:6000/api/user/create-user');
            const resJson = await handleFetch(dataObj, API_ENDPOINTS.CREATE_USER);
            if(resJson.isSuccess){
                setCheckInitiated(false);
                navigate('/');
            }else{
                throw "Error! Account creation Failed!"
            }
        }catch(err){
            console.log(err);
            if(!knownWinErr && !unknownWinErr){
                setErrStatus(true);
            }
        }
        dispatch({ type: ACTION_TYPES.SET_LOADING_STATUS, payload: false });
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
                        displayPicture={dp} 
                        emailID={email} 
                        displayName={displayName} 
                        handleCreateAccount={handleCreateAccount}
                        setDisplayPicture={setDP}
                        setEmailID={setEmail}
                        setDisplayName={setDisplayName}
                        />
                </div>
            )}
            { checkInitiated && (!nameAvailable && <div><br /><p>Username <b>{unavailableUsername}</b> is not available! Please try a different username.</p></div>) }
            { emptyUsername && <div><br /><p>Username cannot be empty!</p></div> }
            { errStatus && <div><br /><p>Sorry, something went wrong. Please try again.</p></div> }
            { windowsErrStatus1 && <div><br /><p>The Windows App is not reachable! Please check if it is running.</p></div> }
            { windowsErrStatus2 && <div><br /><p>The Windows App requires user authentication! Please try again.</p></div> }
            { windowsErrStatus3 && <div><br /><p>Sorry, something went wrong in the <b>Windows App</b>. Please try again.</p></div> }         
        </div>
    );
};
