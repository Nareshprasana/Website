import {
  useContext,
  useRef,
  useLayoutEffect,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { showFormContext } from "./contexts/showFormContext";
import styles from "./Navbar.module.css";

function Navbar() {
  const { setShowForm } = useContext(showFormContext);
  const navigate = useNavigate();
  const navRef = useRef(null);
  const [os, setOS] = useState("");

  useEffect(() => {
    setOS(getOS());
  }, [os]);

  useLayoutEffect(() => {
    const navHeight = navRef.current?.offsetHeight || 0;
    document.documentElement.style.setProperty(
      "--nav-height",
      `${navHeight}px`
    );
  }, []);

  const openPortfolioForm = () => {
    setShowForm(true);
  };

  const goToHome = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  function getOS() {
    const userAgent = navigator.userAgent.toLowerCase();
    const platform = navigator.platform.toLowerCase();

    if (platform.includes("win")) return "Windows";
    if (platform.includes("mac")) return "macOS";
    if (platform.includes("linux")) return "Linux";
    if (/iphone|ipad|ipod/.test(userAgent)) return "iOS";
    if (/android/.test(userAgent)) return "Android";

    return "Unknown";
  }

  return (
    <>
      <nav className={styles.navbar} ref={navRef}>
        <div className={styles.container}>
          {/* Logo */}
          <div className={styles.logoWrapper} onClick={goToHome}>
            <img src="/logo.svg" alt="Investza" className={styles.logo} />
          </div>

          {/* Buttons */}
          <div className={styles.buttonsWrapper}>
            {/* Download App Button */}
            <button
              onClick={() => {
                if (os === "Windows" || os === "Linux" || os === "macOS") {
                  navigate("/showQR");
                } else {
                  window.open("https://app.investza.in");
                }
              }}
              className={styles.downloadBtn}
              aria-label="Download Investza App on Google Play"
            >
              {/* <span className={styles.mobileText}>Download</span> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span className={styles.desktopText}>Download App</span>
            </button>

            {/* Review Portfolio Button */}
            <button onClick={openPortfolioForm} className={styles.reviewBtn}>
              Review My Portfolio
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
