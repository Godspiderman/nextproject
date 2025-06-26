import React from 'react'
import Image from "next/image";
import { FaHeartPulse } from "react-icons/fa6";
import { PiBrainFill } from "react-icons/pi";
import { PiEarBold } from "react-icons/pi";


function page() {
    const chooseUsData = [
        {
            title: "Advanced Technology",
            description: "Our surgeons are trained in the latest robotic surgical techniques, which allow for greater precision.",
            image: "/images/Rectangle 27.png",
        },
        {
            title: "Highly Experienced Specialists",
            description: "Our surgeons are trained in the latest robotic surgical techniques, which allow for greater precision.",
            image: "/images/Rectangle 27 (1).png",
        },
        {
            title: "24/7 Emergency Services",
            description: "Our surgeons are trained in the latest robotic surgical techniques, which allow for greater precision.",
            image: "/images/Rectangle 27 (2).png",
        },
    ];

    const servicesData = [
        {
            title: "General Medicine",
            description: "Heart specialist focusing on cardiovascular health and diseases.",
            link: "/book-consultation",
            icon: <FaHeartPulse />
        },
        {
            title: "Emergency Care",
            description: "Doctor specializing in diagnosing and treating nervous system disorders.",
            link: "/book-emergency",
            icon: <PiBrainFill />
        },
        {
            title: "Neurology",
            description: "Doctor specializing in ear, nose, and throat disorders and surgeries..",
            link: "/book-neurology",
            icon: <PiEarBold />
        },
    ];

    const doctorList = [
        {
        name: "Dr. Olivia Ellyer",
        specialty: "General Medicine",
        image: "/images/image 4.png",
        },
        {
        name: "Dr. Priya Patel",
        specialty: "General Medicine",
        image: "/images/360_F_647162966_SFu8GP6awkeW0OnFnAxPjiGXSoeme4ht.jpg",
        },
        {
        name: "Dr. Michael Chen",
        specialty: "General Medicine",
        image: "/images/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
        }
    ]

    const facilities = [
        "/images/17-compressed.png",
        "/images/023f5fc97c62c029d4e6197f28dba5d704b89d00.jpg",
        "/images/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
    ];

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <div className="hero-text">
                        <p className="sub-title">Your Health, Our Priority</p>
                        <h1 className="main-title">
                            Comprehensive care and <br /> medical excellence for your
                            well-being.
                        </h1>
                        <p className="hero-description"> Welcome to [Hospital Name], where your health is our utmost priority. Our experienced team of doctors and healthcare professionals is dedicated to providing you with personalized care using the latest technology and innovative treatments. Discover the difference in healthcare at [Hospital Name].</p>
                        <a href="/pages/BookConsultation" className="button primary">
                            Book Consultation
                        </a>
                    </div>
                    <div className="profile-image-content">
                        <Image
                            className="profile-image"
                            src="/images/image 4.png"
                            alt="Doctor"
                            width={400}
                            height={400}
                        />
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="choose-us">
                <div className='section-title'>
                    <h2 className="section-head1">
                        Why <span>Choose Us</span>
                    </h2>
                    <p className='section-head2'>Choosing [Hospital Name] means choosing quality healthcare. Our commitment to your health goes beyond treatment; we ensure a supportive environment, world-class infrastructure, and a compassionate team that is always by your side.</p>
                </div>
                <div className="cards-row">
                    {chooseUsData.map((item) => (
                        <div key={item.title} className="choose-card">
                            <div className="cardimg-container">
                                <Image className="card-img" src={item.image} alt={item.title} width={300} height={200} />
                            </div>
                            <h3 className="card-title">{item.title}</h3>
                            <p className="card-description">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Our Services */}
            <section className="services">
                <div className='section-tittle'>
                    <h2 className="section-head1">
                        Our <span>Services</span>
                    </h2>
                    <p className='section-head2'>Explore our departments, including Cardiology, Orthopedics, Pediatrics, Neurology, and more. We offer specialized care and cutting-edge treatments.</p>
                </div>
                <div className="service-tabs">
                    {servicesData.map((service, index) => (
                        <div key={index} className="service-card">
                            <div className='icon-service'>{service.icon}</div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-description">{service.description}</p>
                            <a href={service.link} className="service-link">Book Consultation</a>
                        </div>
                    ))}
                </div>
            </section>

            {/* Meet Our Specialist */}
            <section className="specialists">
                <div className='section-tittle'>
                    <h2 className="section-head1">
                        Meet Our <span>Specialist</span>
                    </h2>
                    <p className='section-head2'>Our team of specialists brings years of experience and dedication to delivering exceptional healthcare. Each doctor at [Hospital Name] is committed to providing you with individualized treatment plans that meet your unique needs</p>
                </div>
                <div className="specialist-grid">
                    {doctorList.map((doc, index) => (
                        <div key={index} className="doctor-card">
                            <Image className='specialist-img' src={doc.image} alt={doc.name} width={200} height={200} />
                            <h4 className="doctor-name">{doc.name}</h4>
                            <p className="doctor-specialty">{doc.specialty}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Facilities */}
            <section className="facilities">
                <div className='section-tittle'>
                    <h2 className="section-head1">
                        Facilities and <span>Infrastructure</span>
                    </h2>
                    <p className='section-head2'>At [Hospital Name], we understand that a healing environment is crucial for recovery. Our facilities are designed to provide maximum comfort and safety to our patients and their families. With modern infrastructure and advanced equipment, we are well-prepared to meet your healthcare needs.</p>
                </div>
                <div className="facility-grid">
                    {facilities.map((img, i) => (
                        <Image className='facility-img' key={i} src={img} alt={`Facility ${i}`} width={250} height={200} />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default page