import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import Header from '../components/Header';
import EventsFooter from './EventsFooter';
import './EventsPage.css';
import {getEvents} from "../api/flowApi";


const EventsPage = () => {
  const lenisRef = useRef(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const [eventDetailsModal, setEventDetailsModal] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const [fetchedData,setfetchedData] = useState([]);
  const [upcomingEventsData,setUpcomingEventsData] = useState([]);
  const [pastEventsData,setPastEventsData] = useState([]);

const categorizeEvents = (events) => {
  const today = new Date().toISOString().split("T")[0];
  const upcoming = [];
  const past = [];

  events.forEach(event => {
    if (event.date > today) upcoming.push(event);
    else if (event.date < today) past.push(event);
  });

  return { upcoming, past };
};

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await getEvents();
      setfetchedData(res.data);
      console.log(res.data);

      const { upcoming, past } = categorizeEvents(res.data);
      setUpcomingEventsData(upcoming);
      setPastEventsData(past);

    } catch (err) {
      console.log(err);
    }
  };

  fetchData();
}, []);

function formatDate(dateStr) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [year, month, day] = dateStr.split("-");

  const monthName = months[parseInt(month) - 1];
  const formattedDay = parseInt(day); // remove leading zero

  return `${monthName} ${formattedDay}, ${year}`;
}


  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const openEventDetails = (eventData) => {
    setEventDetailsModal(eventData);
    setCarouselIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeEventDetails = () => {
    setEventDetailsModal(null);
    setCarouselIndex(0);
    document.body.style.overflow = '';
  };

  const nextSlide = () => {
    if (eventDetailsModal && eventDetailsModal.images) {
      setCarouselIndex((prev) => (prev + 1) % eventDetailsModal.images.length);
    }
  };

  const prevSlide = () => {
    if (eventDetailsModal && eventDetailsModal.images) {
      setCarouselIndex((prev) => (prev - 1 + eventDetailsModal.images.length) % eventDetailsModal.images.length);
    }
  };

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

    const handleScroll = () => {
      const scrollY = lenis.scroll;
      const header = document.querySelector('.header');
      const heroOverlay = document.querySelector('.hero-overlay');
      const heroSection = document.querySelector('.events-hero');
      const eventsContent = document.querySelector('.events-content');
      const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;

      // Calculate opacity based on scroll position relative to hero height
      const scrollProgress = Math.min(scrollY / (heroHeight * 0.8), 1);
      const tintOpacity = scrollProgress * 0.6; // Max 60% additional tint

      // Lift up effect: content section reveals from bottom
      if (eventsContent && scrollY < heroHeight) {
        const liftProgress = scrollY / heroHeight;
        const translateY = (1 - liftProgress) * 10;
        eventsContent.style.transform = `translateY(${translateY}vh)`;
      } else if (eventsContent) {
        eventsContent.style.transform = 'translateY(0)';
      }

      if (scrollY > 50) {
        header.classList.add('scrolled');

        // Check if we've scrolled past the hero section
        if (scrollY >= heroHeight) {
          // Past hero section - add black bar to header
          header.classList.add('past-video');
          if (heroOverlay) {
            heroOverlay.style.background = `rgba(0, 0, 0, ${0.3 + 0.6})`; // Keep max tint
          }
        } else {
          // Still in hero section - progressive tint on hero only
          header.classList.remove('past-video');
          if (heroOverlay) {
            heroOverlay.style.background = `rgba(0, 0, 0, ${0.3 + tintOpacity})`;
          }
        }
      } else {
        header.classList.remove('scrolled');
        header.classList.remove('past-video');
        if (heroOverlay) {
          heroOverlay.style.background = 'rgba(0, 0, 0, 0.3)';
        }
      }
    };

    // Add Lenis class to html element
    document.documentElement.classList.add('lenis');

    lenis.on('scroll', handleScroll);

    // Animation frame for Lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      document.documentElement.classList.remove('lenis');
      lenis.destroy();
    };
  }, []);

  return (
    <div className="events-page">
      <Header />
      
      <section className="events-hero" style={{ backgroundImage: 'url(/webinar_pic.webp)' }}>
        <div className="hero-overlay"></div>
        <div className="events-hero-content">
          <h1>Upcoming Events</h1>
          <p>Join us for exclusive investment insights and networking opportunities</p>
        </div>
      </section>

      {/* events conmtent*/}
      <section className="events-content">
        <div className="container">
          <h2 className="section-title">Upcoming Events</h2>
           <div className="events-grid events-grid-two">
            {upcomingEventsData.map((ele) => {return(
            <div className="event-card">
              <div className="event-image">
                <img src={ele.images[0]} alt="Event" />
              </div>
              <div className="event-details">
                <span className="event-date">{formatDate(ele.date)}</span>
                <h3 className="event-title">{ele.title}</h3>
                <p className="event-description">
                  {ele.description}
                </p>
                <div className="event-buttons">
                  <button className="event-register-btn" onClick={() => {
                    window.dispatchEvent(new CustomEvent('openRegisterModal'));
                  }}>Register</button>
                  <button className="event-details-btn" onClick={() => openEventDetails({
                    title: ele.title,
                    date: formatDate(ele.date),
                    images : ele.images,
                    details: [
                      ele.description
                    ],
                    centerAlign: true
                  })}>View Details</button>
                </div>
              </div>
            </div>   
          )})}
          </div>

          <h2 className="section-title" style={{ marginTop: '80px' }}>Past Events</h2>
          <div className="events-grid">
            {pastEventsData.map((ele) => {return(
              <div className="event-card">
              <div className="event-image">
                <img src={ele.images[0]} alt="Event" />
              </div>
              <div className="event-details">
                <span className="event-date">{formatDate(ele.date)}</span>
                <h3 className="event-title">{ele.title}</h3>
                <p className="event-description">
                  {ele.description}
                </p>
                <button className="event-register-btn" onClick={() => openEventDetails({
                    title: ele.title,
                    date: formatDate(ele.date),
                    images: ele.images,
                    details: [
                      ele.description
                    ]
                  })}>View Details</button>
              </div>
            </div>
            )})}
          </div>

          {/* Meet Your Mentor Section - INSIDE events-content */}
          <div style={{ marginTop: '80px', padding: '60px 0 80px 0', background: '#000' }}>
            {/* Icon Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', marginBottom: '80px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '15px' }}>
                <div style={{ 
                  width: '70px', 
                  height: '70px', 
                  borderRadius: '50%', 
                  background: 'linear-gradient(135deg, rgba(74, 158, 255, 0.2) 0%, rgba(0, 212, 255, 0.1) 100%)',
                  border: '2px solid rgba(74, 158, 255, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <p style={{ fontSize: '16px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.9)', margin: 0 }}>September 30<sup>th</sup></p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '15px' }}>
                <div style={{ 
                  width: '70px', 
                  height: '70px', 
                  borderRadius: '50%', 
                  background: 'linear-gradient(135deg, rgba(74, 158, 255, 0.2) 0%, rgba(0, 212, 255, 0.1) 100%)',
                  border: '2px solid rgba(74, 158, 255, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <p style={{ fontSize: '16px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.9)', margin: 0 }}>4 PM (IST)</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '15px' }}>
                <div style={{ 
                  width: '70px', 
                  height: '70px', 
                  borderRadius: '50%', 
                  background: 'linear-gradient(135deg, rgba(74, 158, 255, 0.2) 0%, rgba(0, 212, 255, 0.1) 100%)',
                  border: '2px solid rgba(74, 158, 255, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="23"></line>
                    <line x1="8" y1="23" x2="16" y2="23"></line>
                  </svg>
                </div>
                <p style={{ fontSize: '16px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.9)', margin: 0 }}>Duration 90 Minutes</p>
              </div>
            </div>

            {/* Mentor Content */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'flex-start', paddingTop : "80px" }} className="mentor-content">
              <div>
                <h2 style={{ fontSize: '52px', fontWeight: '700', marginBottom: '20px', color: 'white', lineHeight: '1.2' }}>Meet Your Mentor</h2>
                <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.85)', marginBottom: '30px', lineHeight: '1.7' }}>
                  "Early Retirement isn't a dream-it's a strategy. And with the right tools, you can make it a reality."
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ fontSize: '17px', color: 'rgba(255, 255, 255, 0.85)', marginBottom: '15px', paddingLeft: '35px', position: 'relative', lineHeight: '1.6' }}>
                    <span style={{ position: 'absolute', left: 0, top: '4px', width: '18px', height: '18px', background: '#4a9eff', borderRadius: '50%', display: 'inline-block' }}></span>
                    Over 15 years of experience in wealth management
                  </li>
                  <li style={{ fontSize: '17px', color: 'rgba(255, 255, 255, 0.85)', marginBottom: '15px', paddingLeft: '35px', position: 'relative', lineHeight: '1.6' }}>
                    <span style={{ position: 'absolute', left: 0, top: '4px', width: '18px', height: '18px', background: '#4a9eff', borderRadius: '50%', display: 'inline-block' }}></span>
                    Helped 10,000+ professionals reshape their financial future
                  </li>
                  <li style={{ fontSize: '17px', color: 'rgba(255, 255, 255, 0.85)', marginBottom: '15px', paddingLeft: '35px', position: 'relative', lineHeight: '1.6' }}>
                    <span style={{ position: 'absolute', left: 0, top: '4px', width: '18px', height: '18px', background: '#4a9eff', borderRadius: '50%', display: 'inline-block' }}></span>
                    Known for simplifying complex strategies into actionable steps
                  </li>
                </ul>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
                <div style={{ width: '100%', maxWidth: '450px', borderRadius: '25px', overflow: 'hidden', marginBottom: '30px' }}>
                  <img src="/abhishek_working.webp" alt="Abhishek Mehta" style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ fontSize: '28px', fontWeight: '700', color: 'white', margin: '0 0 8px 0' }}>Abhishek Mehta</h3>
                  <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>Founder & Chief Strategist</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Meet Your Mentor Section */}
      <section style={{ background: '#000', padding: '80px 0', fontFamily: 'Manrope, sans-serif' }} className="meet-your-mentor-section">
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
          {/* Icon Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', marginBottom: '80px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '15px' }}>
              <div style={{ 
                width: '70px', 
                height: '70px', 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, rgba(74, 158, 255, 0.2) 0%, rgba(0, 212, 255, 0.1) 100%)',
                border: '2px solid rgba(74, 158, 255, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4a9eff'
              }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 2C8.27 2 2 8.27 2 16s6.27 14 14 14 14-6.27 14-14S23.73 2 16 2zm0 26c-6.63 0-12-5.37-12-12s5.37-12 12-12 12 5.37 12 12-5.37 12-12 12z" fill="currentColor"/>
                  <path d="M16 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="currentColor"/>
                  <path d="M16 18c-3.31 0-6.29 1.66-8 4.18.33 2.85 1.99 5.34 4.4 6.8 1.38.77 2.99 1.22 4.6 1.22s3.22-.45 4.6-1.22c2.41-1.46 4.07-3.95 4.4-6.8-1.71-2.52-4.69-4.18-8-4.18z" fill="currentColor"/>
                </svg>
              </div>
              <p style={{ fontSize: '16px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.9)', margin: 0 }}>Expert Guidance</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '15px' }}>
              <div style={{ 
                width: '70px', 
                height: '70px', 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, rgba(74, 158, 255, 0.2) 0%, rgba(0, 212, 255, 0.1) 100%)',
                border: '2px solid rgba(74, 158, 255, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4a9eff'
              }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 2C8.27 2 2 8.27 2 16s6.27 14 14 14 14-6.27 14-14S23.73 2 16 2zm0 26c-6.63 0-12-5.37-12-12s5.37-12 12-12 12 5.37 12 12-5.37 12-12 12z" fill="currentColor"/>
                  <path d="M14 10h4v8h-4z" fill="currentColor"/>
                  <path d="M14 20h4v2h-4z" fill="currentColor"/>
                </svg>
              </div>
              <p style={{ fontSize: '16px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.9)', margin: 0 }}>15+ Years Experience</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '15px' }}>
              <div style={{ 
                width: '70px', 
                height: '70px', 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, rgba(74, 158, 255, 0.2) 0%, rgba(0, 212, 255, 0.1) 100%)',
                border: '2px solid rgba(74, 158, 255, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4a9eff'
              }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 2C8.27 2 2 8.27 2 16s6.27 14 14 14 14-6.27 14-14S23.73 2 16 2zm0 26c-6.63 0-12-5.37-12-12s5.37-12 12-12 12 5.37 12 12-5.37 12-12 12z" fill="currentColor"/>
                  <path d="M13 16l-3-3 1.41-1.41L13 13.17l5.59-5.59L20 9l-7 7z" fill="currentColor"/>
                </svg>
              </div>
              <p style={{ fontSize: '16px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.9)', margin: 0 }}>Proven Track Record</p>
            </div>
          </div>

          {/* Mentor Content */}
          {/* <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'flex-start' }} className="mentor-content">
            <div style={{ paddingRight: '20px' }}>
              <h2 style={{ fontSize: '52px', fontWeight: '700', marginBottom: '20px', color: 'white', lineHeight: '1.2' }}>Meet Your Mentor</h2>
              <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.85)', marginBottom: '30px', lineHeight: '1.7' }}>
                "Early Retirement isn't a dream-it's a strategy. And with the right tools, you can make it a reality."
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0' }}>
                <li style={{ fontSize: '17px', color: 'rgba(255, 255, 255, 0.85)', marginBottom: '15px', paddingLeft: '35px', position: 'relative', lineHeight: '1.6' }}>
                  <span style={{ content: '', position: 'absolute', left: 0, top: '4px', width: '18px', height: '18px', background: '#4a9eff', borderRadius: '50%', display: 'inline-block', marginRight: '15px' }}></span>
                  Over 15 years of experience in wealth management
                </li>
                <li style={{ fontSize: '17px', color: 'rgba(255, 255, 255, 0.85)', marginBottom: '15px', paddingLeft: '35px', position: 'relative', lineHeight: '1.6' }}>
                  <span style={{ content: '', position: 'absolute', left: 0, top: '4px', width: '18px', height: '18px', background: '#4a9eff', borderRadius: '50%', display: 'inline-block', marginRight: '15px' }}></span>
                  Helped 10,000+ professionals reshape their financial future
                </li>
                <li style={{ fontSize: '17px', color: 'rgba(255, 255, 255, 0.85)', marginBottom: '15px', paddingLeft: '35px', position: 'relative', lineHeight: '1.6' }}>
                  <span style={{ content: '', position: 'absolute', left: 0, top: '4px', width: '18px', height: '18px', background: '#4a9eff', borderRadius: '50%', display: 'inline-block', marginRight: '15px' }}></span>
                  Known for simplifying complex strategies into actionable steps
                </li>
              </ul>
              <button style={{ 
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                padding: '14px 35px',
                borderRadius: '25px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}>Know More</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '100%', maxWidth: '450px', borderRadius: '25px', overflow: 'hidden', marginBottom: '30px' }}>
                <img src="/abhishek_working.webp" alt="Abhishek Mehta" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '28px', fontWeight: '700', color: 'white', margin: '0 0 8px 0' }}>Abhishek Mehta</h3>
                <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>Founder & Chief Strategist</p>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="team-title">WHO'S BEHIND INVESTZA</h2>

          <div className="team-grid">
            <div className="team-member">
              <a href="https://www.linkedin.com/in/abhishek-mehta-ca-cfa/" target="_blank" rel="noopener noreferrer" className="member-image-link">
                <div className="member-image">
                  <img src="/abhishek.webp" alt="Abhishek Mehta" />
                  <div className="hover-overlay">
                    <div className="linkedin-icon">
                      <img src="/linkedin_icon.png" alt="LinkedIn" />
                    </div>
                  </div>
                </div>
              </a>
              <div className="member-info">
                <h3 className="member-name">Abhishek Mehta</h3>
                <p className="member-role">Founder & Chief Strategist</p>
              </div>
            </div>

            <div className="team-member">
              <a href="https://www.linkedin.com/in/pooja-chandgothia-470054108/" target="_blank" rel="noopener noreferrer" className="member-image-link">
                <div className="member-image">
                  <img src="/pooja.webp" alt="Pooja Chandgothia" />
                  <div className="hover-overlay">
                    <div className="linkedin-icon">
                      <img src="/linkedin_icon.png" alt="LinkedIn" />
                    </div>
                  </div>
                </div>
              </a>
              <div className="member-info">
                <h3 className="member-name">Pooja Chandgothia</h3>
                <p className="member-role">Founder & CEO</p>
              </div>
            </div>

            <div className="team-member">
              <a href="https://www.linkedin.com/in/varunvinayan/" target="_blank" rel="noopener noreferrer" className="member-image-link">
                <div className="member-image">
                  <img src="/varun.webp" alt="Varun Vinayan" />
                  <div className="hover-overlay">
                    <div className="linkedin-icon">
                      <img src="/linkedin_icon.png" alt="LinkedIn" />
                    </div>
                  </div>
                </div>
              </a>
              <div className="member-info">
                <h3 className="member-name">Varun Vinayan</h3>
                <p className="member-role">Vice President</p>
              </div>
            </div>
          </div>

          <div className="team-cta">
            <button className="meet-team-btn" onClick={() => window.location.href = '/team'}>
              Meet the Team
              <div className="btn-arrow">→</div>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="faq-content">
            <div className="faq-left">
              <h2 className="faq-title">FAQ's</h2>
              
              <div className="faq-accordion">
                <div className={`faq-item ${activeFaq === 0 ? 'active' : ''}`}>
                  <button className="faq-question" onClick={() => toggleFaq(0)}>
                    <span>How I'll get the link to attend the program?</span>
                    <span className="faq-icon">›</span>
                  </button>
                  <div className="faq-answer">
                    <p>You will get a link to join 24 hours before, and one hour before we start. You will also get an email as soon as you enroll with our Whatsapp contact in case you have an issue.</p>
                  </div>
                </div>

                <div className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}>
                  <button className="faq-question" onClick={() => toggleFaq(1)}>
                    <span>What will be the language for the masterclass?</span>
                    <span className="faq-icon">›</span>
                  </button>
                  <div className="faq-answer">
                    <p>It will be in simple English Language!</p>
                  </div>
                </div>

                <div className={`faq-item ${activeFaq === 2 ? 'active' : ''}`}>
                  <button className="faq-question" onClick={() => toggleFaq(2)}>
                    <span>I am a beginner who has absolutely no knowledge about personal finance. Will it be useful for me?</span>
                    <span className="faq-icon">›</span>
                  </button>
                  <div className="faq-answer">
                    <p>You’re in the right place. You are going to be transformed financial knowledge wise!</p>
                  </div>
                </div>

                <div className={`faq-item ${activeFaq === 3 ? 'active' : ''}`}>
                  <button className="faq-question" onClick={() => toggleFaq(3)}>
                    <span>What if I do have any questions regarding registration and login?</span>
                    <span className="faq-icon">›</span>
                  </button>
                  <div className="faq-answer">
                    <p>Email us at hello@investza.in from your registered email id and we will help you right away!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="faq-right">
              <div className="faq-illustration">
                <img src="/faq.webp" alt="FAQ" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <EventsFooter />

      {/* Event Details Modal */}
      {eventDetailsModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(10px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }} onClick={closeEventDetails}>
          <div className="event-modal-container" style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '30px',
            maxWidth: '1050px',
            width: '100%',
            height: '85vh',
            display: 'flex',
            flexDirection: 'column',
            padding: '40px',
            position: 'relative',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
            overflow: 'hidden'
          }} onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button onClick={closeEventDetails} className="event-modal-close" style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'white',
              fontSize: '24px',
              zIndex: 30,
              lineHeight: 1,
              padding: 0
            }}>×</button>

            {/* Event Title */}
            <h2 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: 'white',
              marginBottom: '8px',
              fontFamily: 'Manrope, sans-serif',
              textAlign: 'center',
              width: '100%'
            }}>{eventDetailsModal.title}</h2>
            <p style={{
              fontSize: '14px',
              color: '#4a9eff',
              marginBottom: '25px',
              textAlign: 'center',
              fontWeight: '600'
            }}>{eventDetailsModal.date}</p>

            {/* 3D Carousel */}
            <div style={{
              position: 'relative',
              height: '280px',
              marginBottom: '40px',
              perspective: '1000px',
              flexShrink: 0
            }}>
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {(() => {
                  const totalImages = eventDetailsModal.images.length;
                  const visibleImages = [];
                  
                  for (let i = -1; i <= 1; i++) {
                    const index = (carouselIndex + i + totalImages) % totalImages;
                    visibleImages.push({ img: eventDetailsModal.images[index], offset: i, index });
                  }
                  
                  return visibleImages.map(({ img, offset, index }) => (
                    <div key={index} style={{
                      position: 'absolute',
                      width: offset === 0 ? '380px' : '280px',
                      height: offset === 0 ? '240px' : '180px',
                      transform: `translateX(${offset * 320}px) translateZ(${offset === 0 ? '50px' : '0px'}) scale(${offset === 0 ? 1.1 : 0.9})`,
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      opacity: offset === 0 ? 1 : 0.6,
                      zIndex: offset === 0 ? 10 : 5,
                      borderRadius: '20px',
                      overflow: 'hidden',
                      boxShadow: offset === 0 ? '0 20px 40px rgba(0, 0, 0, 0.4)' : '0 10px 20px rgba(0, 0, 0, 0.2)'
                    }}>
                      <img src={img} alt={`Event ${index + 1}`} style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }} />
                    </div>
                  ));
                })()}
              </div>

              {/* Navigation Arrows */}
              <button onClick={prevSlide} style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'white',
                fontSize: '24px',
                zIndex: 20,
                transition: 'all 0.3s ease'
              }}>‹</button>
              <button onClick={nextSlide} style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'white',
                fontSize: '24px',
                zIndex: 20,
                transition: 'all 0.3s ease'
              }}>›</button>
            </div>

            {/* Event Details - No Box */}
            <div style={{
              flex: 1,
              overflow: 'auto',
              paddingRight: '10px'
            }} className='event-div'>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: 'white',
                marginBottom: '20px',
                fontFamily: 'Manrope, sans-serif',
                textAlign: 'center'
              }}>Event Highlights</h3>
              
              {eventDetailsModal.centerAlign ? (
                <div style={{
                  textAlign: 'center',
                  padding: '0 80px'
                }} className='para-padding'>
                  {eventDetailsModal.details.slice(0, 4).map((detail, index) => (
                    <p key={index} style={{
                      fontSize: '17px',
                      color: 'rgba(255, 255, 255, 0.85)',
                      lineHeight: '1.6',
                      marginBottom: '15px',
                      fontFamily: 'Manrope, sans-serif'
                    }}>
                      {detail}
                    </p>
                  ))}
                </div>
              ) : (
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  {eventDetailsModal.details.slice(0, 3).map((detail, index) => (
                    <li key={index} style={{
                      fontSize: '17px',
                      color: 'rgba(255, 255, 255, 0.85)',
                      lineHeight: '1.6',
                      marginBottom: '15px',
                      fontFamily: 'Manrope, sans-serif',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      maxWidth: '600px'
                    }}>
                      <span style={{
                        width: '12px',
                        height: '12px',
                        background: '#4a9eff',
                        borderRadius: '50%',
                        flexShrink: 0,
                        marginTop: '6px'
                      }}></span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
