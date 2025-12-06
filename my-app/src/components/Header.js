import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import './Header.css';
import { ReviewPortfolioSubmit } from '../api/flowApi';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('portfolio'); // 'portfolio', 'schedule', 'clientLogin', 'partnerLogin'
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    investmentValue: '',
    email: '',
    agreeToPolicy: false
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    notRobot: false
  });
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isResourcesClosing, setIsResourcesClosing] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);

  // Handle Resources dropdown scroll lock
  useEffect(() => {
    if (isResourcesOpen) {
      const lenis = window.lenis;
      if (lenis) {
        lenis.stop();
      }
      document.body.style.overflow = 'hidden';
    } else {
      const lenis = window.lenis;
      if (lenis) {
        lenis.start();
      }
      document.body.style.overflow = '';
    }
    
    return () => {
      const lenis = window.lenis;
      if (lenis) {
        lenis.start();
      }
      document.body.style.overflow = '';
    };
  }, [isResourcesOpen]);

  // Listen for custom event to open schedule modal
  useEffect(() => {
    const handleOpenScheduleModal = () => {
      // Stop Lenis if it exists
      const lenis = window.lenis;
      if (lenis) {
        lenis.stop();
      }
      
      const scrollY = window.scrollY;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      const header = document.querySelector('.header');
      
      // Store scroll position
      document.body.dataset.scrollY = scrollY;
      
      // Simple overflow hidden approach - no position fixed
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      if (header) {
        header.style.paddingRight = `${scrollbarWidth}px`;
      }
      
      // Set modal type and open
      setModalType('schedule');
      setIsModalOpen(true);
    };

    const handleOpenRegisterModal = () => {
      // Stop Lenis if it exists
      const lenis = window.lenis;
      if (lenis) {
        lenis.stop();
      }
      
      const scrollY = window.scrollY;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      const header = document.querySelector('.header');
      
      // Store scroll position
      document.body.dataset.scrollY = scrollY;
      
      // Simple overflow hidden approach - no position fixed
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      if (header) {
        header.style.paddingRight = `${scrollbarWidth}px`;
      }
      
      // Set modal type and open
      setModalType('register');
      setIsModalOpen(true);
    };

    window.addEventListener('openScheduleModal', handleOpenScheduleModal);
    window.addEventListener('openRegisterModal', handleOpenRegisterModal);
    
    return () => {
      window.removeEventListener('openScheduleModal', handleOpenScheduleModal);
      window.removeEventListener('openRegisterModal', handleOpenRegisterModal);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Validate input based on field name
    if (name === 'fullName') {
      // Only allow letters and spaces
      const alphabetOnly = value.replace(/[^a-zA-Z\s]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: alphabetOnly
      }));
    } else if (name === 'contactNumber') {
      // Only allow numbers
      const numbersOnly = value.replace(/[^0-9]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: numbersOnly
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const onRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName.trim() !== '';
      case 2:
        return formData.contactNumber.trim() !== '';
      case 3:
        return formData.investmentValue !== '';
      case 4:
        return formData.email.trim() !== '' && formData.agreeToPolicy && recaptchaToken !== null;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (isStepValid() && currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (modalType === 'clientLogin' || modalType === 'partnerLogin') {
      console.log('Login submitted:', loginData, 'Type:', modalType);
      // Handle login logic here
      alert(`${modalType === 'clientLogin' ? 'Client' : 'Partner'} login submitted!`);
      closeModal();
      return;
    }
    
    if (!recaptchaToken) {
      alert('Please complete the reCAPTCHA verification');
      return;
    }
    
    try {
      const endpoint = modalType === 'portfolio' ? '/api/portfolio-review' : '/api/schedule-call';
      // const response = await fetch(`http://localhost:5000${endpoint}`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     ...formData,
      //     recaptchaToken
      //   })
      // });

      const response = await ReviewPortfolioSubmit(
        formData.fullName, 
        formData.contactNumber, 
        formData.investmentValue, 
        formData.email, 
        formData.agreeToPolicy,
        recaptchaToken
      );
      if (response.status !== 200) {
        throw new Error('Failed to submit form');
      }

      // const data = await response.json();
      // console.log('Form submitted successfully:', data);
      
      // Move to thank you screen
      setCurrentStep(5);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  const closeModal = () => {
    const header = document.querySelector('.header');
    
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    
    if (header) {
      header.style.paddingRight = '';
    }
    
    // Restart Lenis if it exists
    const lenis = window.lenis;
    if (lenis) {
      lenis.start();
    }
    
    setIsModalOpen(false);
    setModalType('portfolio');
    setCurrentStep(1);
    setFormData({
      fullName: '',
      contactNumber: '',
      investmentValue: '',
      email: '',
      agreeToPolicy: false
    });
    setRecaptchaToken(null);
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && currentStep < 4 && isStepValid()) {
      e.preventDefault();
      handleNext();
    }
  };

  const closeResourcesDropdown = () => {
    setIsResourcesClosing(true);
    setTimeout(() => {
      setIsResourcesOpen(false);
      setIsResourcesClosing(false);
    }, 400); // Match animation duration
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsMobileResourcesOpen(false);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileResourcesOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
    {/* Resources Overlay - rendered at root level to cover entire page */}
    {isResourcesOpen && (
      <div 
        className={`resources-overlay ${isResourcesClosing ? 'closing' : ''}`}
      ></div>
    )}
    
    <header className="header">
      <nav className="navbar">
        <div className="mobile-header-wrapper">
          {/* Burger Menu Button - Mobile Only */}
          <button 
            className={`burger-menu ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className="nav-brand">
            <Link to="/">
              <img src="/logo.svg" alt="Investza" className="logo" />
            </Link>
          </div>

          <button className="mobile-login-icon" onClick={() => {
            closeMobileMenu();
            const lenis = window.lenis;
            if (lenis) lenis.stop();
            const scrollY = window.scrollY;
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            const header = document.querySelector('.header');
            document.body.dataset.scrollY = scrollY;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            if (header) header.style.paddingRight = `${scrollbarWidth}px`;
            setModalType('clientLogin');
            setIsModalOpen(true);
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
        </div>

        <ul className={`nav-menu ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
          {/* Mobile: Close Button */}
          <button className="mobile-close-btn" onClick={closeMobileMenu}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Mobile: Review Portfolio Button */}
          <li className="mobile-portfolio-item">
            <button className="mobile-portfolio-btn" onClick={() => {
              closeMobileMenu();
              const lenis = window.lenis;
              if (lenis) lenis.stop();
              const scrollY = window.scrollY;
              const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
              const header = document.querySelector('.header');
              document.body.dataset.scrollY = scrollY;
              document.body.style.overflow = 'hidden';
              document.body.style.paddingRight = `${scrollbarWidth}px`;
              if (header) header.style.paddingRight = `${scrollbarWidth}px`;
              setModalType('portfolio');
              setIsModalOpen(true);
            }}>
              Review my Portfolio
            </button>
          </li>
          <li><Link to="/events" onClick={closeMobileMenu}>Events</Link></li>
          <li 
            className="resources-dropdown"
            onMouseEnter={() => {
              if (window.innerWidth > 768) {
                setIsResourcesClosing(false);
                setIsResourcesOpen(true);
              }
            }}
            onMouseLeave={() => {
              if (window.innerWidth > 768) {
                closeResourcesDropdown();
              }
            }}
          >
            <button 
              className="resources-button"
              onClick={() => {
                if (window.innerWidth <= 768) {
                  setIsMobileResourcesOpen(!isMobileResourcesOpen);
                }
              }}
            >
              Resources
              <span className="mobile-dropdown-arrow"></span>
            </button>
            {isResourcesOpen && window.innerWidth > 768 && (
              <div 
                className={`resources-menu ${isResourcesClosing ? 'closing' : ''}`}
                onMouseEnter={() => {
                  setIsResourcesClosing(false);
                  setIsResourcesOpen(true);
                }}
                onMouseLeave={() => closeResourcesDropdown()}
              >
                <div className="resources-menu-item coming-soon-item">
                  <span>Coming Soon</span>
                </div>
              </div>
            )}
            {isMobileResourcesOpen && (
              <div className="mobile-resources-submenu">
                <div className="mobile-resources-link coming-soon-item">
                  Coming Soon
                </div>
              </div>
            )}
          </li>
          <li><Link to="/about" onClick={closeMobileMenu}>About Us</Link></li>
        </ul>

        <div className="nav-cta">
          <button className="nav-button" onClick={() => {
            closeMobileMenu();
            // Stop Lenis if it exists
            const lenis = window.lenis;
            if (lenis) {
              lenis.stop();
            }
            
            const scrollY = window.scrollY;
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            const header = document.querySelector('.header');
            
            // Store scroll position
            document.body.dataset.scrollY = scrollY;
            
            // Simple overflow hidden approach - no position fixed
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            
            if (header) {
              header.style.paddingRight = `${scrollbarWidth}px`;
            }
            
            // Set modal type and open
            setModalType('portfolio');
            setIsModalOpen(true);
          }}>Review my Portfolio</button>
          
          {/* Mobile Login Icon */}
          <button className="mobile-login-icon" onClick={() => {
            closeMobileMenu();
            const lenis = window.lenis;
            if (lenis) lenis.stop();
            const scrollY = window.scrollY;
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            const header = document.querySelector('.header');
            document.body.dataset.scrollY = scrollY;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            if (header) header.style.paddingRight = `${scrollbarWidth}px`;
            setModalType('clientLogin');
            setIsModalOpen(true);
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>

          <div className="login-dropdown desktop-only">
            <button className="login-button">Login</button>
            <div className="login-menu">
              <div className="login-menu-item login-coming-soon">
                <span className="login-original-text">Client Login</span>
                <span className="login-coming-soon-text">Coming Soon</span>
              </div>
              <div className="login-menu-item login-coming-soon">
                <span className="login-original-text">Partner Login</span>
                <span className="login-coming-soon-text">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Portfolio Review Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            {(modalType === 'clientLogin' || modalType === 'partnerLogin' || modalType === 'clientSignup' || modalType === 'partnerSignup') ? (
              <>
                <h2 className="modal-title">
                  {modalType === 'clientLogin' ? 'CLIENT LOGIN' : 
                   modalType === 'partnerLogin' ? 'PARTNER LOGIN' :
                   modalType === 'clientSignup' ? 'CLIENT SIGN UP' : 'PARTNER SIGN UP'}
                </h2>
                {(modalType === 'clientLogin' || modalType === 'partnerLogin') && (
                  <p className="modal-subtitle">Enter your credentials to access your account</p>
                )}
              </>
            ) : currentStep !== 5 && (
              <>
                <h2 className="modal-title">
                  {modalType === 'schedule' ? 'SCHEDULE A CALL' : 
                   modalType === 'register' ? 'REGISTER FOR EVENT' : 'REVIEW YOUR PORTFOLIO'}
                </h2>
                <p className="modal-subtitle">Fill out the form below, and we will be in touch shortly.</p>
              </>
            )}
            
            {currentStep !== 5 && modalType !== 'clientLogin' && modalType !== 'partnerLogin' && modalType !== 'clientSignup' && modalType !== 'partnerSignup' && (
              <div className="step-indicator">
                {[1, 2, 3, 4].map(step => (
                  <div key={step} className={`step ${currentStep === step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}>
                    {step}
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="modal-form">
              {(modalType === 'clientSignup' || modalType === 'partnerSignup') ? (
                <div className="signup-form-content">
                  <p className="signup-subtitle">Enter your details to create your {modalType === 'clientSignup' ? 'Client' : 'Partner'} account:</p>
                  
                  <div className="form-row-signup">
                    <div className="form-field-half">
                      <label className="signup-label">First Name*</label>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={signupData.firstName}
                        onChange={(e) => setSignupData(prev => ({ ...prev, firstName: e.target.value }))}
                        className="form-input-signup"
                        required
                      />
                    </div>
                    <div className="form-field-half">
                      <label className="signup-label">Last Name*</label>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={signupData.lastName}
                        onChange={(e) => setSignupData(prev => ({ ...prev, lastName: e.target.value }))}
                        className="form-input-signup"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-field-full">
                    <label className="signup-label">Email*</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={signupData.email}
                      onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                      className="form-input-signup"
                      required
                    />
                  </div>

                  <div className="form-field-full">
                    <label className="signup-label">Phone Number*</label>
                    <input
                      type="tel"
                      minLength={10}
                      name="phoneNumber"
                      placeholder="Phone Number"
                      value={signupData.phoneNumber}
                      onChange={(e) => setSignupData(prev => ({ ...prev, phoneNumber: e.target.value.replace(/[^0-9]/g, '') }))}
                      className="form-input-signup"
                      required
                    />
                  </div>

                  <div className="form-row-signup">
                    <div className="form-field-half">
                      <label className="signup-label">Password*</label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={signupData.password}
                        onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                        className="form-input-signup"
                        required
                      />
                    </div>
                    <div className="form-field-half">
                      <label className="signup-label">Confirm Password*</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="form-input-signup"
                        required
                      />
                    </div>
                  </div>

                  <div className="signup-checkboxes">
                    <label className="signup-checkbox-label">
                      <input
                        type="checkbox"
                        checked={signupData.agreeToTerms}
                        onChange={(e) => setSignupData(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
                        required
                      />
                      <span>I agree with Investza's <a href="/terms" target="_blank">User Agreement</a> and <a href="/privacy" target="_blank">Privacy Policy</a>.</span>
                    </label>
                  </div>

                  <button type="submit" className="btn-submit signup-submit-btn">
                    SIGN UP
                  </button>

                  <div className="signup-login-link">
                    Already have an account? <button type="button" onClick={() => setModalType(modalType === 'clientSignup' ? 'clientLogin' : 'partnerLogin')} className="link-button">Log In</button>
                  </div>
                </div>
              ) : (modalType === 'clientLogin' || modalType === 'partnerLogin') ? (
                <div className="login-form-content">
                  <div className="form-step">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email*"
                      value={loginData.email}
                      onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                      className="form-input-modal"
                      required
                    />
                  </div>
                  <div className="form-step">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password*"
                      value={loginData.password}
                      onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                      className="form-input-modal"
                      required
                    />
                    <button 
                      type="button" 
                      className="forgot-password-link"
                      onClick={() => alert('Forgot password functionality coming soon')}
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <button type="submit" className="btn-submit login-submit-btn">
                    LOGIN
                  </button>
                  
                  <div className="login-divider">
                    <span>OR</span>
                  </div>
                  
                  <button 
                    type="button" 
                    className="btn-signup"
                    onClick={() => setModalType(modalType === 'clientLogin' ? 'clientSignup' : 'partnerSignup')}
                  >
                    SIGN UP
                  </button>
                </div>
              ) : currentStep === 1 && (
                <div className="form-step">
                  <label className="form-label">What is your Full Name?</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name*"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="form-input-modal"
                    pattern="[A-Za-z\s]+"
                    title="Please enter only letters and spaces"
                    required
                  />
                </div>
              )}

              {currentStep === 2 && (
                <div className="form-step">
                  <label className="form-label">What is your Contact Number?</label>
                  <input
                    type="tel"
                    maxLength={10}
                    name="contactNumber"
                    placeholder="Contact Number*"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className="form-input-modal"
                    pattern="[0-9]+"
                    title="Please enter only numbers"
                    inputMode="numeric"
                    required
                  />
                </div>
              )}

              {currentStep === 3 && (
                <div className="form-step">
                  <label className="form-label">What is the total value of your investments?</label>
                  <div className="investment-options">
                    {['0-25L', '25L-50L', '50L-2Cr', '2Cr and above'].map(option => (
                      <button
                        key={option}
                        type="button"
                        className={`investment-option ${formData.investmentValue === option ? 'selected' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, investmentValue: option }))}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="form-step">
                  <label className="form-label">What is your Email?</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email*"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input-modal"
                    required
                  />
                  
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      name="agreeToPolicy"
                      id="agreeToPolicy"
                      checked={formData.agreeToPolicy}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="agreeToPolicy">I agree to the Privacy Policy</label>
                  </div>

                  <div className="captcha-container">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                      onChange={onRecaptchaChange}
                      theme="dark"
                    />
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="form-step thank-you-step">
                  <div className="thank-you-icon">
                    <svg viewBox="0 0 52 52" className="checkmark">
                      <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                      <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                    </svg>
                  </div>
                  <h3 className="thank-you-title">Thank You!</h3>
                  <p className="thank-you-message">
                    Thank you for submitting the form. We will get in contact with you immediately.
                  </p>
                  <button type="button" className="btn-close-thank-you" onClick={closeModal}>
                    CLOSE
                  </button>
                </div>
              )}

              {currentStep !== 5 && modalType !== 'clientLogin' && modalType !== 'partnerLogin' && modalType !== 'clientSignup' && modalType !== 'partnerSignup' && (
                <div className="modal-actions">
                  {currentStep > 1 && currentStep !== 5 && (
                    <button type="button" className="btn-back" onClick={handleBack}>
                      ← BACK
                    </button>
                  )}
                  {currentStep < 4 ? (
                    <button 
                      type="button" 
                      className="btn-next" 
                      onClick={handleNext}
                      disabled={!isStepValid()}
                    >
                      NEXT →
                    </button>
                  ) : currentStep === 4 ? (
                    <button type="submit" className="btn-submit">
                      SUBMIT
                    </button>
                  ) : null}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </header>
    </>
  );
};

export default Header;
