import React from "react";
import styles from "./TopNavbar.module.css";
import icon from "../assets/Asset 8 1.jpg";

function TopNavbar({ toggleSidebar }) {
  return (
    <div className={styles.topNavbar}>
      <div className={styles.leftSection}>
        <button className={styles.navToggle} onClick={toggleSidebar}>
          ☰
        </button>
        <h1 className={styles.navTitle}>Dashboard</h1>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.navUser}>
          <span>Admin</span>
          <img src={icon} alt="User" className={styles.profilePic} />
        </div>
      </div>
    </div>
  );
}

export default TopNavbar;
