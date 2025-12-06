import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import './EventsFooter.css';

const EventsFooter = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

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

  return (
    <footer 
      className="events-footer-section"
      style={{
        backgroundImage: 'url(/footer_bg.jpeg)',
        backgroundSize: '100% auto',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="events-footer-container">
        {/* Left Section - Get in Touch */}
        <div className="events-footer-left">
          <div className="events-footer-section-block">
            <h3 className="events-footer-heading">Get in Touch</h3>
            <div className="events-footer-divider"></div>
            
            <div className="events-contact-info">
              <div className="events-contact-item">
                <div className="events-contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="events-contact-text">
                <a href="https://www.google.com/maps?q=704A+81+Crest+Flora+Santacruz+West+Mumbai+400057" target="_blank">
                    <p>704A, 81 Crest Flora, Santacruz(W),</p>
                    <p>Mumbai, Maharashtra, India 400 057</p>
                  </a>
                </div>
              </div>

              <div className="events-contact-item">
                <div className="events-contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div className="events-contact-text">
                  <a href="tel:+918655447057">
                      <p>+91 8655447057</p>
                  </a>
                </div>
              </div>

              <div className="events-contact-item">
                <div className="events-contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className="events-contact-text">
                 <a href="mailto:hello@investza.in">
                    <p>hello@investza.in</p>  
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Find Us Section */}
          <div className="events-footer-section-block">
            <h3 className="events-footer-heading">Find Us</h3>
            <div className="events-footer-divider"></div>
            
            <div className="events-map-container" onClick={() => window.open('https://share.google/k2xmco9Omr9Ljij1V', '_blank')}>
              <div className="events-map-placeholder">
                <img src="/map_pc.jpeg" alt="Location Map" className="events-map-image" />
                <div className="events-map-overlay">
                  <span className="events-map-link-text">View larger map</span>
                </div>
              </div>
            </div>
          </div>

          {/* Follow Us Section */}
          <div className="events-footer-section-block">
            <h3 className="events-footer-heading">Follow Us</h3>
            <div className="events-footer-divider"></div>
            
            <div className="events-social-links">
              <a href="https://www.instagram.com/investza.in/" target="_blank" rel="noopener noreferrer" className="events-social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://in.linkedin.com/company/investza" target="_blank" rel="noopener noreferrer" className="events-social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/Investza.in/" target="_blank" rel="noopener noreferrer" className="events-social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@investzaWealth" target="_blank" rel="noopener noreferrer" className="events-social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right Section - Send us a message */}
        <div className="events-footer-right">
          <div className="events-message-form-container">
            <h2 className="events-form-title">Send us a message</h2>
            <p className="events-form-subtitle">
              To take control of your investments you need ambition and possibilities to grow. 
              We assist our clients in achieving financial freedom.
            </p>

            <form onSubmit={handleSubmit} className="events-contact-form">
              <div className="events-form-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="events-form-input"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="events-form-input"
                  required
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="events-form-input events-full-width"
                required
              />

              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                className="events-form-textarea"
                rows="4"
                required
              ></textarea>

              <div className="events-recaptcha-container">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LcPvRgsAAAAAJ041NhwKJXdG01Hyw2OHZx3CrDJ"
                  onChange={onRecaptchaChange}
                  theme="dark"
                />
              </div>

              <button type="submit" className="events-submit-button" disabled={!recaptchaToken}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>


      {/* Footer End Section */}
      <div 
        className="events-footer-end-section"
        style={{
          backgroundImage: 'url(/footer.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 150%',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="events-footer-end-container">
          {/* Left - App Download */}
          <div className="events-footer-end-left">
            <div className="events-app-download-section">
              <a 
                href="https://investza.in/wealth-tracker/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="events-qr-code-box"
              >
                <img src="/qr-code.svg" alt="QR Code" />
              </a>
              <div className="events-app-download-text">
                <h4>Track All Your Investments In One Place</h4>
                <p>Download Wealth Tracker App</p>
                <div className="events-app-store-icons">
                  <img src="/google_play_icon.svg" alt="Google Play" className="events-store-icon" />
                  <img src="/app_store_icon.svg" alt="App Store" className="events-store-icon" />
                </div>
              </div>
            </div>
          </div>

          {/* Center - Newsletter */}
          <div className="events-footer-end-center">
            <h3>Subscribe to our Newsletter</h3>
            <div className="events-newsletter-form">
              <input type="email" placeholder="Your Email" className="events-newsletter-input" />
              <button className="events-newsletter-button">SUBSCRIBE</button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="events-footer-end-bottom">
          <div className="events-footer-end-bottom-container">
            {/* Left - Tagline & Social */}
            <div className="events-footer-bottom-left">
              <h4 className="events-footer-tagline">Your wealth partner</h4>
              <div className="events-footer-social-icons">
                <a href="https://www.instagram.com/investza.in/" target="_blank" rel="noopener noreferrer" className="events-footer-social-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://in.linkedin.com/company/investza" target="_blank" rel="noopener noreferrer" className="events-footer-social-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/Investza.in/" target="_blank" rel="noopener noreferrer" className="events-footer-social-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://www.youtube.com/@investzaWealth" target="_blank" rel="noopener noreferrer" className="events-footer-social-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
              <div className="events-footer-copyright">
                <p>Copyright © Investza | All Rights Reserved | <a href="/privacy" className="privacy-link">Privacy Policy</a></p>
              </div>
            </div>

            {/* Center - Main Pages */}
            <div className="events-footer-bottom-center">
              <h4>Main Pages</h4>
              <ul className="events-footer-links">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/wealth-tracker">Wealth Tracker</a></li>
                <li><a href="/team">Team</a></li>
                <li><a href="/events">Events</a></li>
                <li><a href="/newsletter">Newsletter</a></li>
              </ul>
            </div>

            {/* Right - Utility Pages */}
            <div className="events-footer-bottom-right">
              <h4>Utility Pages</h4>
              <ul className="events-footer-links">
                <li><a href="/terms">Terms & Conditions</a></li>
                <li><a href="/disclaimer">Disclaimer</a></li>
                <li><a href="/refund">Refund Policy</a></li>
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/contact">Contact Us</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EventsFooter;
