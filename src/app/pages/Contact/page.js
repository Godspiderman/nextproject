import React from 'react';
import './Contact.scss';
import { SiGmail } from "react-icons/si";
import { MdAddIcCall } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import Image from "next/image";

function Page() {
  return (
    <div className="contact">
      <div className="contact-tittle-container">
        <h2 className="contact__title h2"><span style={{ color: "#3f7ded" }}>Contact</span> Us</h2>
        <Image
          className="tittle-image"
          src="/images/29784499df9bf021fa1e2d09e816e822469f89e5.jpg"
          alt="Email"
          width={1000}
          height={300}
        />
      </div>

      <div className="contact__cards">
        <div className="contact__card">
          {/* <Image
            className="contact-image"
            src="/images/contact-us-via-email-phone-or-office-location-communicate-with-customer-or-client-business-information-or-channel-for-business-contact-concept-businessman-with-telephone-email-and-location-pin-vector.png"
            alt="Email"
            width={200}
            height={200}
          /> */}
          <div className="contact__icon"><SiGmail /></div>
          <p className="p">educationplatform@gmail.com</p>
          <p className="p">educationplatform@gmail.com</p>
        </div>

        <div className="contact__card">
          {/* <Image
            className="contact-image"
            src="/images/contact-us-via-email-phone-or-office-location-communicate-with-customer-or-client-business-information-or-channel-for-business-contact-concept-businessman-with-telephone-email-and-location-pin-vector.png"
            alt="Call"
            width={200}
            height={200}
          /> */}
          <div className="contact__icon"><MdAddIcCall /></div>
          <p className="p">+91 12345 67890</p>
          <p className="p">+91 12345 67890</p>
        </div>

        <div className="contact__card">
          {/* <Image
            className="contact-image"
            src="/images/contact-us-via-email-phone-or-office-location-communicate-with-customer-or-client-business-information-or-channel-for-business-contact-concept-businessman-with-telephone-email-and-location-pin-vector.png"
            alt="Location"
            width={200}
            height={200}
          /> */}
          <div className="contact__icon"><FaMapLocationDot /></div>
          <p className="p">123 Anna Salai street, North Side of<br />Ganapathy Temple, Tamil Nadu</p>
        </div>
      </div>

      <h3 className="contact__subtitle h3">Send Us a Mail</h3>

      <form className="contact__form">
        <div className="contact__row">
          <input type="text" placeholder="Name" className="input" />
          <input type="email" placeholder="Email" className="input" />
        </div>
        <div className="contact__row">
          <input type="text" placeholder="Phone No" className="input" />
          <input type="text" placeholder="Gender" className="input" />
        </div>
        <textarea placeholder="Text Here" className="input"></textarea>
        <button type="submit" className="contact__submit">Send Mail</button>
      </form>
    </div>
  );
}

export default Page;