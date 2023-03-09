import { useState } from 'react';
import { getToken } from '../services/SignIn';

const SignedIn = () => {
  const [token, setToken] = useState(null);
  const [isTokenLoading, setIsTokenLoading] = useState(false);
  const [errorToken, setTokenError] = useState(null);

  const authenticated = async (response, signature, challenge) => {
    setIsTokenLoading(true);
    setTokenError(null); 
    try {
      const {token} = await getToken(response, signature, challenge);
      
        setToken(token);
        setIsTokenLoading(false);
      
    } catch (error) {
      setIsTokenLoading(false);
      setTokenError(error);
    }
  };

  return { token, isTokenLoading, errorToken, authenticated };
};




export default SignedIn;