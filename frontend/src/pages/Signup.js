// src/pages/Signup.js
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_MUTATION } from '../graphql/mutations/userMutations';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data) => {
      if (data?.signup?._id) {
        alert('User registered successfully as a normal user. Please log in!');
        navigate('/login');
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do not send any role – backend should default to "user"
    signup({ variables: { ...form } });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="card p-4 shadow-sm">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            className="form-control"
            type="text"
            name="username"
            id="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Signup'}
        </button>
      </form>
      {error && <p className="text-danger mt-2">{error.message}</p>}
    </div>
  );
}

export default Signup;
