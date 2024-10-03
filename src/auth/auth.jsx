import React, { useState } from 'react';
import './auth.css'; // Jika Anda menggunakan CSS khusus untuk halaman ini

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '', // Bisa dihapus jika tidak digunakan
    password: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    if (isLogin) {
      // Login logic (Menggunakan username untuk login)
      fetch('http://localhost:9000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }), // Menggunakan username di sini
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            localStorage.setItem('token', data.token); // Save token to localStorage
            window.location.href = '/'; // Redirect to homepage
          } else {
            setError(data.message);
            console.log(data.message);
          }
        })
        .catch(error => setError(`Error logging in: ${error.message}`));    
    } else {
      // Register logic
      fetch('http://localhost:9000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }), // Sesuaikan payload jika tidak menggunakan email
      })
      .then(response => {
        if (response.headers.get('Content-Type').includes('application/json')) {
          return response.json();
        } else {
          return response.text().then(text => {
            throw new Error(`Unexpected response format: ${text}`);
          });
        }
      })
      .then(data => {
        if (data.success) {
          setIsLogin(true); // Switch to login view after successful registration
        } else {
          setError(data.message);
        }
      })
      .catch(error => setError(`Error registering: ${error.message}`));
      
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          {isLogin && (
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        <p>
          {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
