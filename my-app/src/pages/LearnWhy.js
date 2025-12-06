import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Header from '../components/Header';
import AboutUsFooter from './AboutUsFooter';
import './LearnWhy.css';

gsap.registerPlugin(ScrollTrigger);

function LearnWhy() {
  const cardsRef = useRef([]);

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

  useEffect(() => {
    const cards = cardsRef.current;

    cards.forEach((card) => {
      if (!card) return;

      // Set initial state
      gsap.set(card, { opacity: 1, scale: 1, y: 0 });

      // Pin each card at 100px from top (50px header + 50px gap)
      ScrollTrigger.create({
        trigger: card,
        start: 'top 100px',
        end: '+=150vh', // Long fade duration
        pin: true,
        pinSpacing: false,
        scrub: 1.5, // Slower, more casual animation
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Fade out without moving - cards stay at 100px position
          gsap.to(card, {
            opacity: 1 - progress,
            scale: 1 - (progress * 0.05),
            y: 0,
            duration: 0,
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const cardData = [
    {
      title: 'Higher Exposure to Thematic Funds/High Allocation to Exciting Themes',
      description: 'Investors tend to get enticed by exciting themes like Defense, FinTech, Infra and EV, and end up with high allocation in those funds. Around 90-95% of thematic mutual funds underperformed Nifty 50 over the past year, according to Ace Equity data.',
      media: '/learnwhy_1.mp4',
      type: 'video',
    },
    {
      title: 'Risk-Averse Investors with Under-diversified portfolios',
      description: 'Investors tend to find it safer to invest in large cap or index funds and end up with a highly under-diversified portfolio, but the reality is active large-cap mutual funds, about 60-70%, tend to Underperform the benchmark indices like Nifty 50 or Nifty 100 in recent years.',
      media: '/learnwhy_2.mp4',
      type: 'video',
    },
    {
      title: 'Focused on timing of investments and fund selection rather than asset allocation',
      description: 'Most mutual fund investors tend to focus on exciting aspects like timing the markets and fund selection rather than smarter and well-suited asset allocation that has proven to be the differentiator and the leading factor in market beating returns',
      media: '/learnwhy_3.mp4',
      type: 'video',
    },
    {
      title: 'Not having a reliable advisor, financial planner or mutual fund distributor with expertise',
      description: 'Many investors are misled and fall prey to believing and acting like market experts and choose direct plans through trading applications, which leads to little to no oversight, no periodic reviews, lack of effective rebalancing and choosing funds based on past performance without any metric to gauge their future performance.',
      media: '/learnwhy_4.mp4',
      type: 'video',
    },
  ];

  return (
    <div className="learn-why-page">
      <Header />

      <div className="learn-why-content">
        <div className="cards-container">
          {cardData.map((card, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="scroll-card"
            >
              <div className="card-inner">
                <div className="card-content-left">
                  <h2 className="card-title">{card.title}</h2>
                  <p className="card-description">{card.description}</p>
                </div>
                <div className="card-content-right">
                  <div className="card-media-placeholder">
                    {card.type === 'video' ? (
                      <video
                        src={card.media}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="card-video"
                      />
                    ) : (
                      <img src={card.media} alt={card.title} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AboutUsFooter />
    </div>
  );
}

export default LearnWhy;
