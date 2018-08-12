import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <nav className="">
      <Link to="/register">Register</Link> 
      <Link to="/login">Login</Link>
    </nav>
  )
}
