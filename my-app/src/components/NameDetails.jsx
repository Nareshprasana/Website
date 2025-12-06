// NameDetails Component
import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./NameDetails.module.css";
import { OtpVerification } from "./contexts/OtpVerification";
import { useContext } from "react";

import { startFlow } from "../api/flowApi";
import { userDetails } from "./contexts/userDetails";

const NameDetails = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const { isOTPVerified, setIsOTPVerified } = useContext(OtpVerification);
  const { userData, setUserData } = useContext(userDetails);

  const handleNext = async () => {
    if (name.trim()) {
      console.log("Name submitted:", name);
      try {
        // 1️⃣ Start flow API call
        const res = await startFlow(name);
        const userId = res.data.userId;


        // 2️⃣ Save userId + name in global context
        setUserData((prev) => ({
          ...prev,
          userId: userId,
          userName: name,
        }));

        console.log("Flow started. User ID:", userId);

        // 3️⃣ Navigate to next page based on OTP status
        if (!isOTPVerified) {
          navigate("/contactDetails");
        } else {
          navigate("/investmentDetails");
        }
      } catch (error) {
        console.error("Error starting flow:", error);
      }
      if (!isOTPVerified) {
        navigate("/contactDetails");
      } else {
        navigate("/InvestmentDetails");
      }
    }
  };

  return (
    <div className={styles["name-details-section"]}>
      <div className={styles.header}>
        <span className={styles["step-indicator"]}>Step 1 of 4</span>

        <button className={styles["help-button"]}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Help
        </button>
      </div>

      <div className={styles["form-container"]}>
        <h2 className={styles["form-title"]}>What is your name?</h2>

        <div className={styles["input-wrapper"]}>
          <input
            type="text"
            className={styles["name-input"]}
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && name.trim()) handleNext();
            }}
          />
        </div>

        <button
          className={`${styles["next-button"]} ${
            name.trim() ? styles.active : ""
          }`}
          onClick={handleNext}
          disabled={!name.trim()}
        >
          Next
          <ChevronRight size={20} />
          {/* <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
          </svg> */}
        </button>

        <div className={styles.footer}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className={styles["footer-text"]}>
            Your data is 100% protected
          </span>
        </div>
      </div>
    </div>
  );
};

export default NameDetails;
