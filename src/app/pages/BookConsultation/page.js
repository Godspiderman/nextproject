import React from 'react';
import "./Bookconsultation.scss"
import Image from "next/image";

function page() { 

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

    return (
        <div className="consultation">
            <h1 className="consultation__title h2">Book An Appointment</h1>  

            <section className="consultation__section"> 
                <h2 className="consultation__subtitle h3">Select Doctor</h2> 
                <div className="consultation__doctors">
                    {doctors.map((doctor) => (
                        <label className="doctor-card" key={doctor.id}>
                            <input 
                                type="radio" 
                                name="doctor" 
                                value={doctor.id}  
                            />
                            <Image
                            className='consultation-img'
                                src={doctor.image}
                                alt={`Doctor ${doctor.name}`}
                                width={150}
                                height={150}
                                priority={false}  
                            />
                            <div className="doctor-info">
                                <h3 className="h4">{doctor.name}</h3>  
                                <p className="p">{doctor.specialty} | {doctor.experience}</p> 
                            </div>
                        </label>
                    ))}
                </div>
            </section>

            <section className="consultation__section">
                <h2 className="consultation__subtitle h3">Select Date</h2>
                <input 
                    type="date" 
                    className="date-picker" 
                    min={new Date().toISOString().split('T')[0]}  
                />
            </section>

            <section className="consultation__section">
                <h2 className="consultation__subtitle h3">Select Time Slot</h2>
                <div className="slot-container">
                    {timeSlots.map((slot, index) => (
                        <button 
                            key={index} 
                            className="slot-btn"
                            type="button"
                        >
                            {slot}
                        </button>
                    ))}
                </div>
            </section>

            <div className="consultation__actions">
                <button 
                    className="confirm-btn"
                    type="button" 
                >
                    Confirm Booking
                </button>
            </div>
        </div>
    );
}

export default page;