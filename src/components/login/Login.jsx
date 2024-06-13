// Login.js
import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import'./login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError('Email is required');
      return;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      return;
    } else {
      setPasswordError('');
    }

    // Additional validation, e.g., email format
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    // Perform authentication logic, e.g., call your API

    // Assuming authentication is successful, redirect to dashboard
    navigate('/dashboard');
  };

  const isValidEmail = (email) => {
    // Basic email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <div>
    
     

    <div className="mask d-flex align-items-center ">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div className="card" >
              <div className="card-body p-10">
                <h2 className="login text-left mb-5">Sign In</h2>
                <form>
                     
                  
                  <div className="form-float mb-4">
                    <input type="email"  id="mail" className="form-control form-control-lg" />
                    <label className="floating-label">Email*</label>
                  </div>
                 
                  <div className="form-float mb-4">
                    <input type="password" onChange={(e) => setPassword(e.target.value)} id="pwd" className="form-control form-control-lg" />
                    <label className="floating-label">Password <span style={{fontSize:'11px',top:'50px'}}> *</span></label>
                  
                  </div>
                 <p className="fpassword text-left "> Forgot your password? </p>
                  <div className="d-flex justify-content-center">
                  <Link to="/">
                    <button type="button"  id="Login" className="btlog btn-success btn-block btn-lg gradient-custom-4 text-body"> <i className="bi bi-arrow-right-square" /> Log in</button>
                    </Link>
                    </div>
                  <div className="form-check justify-content-center ">
                    <input className="form-check-input " type="checkbox" defaultValue id="form2Example3cg" />
                    <label className="form-check-label" htmlFor="form2Example3g">
                      remember me <a href="#!" className="text-body"></a>
                    </label>
                  </div>
                  
                   
                  <div className="separator">
                    <div className="line" />
                    <h7 className="or">or</h7>
                    <div className="line" />
                  </div>
  
  
                   <div className="d-flex justify-content-center">
                   <Link to="">
                   <button type="button" id="Login" className="btgoogle " style={{color:'white'}}> <i className="bi bi-google" /> Log in with Google</button>
                   </Link>
                   </div>
                 <p className="notcustomer text-center "> Not yet a customer?</p>                 
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    
  </div>
  );
};

export default Login;
