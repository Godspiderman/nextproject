"use client";
import Link from "next/link";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <h1 className="logo h1">LOGO</h1>
        <nav className="navLinks">
          <Link href="/">Home</Link>
          <Link href="/pages/About">About Us</Link>
          <Link href="/pages/Service">Our Services</Link>
          <Link href="/pages/Doctors">Our Doctors</Link>
          <Link href="/pages/Contact">Contact Us</Link>
        </nav>
        <div className="socialLinks">
          <Link href="#">Facebook</Link>
          <span>|</span>
          <Link href="#">Twitter</Link>
          <span>|</span>
          <Link href="#">Instagram</Link>
          <span>|</span>
          <Link href="#">LinkedIn</Link>
        </div>
        <div className="copy p">
          © {new Date().getFullYear()} @Hospital Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
}