import logo from './logo.svg';
import './App.css';
import Login  from './Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HousePricePredictor from './HousePricePredictor';

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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}>Home</Route>
        <Route path="/predict" element={<HousePricePredictor />}>Home</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
