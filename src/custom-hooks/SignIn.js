import { getChallenge, getEncryptedChallenge, getToken } from '../services/SignIn';
import {useState} from 'react';

function useAuthentication() {
    const [challenge, setChallenge] = useState(null);
    const [signature, setSignature] = useState(null);
    const [encryptedChallenge, setEncryptedChallenge] = useState(null);
    const [token, setToken] = useState(null);
    
    const authenticate = async (username) => {
      
  
      try {
        const challengeResult = await getChallenge(username);
        const { challenge, signature } = challengeResult;
        setChallenge(challenge);
        setSignature(signature);
        
        const encryptedChallengeResult = await getEncryptedChallenge(challenge);
        setEncryptedChallenge(encryptedChallengeResult);

        const userInfo = await getToken(encryptedChallengeResult, signature, challenge);
  
        return userInfo;
      } catch (error) {
      throw new Error('Authentication failed');
      }
    };

    return [authenticate];
  }
  export default useAuthentication;



