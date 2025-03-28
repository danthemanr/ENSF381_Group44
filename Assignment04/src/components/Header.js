import logo from '../images/logo.jpg';
import './Header.css';

function Header({hrefs}) {
  return (
    <>
      <header>
        <img src={logo} alt="LMS Logo" />
        <h1>LMS - Learning Management System</h1>
      </header>
      <div className="navbar">
        <a href="/">Home</a>
        <a href="/courses">Courses</a>
        <a href="/login">Login</a>
      </div>
    </>
  );
}
export default Header;