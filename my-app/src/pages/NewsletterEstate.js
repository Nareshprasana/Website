import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Header from '../components/Header';
import AboutUsFooter from './AboutUsFooter';
import './NewsletterEstate.css';

function NewsletterEstate() {
  const lenisRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;
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
    <div className="newsletter-estate-page">
      <Header />
      
      <div className="estate-content">
        <div className="estate-container">
          <div className="estate-spacer"></div>
          
          <h1 className="estate-main-title">Why Estate Planning Matters in India?</h1>
          
          <div className="estate-intro">
            <p>Did you know? Over ₹88,000 crore worth of assets in India lie unclaimed, simply because people didn't plan their succession right.</p>
            
            <p>Estate planning and will writing aren't just for the wealthy; they're essential for every Indian family. Without them, legacies risk being lost to disputes, delays, and the system.</p>
            
            <p>The recent Investza webinar featuring Mr. Jatin Popat, founder of WillJini, reinforced how modern estate planning is the key to protecting your family's future in an ever-changing legal and financial landscape.</p>
          </div>

          <div className="estate-key-facts">
            <p>Estate planning is not just for the wealthy; it ensures that assets are managed, distributed, and protected according to your wishes, regardless of your wealth or background. Without a valid will or estate plan, your property can become entangled in lengthy legal battles and probate delays, especially given that Indian courts have over 3.7 crore pending cases, many related to property disputes.</p>
            
            <p>A staggering statistic highlights the urgency: only about 2–3% of Indians have written a will, yet over ₹50,000 crore remains unclaimed in banks and financial institutions due to missing wills and unplanned successions. Moreover, as India prepares for a $44.8 trillion wealth transfer in the coming decades, a robust estate plan is essential for smooth intergenerational wealth transmission.</p>
          </div>

          <div className="estate-image-section">
            <img src="https://investza.in/wp-content/uploads/image-7.png" alt="Importance of Estate Planning" className="estate-main-image" />
          </div>

          <h2 className="estate-section-title">Common Challenges and Myths</h2>
          
          <p>Many Indians assume that asset transfer will occur smoothly to their family by default, especially after listing nominees, but nominees are only caretakers—not legal heirs. Actual asset inheritance is dictated by personal laws and the Indian Succession Act, often leading to unintended beneficiaries. Additionally, taboos around discussing death or inheritance keep families from planning proactively, inviting costly and emotional disputes.</p>
          
          <p><strong>Common myths debunked by experts:</strong></p>
          <ul className="estate-list">
            <li>Estate planning is only for the elderly or the rich.</li>
            <li>Writing a will is complex, expensive, or should be done only when one is ill.</li>
            <li>Nominees automatically become heirs and can access assets freely.</li>
          </ul>

          <h3 className="estate-subsection-title">Benefits of Effective Estate Planning</h3>
          
          <p>A comprehensive estate plan provides:</p>
          <ul className="estate-list">
            <li><strong>Clarity:</strong> Everyone in the family knows the 'why' and 'how' behind asset distribution.</li>
            <li><strong>Continuity:</strong> Family trusts and councils preserve the legacy.</li>
            <li><strong>Control:</strong> The individual decides asset flow, values, and succession rules.</li>
          </ul>
          
          <p><strong>Key benefits include:</strong></p>
          <ul className="estate-list">
            <li>Asset protection for beneficiaries</li>
            <li>Minimizing legal disputes and tax liabilities</li>
            <li>Swift distribution to rightful heirs</li>
            <li>Financial security for dependents (children, elderly, special needs)</li>
            <li>Support for charitable causes via legacy trusts and donations</li>
          </ul>

          <h2 className="estate-section-title">How Investza and WillJini Are Solving the Problem</h2>
          
          <p>Recognizing these challenges, Investza has partnered with WillJini—a leader in digital succession solutions—to bring estate planning services to every Indian household. WillJini offers both physical and online will-writing platforms, helping individuals create legally compliant wills effortlessly, often in under 30 minutes, and making estate planning accessible to all.</p>
          
          <p><strong>With Investza, clients gain:</strong></p>
          <ul className="estate-list">
            <li>One-stop access to personalized estate planning, will drafting, and trust formation</li>
            <li>Guidance from experienced legal and financial professionals</li>
            <li>Digital solutions for secure document storage, updates, and executor services</li>
            <li>Real-world support (including webinars and education) for clients and their families</li>
          </ul>
          
          <p>Through our collaboration, Investza and <a href="https://www.willjini.com/" target="_blank" rel="noopener noreferrer">WillJini</a> are breaking traditional barriers by:</p>
          <ul className="estate-list">
            <li>Offering easy-to-understand educational resources and webinars led by experts like Mr. Jatin Popat</li>
            <li>Providing estate planning workshops and online tools</li>
            <li>Ensuring that India's financial and business families can seamlessly manage succession and legacy matters</li>
          </ul>

          <h2 className="estate-section-title">What Should Every Indian Do Next?</h2>
          
          <p>Estate planning is an ongoing process, not a one-time event. Families should review their estate plans every 3 years or after a major change (marriage, childbirth, inheritance, new assets, etc.). Consult with professionals and use trusted digital platforms to keep documents up-to-date.</p>
          
          <ul className="estate-list">
            <li>Start by assessing all assets (property, investments, insurance, digital assets).</li>
            <li>Define your goals (security for family, tax minimization, smooth transfer).</li>
            <li>Consult experts for legally valid documents (wills, trusts, powers of attorney).</li>
            <li>Update your plan regularly as circumstances change.</li>
          </ul>

          <div className="estate-statistics">
            <h3 className="estate-subsection-title">Key Statistics</h3>
            <ul className="estate-stats-list">
              <li>Only 2–3% of Indians have a will.</li>
              <li>Over ₹50,000 crore remains unclaimed due to missing documents.</li>
              <li>$44.8 trillion in Indian wealth will change hands over the coming decades.</li>
              <li>68% of India's wealthy are now considering formal estate plans.</li>
            </ul>
          </div>

          <div className="estate-charts">
            <div className="estate-chart">
              <img src="https://investza.in/wp-content/uploads/image-9.png" alt="Indians With Written Wills" />
              <p className="estate-chart-caption">Pie chart showing the percentage of Indians with and without written wills.</p>
            </div>
            
            <div className="estate-chart">
              <img src="https://investza.in/wp-content/uploads/image-11.png" alt="Unclaimed Wealth in India" />
              <p className="estate-chart-caption">Bar chart comparing unclaimed total assets and unclaimed bank or financial wealth in India.</p>
            </div>
            
            <div className="estate-chart">
              <img src="https://investza.in/wp-content/uploads/image-12.png" alt="Projected Wealth Transfer" />
              <p className="estate-chart-caption">Projected Intergenerational Wealth Transfer in India $44.8T, broken down into roughly $5 trillion segments.</p>
            </div>
          </div>

          <h2 className="estate-section-title">Investza's Commitment</h2>
          
          <p><a href="https://investza.in/" target="_blank" rel="noopener noreferrer">Investza</a> is committed to making estate planning simple, affordable, and accessible for every Indian. Our partnership with WillJini empowers you to take control of your legacy, protecting your loved ones and ensuring your wishes are respected, now and for generations to come.</p>
          
          <p>Missed our estate planning webinar with Mr. Jatin Popat? Watch the full session here:</p>
          
          <div className="estate-video">
            <iframe 
              width="100%" 
              height="450" 
              src="https://www.youtube.com/embed/BqcNTpl-mN4" 
              title="₹88,000 Cr lies unclaimed in India! Learn how proper Will & Estate Planning can protect your family."
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>

          <h2 className="estate-section-title">Conclusion</h2>
          
          <p>To conclude, estate planning and will writing are not just about dividing assets; they are about ensuring peace of mind, protecting loved ones, and preserving one's legacy. In India, where family and wealth often intertwine, taking timely legal steps can prevent future disputes and safeguard your intentions. Whether you are just starting your career or planning retirement, creating a clear estate plan today lays the foundation for financial security and harmony tomorrow.</p>
        </div>
      </div>

      <AboutUsFooter />
    </div>
  );
}

export default NewsletterEstate;
