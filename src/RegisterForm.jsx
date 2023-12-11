import React,{useState} from "react";
import axios from "axios";

const RegisterForm = ({ setIsRegistered }) => {
const [registerFormData, setRegisterFormData] = useState({
    username: '',
    name: '',
    password: '',
  });


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

  export default RegisterForm