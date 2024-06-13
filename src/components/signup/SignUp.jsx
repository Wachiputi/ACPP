// SignUp.js
import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';


const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform signup logic, e.g., call your API

    // Assuming signup is successful, redirect to dashboard
    navigate('/dashboard');
  };

  return (
   
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
 
  );
};

export default SignUp;
