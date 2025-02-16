// src/pages/Login.js
import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { LOGIN_QUERY } from '../graphql/mutations/userMutations';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [userOrEmail, setUserOrEmail] = useState('');
  const [password, setPassword] = useState('');

  // useLazyQuery since login is defined as a query
  const [loginQuery, { loading, error }] = useLazyQuery(LOGIN_QUERY, {
    onCompleted: (data) => {
      if (data?.login?.token) {
        localStorage.setItem('token', data.login.token);
        localStorage.setItem('user', JSON.stringify(data.login.user));
        navigate('/employees');
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmail = userOrEmail.includes('@');
    loginQuery({
      variables: {
        username: isEmail ? null : userOrEmail,
        email: isEmail ? userOrEmail : null,
        password: password,
      },
    });
  };

  return (
    <div className="card p-4 shadow-sm">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="userOrEmail" className="form-label">
            Username or Email
          </label>
          <input
            className="form-control"
            type="text"
            id="userOrEmail"
            value={userOrEmail}
            onChange={(e) => setUserOrEmail(e.target.value)}
            placeholder="Enter your username or email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <p className="text-danger mt-2">{error.message}</p>}
    </div>
  );
}

export default Login;
