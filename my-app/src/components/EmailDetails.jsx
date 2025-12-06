import React, { useState, useEffect, useContext } from "react";
import { ChevronLeft, MessageCircle } from "lucide-react";
import styles from "./EmailDetails.module.css";
import { useNavigate } from "react-router-dom";
import { DetailsContext } from "./contexts/Details";
import { userDetails } from "./contexts/userDetails";
import { ChevronRight } from "lucide-react";

import { createBooking } from "../api/flowApi";

const EmailDetails = ({ onBack }) => {
  const { data, setData } = useContext(DetailsContext);
  const { userData, setUserData } = useContext(userDetails);

  const [formData, setFormData] = useState({
    email: "",
    guestEmail: "",
    message: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  // Validate email format
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  useEffect(() => {
    const isEmailValid = validateEmail(formData.email);
    setIsFormValid(isEmailValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        // 1️⃣ Save to context first
        setData((prev) => ({
          ...prev,
          email: formData.email,
          guestEmail: formData.guestEmail,
        }));

        setUserData((prev) => ({
          ...prev,
          email: formData.email,
          guestEmail: formData.guestEmail,
          message: formData.message,
        }));

        // 2️⃣ Call API to create booking

        const response = await createBooking({
          userId: userData.userId,
          email: formData.email, // <-- Always latest
          guestEmail: formData.guestEmail,
          message: formData.message,
          date: userData.date,
          time: userData.time,
        });

        // // 3️⃣ Handle success
        // alert("Booking Successful!");

        // 4️⃣ Navigate to confirmation page
        navigate("/confirmation");
      } catch (error) {
        console.error("Booking failed:", error);
        alert("Booking failed! Please try again.");
      }
      // setData((prev) => ({
      //   ...prev,
      //   email: formData.email,
      //   guestEmail: formData.guestEmail,
      // }));

      // navigate("/confirmation");
    }
  };

  return (
    <div className={styles["email-container"]}>
      {/* Header */}
      <div className={styles["email-header"]}>
        <button
          className={styles["back-btn"]}
          onClick={() => navigate("/scheduleCall")}
        >
          <ChevronLeft size={24} />
        </button>

        <h1 className={styles["email-title"]}>
          Confirm your details to schedule the expert call
        </h1>

        <button className={styles["help-btn"]}>
          <MessageCircle size={20} />
          <span>Help</span>
        </button>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className={styles["email-form"]}>
        {/* Email Input Row */}
        <div className={styles["email-inputs-row"]}>
          <div className={styles["form-group"]}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email ID"
              value={formData.email}
              onChange={handleChange}
              className={styles["form-input"]}
              required
            />
          </div>

          <div className={styles["form-group"]}>
            <input
              type="email"
              name="guestEmail"
              placeholder="Guest email ID (optional)"
              value={formData.guestEmail}
              onChange={handleChange}
              className={styles["form-input"]}
            />
          </div>
        </div>

        {/* Message Field */}
        <div className={styles["form-group"]}>
          <textarea
            name="message"
            placeholder="Anything specific you'd like to discuss? e.g., Help me with retirement solutions (optional)"
            value={formData.message}
            onChange={handleChange}
            className={styles["form-textarea"]}
            rows="6"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`${styles["submit-btn"]} ${
            isFormValid ? styles["active"] : styles["inactive"]
          }`}
          disabled={!isFormValid}
        >
          Submit
          <ChevronRight size={20} />
        </button>
      </form>
    </div>
  );
};

export default EmailDetails;
