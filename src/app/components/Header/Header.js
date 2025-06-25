"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import "./Header.scss";
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (href) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const handleLogin = () => { 
    router.push('/components/Login');
  };

  return (
    <header className="Header">
      <div className="Header__container">
        <Link href="/" className="Header__logo h1">
          Logo
        </Link>

        <button
          className="Header__menuButton"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>

        <nav className={`Header__nav ${isMenuOpen ? "Header__nav--open" : ""}`}>
          <Link
            href="/"
            className={`Header__link ${isActive("/") ? "Header__link--active" : ""}`}
            onClick={closeMenu}
          >
            HOME
          </Link>

          <Link
            href="/about"
            className={`Header__link ${isActive("/about") ? "Header__link--active" : ""}`}
            onClick={closeMenu}
          >
            ABOUT
          </Link>

          <Link
            href="/services"
            className={`Header__link ${isActive("/services") ? "Header__link--active" : ""}`}
            onClick={closeMenu}
          >
            SERVICES
          </Link>

          <Link
            href="/doctors"
            className={`Header__link ${isActive("/doctors") ? "Header__link--active" : ""}`}
            onClick={closeMenu}
          >
            OUR DOCTORS
          </Link>

          <Link
            href="/contact"
            className={`Header__link ${isActive("/contact") ? "Header__link--active" : ""}`}
            onClick={closeMenu}
          >
            CONTACT
          </Link>
        </nav>

        {isMenuOpen && (
          <div
            className="Header__overlay"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}

        <div className="logout-container">
          <button className="btn" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </header>
  );
}