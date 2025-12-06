// src/components/Section2.jsx
import React, { useEffect, useRef, useContext } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import slider1 from "../assets/Frame 2147223881.png";
import slider2 from "../assets/Frame 2147223884.png";
import slider3 from "../assets/sliderFrame3.png";
import { showFormContext } from "./contexts/showFormContext";
import styles from "./Section2.module.css";

gsap.registerPlugin(ScrollTrigger);

const Section2 = () => {
  const { setShowForm } = useContext(showFormContext);
  const containerRef = useRef(null);
  const slidesRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const slides = slidesRef.current;
    if (!container || slides.length === 0) return;

    const navbar = document.querySelector("nav");
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    // console.log(navbarHeight); //debug
    const totalSlides = slides.length;

    gsap.to(slides, {
      xPercent: -100 * (totalSlides - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: `top ${navbarHeight}px`,
        // start: `top top`,
        end: `+=${totalSlides * 1000}`,
        scrub: 1,
        pin: true,
        snap: 1 / (totalSlides - 1),
        invalidateOnRefresh: true,
        // markers: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const slides = [
    {
      title: "Identify all your investments across all platforms",
      text: "Know how your overall portfolio is performing. Let Investza experts analyse your investments and give you a deep dive insight on your portfolio performance.",
      img: slider1,
    },
    {
      title: "Know which funds to exit to maintain a healthy portfolio",
      text: "Intelligent Decisions help you avoid dents on your portfolio growth. Avoid the red flags in your portfolio today",
      img: slider2,
    },
    {
      title: "Get in touch with an Investza Expert via the App",
      text: "Make strategic moves to diversify and regulate your portfolio for maximum and optimal growth",
      img: slider3,
    },
  ];

  return (
    <section ref={containerRef} className={styles.section}>
      {/* Fixed Background Gradient */}
      <div className={styles.background} />

      {/* Horizontal Scroll Container */}
      <div className={styles.slider}>
        {slides.map((slide, index) => (
          <div
            key={index}
            ref={(el) => (slidesRef.current[index] = el)}
            className={styles.slide}
          >
            {/* Image */}
            <div className={styles.imageWrapper}>
              <div className={styles.imageContainer}>
                <img
                  src={slide.img}
                  alt={slide.title}
                  className={styles.image}
                />
                <div className={styles.imageOverlay} />
              </div>
            </div>

            {/* Text Content */}
            <div className={styles.content}>
              <h2 className={styles.title}>{slide.title}</h2>
              <p className={styles.text}>{slide.text}</p>
              <button
                onClick={() => setShowForm(true)}
                className={styles.ctaButton}
              >
                Review My Portfolio
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Section2;
