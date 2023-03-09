import { useState } from 'react';
import { getEncryptedChallenge } from '../services/SignIn';

function UseEncryptedChallenge() {
  const [EncryptedChallenge, SetEncryptedChallenge] = useState(null);
  const [isEncryptedChallengeLoading, setIsEncryptedChallengeLoading] = useState(false);
  const [errorEncryptedChallenge, setErrorEncryptedChallenge] = useState(null);

  const GotEncryptedChallenge = async (challenge) => {
    setIsEncryptedChallengeLoading(true);
    setErrorEncryptedChallenge(null); 
    try {
      const EncryptedChallenge = await getEncryptedChallenge(challenge);
      SetEncryptedChallenge(EncryptedChallenge);
      setIsEncryptedChallengeLoading(false);
    } catch (error) {
      setIsEncryptedChallengeLoading(false);
      setErrorEncryptedChallenge(error);
    }
  };
  

  return { EncryptedChallenge, isEncryptedChallengeLoading, errorEncryptedChallenge, GotEncryptedChallenge };
};


export default UseEncryptedChallenge;

