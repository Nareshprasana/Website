import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import logo from "../assets/logo.svg";
import icon from "../assets/Asset 8 1.jpg";

// Icons
import {
  FaHome,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaStar,
  FaPlus,
  FaList,
  FaChevronDown,
  FaSignOutAlt,
  FaUsers,
  FaClock,
  FaUserFriends
} from "react-icons/fa";

function Sidebar({ onToggle, isOpen: isOpenProp = true }) {
  const [isOpen, setIsOpen] = useState(isOpenProp);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [activeItem, setActiveItem] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Auto-detect active menu
  useEffect(() => {
    const path = location.pathname.toLowerCase();

    if (path.includes("dashboard")) setActiveItem("home");
    if (path.includes("add-event") || path.includes("event-list") || path.includes("event-participants")) {
      setActiveItem("events");
      setOpenDropdown(true);
    }
    if (path.includes("call-booking")) setActiveItem("call-booking");
    if (path.includes("newsletter")) setActiveItem("newsletter");
    if (path.includes("review-portfolio")) setActiveItem("review-portfolio");
    if (path.includes("contact-us")) setActiveItem("contact-us");
    if (path.includes("users")) setActiveItem("users");
    if (path.includes("availability")) setActiveItem("availability");
  }, [location.pathname]);

  // Sync sidebar open state from parent
  useEffect(() => {
    setIsOpen(isOpenProp);
  }, [isOpenProp]);

  const goto = (path, type) => {
    navigate(path.toLowerCase());
    setActiveItem(type);
  };

  // Logout handler
  const handleLogout = () => {
    const ok = window.confirm("Are you sure you want to logout?");
    if (!ok) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    navigate("/adminlogin");
  };

  return (
    <>
      <div className={`${styles.sidebar} ${isOpen ? styles.expanded : styles.collapsed}`}>

        {/* Logo */}
        <div className={styles.logoWrapper}>
          {isOpen ? (
            <img src={logo} className={styles.sidebarLogo} alt="Logo" />
          ) : (
            <img src={icon} className={styles.sidebarIcon} alt="Icon" />
          )}
        </div>

        <ul className={styles.sidebarMenu}>

          {/* HOME */}
          <li
            className={activeItem === "home" ? styles.active : ""}
            onClick={() => goto("/adminlogin/dashboard", "home")}
          >
            <FaHome className={styles.icon} /> {isOpen && <span>Home</span>}
          </li>

          {/* EVENTS */}
          <li
            className={`${styles.dropdownHeader} ${activeItem === "events" ? styles.active : ""}`}
            onClick={() =>
              isOpen ? setOpenDropdown(!openDropdown) : goto("/adminlogin/event-list", "events")
            }
          >
            <FaCalendarAlt className={styles.icon} />
            {isOpen && <span>Events</span>}
            {isOpen && (
              <FaChevronDown
                className={`${styles.arrow} ${openDropdown ? styles.rotate : ""}`}
              />
            )}
          </li>

          {/* EVENTS SUBMENU */}
          {isOpen && (
            <ul className={`${styles.submenu} ${openDropdown ? styles.show : ""}`}>
              <li
                onClick={() => goto("/adminlogin/add-event", "events")}
                className={location.pathname.includes("add-event") ? styles.activeSub : ""}
              >
                <FaPlus className={styles.icon} /> Add Event
              </li>

              <li
                onClick={() => goto("/adminlogin/event-list", "events")}
                className={location.pathname.includes("event-list") ? styles.activeSub : ""}
              >
                <FaList className={styles.icon} /> Event List
              </li>

              <li
                onClick={() => goto("/adminlogin/event-participants", "events")}
                className={location.pathname.includes("event-participants") ? styles.activeSub : ""}
              >
                <FaUserFriends className={styles.icon} />Participants
              </li>
            </ul>
          )}

          {/* CALL BOOKING */}
          <li
            className={activeItem === "call-booking" ? styles.active : ""}
            onClick={() => goto("/adminlogin/call-booking", "call-booking")}
          >
            <FaPhone className={styles.icon} /> {isOpen && <span>Call Booking</span>}
          </li>

          {/* NEWSLETTER */}
          <li
            className={activeItem === "newsletter" ? styles.active : ""}
            onClick={() => goto("/adminlogin/newsletter", "newsletter")}
          >
            <FaEnvelope className={styles.icon} /> {isOpen && <span>News Letter</span>}
          </li>

          {/* REVIEW PORTFOLIO */}
          <li
            className={activeItem === "review-portfolio" ? styles.active : ""}
            onClick={() => goto("/adminlogin/review-portfolio", "review-portfolio")}
          >
            <FaStar className={styles.icon} /> {isOpen && <span>Review Portfolio</span>}
          </li>

          {/* CONTACT US */}
          <li
            className={activeItem === "contact-us" ? styles.active : ""}
            onClick={() => goto("/adminlogin/contact-us", "contact-us")}
          >
            <FaEnvelope className={styles.icon} /> {isOpen && <span>Contact Us</span>}
          </li>

          {/* USERS */}
          <li
            className={activeItem === "users" ? styles.active : ""}
            onClick={() => goto("/adminlogin/users", "users")}
          >
            <FaUsers className={styles.icon} /> {isOpen && <span>Users</span>}
          </li>

          {/* AVAILABILITY */}
          <li
            className={activeItem === "availability" ? styles.active : ""}
            onClick={() => goto("/adminlogin/availability", "availability")}
          >
            <FaClock className={styles.icon} /> {isOpen && <span>Availability</span>}
          </li>

          {/* LOGOUT */}
          <li className={styles.logoutButton} onClick={handleLogout}>
            <FaSignOutAlt className={styles.icon} /> {isOpen && <span>Logout</span>}
          </li>

        </ul>
      </div>

      {/* Backdrop for mobile */}
      <div className={styles.sidebarBackdrop}></div>
    </>
  );
}

export default Sidebar;
