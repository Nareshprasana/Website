// src/components/ReviewMyPortfolioForm.jsx
import React, { useState } from "react";
import styles from "./ReviewMyPortfolioForm.module.css";

const ReviewMyPortfolioForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "phoneNumber" ? value.replace(/\D/g, "").slice(0, 10) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Portfolio Review Request:", formData);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close form"
        >
          ×
        </button>

        <h2 className={styles.title}>Review My Portfolio</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Your Name"
            className={styles.input}
            required
          />

          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            className={styles.input}
            maxLength="10"
            required
          />

          <button type="submit" className={styles.submitButton}>
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewMyPortfolioForm;
