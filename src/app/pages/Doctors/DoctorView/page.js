"use client";
import React from 'react';
import Image from 'next/image';
import "./DoctorView.scss"
import { useRouter } from 'next/navigation';


function DoctorView() {
    const router = useRouter();

    const doctor = {
        id: 1,
        name: "Dr. Amanda Clara",
        specialty: "Orthopedist",
        experience: "12 years experience",
        education: "MD, Harvard Medical School",
        languages: ["English", "Spanish", "French"],
        about: "Dr. Amanda Clara is a board-certified orthopedist with extensive experience in joint replacements and sports medicine. She has published numerous papers on minimally invasive techniques and patient recovery.",
        image: "/images/360_F_647162966_SFu8GP6awkeW0OnFnAxPjiGXSoeme4ht.jpg",
        rating: 4.9,
        reviews: 128,
        consultationFee: "₹ 120.00",
        availability: ["Mon, Wed, Fri: 9AM - 5PM", "Tue, Thu: 11AM - 7PM"],
        services: [
            "Joint Replacement",
            "Arthroscopic Surgery",
            "Fracture Care",
            "Sports Injury Treatment",
            "Osteoporosis Management"
        ]
    };

    const handleBack = () => {
        router.push('/pages/Doctors');
    };

    const Book = () => {
        router.push('/pages/BookConsultation');
    }

    return (
        <div className='doctor-view'>
            <button onClick={handleBack} className="back-button">
                ← Back to Doctors
            </button>
            <div className="doctor-view__header">
                <div className="doctor-view__image">
                    <Image
                        src={doctor.image}
                        alt={`Dr. ${doctor.name}`}
                        width={300}
                        height={300}
                        className="profile-image"
                    />
                </div>
                <div className="doctor-view__info">
                    <h1 className="doctor-name">{doctor.name}</h1>
                    <p className="doctor-specialty">{doctor.specialty}</p>
                    <div className="doctor-meta">
                        <span className="experience">{doctor.experience}</span>
                        <span className="rating">⭐ {doctor.rating} ({doctor.reviews} reviews)</span>
                    </div>
                    <div className="doctor-education">
                        <h3>Education</h3>
                        <p>{doctor.education}</p>
                    </div>
                    <div className="doctor-languages">
                        <h3>Languages Spoken</h3>
                        <div className="language-tags">
                            {doctor.languages.map((lang, index) => (
                                <span key={index} className="language-tag">{lang}</span>
                            ))}
                        </div>
                    </div>
                    <div className="consultation-fee">
                        <h3>Consultation Fee</h3>
                        <p className="fee">{doctor.consultationFee}</p>
                    </div>
                    <button className="book-btn" onClick={Book} >Book Appointment</button>
                </div>
            </div>

            <div className="doctor-view__content">
                <section className="about-section">
                    <h2>About Dr. {doctor.name.split(' ')[2]}</h2>
                    <p>{doctor.about}</p>
                </section>

                <section className="services-section">
                    <h2>Services Offered</h2>
                    <ul className="services-list">
                        {doctor.services.map((service, index) => (
                            <li key={index} className="service-item">
                                <span className="service-icon">+</span>
                                {service}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="availability-section">
                    <h2>Availability</h2>
                    <ul className="availability-list">
                        {doctor.availability.map((slot, index) => (
                            <li key={index} className="availability-item">
                                {slot}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="reviews-section">
                    <h2>Patient Reviews</h2>
                    <div className="review-card">
                        <div className="review-header">
                            <span className="reviewer-name">John D.</span>
                            <span className="review-rating">⭐ 5.0</span>
                        </div>
                        <p className="review-text">
                            "Dr. Clara was extremely knowledgeable and took the time to explain everything clearly.
                            My knee pain improved significantly after following her treatment plan."
                        </p>
                        <span className="review-date">2 weeks ago</span>
                    </div>
                    <button className="view-all-reviews">View All Reviews</button>
                </section>
            </div>
        </div>
    );
}

export default DoctorView;