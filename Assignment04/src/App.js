import logo from './logo.svg';
import './App.css';
import Homepage  from './Homepage';
import CoursesPage  from './CoursesPage';
import LoginPage  from './LoginPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/
function App() {
  return(
    <BrowserRouter className="navbar">
      <Routes>
        <Route path="/" element={<Homepage />}>Home</Route>
        <Route path="/courses" element={<CoursesPage />}>Courses</Route>
        <Route path="/login" element={<LoginPage />}>Login</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
