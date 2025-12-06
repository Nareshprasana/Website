import './ContactFooter.css';

const ContactFooter = () => {

  return (
    <footer 
      className="contact-footer-section"
      style={{
        // backgroundImage: 'url(/footer_bg.jpeg)',
        backgroundSize: '100% auto',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Footer End Section */}
      <div 
        className="contact-footer-end-section"
        style={{
          backgroundImage: 'url(/footer.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 150%',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="contact-footer-end-container">
          {/* Left - App Download */}
          <div className="contact-footer-end-left">
            <div className="contact-app-download-section">
              <a 
                href="https://investza.in/wealth-tracker/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-qr-code-box"
              >
                <img src="/qr-code.svg" alt="QR Code" />
              </a>
              <div className="contact-app-download-text">
                <h4>Track All Your Investments In One Place</h4>
                <p>Download Wealth Tracker App</p>
                <div className="contact-app-store-icons">
                  <img src="/google_play_icon.svg" alt="Google Play" className="contact-store-icon" />
                  <img src="/app_store_icon.svg" alt="App Store" className="contact-store-icon" />
                </div>
              </div>
            </div>
          </div>

          {/* Center - Newsletter */}
          <div className="contact-footer-end-center">
            <h3>Subscribe to our Newsletter</h3>
            <div className="contact-newsletter-form">
              <input type="email" placeholder="Your Email" className="contact-newsletter-input" />
              <button className="contact-newsletter-button">SUBSCRIBE</button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="contact-footer-end-bottom">
          <div className="contact-footer-end-bottom-container">
            {/* Left - Tagline & Social */}
            <div className="contact-footer-bottom-left">
              <h4 className="contact-footer-tagline">Your wealth partner</h4>
              <div className="contact-footer-social-icons">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="contact-footer-social-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://in.linkedin.com/company/investza" target="_blank" rel="noopener noreferrer" className="contact-footer-social-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/Investza.in/" target="_blank" rel="noopener noreferrer" className="contact-footer-social-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://www.youtube.com/@investzaWealth" target="_blank" rel="noopener noreferrer" className="contact-footer-social-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
              <div className="contact-footer-copyright">
                <p>Copyright © Investza | All Rights Reserved | <a href="/privacy" className="privacy-link">Privacy Policy</a></p>
              </div>
            </div>

            {/* Center - Main Pages */}
            <div className="contact-footer-bottom-center">
              <h4>Main Pages</h4>
              <ul className="contact-footer-links">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/wealth-tracker">Wealth Tracker</a></li>
                <li><a href="/team">Team</a></li>
                <li><a href="/events">Events</a></li>
                <li><a href="/newsletter">Newsletter</a></li>
              </ul>
            </div>

            {/* Right - Utility Pages */}
            <div className="contact-footer-bottom-right">
              <h4>Utility Pages</h4>
              <ul className="contact-footer-links">
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

export default ContactFooter;
