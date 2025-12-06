import { useEffect } from 'react';
import Lenis from 'lenis';
import Header from '../components/Header';
import AboutUsFooter from './AboutUsFooter';
import './Disclaimer.css';

function Disclaimer() {
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
      const heroSection = document.querySelector('.disclaimer-hero');
      const contentSection = document.querySelector('.disclaimer-content');
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
    <div className="disclaimer-page">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="disclaimer-hero"
        style={{
          backgroundImage: `url(/team/newsletter_hero.jpeg?v=${Date.now()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="disclaimer-hero-overlay"></div>
        <div className="disclaimer-hero-content">
          <h1>Disclaimer</h1>
        </div>
      </section>
      
      <div className="disclaimer-content">
        <div className="disclaimer-container">
          
          <div className="disclaimer-text">
            <h2>Interpretation and Definitions</h2>
            
            <h3>Interpretation</h3>
            <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
            
            <h3>Definitions</h3>
            <p>For the purposes of this Disclaimer:

<ul className="disclaimer-definitions">
            <li>
              <strong>Company</strong> (referred to as either “the Company”, “We”, “Us” or “Our” in this Disclaimer) refers to INVESTZA CAPITAL, 81 Crest, 704 A, Linking Rd, Santacruz (West), Mumbai, Maharashtra 400054.
            </li>
            <li>
              <strong>Service</strong> refers to the Website or the Application or both.
            </li>
            <li>
              <strong>You</strong> means the individual accessing the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
            </li>
            <li>
              <strong>Website</strong> refers to Investza.in, accessible from <a href="https://investza.in/">https://investza.in/</a>
            </li>
            </ul>
          </p>
            
            <h3>Disclaimer</h3>
            <p>The information contained on the Service is for general information purposes only.<br></br>
            <br></br>
                The Company assumes no responsibility for errors or omissions in the contents of the Service.<br></br>
                <br></br>
                The Company does not endorse or promote any of the opportunities that appear on this website nor makes any recommendations regarding the same to any user of the website. Listing of details of various assets/securities may be arranged/referred and/or owned by the Company. None of the details provided herein should be construed as an offer by the Company to sell, solicit or make an offer to participate in the opportunities. The Company does not provide or offer any business advice, investment advice, tax advice or legal advice to anyone using this website. Under no circumstances should any person make investment decisions based solely on the information provided on this website. Any trademarks/symbols used in this website are included solely for informational purposes and are owned by their respective trademark owner.<br></br>
                <br></br>
                In no event shall the Company be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service or the contents of the Service. The Company reserves the right to make additions, deletions, or modifications to the contents on the Service at any time without prior notice. <br></br>
                <br></br>
                The Company does not warrant that the Service is free of viruses or other harmful components.<br></br>
                <br></br>
                Investments in securities are inherently speculative and involve a significant degree of risk, including the potential loss of the entire invested capital. Such investments are appropriate solely for sophisticated investors who possess the requisite knowledge, experience, and financial capacity to evaluate and bear these risks, have a comprehensive understanding of the investment, and have thoroughly reviewed the Information Memorandum. The Company makes no representation or warranty, express or implied, that any investor will achieve their investment objectives or recover all or any portion of their invested capital.<br></br>
                <br></br>
                The Company further makes no representation, warranty, or guarantee as to the quality, accuracy, completeness, performance, or fitness of any alert, article, view, video, information, advice, tool, calculator, analysis, report, data, content news, price, statistic, comment, feedback, advertisement, etc., provided on, or through this website. The details of assets/securities, information, reports and services provided on/through this website are for general guidance and information purposes only, and they do not, in any manner, indicate any assurance or opinion whatsoever. The information, reports and services are dependent on various assumptions, individual preferences, and other factors. Thus, the results or analyses cannot be construed to be entirely accurate and should not be solely relied on for making investment decisions. The users of the platform shall make their own independent investment/financial decision at their own discretion based on their independent research and evaluation.<br></br>
                <br></br>
                The user(s) of this website expressly acknowledge and agree that any use of the information, content or materials provided on the application and website operated by Investza Capital ( the “Company” ) and Wealth Tracker ( the “Platform” ) and any investment or investment-related decision made in reliance thereon, shall be at the user’s sole risk, discretion and judgment. Materials published in the Company’s newsletters, blogs and social media channels (including, without limitation, FAQs, blog posts and content on Facebook, Twitter, Instagram and YouTube) are provided solely for general informational and educational purposes and do not constitute investment, financial, legal, tax or other professional advice. Content appearing on the Company’s social media channels may reflect the personal views or opinions of individual contributors and does not necessarily reflect the views, policies or endorsement of the Company. Nothing on the Platform shall be construed as an offer, solicitation or recommendation to buy or sell any security in India or elsewhere. Users should obtain independent professional advice and, where applicable, consider the requirements and regulations under Indian law (including regulations administered by the Securities and Exchange Board of India) prior to making any investment decisions.</p>
            
            <h3>Performance Indicator Disclaimer</h3>
            <p>The user(s) of this website understand and acknowledge that past performance is not indicative of future results and there can be no assurance that the arrangement described herein will achieve its goals. Certain information contained herein constitutes “forward looking statements” which can be identified by the use of forward-looking terminology, because of various risks and uncertainties, actual events or results or actual performance may differ materially from the events, results or performance reflected or contemplated in such forward-looking statements. As a result, the user of the platform should not rely on such forward-looking statements.<br></br>
            <br></br>
            The Company uses the Nifty 500 Index (the “Benchmark”) as the reference index for portfolio comparisons presented on the Platform. Benchmark comparisons are based on third-party data and methodologies that are believed to be reliable but are provided ‘as is’ and without warranty of any kind. Benchmark comparisons do not account for individual User circumstances (including, without limitation, taxes, fees, timing of investments, and liquidity constraints) and should not be relied upon as the sole basis for investment decisions. No assurance is given that the Benchmark is the most appropriate comparator for any User’s portfolio.</p>
            
            <h3>External Links Disclaimer</h3>
            <p>The Service may contain links to external websites that are not provided or maintained by or in any way affiliated with the Company.<br></br>
            <br></br>
            Please note that the Company does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.</p>
            
            <h3>Errors and Omissions Disclaimer</h3>
            <p>The information given by the Service is for general guidance on matters of interest only. Even if the Company takes every precaution to ensure that the content of the Service is both current and accurate, errors can occur. Plus, given the changing nature of laws, rules and regulations, there may be delays, omissions or inaccuracies in the information contained on the Service.<br></br>
            <br></br>
            The Company is not responsible for any errors or omissions, or for the results obtained from the use of this information.</p>
            
            <h3>Fair Use Disclaimer</h3>
            <p>The Company may use copyrighted material which has not always been specifically authorized by the copyright owner. The Company is making such material available for criticism, comment, news reporting, teaching, scholarship, or research.<br></br>
            <br></br>
            The Company believes this constitutes a “fair use” of any such copyrighted material as provided for in section 107 of the United States Copyright law.<br></br>
            <br></br>If You wish to use copyrighted material from the Service for your own purposes that go beyond fair use, You must obtain permission from the copyright owner.</p>
            
            <h3>Views Expressed Disclaimer</h3>
            <p>The Service may contain views and opinions which are those of the authors and do not necessarily reflect the official policy or position of any other author, agency, organization, employer or company, including the Company.<br></br>
            <br></br>Comments published by users are their sole responsibility and the users will take full responsibility, liability and blame for any libel or litigation that results from something written in or as a direct result of something written in a comment. The Company is not liable for any comment published by users and reserves the right to delete any comment for any reason whatsoever.</p>
            
            <h3>No Responsibility Disclaimer</h3>
            <p>The information on the Service is provided with the understanding that the Company is not herein engaged in rendering legal, accounting, tax, or other professional advice and services. As such, it should not be used as a substitute for consultation with professional accounting, tax, legal or other competent advisers.<br></br>
            <br></br>In no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever arising out of or in connection with your access or use or inability to access or use the Service.</p>
            
            <h3>Use at Your Own Risk" Disclaimer</h3>
            <p>All information in the Service is provided “as is”, with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information, and without warranty of any kind, express or implied, including, but not limited to warranties of performance, merchantability and fitness for a particular purpose.<br></br>
            <br></br>
            The Company will not be liable to You or anyone else for any decision made or action taken in reliance on the information given by the Service or for any consequential, special or similar damages, even if advised of the possibility of such damages.</p>
            
            <h3>Contact Us</h3>
            <p>If you have any questions about this Disclaimer, You can contact Us:<br></br>
            <br></br>
            By email: support@investza.in<br></br>
            <br></br>
            By visiting this page on our website: <a href="https://investza.in/contact">https://investza.in/contact</a></p>
          </div>
        </div>
      </div>

      <AboutUsFooter />
    </div>
  );
}

export default Disclaimer;
