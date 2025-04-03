import React from 'react';
import Header from './Header';
import Footer from './Footer';
import RegForm from './RegForm';

function SignupPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <Header />
      
      <main style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '20px' 
      }}>
        <div style={{ 
          width: '100%', 
          maxWidth: '400px', 
          margin: '0 auto' 
        }}>
          <h2 style={{ 
            textAlign: 'center', 
            color: '#004080', 
            marginBottom: '30px' 
          }}>
            LMS Student Sign Up
          </h2>
          <RegForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SignupPage;