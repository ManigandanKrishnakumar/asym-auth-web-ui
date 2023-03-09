import { useState } from 'react';
import { getChallenge } from '../services/SignIn';

function useChallenge() {
  const [challenge, setChallenge] = useState(null);
  const [signature, setSignature] = useState(null);
  const [isChallengeLoading, setIsChallengeLoading] = useState(false);
  const [errorChallenge, setErrorChallenge] = useState(null);

  const GotChallenge = async (username) => {
    setIsChallengeLoading(true);
    setErrorChallenge(null); 
    try {
        const result = await getChallenge(username);
        console.log(result);
        setChallenge(result.challenge);
        setSignature(result.signature);
        setIsChallengeLoading(false);
      }
    catch (error) {
      setIsChallengeLoading(false);
      setErrorChallenge(error);
    }
  };
  
  return { challenge, signature, isChallengeLoading, errorChallenge, GotChallenge };

};
export default useChallenge;

// The signIn function is defined to handle the sign-in process. 
// It takes a username parameter as input, and it calls the getChallenge function to fetch the 
// challenge and signature from the API server. 
// When the response is received, 
// the setChallenge and setSignature functions are used to update the state with the received values. 
// If an error occurs during the process, the setError function is used to update the error state.

