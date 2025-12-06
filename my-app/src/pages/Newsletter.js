import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import Header from '../components/Header';
import AboutUsFooter from './AboutUsFooter';
import './Newsletter.css';

function Newsletter() {
  const lenisRef = useRef(null);
  const navigate = useNavigate();

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
      normalizeWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
      syncTouchLerp: 0.1,
      __experimental__naiveDimensions: false
    });

    lenisRef.current = lenis;

    // Store lenis instance globally for modal access
    window.lenis = lenis;

    const handleScroll = () => {
      const scrollY = lenis.scroll;
      const header = document.querySelector('.header');
      const heroSection = document.querySelector('.newsletter-hero');
      const newsletterContent = document.querySelector('.newsletter-content');
      const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;

      // Calculate opacity for hero section - gradually fade as user scrolls
      const scrollProgress = Math.min(scrollY / heroHeight, 1);
      const heroOpacity = 1 - (scrollProgress * 0.6); // Fade from 1 to 0.4

      if (heroSection) {
        heroSection.style.opacity = heroOpacity;
      }

      // Lift up effect: content section reveals from bottom
      if (newsletterContent && scrollY < heroHeight) {
        const liftProgress = scrollY / heroHeight;
        const translateY = (1 - liftProgress) * 10; // Changed from 70 to 50 for even earlier appearance
        newsletterContent.style.transform = `translateY(${translateY}vh)`;
      } else if (newsletterContent) {
        newsletterContent.style.transform = 'translateY(0)';
      }

      if (scrollY > 50) {
        header.classList.add('scrolled');

        // Check if we've scrolled past the hero section
        if (scrollY >= heroHeight) {
          // Past hero section - add black bar to header
          header.classList.add('past-video');
        } else {
          // Still in hero section
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

  const newsletters = [
    {
      id: 1,
      title: 'Market Update - January 2025',
      date: 'August 28, 2025',
      description: 'Market Update: Inflation Hits Lowest Level Since 2017',
      image: '/newsletter1.jpg',
      category: 'Market Analysis'
    },
    {
      id: 2,
      title: 'Investza Pune: Evidence-Based Wealth Management',
      date: 'November 11, 2025',
      description: 'Investza Pune: Evidence-Based Wealth Management in the City of Clarity. Why Investza Pune Brings Structured Wealth Management to Your Portfolio.',
      image: '/newsletter2.jpg',
      category: 'Investment Tips'
    },
    {
      id: 3,
      title: 'Why Estate Planning Matters in India?',
      date: 'October 31, 2025',
      description: 'Did you know? Over ₹88,000 crore worth of assets in India lie unclaimed, simply because people didn’t plan their succession right.',
      image: '/newsletter3.jpg',
      category: 'Education'
    },
    {
      id: 4,
      title: 'The RBI’s Rate Cut: What You Need to Know',
      date: 'July 4, 2025',
      description: 'I’m sure you’ve heard by now. The Reserve Bank of India (RBI) has slashed the repo rate by 50 basis points (bps) to 5.5%. It has also reduced the Cash',
      image: '/newsletter4.jpg',
      category: 'Tax Planning'
    },
    {
      id: 5,
      title: 'Why GRCTCs Matter for India’s Financial Future',
      date: 'June 20, 2025',
      description: 'I was recently catching up with an old client over coffee. His job always fascinated me, and I had always wanted to fully understand what he does. As we spoke.',
      image: '/newsletter5.jpg',
      category: 'Retirement'
    },
    {
      id: 6,
      title: 'Do You Really Need a Wealth Manager?',
      date: 'June 6, 2025',
      description: 'I recently met one of my close friends who had just run into some good fortune. He sold a part of his business and received ₹20 crores in an all-cash.',
      image: '/newsletter6.jpg',
      category: 'Market Analysis'
    }
  ];

  return (
    <div className="newsletter-page">
      <Header />
      
      <div 
        className="newsletter-hero"
        style={{
          backgroundImage: `url(/team/newsletter_hero.jpeg?v=${Date.now()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="newsletter-hero-overlay"></div>
        <div className="newsletter-hero-content">
          <h1>Newsletter</h1>
          <p>Stay informed with the latest insights, market trends, and investment strategies</p>
        </div>
      </div>

      <div className="newsletter-content">
        <div className="newsletter-container">
          <div className="newsletter-grid">
            {newsletters.map((newsletter) => (
              <div key={newsletter.id} className="newsletter-card">
                <div className="newsletter-card-content">
                  <div className="newsletter-category">{newsletter.category}</div>
                  <div className="newsletter-date">{newsletter.date}</div>
                  <h3 className="newsletter-title">{newsletter.title}</h3>
                  <p className="newsletter-description">{newsletter.description}</p>
                  <button 
                    className="newsletter-read-btn"
                    onClick={() => navigate(`/newsletter/${newsletter.id}`)}
                  >
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AboutUsFooter />
    </div>
  );
}

export default Newsletter;
