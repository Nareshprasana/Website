// src/components/Section4.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import trio from "../assets/pm2.png";
import styles from "./Section4.module.css";

gsap.registerPlugin(ScrollTrigger);

const Section4 = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const subheadingRef = useRef(null);
  const stat1Ref = useRef(null);
  const stat2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }
      )
        .fromTo(
          cardRef.current,
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, duration: 1.4, ease: "power4.out" },
          "-=0.8"
        )
        .fromTo(
          [
            imageRef.current,
            subheadingRef.current,
            stat1Ref.current,
            stat2Ref.current,
          ],
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
          },
          "-=1"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Background Glow */}
      <div className={styles.bgGlow} />

      {/* Heading */}
      <header className={styles.header}>
        <h2 ref={headingRef} className={styles.heading}>
          From a qualified team you <br /> can{" "}
          <span className={styles.gradientText}>rely on</span>
        </h2>
        <p className={styles.subheading}>
          No fluff, no obligations, no fees. Just rare advice you’d have to pay
          for, heavily.
        </p>
      </header>

      {/* Main Card */}
      <div ref={cardRef} className={styles.card}>
        {/* Image */}
        <div className={styles.imageWrapper}>
          <img
            ref={imageRef}
            src={trio}
            alt="Investza founding team with decades of investment expertise"
            className={styles.teamImage}
            loading="lazy"
          />
          <div className={styles.imageGlow} />
        </div>

        {/* Content */}
        <div className={styles.content}>
          <h3 ref={subheadingRef} className={styles.title}>
            Meet the Experts behind Investza
          </h3>

          {/* Stats */}
          <div className={styles.stats}>
            <div ref={stat1Ref} className={styles.stat}>
              <div className={styles.statNumber}>
                ₹10,000<span className={styles.unit}>Cr</span>
              </div>
              <p className={styles.statLabel}>Previously managed</p>
            </div>

            <div className={styles.statDivider} />

            <div ref={stat2Ref} className={styles.stat}>
              <div className={styles.statNumber}>
                10+<span className={styles.unit}>Years</span>
              </div>
              <p className={styles.statLabel}>Of Expertise</p>
            </div>
          </div>

          <div className={styles.divider} />
        </div>
      </div>
    </section>
  );
};

export default Section4;
