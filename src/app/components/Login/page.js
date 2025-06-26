"use client";
import React, { useState } from 'react';
import Link from "next/link";
import './Login.scss';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Image from "next/image";

const Login = () => {
 const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [identifierError, setIdentifierError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phoneNumber);
  };

  const validateForm = () => {
    let isValid = true;
    setIdentifierError("");
    setPasswordError("");

    if (identifier.trim() === "") {
      setIdentifierError("Email or phone number is required.");
      isValid = false;
    } else if (validateEmail(identifier)) {
      // Valid email, no action needed
    } else if (validatePhoneNumber(identifier)) {
      // Valid phone number, no action needed
    } else {
      setIdentifierError("Please enter a valid email or 10-digit phone number.");
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required.");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    console.log(identifier, password);

    try {
      console.log("dw");

      const response = await axios.post(
        {
          mobileNumber: identifier,
          password: password
        }
      );

      if (response.status === 200) {
        console.log(response.data);

        const userData = response.data;
        dispatch(loginSuccess(userData));
        router.push('/');
      } else {
        handleLoginError(response.data);
      }

    } catch (error) {
      dispatch(loginFailure());
      handleLoginError(error.response ? error.response.data : {});
      console.error("Error during login:", error);
    }
  };


  const handleLoginError = (errorData) => {
    if (errorData.error) {
      if (errorData.error.includes("password") && !errorData.error.includes("username")) {
        setPasswordError("Enter correct password.");
      } else if (errorData.error.includes("username")) {
        setIdentifierError("Invalid email or phone number.");
      }
      if (errorData.error.includes("password")) {
        setPasswordError("Invalid password.");
      }
    } else {
      setIdentifierError("Invalid email or phone number.");
      setPasswordError("Invalid password.");
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
            />
          </div>
        </div>

        <div className='login-form'>
          <div className='login-form-content'>
            <div className='login-form-head'>
              <h2 className="h2">Welcome To <span className='log-tittle'>Website</span> !</h2>
              <p className='link p'>
                Don't have account? <Link href='/components/Signup'>Sign up </Link>{' '}
              </p>
            </div>
            <form onSubmit={handleLogin} className='login-form-forms'>
              <div className='login-form1'>
                <label>Email <span className='red-mark'>*</span></label>
                <input
                  type="text"
                  value={identifier}
                  className={`input ${identifierError ? "input-error" : ""}`}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    setIdentifierError("");
                  }}
                />
                {identifierError && <p className="error-message p">{identifierError}</p>}
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
                  />
                  <span onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                {passwordError && <p className="error-message p">{passwordError}</p>}
                <Link href='/forget-password' className='forget p'>Forget Password ?</Link>
              </div>
              <div className='login-form-btns'>
                <button type='submit' className='btn'>
                  Sign in
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