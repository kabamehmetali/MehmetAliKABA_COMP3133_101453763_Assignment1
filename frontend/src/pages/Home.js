import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome to the Home Page</h1>
      <p>Your Node/Express/GraphQL React Frontend is up and running!</p>
      <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link> | <Link to="/employees">Employees</Link>
    </div>
  );
};

export default Home;
