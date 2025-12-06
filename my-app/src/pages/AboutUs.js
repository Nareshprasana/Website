// src/Components/AboutUs.js
import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from 'lenis';
import Header from '../components/Header';
import AboutUsFooter from './AboutUsFooter';
import "./AboutUs.css";

const Customisation = "/customization-icon.webp";
const Expertise = "/expertise-icon.webp";
const Trust = "/trust-icon.webp";
const LongTerm = "/long-term-value-icon.webp";
const mission = "/our-mission-2048x1365.webp";
const vision = "/our-vision-2048x1365.webp";

gsap.registerPlugin(ScrollTrigger);

function AboutUs() {
  const heroRef = useRef(null);
  const whyUsRef = useRef(null);
  const counterRef = useRef(null);
  const missionVisionRef = useRef(null);
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(null);
  const lenisRef = useRef(null);

  const [counts, setCounts] = useState({ clients: 0, assets: 0, sip: 0 });
  const duration = 2000;

  /* -------------------------------------------------
     LENIS Smooth Scrolling
  ------------------------------------------------- */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    const handleScroll = () => {
      const scrollY = lenis.scroll;
      const header = document.querySelector('.header');
      const heroSection = document.querySelector('.aboutUs');
      const contentSection = document.querySelector('.whyus');
      const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;

      // Calculate opacity for hero section
      const scrollProgress = Math.min(scrollY / heroHeight, 1);
      const heroOpacity = 1 - (scrollProgress * 0.6);

      if (heroSection) {
        heroSection.style.opacity = heroOpacity;
      }

      // Lift up effect
      if (contentSection && scrollY < heroHeight) {
        const liftProgress = scrollY / heroHeight;
        const translateY = (1 - liftProgress) * 10;
        contentSection.style.transform = `translateY(${translateY}vh)`;
      } else if (contentSection) {
        contentSection.style.transform = 'translateY(0)';
      }

      if (scrollY > 50) {
        header.classList.add('scrolled');
        if (scrollY >= heroHeight) {
          header.classList.add('past-video');
        } else {
          header.classList.remove('past-video');
        }
      } else {
        header.classList.remove('scrolled');
        header.classList.remove('past-video');
      }
    };

    lenis.on('scroll', handleScroll);

    // Add lenis class to html element
    document.documentElement.classList.add('lenis');

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      document.documentElement.classList.remove('lenis');
      lenis.destroy();
    };
  }, []);

  /* -------------------------------------------------
     HERO Animation
  ------------------------------------------------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".heading",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".arrow-stack .arrow",
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          delay: 0.5,
          ease: "power2.out",
        }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  /* -------------------------------------------------
     WHY US Animation (heading + paragraph + cards)
  ------------------------------------------------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: whyUsRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".whyus-heading", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".whyus-intro",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          ".whyus-card",
          {
            opacity: 0,
            y: 50,
            stagger: 0.25,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.2"
        );
    }, whyUsRef);
    return () => ctx.revert();
  }, []);

  /* -------------------------------------------------
     COUNTER Animation (fade + scale-in)
  ------------------------------------------------- */
  useEffect(() => {
    const node = counterRef.current;
    if (!node) return;

    const targets = { clients: 500, assets: 200, sip: 2 };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && startTimeRef.current === null) {
          startTimeRef.current = performance.now();

          const tick = (now) => {
            const elapsed = now - startTimeRef.current;
            const progress = Math.min(elapsed / duration, 1);

            setCounts({
              clients: Math.floor(progress * targets.clients),
              assets: Math.floor(progress * targets.assets),
              sip: Math.floor(progress * targets.sip),
            });

            if (progress < 1) {
              animFrameRef.current = requestAnimationFrame(tick);
            }
          };

          animFrameRef.current = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);

    gsap.fromTo(
      node,
      { opacity: 0, scale: 0.95, y: 40 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: node,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      observer.unobserve(node);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  /* -------------------------------------------------
     MISSION & VISION Animation (fade + slide-up)
  ------------------------------------------------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".mission-vision .plain-card");

      cards.forEach((card) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          card,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            onComplete: () => gsap.set(card, { clearProps: "transform" }),
          }
        );
      });
    }, missionVisionRef);

    return () => ctx.revert();
  }, []);

  /* -------------------------------------------------
     Scroll to Why Us Section
  ------------------------------------------------- */
  const scrollToWhyUs = () => {
    const section = document.getElementById("whyus-section");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  /* -------------------------------------------------
     WHY US Data
  ------------------------------------------------- */
  const reasons = [
    {
      img: Customisation,
      title: "Customisation",
      desc: "Every portfolio is tailored to your unique goals, risk profile, and aspirations.",
    },
    {
      img: Expertise,
      title: "Expertise",
      desc: "Led by professionals with senior leadership experience at top firms like Anand Rathi Wealth Management and Deloitte.",
    },
    {
      img: Trust,
      title: "Trust & Safety",
      desc: "As a regulated intermediary, we prioritise transparency and security in every financial decision.",
    },
    {
      img: LongTerm,
      title: "Long-Term Value",
      desc: "We don’t just invest for today — we craft strategies designed to preserve and grow your wealth across generations.",
    },
  ];

  /* -------------------------------------------------
     RENDER
  ------------------------------------------------- */
  return (
    <div className="about-us-page">
      {/* ---------- HEADER ---------- */}
      <Header />
      
      {/* ---------- HERO ---------- */}
      <section 
        className="aboutUs" 
        ref={heroRef}
        style={{
          backgroundImage: `url(/team/newsletter_hero.jpeg?v=${Date.now()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="content">
          <h1 className="heading">About Us</h1>
          <div
            className="arrow-stack"
            onClick={scrollToWhyUs}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && scrollToWhyUs()}
            aria-label="Scroll to Why Us section"
          >
            <ChevronDown className="arrow a1" />
            <ChevronDown className="arrow a2" />
            <ChevronDown className="arrow a3" />
          </div>
        </div>
      </section>

      {/* ---------- WHY US ---------- */}
      <section id="whyus-section" className="whyus" ref={whyUsRef}>
        <div className="whyus-top">
          <div className="whyus-left">
            <h2 className="whyus-heading">Why Us?</h2>
          </div>
          <div className="whyus-right">
            <p className="whyus-intro">
              At Investza, we go beyond traditional wealth management. With
              decades of combined expertise and a proven track record of
              managing portfolios worth over ₹10,000+ crore, we bring
              institutional-grade investment strategies to individual investors.
              Our approach is rooted in:
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="whyus-grid">
          {reasons.map((item, idx) => (
            <div key={idx} className={`whyus-card card-${idx + 1}`}>
              <div className="whyus-icon">
                <img
                  src={item.img}
                  alt={item.title}
                  width="64"
                  height="64"
                  loading="lazy"
                />
              </div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Counter */}
        <div className="whyus-counter" ref={counterRef}>
          <div className="counter-item">
            <h3>{counts.clients}+</h3>
            <p>Clients</p>
          </div>
          <div className="counter-item">
            <h3>{counts.assets}CR+</h3>
            <p>Assets Managed</p>
          </div>
          <div className="counter-item">
            <h3>{counts.sip}CR+</h3>
            <p>Live SIP</p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mission-vision" ref={missionVisionRef}>
          <div className="plain-card">
            <div className="mv-content">
              <h5>Our Mission</h5>
              <p>
                To empower individuals and families with customised,
                intelligent, and risk-aware investment strategies that enable
                sustainable wealth creation, financial security, and peace of
                mind.
              </p>
            </div>
            <img
              src={mission}
              alt="Our Mission"
              className="mv-img-bottom"
              loading="lazy"
            />
          </div>

          <div className="plain-card">
            <div className="mv-content">
              <h5>Our Vision</h5>
              <p>
                To become the most trusted boutique wealth management partner in
                India, known for integrity, innovation, and enduring client
                relationships, helping investors achieve financial freedom and
                leave behind a lasting legacy.
              </p>
            </div>
            <img
              src={vision}
              alt="Our Vision"
              className="mv-img-bottom"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <AboutUsFooter />
    </div>
  );
}

export default AboutUs;
