import React, { useEffect, useState, useContext } from "react";
import { CheckCircle, Calendar, Clock, Mail, ArrowRight } from "lucide-react";
import styles from "./ConfirmationPage.module.css";
import { useNavigate } from "react-router-dom";
import { DetailsContext } from "./contexts/Details";

const ConfirmationPage = () => {
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();
  const { data } = useContext(DetailsContext);

  useEffect(() => {
    // Show content with animation
    const contentTimer = setTimeout(() => setShowContent(true), 100);

    // Navigate to home after 10 seconds
    const navigateTimer = setTimeout(() => navigate("/"), 10000);

    // Cleanup timers on unmount
    return () => {
      clearTimeout(contentTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);

  const appointmentDetails = {
    date: data.date,
    time: data.time,
    duration: "45 minutes",
    email: data.email,
    guestEmail: data.guestEmail,
    timezone: "Indian Standard Time (IST)",
  };

  return (
    <div className={styles["confirmation-wrapper"]}>
      <div
        className={`${styles["confirmation-container"]} ${
          showContent ? styles.show : ""
        }`}
      >
        {/* Success Icon */}
        <div className={styles["success-icon-wrapper"]}>
          <div className={styles["success-icon-bg"]}></div>
          <CheckCircle className={styles["success-icon"]} size={80} />
        </div>

        <h1 className={styles["confirmation-title"]}>Meeting Confirmed!</h1>
        <p className={styles["confirmation-subtitle"]}>
          Your expert consultation has been successfully scheduled
        </p>

        {/* Details Card */}
        <div className={styles["details-card"]}>
          <div className={styles["detail-item"]}>
            <div className={styles["detail-icon"]}>
              <Calendar size={20} />
            </div>
            <div className={styles["detail-content"]}>
              <span className={styles["detail-label"]}>Date</span>
              <span className={styles["detail-value"]}>
                {appointmentDetails.date}
              </span>
            </div>
          </div>

          <div className={styles["detail-item"]}>
            <div className={styles["detail-icon"]}>
              <Clock size={20} />
            </div>
            <div className={styles["detail-content"]}>
              <span className={styles["detail-label"]}>Time</span>
              <span className={styles["detail-value"]}>
                {appointmentDetails.time}
              </span>
              <span className={styles["detail-timezone"]}>
                {appointmentDetails.timezone}
              </span>
            </div>
          </div>

          <div className={styles["detail-item"]}>
            <div className={styles["detail-icon"]}>
              <Mail size={20} />
            </div>
            <div className={styles["detail-content"]}>
              <span className={styles["detail-label"]}>
                Confirmation sent to
              </span>
              <span className={styles["detail-value"]}>
                {appointmentDetails.email}
              </span>

              {appointmentDetails.guestEmail && (
                <span className={`${styles["detail-value"]} ${styles.guest}`}>
                  {appointmentDetails.guestEmail}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className={styles["action-buttons"]}>
          <button
            className={styles["btn-primary"]}
            onClick={() => navigate("/")}
          >
            Back to Home
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
