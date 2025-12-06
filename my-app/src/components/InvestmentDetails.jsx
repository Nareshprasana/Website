import styles from "./InvestmentDetails.module.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { selectInvestment } from "../api/flowApi";
import { userDetails } from "./contexts/userDetails";
import { ChevronRight } from "lucide-react";

const InvestmentDetails = () => {
  const [selectedRange, setSelectedRange] = useState("");

  const { userData } = useContext(userDetails);

  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && selectedRange) {
        handleContinue();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedRange]);

  const investmentRanges = [
    { id: "below-50", label: "Below ₹50 Lakhs" },
    { id: "50-2cr", label: "₹50 Lakhs to ₹2 Crores" },
    { id: "2-5cr", label: "₹2 Crores to ₹5 Crores" },
    { id: "10cr-plus", label: "₹10 Crore+" },
  ];

  const handleRangeSelect = (id) => {
    setSelectedRange(id);
  };

  const handleContinue = async () => {
    const res = await selectInvestment(userData.userId, selectedRange);
    navigate("/scheduleCall");
  };

  return (
    <div className={styles["investment-details-section"]}>
      <div className={styles["investment-header"]}>
        <button className={styles["back-btn"]} onClick={() => navigate("/")}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <span className={styles["step-text"]}>Step 3 of 4</span>

        <button className={styles["help-btn"]}>
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

      <div className={styles["investment-form-container"]}>
        <h2 className={styles["investment-title"]}>
          What's the total value of your investments?
        </h2>

        <p className={styles["investment-subtitle"]}>
          Include Stocks, MFs, FDs, and cash. This will helps us personalise
          your experience
        </p>

        <div className={styles["investment-options-grid"]}>
          {investmentRanges.map((range) => (
            <button
              key={range.id}
              className={`${styles["investment-option"]} ${
                selectedRange === range.id ? styles["selected"] : ""
              }`}
              onClick={() => handleRangeSelect(range.id)}
            >
              <span className={styles["option-label"]}>{range.label}</span>

              <span className={styles["radio-indicator"]}>
                {selectedRange === range.id && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <circle cx="12" cy="12" r="8" />
                  </svg>
                )}
              </span>
            </button>
          ))}
        </div>

        <button
          className={`${styles["continue-button"]} ${
            selectedRange ? styles["active"] : ""
          }`}
          onClick={handleContinue}
          disabled={!selectedRange}
        >
          Continue
          <ChevronRight size={20} />
        </button>

        <div className={styles["investment-footer"]}>
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

export default InvestmentDetails;
