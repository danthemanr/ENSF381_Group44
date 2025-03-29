import {useNavigate} from 'react-router-dom';
import { useState, createContext, useEffect } from 'react';
import AuthMessage from './AuthMessage';
import './LoginForm.css';
import './MainSection.css'; //conflicting instructions

function Messages({message}) {
  if (message!="") {
    return (
      <div className="messageBox">
        <p>{message}</p>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export const LoginContext = createContext();

function LoginForm() {
  const [data, setData] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  
  async function validateUser() {
    //console.log("validateUser() called");
    for (let user of data) {
      if (user.username == username) {
          if (user.email == password) {
              setMsg("Login successful! Redirecting...");
              navigate("/courses");
              return;
          } else {break;}
      }
    }
    setMsg("Invalid username or password!");
    console.log("msg: ", msg);
  }
  useEffect(() => {
    try {
        fetch('https://jsonplaceholder.typicode.com/users')
          .then((response) => response.json())
          .then((data) => setData(data));
    } catch (error) {
        console.error('Error validating user data:', error);
        setMsg("Faulty connection to server.");
    }
  });
  return (
    <div>
        <form>
            <label>Username:</label>
            <input type="text" id="username" required onChange={(e) => setUsername(e.target.value)}/>
            <br />
            <label>Password:</label>
            <input type="password" id="password" required onChange={(e) => setPassword(e.target.value)}/>
        </form>
        <button onClick={() => validateUser()}>Login</button>
        <br />
        <a>Forgot Password?</a>
        <Messages message={msg}/>
        <LoginContext.Provider value={{username, password}}>
          <AuthMessage/>
        </LoginContext.Provider>
    </div>
  );
}
export default LoginForm;