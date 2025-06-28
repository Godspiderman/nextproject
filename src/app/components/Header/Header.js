"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import "./Header.scss";
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { selectIsAuthenticated, selectCurrentUser } from '../../redux/slices/authSlice';
import Image from 'next/image';

export default function Header() {
  const defaultAvatar = "/images/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg";

  const router = useRouter();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  // Initialize with safe defaults
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    currentUser: null
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Sync with Redux only on client
  const reduxIsAuthenticated = useSelector(selectIsAuthenticated);
  const reduxCurrentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (isClient) {
      setAuthState({
        isAuthenticated: reduxIsAuthenticated,
        currentUser: reduxCurrentUser
      });
    }
  }, [isClient, reduxIsAuthenticated, reduxCurrentUser]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (href) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const handleAuthAction = () => {
    if (authState.isAuthenticated) {
      dispatch(logout());
      router.push('/');
    } else {
      router.push('/components/Login');
    }
    closeMenu();
  };

  const handleProfile = () => {
    router.push('/profile');
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
          {isClient && authState.isAuthenticated && (
            <div className="user-profile user-profile--mobile">
              <span className="helloText">
                <Image
                  src={authState.currentUser?.avatar || defaultAvatar}
                  alt="User profile"
                  className="user-avatar"
                  width={60}
                  height={60}
                  priority={false}
                />
              </span>
              <div className="user-info">
                <span className="username p">{authState.currentUser?.userName}</span>
                <span className="role p">{authState.currentUser?.role || 'User'}</span>
              </div>
            </div>
          )}

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

          <button
            className="Header__loginBtn Header__loginBtn--mobile"
            onClick={handleAuthAction}
          >
            {authState.isAuthenticated ? 'Logout' : 'Login'}
          </button>
        </nav>

        {isMenuOpen && (
          <div
            className="Header__overlay"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}

       {isClient && (
  <div className="user-profile user-profile--desktop">
    {authState.isAuthenticated ? (
      <>
        <span className="helloText">
          <Image
            src={authState.currentUser?.avatar || defaultAvatar}
            alt="User profile"
            className="user-avatar"
            width={40}
            height={40}
            priority={false}
          />
        </span>
        <div className="user-info">
          <span className="username p">{authState.currentUser?.userName}</span>
          <span className="role p">{authState.currentUser?.roleName || 'User'}</span>
        </div>
      </>
    ) : null}
    <button
      className="Header__loginBtn Header__loginBtn--desktop"
      onClick={handleAuthAction}
    >
      {authState.isAuthenticated ? 'Logout' : 'Login'}
    </button>
  </div>
)}


      </div>
    </header>
  );
}