import React, {useState} from 'react';
import useAuthentication from '../../custom-hooks/SignIn';
import Cookies from 'js-cookie';

const options = ["mani"];

 const SignInForm = () => {
  
      
  const [selectedOption, setSelectedOption] = useState(options[0]);
    const { token, isLoading, error, authenticate } = useAuthentication();
    const [showToken, setShowToken] = useState(false);

    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
         try {
          
         await authenticate(selectedOption);
         setShowToken(true);
          

        } catch(error) {
        console.log(error);
      }};
    
    
    return (
  <div className="form-group mt-3">
      <label htmlFor="user-select">Select a user:</label>
      <select id="user-select" value={selectedOption} onChange={handleOptionChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button onClick={handleSubmit}>Submit</button>      
    </div>


    );
  };
    
  export default SignInForm;
