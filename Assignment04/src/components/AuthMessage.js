import { useContext, useState, useEffect } from "react";
import { LoginContext } from './LoginForm';
import DisplayStatus from './DisplayStatus';

function AuthMessage() {
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("");
  const data = useContext(LoginContext);

  useEffect(() => {
    const username = data.username
    const password = data.password
    if (data != undefined && username != undefined && password != undefined) {
      if (username.length < 1 || password.length < 8) {
        setMsg("Password must be at least 8 characters and Username cannot be empty");
        setType("error");
      } else {
        setMsg('');
        setType('');
      }
    }
    
  }, [data]);
  return (
    <DisplayStatus type={type} message={msg}/>
  );
}

export default AuthMessage;