import React, { useState } from 'react';
import styles from '../static/css/login.module.css'; // Import your CSS module
import axios from 'axios';


const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const loginUser = async (username:string, password:string) => {
    try {
      const response = await axios.post('http://localhost:5000/users/login', {
        username: username,
        password: password,
      });
  
      console.log(response.data);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleLogin = () => {
    const url = 'http://localhost:3000/'+username+'/home';
    loginUser(username,password);
    window.location.href = url;
  };

  return (
    <div id={styles.login_page}>
      <div className={styles.LoginPage_Screen}>
        <div style={{ marginRight: '110px' }}>
          <h2 className={`${styles.active} ${styles.h2}`} style={{ fontWeight: 400, color: 'white' }}>
            sign in
          </h2>
          <h2 className={`${styles.nonactive} ${styles.h2}`}>
            <a href="/register" style={{ textDecoration: 'none', color: '#1161ed' }}>
              sign up
            </a>
          </h2>
        </div>
        <div className={styles.LoginPage_Form}>
          <input
            type="text"
            className={styles.LoginPage_text}
            value={username}
            name="username"
            onChange={handleUsernameChange}
            required
          />
          <span className={`${styles.LoginRegister_Span} ${styles.text_span} ${styles.span}`} style={{ marginRight: '100%' }}>
            username
          </span>
          <input
            type="password"
            className={styles.LoginPage_text}
            value={password}
            name="password"
            onChange={handlePasswordChange}
            required
          />
          <span className={`${styles.LoginRegister_Span} ${styles.text_span} ${styles.span}`} style={{ marginRight: '100%' }}>
            password
          </span>
          <br />
          <div className={styles.keep_me_signed} style={{ marginRight: '160px' }}>
            <input type="checkbox" id="checkbox-1-1" className={styles.LoginPage_RememberMeCheckbox} />
            <label htmlFor="checkbox-1-1" className={styles.LoginPage_Label} style={{ color: 'white' }}>
              Keep me Signed in
            </label>
          </div>
          <button className={styles.LoginPage_SigninButton} onClick={handleLogin}>
            Sign In
          </button>
          <div className={styles.dont_have_an_account}>
            <p style={{ color: 'white' }}>
              Don't have an account? <a href="/register" style={{ textDecoration: 'none', color: '#1161ed' }}>sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;