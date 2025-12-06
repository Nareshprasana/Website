import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from 'lenis';
import Header from '../components/Header';
import AboutUsFooter from './AboutUsFooter';
import "./FAQPage.css";

gsap.registerPlugin(ScrollTrigger);

function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

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

    const handleScroll = () => {
      const scrollY = lenis.scroll;
      const header = document.querySelector('.header');
      const heroSection = document.querySelector('.faq-hero');
      const contentSection = document.querySelector('.faq-content-section');
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
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-heading",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".faq-arrow-stack .faq-arrow",
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          delay: 0.5,
          ease: "power2.out",
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const scrollToFAQ = () => {
    const section = document.getElementById("faq-content-section");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // FAQ data - 22 placeholders for manual content input
  const faqData = [
    {
      question: "What is Investza?",
      answer: "Investza is a wealth management company founded in 2015 by a team that has previously managed over Rs. 10,000 crores of assets. We enable you to invest in customized investment solutions that help you create wealth, preserve it and achieve your financial goals; all with optimized taxation."
    },
    {
      question: "What investment services are offered by Investza?",
      answer: "Investza Capital (trademark INVESTZA) offers tailored portfolios under the flagship program known as SPM (Systematic Portfolio Management). Investza Capital is registered with the Association of Mutual Funds of India (AMFI) with Registration No. (ARN) – 154125."
    },
    {
      question: "How do I invest with Investza?",
      answer: "Getting started with Investza is simple. Just schedule a call with our investment expert strategists who will understand your financial goals, risk appetite and timeline. Based on this, we design a personalized investment recommendation tailored specifically for you. No generic plans — only strategies that align with your unique objectives. To get on a call with one of our experts, dial +918655 44 7057, schedule a call on our website using our scheduler or drop us an email at hello@investza.in with subject as “Schedule a Review”."
    },
    {
      question: "What is the minimum amount required to invest with Investza?",
      answer: "Investing with Investza has no boundaries or limitation and we do not gatekeep our services to any specific category of clients. We offer our services to all our valuable clients across every walk of life. However, Investza offers customized portfolios through SPM (Systematic Portfolio Management) with a minimum investment requirement of ₹50,000."
    },
    {
      question: "What is Investza’s Wealth Tracker?",
      answer: "Wealth Tracker is a free-of-cost, advertisement free and secure portfolio review tool developed by Investza’s dynamic Information Technology team to help you identify underperforming schemes in your mutual fund portfolio along with a detailed analysis and X-Ray of your current mutual fund holdings. The app analyses your portfolio’s risk level, diversification, underperforming funds and your investing discipline. Download the app on Android | iOS store.(Please note: The application is currently in Beta Open Testing stage and your feedback is pleasantly welcome Any priceless feedback is appreciated and we will work towards meeting your expectations. Feel free to drop us your feedback at support@investza.in or message us on WhatsApp at +918655447057)"
    },
    {
      question: "Why should I trust Investza with my money?",
      answer: "If you choose to invest with Investza, your money will be managed by a team of experts (CA’s, CFA’s and MBA’s) who have 10+ years of experience in the investment industry and have previously managed over Rs. 10,000 crore of assets. You can trust experts at Investza, unconcerned, to manage your hard-earned savings and investments well."
    },
    {
      question: "Is it safe to invest money with Investza?",
      answer: "Yes, it is safe to invest with Investza. We use advanced encryption with multilayer SSL certification, DDoS protection and multiple data security measures to keep your private and sensitive data secure and away from nefarious malefactors. Your money and investments are held with a third-party custodian and you are always the rightful owner of the investments, as it should be."
    },
    {
      question: "What is the process for completing full KYC on Investza?",
      answer: "The KYC process with Investza is quick and easy. You can get in touch with our representative and provide your documents to complete the KYC process. You can reach out to the Investza team (hello@investza.in) in case a partial or e-KYC and would like to complete the KYC process effortlessly. If full KYC is not completed, then our team will get in touch with you to complete the same."
    },
    {
      question: "What types of portfolios does Investza offer?",
      answer: "Our flagship SPM offering provides customized portfolios that can match your risk profile and investment goals tailored specifically for you and your family."
    },
    {
      question: "How can I contact Investza for support?",
      answer: "Our support team can be reached through the ‘Help’ section on the Investza App. You can also reach us via email (support@investza.in) or by phone +917977152156."
    },
    {
      question: "What should I do if my payment is debited but not reflected on Investza?",
      answer: "Some investments are not allotted in real time and can take up to 3 working days to be allotted. We request you wait for a couple of days to start seeing your investments. Support is always available at (hello@investza.in) and +917977152156."
    },
    {
      question: "What is the company name of Investza?",
      answer: "IInvestza is operated and managed by Investza Capital with registered ARN – 154125."
    },
    {
      question: "Where is Investza located?",
      answer: "We have our office in Mumbai at Santacruz West, Linking Road and in Pune at Viman Nagar and you are welcome to visit our office at your convenience. It is highly recommended to schedule an appointment with us to streamline your visit and provide you with a smooth and pleasant experience."
    },
    {
      question: "How much does Investza charge for its services?",
      answer: "For Strategic Portfolio Management (SPM), we don‘t charge anything. We have an interesting business model which is beneficial for you as a client and us as a service provider. We explain such questions in our one-on-one meetings, which we hope to have with you soon."
    },
    {
      question: "What happens to my money if Investza goes bankrupt/out-of-business?",
      answer: "Investza is confident that such a situation would never arise in the foreseeable future due to our robust business model and client relations which we have nurtured over the years with our personalized approach. However, in an unforeseen circumstance as such, hypothetically; Investza helps you invest your money in the right way. The money is either invested in safe investments with your title or kept with a third-party custodian. In case of Investza’s bankruptcy, your money is never affected and you can effectively manage it or withdraw it from websites of mutual fund companies or the third-party custodian."
    },
    {
      question: "What are the risks involved in investing?",
      answer: "Investing involves various risks like, but not limited to, market risk, credit risk, liquidity risk and loss of capital risk. However, investing with the right risk management helps minimize these risks. Investors are urged to read the risk factors in the respective offer documents before investing. Experts at Investza emphasize on risk awareness and risk management over and above any other factor related to investing. This builds stronger confidence for our valuable clients who can then make informed and strategic decisions based on market movements and uncertainties."
    },

    {
      question: "How can I track the performance of my investments with Investza?",
      answer: "Investza’s “Wealth Tracker” app (Android app | iOS app) can help you track your investments on your mobile device. Download it from the respective application store as per your device and enjoy the deep dive into your investment portfolio; free of cost, secure with data privacy and no advertisement."
    },
    {
      question: "Can I meet the Investza investment team before investing my money?",
      answer: "We would love to meet you too and build a relationship before we begin your investment journey with us at Investza. We have our office in Mumbai and Pune and you are always welcome to visit our office. It is recommended to schedule an appointment beforehand to have a pleasant experience with Investza and the team."
    },
    {
      question: "Who are the key people at Investza?",
      answer: "CA Abhishek Mehta, CFA, is the principal officer, chief strategist and one of the co-founders of Investza. Pooja Chandgothia is an investment specialist experienced with different asset classes, chief executive officer and the co-founder of Investza. Varun Vinayan is the Principal Wealth Manager, Product head and Vice President at Investza. Our core investment team is supported by more than a dozen investment specialists and the co-founders always ready to assist you at all times."
    },
    {
      question: "How often is my portfolio reviewed by the portfolio managers?",
      answer: "Our portfolio managers and experts are working round the clock to optimize your portfolio. Our active monitoring system using institutional grade research ensures that we are proactive in making changes to your portfolio as and when our investment thesis and market outlook change."
    },
    {
      question: "Is there a limit to the number of portfolios I can have with Investza?",
      answer: "Frankly? Yes. To keep your portfolio manageable, you may only invest in one customized portfolio through our services. You can reach out to us for any additional specific needs or if you require an additional customized portfolios in special case scenarios. We like to have a flexible approach towards our clients and we value their requirements as needed."
    }
  ];

  return (
    <div className="faq-page">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="faq-hero"
        style={{
          backgroundImage: `url(/team/newsletter_hero.jpeg?v=${Date.now()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="faq-hero-content">
          <h1 className="faq-heading">FAQ</h1>
        </div>
        <div
          className="faq-arrow-stack"
          onClick={scrollToFAQ}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && scrollToFAQ()}
          aria-label="Scroll to FAQ section"
        >
          <ChevronDown className="faq-arrow fa1" />
          <ChevronDown className="faq-arrow fa2" />
          <ChevronDown className="faq-arrow fa3" />
        </div>
      </section>

      {/* FAQ Content Section */}
      <section id="faq-content-section" className="faq-content-section">
        <div className="faq-container">
          <div className="faq-intro">
            <h2>Frequently Asked Questions</h2>
            <p>Find answers to common questions about our services, investment process, and how we can help you achieve your financial goals.</p>
          </div>

          <div className="faq-list">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${openIndex === index ? 'active' : ''}`}
              >
                <button 
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`faq-icon ${openIndex === index ? 'rotated' : ''}`} />
                </button>
                <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-contact-cta">
            <h3>Still have questions?</h3>
            <p>Our team is here to help. Get in touch with us for personalized assistance.</p>
            <a href="/contact" className="faq-cta-button">Contact Us</a>
          </div>
        </div>
      </section>

      <AboutUsFooter />
    </div>
  );
}

export default FAQPage;
