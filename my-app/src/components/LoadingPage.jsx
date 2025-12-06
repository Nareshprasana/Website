// import React from "react";
// import styles from "./LoadingPage.module.css";
// import Abhishek from "../assets/abhishek.webp";
// import Pooja from "../assets/pooja.webp";
// import Varun from "../assets/varun.webp";

// const LoadingPage = () => {
//   return (
//     <div classNameName={styles["loading-page"]}>
//       <div classNameName={styles.container}>
//         <div classNameName={styles["profiles-container"]}>
//           <div
//             classNameName={`${styles["profile-wrapper"]} ${styles["profile-1"]}`}
//           >
//             <img
//               src={Pooja}
//               alt="Investment Expert 1"
//               classNameName={styles["profile-pic"]}
//             />
//           </div>

//           <div
//             classNameName={`${styles["profile-wrapper"]} ${styles["profile-2"]}`}
//           >
//             <img
//               src={Abhishek}
//               alt="Investment Expert 2"
//               classNameName={`${styles["profile-pic"]} ${styles["profile-pic-main"]}`}
//             />
//           </div>

//           <div
//             classNameName={`${styles["profile-wrapper"]} ${styles["profile-3"]}`}
//           >
//             <img
//               src={Varun}
//               alt="Investment Expert 3"
//               classNameName={styles["profile-pic"]}
//             />
//           </div>
//         </div>

//         <h1 classNameName={styles.title}>Congratulations!</h1>

//         <p classNameName={styles.subtitle}>
//           your meeting has been scheduled with one of your experts from Investza
//           <span classNameName={styles["loading-dots"]}>
//             <span>.</span>
//             <span>.</span>
//             <span>.</span>
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

import React from "react";
import styles from "./LoadingPage.module.css";

const LoadingPage = () => {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.skCubeGrid}>
        <div className={`${styles.skCube} ${styles.skCube1}`}></div>
        <div className={`${styles.skCube} ${styles.skCube2}`}></div>
        <div className={`${styles.skCube} ${styles.skCube3}`}></div>
        <div className={`${styles.skCube} ${styles.skCube4}`}></div>
        <div className={`${styles.skCube} ${styles.skCube5}`}></div>
        <div className={`${styles.skCube} ${styles.skCube6}`}></div>
        <div className={`${styles.skCube} ${styles.skCube7}`}></div>
        <div className={`${styles.skCube} ${styles.skCube8}`}></div>
        <div className={`${styles.skCube} ${styles.skCube9}`}></div>
      </div>
    </div>
  );
};

export default LoadingPage;
