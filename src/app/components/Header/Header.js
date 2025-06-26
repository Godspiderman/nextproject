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
    closeMenu();
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
            href="/pages/About"
            className={`Header__link ${isActive("/pages/About") ? "Header__link--active" : ""}`}
            onClick={closeMenu}
          >
            ABOUT
          </Link>

          <Link
            href="/pages/Service"
            className={`Header__link ${isActive("/pages/Service") ? "Header__link--active" : ""}`}
            onClick={closeMenu}
          >
            SERVICES
          </Link>

          <Link
            href="/pages/Doctors"
            className={`Header__link ${isActive("/pages/Doctors") ? "Header__link--active" : ""}`}
            onClick={closeMenu}
          >
            OUR DOCTORS
          </Link>

          <Link
            href="/pages/Contact"
            className={`Header__link ${isActive("/pages/Contact") ? "Header__link--active" : ""}`}
            onClick={closeMenu}
          >
            CONTACT
          </Link>

          {/* Mobile Login Button */}
          <button 
            className="Header__mobileLogin btn" 
            onClick={handleLogin}
          >
            Login
          </button>
        </nav>

        {isMenuOpen && (
          <div
            className="Header__overlay"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}

        {/* Desktop Login Button */}
        <div className="Header__desktopLogin">
          <button className="btn" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </header>
  );
}