import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Lenis from 'lenis';
import ReCAPTCHA from 'react-google-recaptcha';
import Header from '../components/Header';
import ContactFooter from './ContactFooter';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    window.lenis = lenis;

    const handleScroll = () => {
      const scrollY = lenis.scroll;
      const header = document.querySelector('.header');
      const heroSection = document.querySelector('.contact-hero');
      const contentSection = document.querySelector('.contact-glass-section');
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

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!recaptchaToken) {
      alert('Please complete the reCAPTCHA verification');
      return;
    }
    
    console.log('Form submitted:', formData);
    console.log('reCAPTCHA token:', recaptchaToken);
    
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setRecaptchaToken(null);
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };

  const scrollToContact = () => {
    const section = document.getElementById('contact-section');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="contact-page-wrapper">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="contact-hero"
        style={{
          backgroundImage: `url(/team/newsletter_hero.jpeg?v=${Date.now()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="contact-content">
          <h1 className="contact-heading">Contact Us</h1>
          <div
            className="contact-arrow-stack"
            onClick={scrollToContact}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && scrollToContact()}
            aria-label="Scroll to Contact section"
          >
            <ChevronDown className="contact-arrow ca1" />
            <ChevronDown className="contact-arrow ca2" />
            <ChevronDown className="contact-arrow ca3" />
          </div>
        </div>
      </section>

      {/* Contact Section with Apple Glass Effect */}
      <section id="contact-section" className="contact-glass-section">
        <div className="contact-glass-container">
          {/* Left - Get in Touch */}
          <div className="contact-glass-card">
            <h2 className="contact-glass-title">Get in Touch</h2>
            <div className="contact-glass-divider"></div>
            
            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="contact-info-text">
                  <a href="https://www.google.com/maps?q=704A+81+Crest+Flora+Santacruz+West+Mumbai+400057" target="_blank">
                    <p>704A, 81 Crest Flora, Santacruz(W),</p>
                    <p>Mumbai, Maharashtra, India 400 057</p>
                  </a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div className="contact-info-text">
                   <a href="tel:+918655447057">
                      <p>+91 8655447057</p>
                  </a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className="contact-info-text">
                 <a href="mailto:hello@investza.in">
                    <p>hello@investza.in</p>  
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Send us a message */}
          <div className="contact-glass-card">
            <h2 className="contact-glass-title">Send us a message</h2>
            <p className="contact-glass-subtitle">
              To take control of your investments you need ambition and possibilities to grow. 
              We assist our clients in achieving financial freedom.
            </p>

            <form onSubmit={handleSubmit} className="contact-glass-form">
              <div className="contact-form-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="contact-glass-input"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="contact-glass-input"
                  required
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="contact-glass-input contact-full-width"
                required
              />

              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                className="contact-glass-textarea"
                rows="4"
                required
              ></textarea>

              <div className="contact-glass-recaptcha">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LcPvRgsAAAAAJ041NhwKJXdG01Hyw2OHZx3CrDJ"
                  onChange={onRecaptchaChange}
                  theme="dark"
                />
              </div>

              <button type="submit" className="contact-glass-button" disabled={!recaptchaToken}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="contact-map-section">
        <h2 className="contact-map-title">Find Us</h2>
        <div className="contact-map-container" onClick={() => window.open('https://maps.google.com/?q=704A,+81+Crest+Flora,+Santacruz(W),+Mumbai', '_blank')}>
          <img src="/map_pc.jpeg" alt="Location Map" className="contact-map-image" />
          <div className="contact-map-overlay">
            <span className="contact-map-link">View larger map →</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <ContactFooter />
    </div>
  );
};

export default ContactUs;
