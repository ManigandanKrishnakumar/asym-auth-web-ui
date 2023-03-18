import {BACK_END_POINTS} from '../apiconstants/apiConstants';
import { AsymAuth } from '../asym-auth-client-sdk/asym-auth-client';

const asymAuth = new AsymAuth();


export const getChallenge = async (username) => {
  const body = {username};
  try {
    const response = await fetch(BACK_END_POINTS.SIGN_IN.CHALLENGE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error(`User not present. Server responded with ${response.status}`);
    }
    const data = await response.json();
    const signature = data.payload.signature;
    const challenge = data.payload.challenge;
    return {challenge, signature};
  } catch (error) {
    throw new Error('User not present')
  }
};

export const getEncryptedChallenge = async (challenge) => {
  try {
    const result = await asymAuth.encryptServerMessage(challenge);
    const encryptedChallenge = result.payload.cipherText;
    return encryptedChallenge;
  } catch (error) {
    throw new Error('Authentication failed. Please check windows app')
  }
};



export const getToken = async (response, signature, challenge) => {
  const body = { response, signature, challenge};
  
  try {
    const result = await fetch(BACK_END_POINTS.SIGN_IN.AUTHENTICATION, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include'
    });
    if (!result.ok) {
      throw new Error(`Authentication failed. Server responded with ${result.status}`);
    }
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Authentication failed')
  }
};

export const deleteToken = async () => {
  try {
    const result = await fetch(BACK_END_POINTS.SIGN_IN.LOGOUT, {
      method: 'GET',
      credentials: 'include'
    });
    if (!result.ok) {
      throw new Error(`Logout failed. Server responded with ${result.status}`);
    }
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('logout failed')
  }
};
