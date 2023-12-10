import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  
  const [registerFormData, setRegisterFormData] = useState({
    username: '',
    name: '',
    password: '',
  });

  const [LoginFormData, setLoginFormData] = useState({
    username: '',
    password: ''
  });

  const [token,setToken]=useState(null);
  const[user,setUser]=useState(null);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const loggedInUserJSON= window.localStorage.getItem('LoggedInUser')
    if(loggedInUserJSON){
      const user=JSON.parse(loggedInUserJSON);
      setUser(user);
      setToken(user.token);
    }
  },[])

  const handleRegister = async (event) => {
    event.preventDefault();

    console.log('Registering user...');
    const response = await axios.post('http://localhost:3001/api/users', registerFormData);

    if (response.status === 200) {
      console.log('Registration successful!');
      setRegisterFormData({
        username: '',
        name: '',
        password: '',
      });
          //  show the login form
          setIsRegistered(true)
    }
  };

  // RegistrationForm

  const RegisterForm = () => {
    return (
      <div><h3>Register</h3>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Type your email..."
          value={registerFormData.username}
          onChange={(event) =>
            setRegisterFormData({ ...registerFormData, username: event.target.value })
          }
          required
        />
        <br />
        <input
          type="text"
          placeholder="Type your FullName..."
          value={registerFormData.name}
          onChange={(event) =>
            setRegisterFormData({ ...registerFormData, name: event.target.value })
          }
          required
        />
        <br />
        <input
          type="password"
          placeholder="Enter your Password..."
          value={registerFormData.password}
          onChange={(event) =>
            setRegisterFormData({ ...registerFormData, password: event.target.value })
          }
          required
        />
        <br />
        <button type="submit">Register</button>
      </form>

      Already Registered? <button onClick={()=>setIsRegistered(true)}>Login</button>
      </div>
    );
  };

// LoginForm

const [isRegistered, setIsRegistered] = useState(false);

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
}


  const LoginForm = () => {
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

  // LoggedInPage
  const LoggedInPage=({user,onLogout})=>{
    return(
      <div>
      <h2>Welcome,{user.name}!</h2>
      <button onClick={onLogout}>Logout</button>
    </div>
    )
   
  }
// Logout 

const onLogout=()=>{
  setUser(null);
  window.localStorage.clear();
  setIsRegistered(true)
}

  return (
    <div>
      <h1>Password-Reset Application</h1>
      {
        user?(<LoggedInPage user ={user} onLogout={onLogout}/>
        ):(
         isRegistered?(
          LoginForm()
         ):(
          RegisterForm()
         )
        )
      }
      
    </div>
  );
}

export default App;
