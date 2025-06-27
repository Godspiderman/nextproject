"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import "./About.scss";
import { useRouter } from 'next/navigation';


function HospitalAbout() {

  const router = useRouter();


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const hospitalInfo = {
    name: "MedLife Healthcare Center",
    tagline: "Compassionate Care. Advanced Medicine.",
    established: "1995",
    description: "MedLife Healthcare Center has been serving the community with excellence for over 25 years. We are a state-of-the-art medical facility offering comprehensive healthcare services with a patient-centered approach.",
    stats: [
      { value: "250+", label: "Expert Doctors" },
      { value: "50+", label: "Medical Specialties" },
      { value: "10,000+", label: "Patients Yearly" },
      { value: "24/7", label: "Emergency Care" }
    ],
    facilities: [
      "Advanced Cardiac Care Unit",
      "Neonatal Intensive Care",
      "Robotic Surgery Center",
      "Comprehensive Cancer Treatment",
      "Modern Diagnostic Imaging",
      "Rehabilitation Center"
    ],
    awards: [
      "Best Hospital Award - National Healthcare Association (2023)",
      "Patient Safety Excellence - Global Hospital Ratings (2022)",
      "Top 100 Hospitals - Healthcare Times (2021)"
    ],
    image: "/images/CVOR.jpg",
    mission: "To provide exceptional healthcare services through innovation, compassion, and excellence.",
    vision: "To be the leading healthcare provider recognized for outstanding patient care and medical advancements."
  };

  const Book = () => {
    router.push('/pages/BookConsultation');
  }

  return (
    <div className="hospital-about">
      <div className="about-hero">
        <div className="hero-image-container">
          <Image
            src={hospitalInfo.image}
            alt={`${hospitalInfo.name} facility`}
            width={1200}
            height={600}
            priority
            className="hero-image"
          />
          <div className="hero-overlay">
            <h1 className="hospital-name">{hospitalInfo.name}</h1>
            <p className="hospital-tagline">{hospitalInfo.tagline}</p>
          </div>
        </div>
      </div>

      <div className="about-content-container">
        <section className="about-intro-section animate-on-scroll">
          <div className="intro-text-container">
            <h2 className="section-title">Our Story</h2>
            <p className="section-description">{hospitalInfo.description}</p>
            <p className="established-text">Established in {hospitalInfo.established}</p>
          </div>

          <div className="stats-grid">
            {hospitalInfo.stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="two-column-section">
          <section className="mission-section animate-on-scroll">
            <h2 className="section-title">Our Mission</h2>
            <p className="mission-text">{hospitalInfo.mission}</p>
          </section>

          <section className="vision-section animate-on-scroll">
            <h2 className="section-title">Our Vision</h2>
            <p className="vision-text">{hospitalInfo.vision}</p>
          </section>
        </div>

        <section className="facilities-section animate-on-scroll">
          <h2 className="section-title">Our Facilities</h2>
          <ul className="facilities-list">
            {hospitalInfo.facilities.map((facility, index) => (
              <li key={index} className="facility-item">
                <span className="facility-icon">+</span>
                <span className="facility-text">{facility}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="awards-section animate-on-scroll">
          <h2 className="section-title">Awards & Recognition</h2>
          <div className="awards-grid">
            {hospitalInfo.awards.map((award, index) => (
              <div key={index} className="award-card">
                <div className="award-badge">🏆</div>
                <p className="award-text">{award}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-section animate-on-scroll">
          <h2 className="cta-title">Experience Our Care</h2>
          <p className="cta-text">Schedule an appointment or tour our facilities today</p>
          <div className="cta-buttons">
            <button className="primary-cta" onClick={Book}>Book Appointment</button>
            <button className="secondary-cta">Take a Virtual Tour</button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HospitalAbout;