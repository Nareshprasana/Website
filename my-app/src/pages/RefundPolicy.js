import { useEffect } from 'react';
import Lenis from 'lenis';
import Header from '../components/Header';
import AboutUsFooter from './AboutUsFooter';
import './RefundPolicy.css';

function RefundPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Initialize Lenis smooth scrolling
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

    // Store lenis instance globally for modal access
    window.lenis = lenis;

    const handleScroll = () => {
      const scrollY = lenis.scroll;
      const header = document.querySelector('.header');
      const heroSection = document.querySelector('.refund-hero');
      const contentSection = document.querySelector('.refund-policy-content');
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

    document.documentElement.classList.add('lenis');

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      document.documentElement.classList.remove('lenis');
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <div className="refund-policy-page">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="refund-hero"
        style={{
          backgroundImage: `url(/team/newsletter_hero.jpeg?v=${Date.now()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="refund-hero-overlay"></div>
        <div className="refund-hero-content">
          <h1>Refund Policy</h1>
        </div>
      </section>
      
      <div className="refund-policy-content">
        <div className="refund-policy-container">
          
          <p className="refund-policy-intro">Thank you for registering for our webinars. Please note:</p>
          
          <ul className="refund-policy-list">
            <li>
              All registrations are <strong>final, non-refundable, and non-transferable</strong>.
            </li>
            <li>
              Once a payment is made, <strong>no cancellations, refunds, or substitutions</strong> will be allowed.
            </li>
            <li>
              In the rare case that a webinar is cancelled or rescheduled by <strong>Investza</strong>, participants will be notified and offered either:
              <ol className="refund-policy-sublist">
                <li>A full refund; or</li>
                <li>Access to the rescheduled session</li>
              </ol>
            </li>
          </ul>
          
          <p className="refund-policy-contact">For any assistance, please contact us at:</p>
          
          <div className="refund-policy-contact-info">
            <div className="refund-contact-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <a href="mailto:support@investza.in">support@investza.in</a>
            </div>
            <div className="refund-contact-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <a href="tel:+918655447057">+91 8655447057</a>
            </div>
          </div>
        </div>
      </div>

      <AboutUsFooter />
    </div>
  );
}

export default RefundPolicy;
