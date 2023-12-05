import React, { useState, ChangeEvent } from 'react';
import styles from '../static/css/register.module.css'; // Import your CSS module

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    const url = 'http://localhost:3000/login';
    window.location.href = url;
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
        </div>
      </div>
    </div>
  );
};

export default Register;