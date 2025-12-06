import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import Header from '../components/Header';
import AboutUsFooter from './AboutUsFooter';
import './NewsletterPune.css';

function NewsletterPune() {
  const lenisRef = useRef(null);
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

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
    <div className="newsletter-pune-page">
      <Header />
      
      <div className="pune-content">
        <div className="pune-container">
          <div className="pune-spacer"></div>
          
          <h1 className="pune-main-title">Investza Pune: Evidence-Based Wealth Management in the City of Clarity.</h1>
          <h2 className="pune-subtitle">Why Investza Pune Brings Structured Wealth Management to Your Portfolio.</h2>

          <div className="pune-intro-section">
            <div className="pune-intro-image">
              <img src="https://investza.in/wp-content/uploads/Investza-Pune-Photos.webp" alt="Investza Pune Office" />
              <p className="pune-image-caption">Investza Pune Photos: Inside the New Office Launch</p>
            </div>
            
            <div className="pune-intro-text">
              <p>Investza Capital has arrived in Pune, not for expansion's sake, but because the need for structured, evidence-based wealth management in India has never been more real. Over the years, we've seen a clear pattern: people are investing, but few are aligning, reviewing, and compounding in sync with their life timelines.</p>
              
              <p>That gap — between investing and building wealth — is where Investza Capital operates. With its newest office in Pune, the firm brings its disciplined approach to a city known for thoughtfulness, clarity, and long-term vision. As a leading <strong>investment firm in Pune</strong>, Investza Capital bridges the distance between advice and action, offering a structured path to long-term financial clarity.</p>
            </div>
          </div>

          <h2 className="pune-section-title">The Case for Structured Wealth Management</h2>
          
          <p>In a market driven by trends and noise, India's investors need more than advice; they need frameworks. Investza Capital stands apart through <strong>evidence-based investing</strong>, <strong>structured investing</strong>, a data-driven portfolio advisory process, and transparent <strong>financial planning in India</strong>, built around real goals and timelines.</p>
          
          <p>Wealth, after all, isn't created by chance; it's created by structure.</p>
          <p>Here's how <strong>Investza Pune</strong> helps clients bridge that gap:</p>
          
          <ul className="pune-list">
            <li><strong>First-principles investing</strong> – Rooted in logic, not hype.</li>
            <li><strong>Data-backed asset allocation</strong> – Decisions powered by research, not emotion.</li>
            <li><strong>Periodic portfolio management Pune and reviews</strong> – Ensuring your strategy evolves with your life.</li>
            <li><strong>Transparent human advisory</strong> – Clarity over jargon, always.</li>
          </ul>

          <h2 className="pune-section-title">Why Pune Was the Natural Next Step</h2>
          
          <p>Pune is a city that rewards patience, precision, and long-term thinking – qualities that align seamlessly with Investza Capital's philosophy. From entrepreneurs and professionals to business families and first-generation wealth builders, Pune's investor community values depth over noise.</p>

          <table className="pune-table">
            <thead>
              <tr>
                <th>Pune's Strength</th>
                <th>How Investza Adds Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Long-term professionals</td>
                <td>Strategic goal alignment</td>
              </tr>
              <tr>
                <td>Business families</td>
                <td>Intergenerational wealth continuity</td>
              </tr>
              <tr>
                <td>Emerging wealth creators</td>
                <td>Disciplined portfolio frameworks</td>
              </tr>
              <tr>
                <td>Independent investors</td>
                <td>Transparent, data-backed decision-making</td>
              </tr>
            </tbody>
          </table>

          <p>By establishing <strong>Investza Pune</strong>, we aim to work closer with individuals and families who believe wealth should serve purpose, not ego.</p>

          <h3 className="pune-subsection-title">Technology Meets Advisory:</h3>
          
          <p>As part of its Pune expansion, <strong>Investza Capital</strong> integrates its proprietary digital platform into every client relationship.</p>
          
          <p>This integration combines analytics, tracking, and performance insights to give investors complete visibility into their portfolios, blending the precision of technology with the judgment of experienced advisors.</p>
          
          <p>Now, clients can:</p>
          <ul className="pune-list">
            <li>Track portfolio allocation and risk in real time</li>
            <li>Access review cycles and rebalancing updates</li>
            <li>Align investments to evolving life goals</li>
          </ul>
          
          <p>This synergy between structured advisory and intelligent tools sets <strong>Investza Pune</strong> apart in the world of modern <strong>financial planning and wealth management in Pune</strong>.</p>

          <div className="pune-gallery">
            <img src="https://investza.in/wp-content/uploads/Investza-Pune.webp" alt="Investza Pune Office" />
            <img src="https://investza.in/wp-content/uploads/Investza-Pune-Photos.webp" alt="Investza Pune Team" />
            <img src="https://investza.in/wp-content/uploads/Investza-Pune-Investnoox.webp" alt="Investza Technology Platform" />
          </div>

          <h2 className="pune-section-title">What Sets Investza Capital Apart</h2>
          
          <p>At <strong>Investza Capital</strong>, we're not here to sell products; we're here to build clarity. Every decision, allocation, and adjustment is grounded in deliberate thinking and data-driven rationale.</p>
          
          <p><strong>Our Core Differentiators</strong></p>
          <ul className="pune-list">
            <li><strong>Evidence-Based Allocation:</strong> Every asset decision is research-backed.</li>
            <li><strong>Goal-Linked Planning:</strong> Portfolios mirror your actual timelines and priorities.</li>
            <li><strong>Structured Review Systems:</strong> Regular, analytical portfolio reviews.</li>
            <li><strong>Transparent Advisory:</strong> No jargon, no opacity, only clarity.</li>
          </ul>
          
          <p>This structured, disciplined framework helps clients move beyond mere investing toward purposeful wealth building, the kind that sustains across decades and generations, leading to <strong>long-term wealth creation</strong>.</p>

          <img src="https://investza.in/wp-content/uploads/Investza-Pune-Photo.webp" alt="Investza Capital Pune Team" className="pune-full-image" />

          <h2 className="pune-section-title">The Bigger Picture: Building Enduring Wealth</h2>
          
          <p><strong>Investza Pune</strong> is not just another branch; it's step two in building a national practice dedicated to disciplined, intergenerational wealth management in India.</p>
          
          <p>As India's financial ecosystem evolves, investors need more than short-term returns; they need structure, insight, and continuity. Investza Capital, as a trusted investment firm in Pune, bridges that need through its integrated advisory approach, combining market expertise with human understanding.</p>
          
          <p>So if you're in Pune and find your portfolio growing but without direction, or if you seek clarity over complexity, now's the time to explore a different kind of wealth management conversation.</p>
          
          <p className="pune-quote"><strong>"If your money could talk — it would ask for Investza."</strong></p>
          
          <p><strong>Investza Capital</strong><br />Mumbai → Pune</p>

          <h2 className="pune-section-title">FAQs</h2>

          <div className="pune-faq-section">
            {[
              {
                question: "1. Where is Investza Capital's head office located?",
                answer: "Investza Capital's head office is based in Mumbai at 704A, 81 Crest, Linking Road, Santacruz (W). The Pune branch extends its expertise in structured wealth management to clients across Maharashtra."
              },
              {
                question: "2. What is Investza Pune?",
                answer: "Investza Pune is the Pune branch of Investza Capital, offering structured, evidence-based wealth management and long-term financial planning designed to align with individual goals and life timelines."
              },
              {
                question: "3. What services does Investza Pune provide?",
                answer: "The firm provides end-to-end wealth management, portfolio advisory, goal-linked financial planning, and periodic portfolio reviews — ensuring clarity, structure, and consistency in long-term wealth creation."
              },
              {
                question: "4. Who can benefit from Investza Pune?",
                answer: "Investza Pune caters to entrepreneurs, professionals, business families, and independent investors seeking transparent, disciplined, and data-driven financial advisory solutions."
              },
              {
                question: "5. How is Investza Pune different from other investment firms in Pune?",
                answer: "Unlike traditional advisors, Investza Pune follows an evidence-based and research-driven approach — focusing on goal alignment, structured portfolio management, and unbiased advice over product-selling."
              },
              {
                question: "6. What is the philosophy behind Investza Pune's wealth management approach?",
                answer: "Investza Pune believes wealth should serve purpose, not ego. Every plan is built around clarity, discipline, and sustainable value creation rather than short-term market trends."
              },
              {
                question: "7. Why was Pune chosen for Investza Capital's expansion?",
                answer: "Pune's investor community values patience, strategy, and long-term thinking — qualities that perfectly reflect Investza Capital's philosophy of structured and sustainable wealth growth."
              },
              {
                question: "8. How can I contact the Investza Pune team?",
                answer: "You can explore Investza Pune's services, view office photos, and reach the advisory team through the official website at www.investza.in."
              }
            ].map((faq, index) => (
              <div key={index} className={`pune-faq-item ${activeFaq === index ? 'active' : ''}`}>
                <button className="pune-faq-question" onClick={() => toggleFaq(index)}>
                  <span>{faq.question}</span>
                  <span className="pune-faq-icon">›</span>
                </button>
                <div className="pune-faq-answer">
                  <p>{faq.answer}</p>
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

export default NewsletterPune;
