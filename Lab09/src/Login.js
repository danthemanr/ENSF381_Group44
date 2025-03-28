import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Message({text}) {
  if (text != '') {
    return (
      <div className="messageBox">
        <p>{text}</p>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msgs, setMsgs] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
  
    const backendEndpoint = "http://127.0.0.1:5001/validate_login";
  
    try {
      const response = await fetch(backendEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",  // ✅ This is correct
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log(data);
        console.log("Form submitted successfully!");
        setMsgs(data.msg);
        if (data.success) {
          navigate("/predict");
        }
      } else {
        console.error("Form submission failed.");
        setMsgs(`${data.success}: ${data.msg}`);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setMsgs("Form submission failed.");
    }
  }

  return (
    <div className="Login">
      <form id="loginForm" onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" id="username" required onChange={(e) => setUsername(e.target.value)}/>
        <label>Password:</label>
        <input type="password" id="password" required onChange={(e) => setPassword(e.target.value)}/>
        <button id="loginButton" type="sumbit">Login</button>
      </form>
      <Message array={msgs}/>
    </div>
  );
}