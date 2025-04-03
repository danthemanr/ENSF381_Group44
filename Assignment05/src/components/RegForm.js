import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [hover, setHover] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  function validateUsername() {
    if (3>username.length || username.length>20) {
      return "Username must be between 3 and 20 characters.";
    }
    else if (!(64<username.charCodeAt(i)&&username.charCodeAt(i)<91 ||
    96<username.charCodeAt(i)&&username.charCodeAt(i)<123)) {
      return "Username should start with a letter.";
    }
    else {
      var i = 0; 
      while (i<username.length &&
        (47<username.charCodeAt(i)&&username.charCodeAt(i)<58 ||
        64<username.charCodeAt(i)&&username.charCodeAt(i)<91 ||
        96<username.charCodeAt(i)&&username.charCodeAt(i)<123 ||
        username.charAt(i)=='-' || username.charAt(i)=='_')
        ) {i += 1;}
      if (i<username.length) {
        return `'${username.charAt(i)}' is not a valid character. Only numbers, letters, dashes, and underscores are accepted.`;
      }
    }
  }

  function validatePassword() {
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    } else {
      var i = 0;
      var u_case = false;
      var l_case = false;
      var num = false;
      var special = false;
      while (i<password.length) {
        if (47<password.charCodeAt(i)&&password.charCodeAt(i)<58) {
          num = true;
        } else if (64<password.charCodeAt(i)&&password.charCodeAt(i)<91) {
          u_case = true;
        } else if (96<password.charCodeAt(i)&&password.charCodeAt(i)<123) {
          l_case = true;
        } else if (" !@#$%^&*()-_=+[]{}|;:'\",.<>?/`~".includes(password.charAt(i))) {
          special = true;
        } else {
          return`'${password.charAt(i)}' is not a valid character. Valid special characters are  !@#$%^&*()-_=+[]{}|;:'",.<>?/\`~`;
        }
        i += 1;
      }
    }
    if (!u_case || !l_case || !num || !special) {
      return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }
  }

  function validateConfirmPassword() {
    if (password != confirmPassword) {
      return "Passwords do not match.";
    }
  }

  function validateEmail() {
    var i = email.indexOf('@');
    if (email.includes(' ')) {
      return "Email cannot have spaces.";
    }
    else if (i == -1) {
      return "Email must include an @ symbol.";
    }
    else if (i == 0) {
      return "Email must have something before @.";
    }
    else while (i < email.length && email.charAt(i) != '.') {i += 1;}
    if (i >= email.length-1 || i<=email.indexOf('@')+1) {
      return "Email must include a domain name and extension.";
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(['', '', '', '']);

    const newError = error.slice();
    newError[0] = validateUsername();
    newError[1] = validatePassword();
    newError[2] = validateConfirmPassword();
    newError[3] = validateEmail();
    setError(newError);

    if (error == ['', '', '', '']) {
      const backendEndpoint = 'http:127.0.0.1/5001/register';
      
      try {
        const response = await fetch(backendEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password, email }),
        });

        if (response.ok) {
          // Redirect after 2 seconds
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else {
          newError[0] = 'Server-side Error: form submission failer'; //TODO: make a better error message
        }
      } catch (err) {
        newError[0] = 'Failed to connect to the server. Please try again later.';
      } finally {
        setError(newError);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
          Email:
        </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      {error[0] && error[1] && error[2] && error[3] && (
        <div style={{ 
          color: '#D32F2F', 
          backgroundColor: '#FFEBEE', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '15px'
        }}>
          {error[0] && <p>Invalid username (Reason: {error[0]})</p>}
          {error[1] && <p>Invalid password (Reason: {error[1]})</p>}
          {error[2] && <p>{error[2]}</p>}
          {error[3] && <p>Invalid email (Reason: {error[3]})</p>}
        </div>
      )}

      <button 
        type="submit" 
        disabled={isLoading}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          width: '100%',
          padding: '10px',
          margin: '10px',
          backgroundColor: hover ? '#45A049' : '#4CAF50 ',
          opacity: hover ? '1.0' : '0.5',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: isLoading ? 'not-allowed' : 'pointer'
        }}
      >
        {isLoading ? 'Authenticating...' : 'Signup'}
      </button>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '10px'
        }}
      >
        <a href="/login">
          Already have an account? Login here
        </a>
      </div>
    </form>
  );
};

export default RegForm;