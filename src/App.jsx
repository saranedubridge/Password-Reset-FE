import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import LoggedInPage from './LoggedInPage';


function App() {
  
  const [token,setToken]=useState(null);
  const[user,setUser]=useState(null);
  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(()=>{
    const loggedInUserJSON= window.localStorage.getItem('LoggedInUser')
    if(loggedInUserJSON){
      const user=JSON.parse(loggedInUserJSON);
      setUser(user);
      setToken(user.token);
    }
  },[])

  const onLogout = () => {
    // Handle the logout action here
    // Clear user data, tokens, and local storage
    setUser(null);
    setToken(null);
    window.localStorage.clear();
  };


  return (
    <div>
      <h1>Password-Reset Application</h1>
      {
        user?(<LoggedInPage user ={user} onLogout={onLogout}/>
        ):(
         isRegistered?(
          <LoginForm
          
          setIsRegistered={setIsRegistered}
          setUser={setUser}
          setToken={setToken}
          setError={setError}
          />

         ):(
          <RegisterForm setIsRegistered={setIsRegistered} />
         )
        )
      }
      
    </div>
  );
}

export default App;
