import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ setIsRegistered, setUser, setToken}) => {
const [LoginFormData, setLoginFormData] = useState({
    username: '',
    password: ''
  });



const [error, setError] = useState(null);


const handleLogin=async (event)=>{
  event.preventDefault();

  console.log('logging in....');
  try{
    const response = await axios.post('http://localhost:3001/api/login',LoginFormData);
    
    console.log('LOGIN SUCCESSFUL!')
    const user = response.data;
    
    setToken(user.token);
    setUser(user);
    window.localStorage.setItem('LoggedInUser',JSON.stringify(user));


// clear the form
setLoginFormData({
  username:'',
  password:''
})

setError(null);
  }catch(error){
    console.error("login Failed---",error);
    setError('Invalid username or password')
  }
};

return (
    <div><h3>Login</h3>
    {error && <p >{error}</p>} {/* Display error message */}
    <form onSubmit={handleLogin}>
  
      <input
        type="email"
        placeholder="Type your email..."
        value={LoginFormData.username}
        onChange={(event) =>
          setLoginFormData({ ...LoginFormData, username: event.target.value })
        }
        required
      />
      <br />
      <input
        type="password"
        placeholder="Enter your Password..."
        value={LoginFormData.password}
        onChange={(event) =>
          setLoginFormData({ ...LoginFormData, password: event.target.value })
        }
        required
      />
      <br />
      <button type="submit">Login</button>
    </form>
    <p>Not Registered?<button onClick={()=>setIsRegistered(false)}>Register</button></p>
    </div>
  );
    };

  export default LoginForm;