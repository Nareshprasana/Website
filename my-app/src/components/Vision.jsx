import React from "react";
import styles from "./Vision.module.css";

const Vision = ({ authorName, authorTestimony, authorTitle, authorImage }) => {
  return (
    <div className={styles["vision-section"]}>
      <div className={styles["testimonial-container"]}>
        <div className={styles["profile-avatar"]}>
          <img
            src={authorImage}
            alt={authorName}
            className={styles["avatar-img"]}
          />
        </div>

        <blockquote className={styles["testimonial-quote"]}>
          {authorTestimony}
        </blockquote>

        <div className={styles["testimonial-author"]}>
          <span className={styles["author-name"]}>-{authorName}, </span>
          <span className={styles["author-title"]}>{authorTitle}</span>
        </div>
      </div>
    </div>
  );
};

export default Vision;
