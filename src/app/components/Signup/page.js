"use client";

import React, { useState, useEffect } from "react";
import "./Signup.scss";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Image from "next/image";
import { createUser, getAllCountries, getAllStates } from "@/app/services/api";

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    passwordHash: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    stateId: 0,
    zipCode: "",
    countryId: 0,
    imageUrl: ""
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Fetch countries on component mount
    const fetchCountries = async () => {
      try {
        const countriesData = await getAllCountries();
        setCountries(countriesData);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    // Fetch states when country changes
    const fetchStates = async () => {
      if (formData.countryId > 0) {
        try {
          const statesData = await getAllStates();
          setStates(statesData);
        } catch (error) {
          console.error("Failed to fetch states:", error);
        }
      } else {
        setStates([]);
      }
    };

    fetchStates();
  }, [formData.countryId]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }

    if (!formData.passwordHash.trim()) {
      newErrors.passwordHash = "Password is required.";
    } else if (formData.passwordHash.length < 6) {
      newErrors.passwordHash = "Password must be at least 6 characters.";
    } else if (formData.passwordHash.length > 15) {
      newErrors.passwordHash = "Password must be no longer than 15 characters.";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required.";
    } else {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      if (dob >= today) {
        newErrors.dateOfBirth = "Date of birth must be in the past.";
      }
    }

    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required.";
    if (formData.countryId === 0) newErrors.countryId = "Country is required.";
    if (formData.stateId === 0) newErrors.stateId = "State is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Additional validation for numeric fields
    if (isNaN(formData.zipCode)) {
      setErrors(prev => ({ ...prev, zipCode: "Zip code must be a number" }));
      return;
    }

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      passwordHash: formData.passwordHash,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      address: formData.address,
      city: formData.city,
      zipCode: parseInt(formData.zipCode, 10), // Using parseInt with radix 10
      stateId: parseInt(formData.stateId, 10),
      countryId: parseInt(formData.countryId, 10),
      imageUrl: formData.imageUrl || "",
      activeStatus: true,
      roleId: 6,
      userId: null,
      uniqueStringId: null
    };

    console.log(payload);

    try {
      setLoading(true);
      await createUser(payload);
      setLoading(false);
      setSuccessMessage("Registration successful! You can now login.");

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        passwordHash: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        city: "",
        stateId: 0,
        roleId: 6,
        zipCode: "",
        countryId: 0,
        imageUrl: ""
      });

      setTimeout(() => {
        router.push('/components/Login');
      }, 2000);

    } catch (error) {
      setLoading(false);
      console.error("Registration error:", error);
      setErrors({ form: error.response?.data?.message || "Registration failed. Please try again." });
    }
  };

  return (
    <div className="signup">
      <div className="signup-container">
        <div className="signup-form">
          <div className="signup-form-content">
            <div className="signup-form-head">
              <h2 className="h2">Register Details</h2>
              {successMessage && <p className="success-message p">{successMessage}</p>}
              {errors.form && <p className="error-message p">{errors.form}</p>}
            </div>

            <form onSubmit={handleSubmit} className="signup-form-forms">
              <div className="signup-form1">
                <label>First Name*</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  maxLength={100}
                  className={`input ${errors.firstName ? "input-error" : ""}`}
                />
                {errors.firstName && <p className="error-message p">{errors.firstName}</p>}
              </div>

              <div className="signup-form1">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  maxLength={100}
                  className={`input ${errors.lastName ? "input-error" : ""}`}
                />
                {errors.lastName && <p className="error-message p">{errors.lastName}</p>}
              </div>

              <div className="signup-form1">
                <label>Email*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  maxLength={100}
                  className={`input ${errors.email ? "input-error" : ""}`}
                />
                {errors.email && <p className="error-message p">{errors.email}</p>}
              </div>

              <div className="signup-form1">
                <label>Phone*</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10}
                  className={`input ${errors.phone ? "input-error" : ""}`}
                />
                {errors.phone && <p className="error-message p">{errors.phone}</p>}
              </div>

              <div className="signup-form1">
                <label>Password*</label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="passwordHash"
                    value={formData.passwordHash}
                    onChange={handleChange}
                    maxLength={15}
                    className={`input ${errors.passwordHash ? "input-error" : ""}`}
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </span>
                </div>
                {errors.passwordHash && <p className="error-message p">{errors.passwordHash}</p>}
              </div>

              <div className="signup-form1">
                <label>Date of Birth*</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={`input ${errors.dateOfBirth ? "input-error" : ""}`}
                />
                {errors.dateOfBirth && <p className="error-message p">{errors.dateOfBirth}</p>}
              </div>

              <div className="signup-form1">
                <label>Gender*</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`input ${errors.gender ? "input-error" : ""}`}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="signup-form1">
                <label>Address*</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`input ${errors.address ? "input-error" : ""}`}
                />
                {errors.address && <p className="error-message p">{errors.address}</p>}
              </div>

              <div className="signup-form1">
                <label>City*</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`input ${errors.city ? "input-error" : ""}`}
                />
                {errors.city && <p className="error-message p">{errors.city}</p>}
              </div>

              <div className="signup-form1">
                <label>Zip Code*</label>
                <input
                  type="number"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className={`input ${errors.zipCode ? "input-error" : ""}`}
                />
                {errors.zipCode && <p className="error-message p">{errors.zipCode}</p>}
              </div>

              <div className="signup-form1">
                <label>Country*</label>
                <select
                  name="countryId"
                  value={formData.countryId}
                  onChange={handleChange}
                  className={`input ${errors.countryId ? "input-error" : ""}`}
                >
                  <option value="0">Select Country</option>
                  {countries.map(country => (
                    <option key={country.countryId} value={country.countryId}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {errors.countryId && <p className="error-message p">{errors.countryId}</p>}
              </div>

              <div className="signup-form1">
                <label>State*</label>
                <select
                  name="stateId"
                  value={formData.stateId}
                  onChange={handleChange}
                  className={`input ${errors.stateId ? "input-error" : ""}`}
                  disabled={!formData.countryId || formData.countryId === 0}
                >
                  <option value="0">Select State</option>
                  {states.map(state => (
                    <option key={state.stateId} value={state.stateId}>
                      {state.name}
                    </option>
                  ))}
                </select>
                {errors.stateId && <p className="error-message p">{errors.stateId}</p>}
              </div>

              <div className="signup-form-btns">
                <button type="submit" className="btn" disabled={loading}>
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
                <p className="p">
                  Already have an account? <Link href="/components/Login" className="link">Login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="signup-img">
          <div className='signup-img-box'>
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
      </div>
    </div>
  );
};

export default Signup;