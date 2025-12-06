// src/components/Accordion.jsx
import React, { useState } from "react";
import styles from "./Accordion.module.css";

function Accordion() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is Investza?",
      answer: (
        <p>
          Investza is a wealth management company founded in 2015 by a team that
          has managed over Rs. 10,000 crores of assets. Investza enables clients
          to invest in customized solutions for building, preserving, and
          optimizing their wealth and financial goals, including strategies for
          optimized taxation.
        </p>
      ),
    },
    {
      question: "What investment services are offered by Investza?",
      answer: (
        <p>
          Investza Capital (trademark INVESTZA) offers tailored portfolios
          through its flagship SPM (Systematic Portfolio Management) program.
          Investza Capital is registered with the Association of Mutual Funds of
          India (AMFI), registration number ARN–154125.
        </p>
      ),
    },
    {
      question: "How do I invest with Investza?",
      answer: (
        <p>
          Getting started is easy: schedule a call with Investza’s expert
          strategists to discuss your goals, risk appetite, and investment
          timeline. Investza will design a personalized recommendation (not
          generic plans) aligned with your objectives. Connect via
          +918655447057, the website scheduler, or email hello@investza.in with
          the subject “Schedule a Review”.
        </p>
      ),
    },
    {
      question: "What is the minimum amount required to invest with Investza?",
      answer: (
        <>
          <p>
            Investza serves all clients and does not restrict services by
            category. However, the minimum investment for customized portfolios
            through SPM is ₹50,000. Specific options are:
          </p>
          <ol className={styles.list}>
            <li>
              Customized mutual fund portfolios via IPA (Integrated Portfolio
              Approach): ₹50,000.
            </li>
            <li>Investza Portfolio Management Service (PMS): ₹50 Lakhs.</li>
          </ol>
        </>
      ),
    },
    {
      question: "What is Investza’s Wealth Tracker?",
      answer: (
        <p>
          Wealth Tracker is a free, ad-free, secure portfolio review tool to
          help identify underperforming schemes in mutual funds. It analyzes
          risk, diversification, and investing discipline. The app can be
          downloaded for Android and iOS; feedback is welcome through
          support@investza.in or WhatsApp +918655447057.
        </p>
      ),
    },
    {
      question: "Why should I trust Investza with my money?",
      answer: (
        <p>
          Your money is managed by expert CAs, CFAs, and MBAs with 10 years’
          experience and a track record of managing over Rs. 10,000 crores in
          assets.
        </p>
      ),
    },
    {
      question: "Is it safe to invest money with Investza?",
      answer: (
        <p>
          Yes, Investza uses advanced encryption, multi-layer SSL, and robust
          data security. Money is held with a third-party custodian and you
          remain the rightful owner.
        </p>
      ),
    },
    {
      question: "What is the process for completing full KYC on Investza?",
      answer: (
        <p>
          The KYC process is quick; contact a representative and provide
          documents. For e-KYC, reach out to hello@investza.in for assistance.
        </p>
      ),
    },
    {
      question: "What types of Portfolios does Investza offer?",
      answer: (
        <p>
          The flagship SPM offering provides customized portfolios tailored to
          your risk profile and investment goals for you and your family.
        </p>
      ),
    },
    {
      question: "How can I contact Investza for support?",
      answer: (
        <p>
          Use the Help section in the Investza App, email support@investza.in,
          or call +9197977152156.
        </p>
      ),
    },
    {
      question:
        "What should I do if my payment is debited but not reflected on Investza?",
      answer: (
        <p>
          Investments may take up to 3 business days to be allotted. Monitor for
          a couple of days; contact support at hello@investza.in or
          +9197977152156 if issues persist.
        </p>
      ),
    },
    {
      question: "What is the company name of Investza?",
      answer: (
        <p>
          Investza is operated and managed by Investza Capital, registered
          ARN–154125.
        </p>
      ),
    },
    {
      question: "Where is Investza Located?",
      answer: (
        <p>
          Mumbai (Santacruz West, Linking Road) and Pune (Viman Nagar).
          Appointment scheduling recommended.
        </p>
      ),
    },
    {
      question: "How much does Investza charge for their services?",
      answer: (
        <p>
          No charges apply for SPM; the business model is explained during
          personal meetings.
        </p>
      ),
    },
    {
      question:
        "What happens to my investments if Investza goes bankrupt or out-of-business?",
      answer: (
        <p>
          Your money is either invested in your name or held with a third-party
          custodian, protecting it in such scenarios.
        </p>
      ),
    },
    {
      question: "What are the risks involved with investing?",
      answer: (
        <p>
          Risks include market, credit, liquidity, and capital loss. Current
          risk management and advice minimize these risks—always read offer
          documents and consult Investza experts.
        </p>
      ),
    },
    {
      question:
        "How can I track the performance of my investments with Investza?",
      answer: (
        <p>
          Use the Wealth Tracker app for secure, ad-free portfolio performance
          monitoring for Android and iOS.
        </p>
      ),
    },
    {
      question:
        "Can I meet the Investza expert investment team before making investments?",
      answer: (
        <p>
          Yes; you can meet the team in Mumbai or Pune offices. Advance
          scheduling is recommended.
        </p>
      ),
    },
    {
      question: "Who are the key people at Investza?",
      answer: (
        <p>
          Principal Officer & Chief Strategist: CA Abhishek Mehta, CFA; CEO &
          Co-founder: Pooja Chandgothia; VP & Product Head: Varun Vinayan, plus
          other investment specialists.
        </p>
      ),
    },
    {
      question: "How often is my portfolio reviewed by the portfolio managers?",
      answer: (
        <p>
          Portfolios are actively monitored with professional-grade research for
          proactive adjustments based on market changes and investment thesis.
        </p>
      ),
    },
    {
      question:
        "Is there a limit to the number of portfolios I can have with Investza?",
      answer: (
        <p>
          Generally, one customized portfolio per client for manageability; more
          are possible in special cases.
        </p>
      ),
    },
  ];

  return (
    <section className={styles.section}>
      {/* Hero Tagline */}
      <div className={styles.tagline}>
        <h2 className={styles.taglineText}>
          You can’t grow what you can’t measure.
        </h2>
      </div>

      {/* Main Heading */}
      <div className={styles.headingWrapper}>
        <h2 className={styles.heading}>Got Questions? We got your covered</h2>
        <p className={styles.subheading}>We're here to help.</p>
      </div>

      {/* Accordion List */}
      <div className={styles.accordionContainer}>
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`${styles.item} ${
              activeIndex === index ? styles.active : ""
            }`}
          >
            <button
              onClick={() => toggleAccordion(index)}
              className={styles.question}
              aria-expanded={activeIndex === index}
            >
              <span>{item.question}</span>
              <span
                className={`${styles.icon} ${
                  activeIndex === index ? styles.rotated : ""
                }`}
              >
                +
              </span>
            </button>

            <div
              className={`${styles.answer} ${
                activeIndex === index ? styles.open : ""
              }`}
            >
              <div className={styles.answerContent}>{item.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Accordion;
