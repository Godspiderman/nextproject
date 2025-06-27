"use client";
import React from 'react';
import "./Service.scss";
import { MdEmergency } from "react-icons/md";
import { FaHeartCircleBolt } from "react-icons/fa6";
import { FaHandsHoldingChild } from "react-icons/fa6";
import { LiaCutSolid } from "react-icons/lia";
import { PiBrainBold } from "react-icons/pi";
import { MdBabyChangingStation } from "react-icons/md";


function page() {
  const services = [
    {
      title: "Emergency Care",
      description: "24/7 emergency services with specialized trauma care units and rapid response teams.",
      icon: <MdEmergency/>
    },
    {
      title: "Cardiology",
      description: "Comprehensive heart care including diagnostics, treatment, and rehabilitation.",
      icon: <FaHeartCircleBolt/>
    },
    {
      title: "Pediatrics",
      description: "Specialized care for children from infancy through adolescence.",
      icon: <FaHandsHoldingChild/>
    },
    {
      title: "Orthopedics",
      description: "Advanced bone and joint care including surgical and non-surgical treatments.",
      icon: <LiaCutSolid/>
    },
    {
      title: "Neurology",
      description: "Expert care for disorders of the nervous system and brain of mental health.",
      icon: <PiBrainBold/>
    },
    {
      title: "Maternity",
      description: "Complete prenatal, delivery, and postnatal care for mothers and babies.",
      icon: <MdBabyChangingStation/>
    }
  ];

  return (
    <div className="services-page">
      <div className="services-header">
        <h1 className="services-title">Our Hospital Services</h1>
        <p className="services-subtitle">Comprehensive healthcare services for all your needs</p>
        
        <div className="search-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search services..."
          />
          <button className="search-button">Search</button>
        </div>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">
              {service.icon}
            </div>
            <h2 className="service-name">{service.title}</h2>
            <p className="service-description">{service.description}</p>
            <button className="learn-more">Learn More</button>
          </div>
        ))}
      </div>

      <div className="additional-services">
        <h2 className="additional-title">Additional Services</h2>
        <div className="service-list">
          <p className="service-item">Laboratory Services</p>
          <p className="service-item">Radiology & Imaging</p>
          <p className="service-item">Pharmacy</p>
          <p className="service-item">Physical Therapy</p>
          <p className="service-item">Nutrition Counseling</p>
          <p className="service-item">Mental Health Services</p>
        </div>
      </div>
    </div>
  );
}

export default page;