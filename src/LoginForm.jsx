import React, { useState } from 'react'
import axios from 'axios';


function LoginForm() {

const [LoginFormData,setLoginFormData]=useState({
  username:'',
  password:''
});

const [IsRegistered,setIsRegistered] = useState(false); 


const handleLogin= async (event)=>{
  event.preventDefault();

  console.log("Login user...");
  const response = await axios.post('http://localhost:3001/api/users',LoginFormData);
  
  if(response.statusText=='OK'){
    console.log('Login sucessfull!')
    setLoginFormData({
    username:'',
    password:''
 
    })
  }
  console.log(response)

}

  
  return (
 
    <div>

      <h1>Password-Reset</h1>
      <h3>Login</h3>
       <form onSubmit={handleLogin}>

        <input
        type="email"
        placeholder='Type your email...'
        value={LoginFormData.username}
        onChange={(event)=>setLoginFormData({
          ...LoginFormData,username:event.target.value
      
        })}
        required
        /><br/>

        <input
        type="password"
        placeholder='Enter your Password...'
        value={LoginFormData.password}
        onChange={(event)=>setLoginFormData({
          ...LoginFormData,password:event.target.value
        })}
        required
        /><br/>

        <button type='submit'>Login</button>
      </form>
      </div>
    
  );

 
}

export default LoginForm;

