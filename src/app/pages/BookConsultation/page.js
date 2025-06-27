"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import "./Bookconsultation.scss";
import Image from "next/image";

function BookConsultation() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        doctor: null,
        date: '',
        time: '',
        name: '',
        gender: '',
        age: '',
        contact: '',
        allergy: '',
        medicalHistory: '',
        tests: ''
    });
    const [errors, setErrors] = useState({});

    const doctors = [
        {
            id: 1,
            name: "Amanda Clara",
            specialty: "Orthopedist",
            experience: "12 years experience",
            image: "/images/image 4.png"
        },
        {
            id: 2,
            name: "Lara Johnson",
            specialty: "Cardiologist",
            experience: "5 years experience",
            image: "/images/pngtree-beautiful-female-doctor-wearing-a-medical-coat-and-mask-png-image_9169436.png"
        },
        {
            id: 3,
            name: "Amanda Smith",
            specialty: "Pediatrician",
            experience: "8 years experience",
            image: "/images/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg"
        },
    ];

    const timeSlots = ["10:00 AM", "10:15 AM", "10:30 AM", "10:45 AM"];

    const validateStep1 = () => {
        const newErrors = {};
        if (!formData.doctor) newErrors.doctor = "Please select a doctor";
        if (!formData.date) newErrors.date = "Please select a date";
        if (!formData.time) newErrors.time = "Please select a time slot";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Please enter your name";
        if (!formData.gender) newErrors.gender = "Please select gender";
        if (!formData.age) newErrors.age = "Please enter your age";
        if (!formData.contact) newErrors.contact = "Please enter contact number";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (step === 1 && validateStep1()) {
            setStep(2);
        } else if (step === 2 && validateStep2()) {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        console.log("Form data:", formData);
        try {
            sessionStorage.setItem('bookingData', JSON.stringify(formData));
            router.push('/');
        } catch (error) {
            console.error("Error storing data:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCancel = () => {
        router.push('/');
    };

    return (
        <div className="consultation">
            <h1 className="consultation__title h2">Book An Appointment</h1>

            <div className="consultation__progress">
                <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1</div>
                <div className="progress-line"></div>
                <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2</div>
            </div>

            {step === 1 && (
                <>
                    <section className="consultation__section">
                        <h2 className="consultation__subtitle h3">Select Doctor</h2>
                        <div className="consultation__doctors">
                            {doctors.map((doctor) => (
                                <label className="doctor-card" key={doctor.id}>
                                    <input
                                        type="radio"
                                        name="doctor"
                                        value={doctor.id}
                                        onChange={() => setFormData(prev => ({ ...prev, doctor }))}
                                        checked={formData.doctor?.id === doctor.id}
                                    />
                                    <Image
                                        className='consultation-img'
                                        src={doctor.image}
                                        alt={`Doctor ${doctor.name}`}
                                        width={150}
                                        height={150}
                                    />
                                    <div className="doctor-info">
                                        <h3 className="h4">{doctor.name}</h3>
                                        <p className="p">{doctor.specialty} | {doctor.experience}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                        {errors.doctor && <p className="error-message">{errors.doctor}</p>}
                    </section>

                    <section className="consultation__section">
                        <h2 className="consultation__subtitle h3">Select Date</h2>
                        <input
                            type="date"
                            name="date"
                            className="date-picker"
                            min={new Date().toISOString().split('T')[0]}
                            value={formData.date}
                            onChange={handleChange}
                        />
                        {errors.date && <p className="error-message">{errors.date}</p>}
                    </section>

                    <section className="consultation__section">
                        <h2 className="consultation__subtitle h3">Select Time Slot</h2>
                        <div className="slot-container">
                            {timeSlots.map((slot, index) => (
                                <label key={index} className={`slot-btn ${formData.time === slot ? 'selected' : ''}`}>
                                    <input
                                        type="radio"
                                        name="time"
                                        value={slot}
                                        checked={formData.time === slot}
                                        onChange={handleChange}
                                        style={{ display: 'none' }}
                                    />
                                    {slot}
                                </label>
                            ))}
                        </div>
                        {errors.time && <p className="error-message">{errors.time}</p>}
                    </section>
                </>
            )}

            {step === 2 && (
                <>
                    <section className="consultation__section">
                        <h2 className="consultation__subtitle h3">Patient Details</h2>
                        <div className="patient-form">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                />
                                {errors.name && <p className="error-message">{errors.name}</p>}
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Gender</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {errors.gender && <p className="error-message">{errors.gender}</p>}
                                </div>

                                <div className="form-group">
                                    <label>Age</label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        placeholder="Age"
                                    />
                                    {errors.age && <p className="error-message">{errors.age}</p>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Contact Number</label>
                                <input
                                    type="tel"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    placeholder="Phone number"
                                />
                                {errors.contact && <p className="error-message">{errors.contact}</p>}
                            </div>

                            <div className="form-group">
                                <label>Allergies</label>
                                <textarea
                                    name="allergy"
                                    value={formData.allergy}
                                    onChange={handleChange}
                                    placeholder="List any allergies"
                                    rows={2}
                                />
                            </div>

                            <div className="form-group">
                                <label>Medical History</label>
                                <textarea
                                    name="medicalHistory"
                                    value={formData.medicalHistory}
                                    onChange={handleChange}
                                    placeholder="Previous medical conditions"
                                    rows={3}
                                />
                            </div>

                            <div className="form-group">
                                <label>Basic Tests Required</label>
                                <textarea
                                    name="tests"
                                    value={formData.tests}
                                    onChange={handleChange}
                                    placeholder="Any specific tests needed"
                                    rows={2}
                                />
                            </div>
                        </div>
                    </section>
                </>
            )}

            <div className="consultation__actions">
                {step === 1 && (
                    <button
                        type="button"
                        className="back-btn"
                        onClick={handleCancel}
                    >
                        Back
                    </button>
                )}
                {step === 2 && (
                    <button
                        type="button"
                        className="back-btn"
                        onClick={() => setStep(1)}
                    >
                        Back
                    </button>
                )}
                <button
                    type="button"
                    className="confirm-btn"
                    onClick={handleNext}
                >
                    {step === 1 ? 'Continue' : 'Confirm Booking'}
                </button>
            </div>
        </div>
    );
}

export default BookConsultation;