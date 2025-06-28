"use client";
import React, { useState } from 'react';
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { loginUser } from '@/app/services/api';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/slices/authSlice';
import './Login.scss';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [identifierError, setIdentifierError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateForm = () => {
    let isValid = true;
    setIdentifierError("");
    setPasswordError("");
    setFormError("");

    if (identifier.trim() === "") {
      setIdentifierError("Email is required.");
      isValid = false;
    } else if (!validateEmail(identifier)) {
      setIdentifierError("Please enter a valid email.");
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const credentials = {
        emailId: identifier,
        password: password
      };

      const response = await loginUser(credentials);

      if (response) {
        dispatch(loginSuccess({
          userId: response.userId,
          userName: response.userName,
          token: response.token,
          roleName: response.roleName,
          roleId: response.roleId
        }));
        
        // Redirect based on role or to home page
        router.push('/');
      } else {
        setFormError("Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setFormError(error.response?.data?.message || "An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='login'>
      <div className='login-container'>
        <div className='login-img'>
          <div className='login-img-box'>
            <Image
              className="log-image"
              src="/images/4113244.jpg"
              alt="Doctor"
              width={400}
              height={400}
              priority
            />
          </div>
        </div>

        <div className='login-form'>
          <div className='login-form-content'>
            <div className='login-form-head'>
              <h2 className="h2">Welcome To <span className='log-title'>Website</span> !</h2>
              <p className='link p'>
                Don't have an account? <Link href='/signup'>Sign up</Link>
              </p>
            </div>
            
            {formError && <div className="form-error-message">{formError}</div>}
            
            <form onSubmit={handleLogin} className='login-form-forms'>
              <div className='login-form1'>
                <label>Email <span className='red-mark'>*</span></label>
                <input
                  type="email"
                  value={identifier}
                  className={`input ${identifierError ? "input-error" : ""}`}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    setIdentifierError("");
                  }}
                  placeholder="Enter your email"
                />
                {identifierError && <p className="error-message">{identifierError}</p>}
              </div>
              
              <div className='login-form1'>
                <label htmlFor='password'>Password <span className='red-mark'>*</span></label>
                <div className="password-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    className={`input ${passwordError ? "input-error" : ""}`}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("");
                    }}
                    placeholder="Enter your password"
                  />
                  <span 
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                {passwordError && <p className="error-message">{passwordError}</p>}
                <Link href='/forget-password' className='forget'>Forgot Password?</Link>
              </div>
              
              <div className='login-form-btns'>
                <button 
                  type='submit' 
                  className='btn'
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner"></span>
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;