import './LoginForm.css';

export default function DisplayStatus({type, message}) {
  if (type!="" && message!="") {
    return <div className="messageBox"><p>{type}: {message}</p></div>;
  }
}