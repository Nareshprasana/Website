import React from "react";
import styles from "./ShowQR.module.css";
import { useNavigate } from "react-router-dom";

const ShowQR = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Close Button */}
        <button
          className={styles.closeBtn}
          onClick={() => navigate("/wealth-tracker")}
        >
          &times;
        </button>

        {/* QR Code */}
        <div className={styles.qrWrapper}>
          <img className={styles.qrImg} src="/qr-code.svg" alt="QR Code" />
        </div>
      </div>
    </div>
  );
};

export default ShowQR;
