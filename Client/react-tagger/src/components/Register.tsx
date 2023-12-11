import React, { useState, ChangeEvent } from 'react';
import styles from '../static/css/register.module.css'; // Import your CSS module
import axios from 'axios';

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const registerUser = async (username:string, password:string) => {

    if(username.length === 0 || password.length === 0)
      return false;
    
    try {
      const response = await axios.post('http://localhost:5000/users/register', {
        username: username,
        password: password,
      });
      console.log('response.data=',response.data);
      if(response.data)
      return response.data;      
    } catch (error) {
      setErrorMessage((error as Error).toString());
      return false;
    }
  };
  
  const handleRegister = async () => {
    const url = 'http://localhost:3000/login';
    const isRegistered = await registerUser(username,password);
    setUsername('');
    setPassword('');
    if(isRegistered){
      setErrorMessage('');
      window.location.href = url;
    }else{
      if(username.length === 0 || password.length === 0)
        setErrorMessage('One or more fields are empty');
      else
        setErrorMessage('Username is already taken');
    }
  };

  return (
    <div>
      <div className={styles.RegisterPage_Screen}>
        <div style={{ marginRight: '110px' }}>
          <h2 className={`${styles.nonactive} ${styles.h2}`}>
            <a href="/login" style={{ textDecoration: 'none', color: '#1161ed' }}>
              sign in
            </a>
          </h2>
          <h2 className={`${styles.active} ${styles.h2}`} style={{ fontWeight: 400, color: 'white' }}>
            sign up
          </h2>
        </div>

        <div className={styles.RegisterPage_Form} style={{ marginTop: '13%' }}>
          <input
            type="text"
            className={styles.RegisterPage_text}
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <span className={`${styles.LoginRegister_Span} ${styles.text_span} ${styles.span}`} style={{ marginRight: '100%' }}>
            username
          </span>
          <input
            type="password"
            className={styles.RegisterPage_text}
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <span className={`${styles.LoginRegister_Span} ${styles.text_span} ${styles.span}`} style={{ marginRight: '100%' }}>
            password
          </span>
          <button style={{ marginTop: '10px' }} className={styles.RegisterPage_SignupButton} onClick={handleRegister}>
            Sign Up
          </button>

          {errorMessage!=='' && <div style={{color:'red',fontSize:20,fontWeight:'bold',position:'relative',top:30,left:80}}>{errorMessage}</div>}
        </div>
      </div>
    </div>
  );
};

export default Register;