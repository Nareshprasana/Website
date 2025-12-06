// src/components/Section3.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Section3.module.css";

gsap.registerPlugin(ScrollTrigger);

const Section3 = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        headingRef.current,
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Subtitle
      gsap.fromTo(
        subtitleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 90%",
          },
        }
      );

      // Card with bounce effect
      gsap.fromTo(
        cardRef.current,
        { y: 100, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          delay: 0.5,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Animated Background Glow */}
      <div className={styles.bgGlow} />

      <h2 ref={headingRef} className={styles.heading}>
        Discover the new way of personalized investing with Investza
      </h2>

      <p ref={subtitleRef} className={styles.subtitle}>
        Portfolio Solutions meant only for you and your vision.
      </p>

      <div ref={cardRef} className={styles.card}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>
            Download the Wealth Tracker App today!
          </h3>
          <h4 className={styles.cardSubtitle}>
            Use our app to your advantage.
          </h4>
        </div>

        {/* <p className={styles.minInvestment}>
          Min. Investment: <span className={styles.amount}>50 Lakhs</span>
        </p> */}

        <p className={styles.cardText}>
          What you can expect working with Investza:
        </p>

        <div className={styles.divider} />

        <ul className={styles.features}>
          <li>
            <span className={styles.bullet}>.</span>
            Strategies tailored only for you
          </li>
          <li>
            <span className={styles.bullet}>.</span>
            Wealth Creation and Preservation always built in to our strategies
          </li>
          <li>
            <span className={styles.bullet}>.</span>
            High quality debt with stable returns
          </li>
          <li>
            <span className={styles.bullet}>.</span>
            Investing for a robust tomorrow
          </li>
        </ul>

        <button
          className={styles.downloadButton}
          onClick={() => {
            window.open("https://app.investza.in");
          }}
        >
          Download App
        </button>
      </div>
    </section>
  );
};

export default Section3;
