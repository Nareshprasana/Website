// src/components/HeroSection.jsx
import React, { useEffect, useRef, useCallback, useContext } from "react";
import { FaChevronDown } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import mobileimg from "../assets/mockupFront.png";
import { showFormContext } from "./contexts/showFormContext";
import styles from "./HeroSection.module.css";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const { setShowForm } = useContext(showFormContext);

  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      duration: 1,
      easing: (t) => t,
    });

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  const refs = useRef({
    hero: null,
    image: null,
    textContainer: null,
    backgroundGradient: null,
    seeHow: null,
    newText: null,
  });

  const setRef = (key) => (el) => (refs.current[key] = el);

  const handleMouseMove = useCallback((e) => {
    if (!refs.current.image) return;
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 12;
    const y = (e.clientY / innerHeight - 0.5) * 12;

    gsap.to(refs.current.image, {
      rotateY: x,
      rotateX: -y,
      transformPerspective: 1200,
      ease: "power2.out",
      duration: 0.5,
      overwrite: "auto",
    });
  }, []);

  useEffect(() => {
    const { hero, image, textContainer, backgroundGradient, seeHow, newText } =
      refs.current;
    if (!hero) return;

    // Kill previous animations
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.killTweensOf([image, seeHow, newText, backgroundGradient]);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
        pin: textContainer,
        pinSpacing: true,
        anticipatePin: 1,
      },
    });

    tl.to(seeHow, { opacity: 0, y: -40 }, 0);
    tl.to(image, { y: -600, scale: 1.15, ease: "none" }, 0);
    tl.fromTo(
      newText,
      { opacity: 0, y: 100 },
      { opacity: 1, y: -50, ease: "none" },
      0.15
    );
    tl.to([image, newText, textContainer], { opacity: 0, yPercent: -60 }, 0.85);

    gsap.to(backgroundGradient, {
      scale: 1.2,
      opacity: 0.5,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    const throttledMove = throttleRAF(handleMouseMove);
    window.addEventListener("mousemove", throttledMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", throttledMove);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [handleMouseMove]);

  const words = "Our App, Your Control".split(" ");

  return (
    <section ref={setRef("hero")} className={styles.hero}>
      {/* Gradient Background */}
      <div ref={setRef("backgroundGradient")} className={styles.gradientBg} />

      {/* Text Content */}
      <div ref={setRef("textContainer")} className={styles.textContainer}>
        <h1 className={styles.headline}>
          {words.map((word, i) => (
            <span key={i} className={styles.word}>
              {word}
            </span>
          ))}
        </h1>

        <p className={styles.subheadline}>
          Have full control over your Investments with us.
        </p>

        <div ref={setRef("seeHow")} className={styles.seeHow}>
          <span>See How it works</span>
          <FaChevronDown className={styles.chevron} />
        </div>

        <div ref={setRef("newText")} className={styles.newText}>
          <p className={styles.newTextParagraph}>
            Your wealth deserves more than vague updates. Investza’s Wealth
            Tracker consolidates and analyses every rupee across all your
            investments in real time{" "}
            <span className={styles.highlight}>India's leading experts.</span>
          </p>
          <button
            onClick={() => setShowForm(true)}
            className={styles.ctaButton}
          >
            Review My Portfolio
          </button>
        </div>
      </div>

      {/* Floating Phone */}
      <div className={styles.phoneWrapper}>
        <div className={styles.phoneContainer}>
          <img
            ref={setRef("image")}
            src={mobileimg}
            alt="Investza Wealth Tracker App"
            className={styles.phoneImage}
          />
          <div className={styles.phoneGlow} />
        </div>
      </div>
    </section>
  );
};

// Throttle using requestAnimationFrame
function throttleRAF(fn) {
  let running = false;
  return (...args) => {
    if (!running) {
      running = true;
      requestAnimationFrame(() => {
        fn(...args);
        running = false;
      });
    }
  };
}

export default React.memo(HeroSection);
