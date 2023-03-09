import {BACK_END_POINTS} from '../api/apiConstants';
import { AsymAuth } from '../asym-auth-client-sdk/asym-auth-client';

const asymAuth = new AsymAuth();


export const getChallenge = async (username) => {
  const body = {username};
  
  try {
    const response = await fetch('http://localhost:3000/api/auth/challenge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error(`Failed to get challenge. Server responded with ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const signature = data.payload.signature;
    const challenge = data.payload.challenge;
    return {challenge, signature};
  } catch (error) {
    console.log(error);
    return {error: true,};
  }
};

export const getEncryptedChallenge = async (challenge) => {
  try {
    const result = await asymAuth.encryptServerMessage(challenge);
    const encryptedChallenge = result.payload.cipherText;
    return encryptedChallenge;
  } catch (error) {
    console.log(error);
    return {error: true,};
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
  
    const data = await result.json();
    console.log(data);
    // const token = data.payload.token;
    // return {token, error: false};
  } catch (error) {
    return {error: true,};
  }
};
