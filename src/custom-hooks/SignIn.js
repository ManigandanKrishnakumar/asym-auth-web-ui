import { useState } from 'react';
import { getChallenge, getEncryptedChallenge, getToken } from '../services/SignIn';


function useAuthentication() {
    const [challenge, setChallenge] = useState(null);
    const [signature, setSignature] = useState(null);
    const [encryptedChallenge, setEncryptedChallenge] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const authenticate = async (username) => {
      setIsLoading(true);
      setError(null);
  
      try {
        const challengeResult = await getChallenge(username);
        const { challenge, signature } = challengeResult;
        setChallenge(challenge);
        setSignature(signature);
        
        
        const encryptedChallengeResult = await getEncryptedChallenge(challenge);
        setEncryptedChallenge(encryptedChallengeResult);
        
        

        const tokenResult = await getToken(encryptedChallengeResult, signature, challenge);
        const { token } = tokenResult;
        setToken(token);
        
        
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error);
      }
    };
  
    return { token, isLoading, error, authenticate };
  }
  export default useAuthentication;



