import logo from './logo.svg';
import './App.css';

const date = new Date();
const currentYear = date.getFullYear();
var isLoggedIn = true


function App() {
  return (
    <div className="App">
      <h1>
      ENSF-381: Full Stack Web Development
      </h1>
      <p>
      React Components
      </p>
      <p>
        {currentYear}
      </p>
      {isLoggedIn ? <p>Welcome back!</p> : <p>Please log in.</p>}
    </div>
  );
}

export default App;
