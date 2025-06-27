"use client";
import React from 'react';
import Image from 'next/image';
import "./Doctors.scss";
import { useRouter } from 'next/navigation';


function DoctorsPage() {
  const router = useRouter();
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Cardiologist",
      experience: "12 years",
      education: "MD, Harvard Medical School",
      image: "/images/image 4.png",
      bio: "Specializes in interventional cardiology with expertise in complex coronary interventions.",
      schedule: "Mon-Fri: 9am-5pm",
      rating: 4.9,
      languages: ["English", "Spanish"]
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialization: "Neurologist",
      experience: "8 years",
      education: "PhD Neurology, Johns Hopkins University",
      image: "/images/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
      bio: "Focuses on movement disorders and neuro-degenerative diseases with cutting-edge treatments.",
      schedule: "Tue-Sat: 10am-6pm",
      rating: 4.8,
      languages: ["English", "Mandarin"]
    },
    {
      id: 3,
      name: "Dr. Priya Patel",
      specialization: "Pediatrician",
      experience: "15 years",
      education: "MD Pediatrics, Stanford University",
      image: "/images/360_F_647162966_SFu8GP6awkeW0OnFnAxPjiGXSoeme4ht.jpg",
      bio: "Passionate about child wellness and preventive care with a gentle approach to treatment.",
      schedule: "Mon-Thu: 8am-4pm",
      rating: 4.95,
      languages: ["English", "Hindi", "Gujarati"]
    },
    {
      id: 4,
      name: "Dr. Robert Williams",
      specialization: "Orthopedic Surgeon",
      experience: "18 years",
      education: "MD Orthopedics, Mayo Clinic",
      image: "/images/istockphoto-488117766-612x612.jpg",
      bio: "Expert in joint replacements and sports medicine with minimally invasive techniques.",
      schedule: "Wed-Sun: 7am-3pm",
      rating: 4.85,
      languages: ["English", "French"]
    },
    {
      id: 5,
      name: "Dr. Emily",
      specialization: "Dermatologist",
      experience: "10 years",
      education: "MD Dermatology, UCLA",
      image: "/images/indian-female-doctor-portrait-south-indian-young-lady-doctor-holding-stethoscope-hand_527904-1841.jpg",
      bio: "Specializes in cosmetic dermatology and skin cancer prevention with advanced diagnostic tools.",
      schedule: "Mon-Fri: 8:30am-5:30pm",
      rating: 4.9,
      languages: ["English", "Spanish"]
    },
    {
      id: 6,
      name: "Dr. James Wilson",
      specialization: "Oncologist",
      experience: "14 years",
      education: "PhD Oncology, MD Anderson",
      image: "/images/portrait-of-two-confident-young-doctors-working-in-a-hospital-photo.jpg",
      bio: "Focuses on personalized cancer treatments and immunotherapy with compassionate care.",
      schedule: "Mon-Wed, Fri: 9am-4pm",
      rating: 4.88,
      languages: ["English"]
    }
  ];

  const Book = () => {
    router.push('/pages/BookConsultation');
  }

   const ViewDoctor = () => {
    router.push('/pages/Doctors/DoctorView');
  }

  return (
    <div className='doctors-page'>
      <h1 className='page-title empty-class'>Our Specialist Doctors</h1>
      <p className='page-description empty-class'>
        Meet our team of highly qualified and experienced medical professionals dedicated to your health.
      </p>

      <div className='search-filter'>
        <input
          type='text'
          placeholder='Search doctors...'
          className='search-input empty-class'
        />
        <select className='specialization-filter empty-class'>
          <option value=''>All Specializations</option>
          <option value='Cardiologist'>Cardiologist</option>
          <option value='Neurologist'>Neurologist</option>
          <option value='Pediatrician'>Pediatrician</option>
          <option value='Orthopedic Surgeon'>Orthopedic Surgeon</option>
          <option value='Dermatologist'>Dermatologist</option>
          <option value='Oncologist'>Oncologist</option>
        </select>
      </div>

      <div className='doctors-grid'>
        {doctors.map(doctor => (
          <div key={doctor.id} className='doctor-card'>
            <div className='doctor-image-container'>
              <Image
                src={doctor.image}
                alt={doctor.name}
                width={300}
                height={300}
                className='doctor-image'
              />
              <div className='rating-badge'>
                ⭐ {doctor.rating}
              </div>
            </div>

            <div className='doctor-details'>
              <h2 className='doctor-name empty-class'>{doctor.name}</h2>
              <h3 className='doctor-specialization empty-class'>{doctor.specialization}</h3>

              <div className='doctor-info'>
                <p className='empty-class'><strong>Experience:</strong> {doctor.experience}</p>
                <p className='empty-class'><strong>Education:</strong> {doctor.education}</p>
                <p className='empty-class'><strong>Schedule:</strong> {doctor.schedule}</p>
                <p className='empty-class'><strong>Languages:</strong> {doctor.languages.join(', ')}</p>
              </div>

              <p className='doctor-bio empty-class'>{doctor.bio}</p>

              <div className='doctor-actions'>
                <button className='btn-book' onClick={Book} >Book Appointment</button>
                <button className='btn-profile' onClick={ViewDoctor}>View Profile</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorsPage;