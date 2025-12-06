import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Lenis from 'lenis';
import Header from '../components/Header';
import AboutUsFooter from './AboutUsFooter';
import NewsletterPune from './NewsletterPune';
import NewsletterEstate from './NewsletterEstate';
import NewsletterRBI from './NewsletterRBI';
import NewsletterGRCTC from './NewsletterGRCTC';
import NewsletterWealth from './NewsletterWealth';
import './NewsletterDetail.css';

// Page 1 assets
const imgImage11 = "https://www.figma.com/api/mcp/asset/3a500cd4-3114-4e26-b454-2e10d98e2aaa";
const imgLine10 = "https://www.figma.com/api/mcp/asset/ffeda842-f55e-460b-9a76-5cd8b3e95adb";
const imgLine14 = "https://www.figma.com/api/mcp/asset/cff2b602-90d7-48c0-872b-c0a9848c7187";
const imgLine11 = "https://www.figma.com/api/mcp/asset/45160b97-ed57-4fcf-b7f1-006cd24630f4";
const imgZr30Cls69 = "https://www.figma.com/api/mcp/asset/23927b91-e533-426c-8e05-fafe1bdd6f97";
const imgZr30Cls70 = "https://www.figma.com/api/mcp/asset/3a53f3a5-9dc7-47ae-8d9e-fa4bab85f079";

// Page 2 assets
const imgImage12 = "https://www.figma.com/api/mcp/asset/eecb7524-1c56-4df9-9aaf-be5b8bab834e";
const imgImage15 = "https://www.figma.com/api/mcp/asset/2e465569-7fd2-42f8-8ed1-fb06bd2c42db";
const imgLine15 = "https://www.figma.com/api/mcp/asset/ffeda842-f55e-460b-9a76-5cd8b3e95adb";
const imgLine23 = "https://www.figma.com/api/mcp/asset/ffeda842-f55e-460b-9a76-5cd8b3e95adb";

// Page 3 assets
const imgImage8 = "https://www.figma.com/api/mcp/asset/3bbc0b67-1c85-49e8-a5cb-f8e62c8d4d2b";
const imgLine16 = "https://www.figma.com/api/mcp/asset/ffeda842-f55e-460b-9a76-5cd8b3e95adb";
const imgLine18 = "https://www.figma.com/api/mcp/asset/ffeda842-f55e-460b-9a76-5cd8b3e95adb";
const imgVector = "https://www.figma.com/api/mcp/asset/ffeda842-f55e-460b-9a76-5cd8b3e95adb";
const imgVector1 = "https://www.figma.com/api/mcp/asset/ffeda842-f55e-460b-9a76-5cd8b3e95adb";
const imgMynauiRupee = "https://www.figma.com/api/mcp/asset/ffeda842-f55e-460b-9a76-5cd8b3e95adb";

function NewsletterDetail() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
    });
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

  // Route to specific newsletter pages based on ID
  if (id === '2') {
    return <NewsletterPune />;
  }
  
  if (id === '3') {
    return <NewsletterEstate />;
  }
  
  if (id === '4') {
    return <NewsletterRBI />;
  }
  
  if (id === '5') {
    return <NewsletterGRCTC />;
  }
  
  if (id === '6') {
    return <NewsletterWealth />;
  }
  
  // For other IDs, show the default newsletter layout
  if (id !== '1') {
    return <Navigate to="/newsletter" replace />;
  }

  return (
    <div className="newsletter-detail-page">
      <Header />
      <div className="nd-wrapper">
        <div className="nd-frame">
          {/* Top horizontal line */}
          <div className="nd-line-top">
            <img src={imgLine10} alt="" />
          </div>
          
          {/* Small decorative line under headline */}
          <div className="nd-line-small">
            <img src={imgLine14} alt="" />
          </div>
          
          {/* Newsletter title */}
          <p className="nd-title">Newsletter</p>
          
          {/* Left vertical line */}
          <div className="nd-vline-left">
            <img src={imgLine11} alt="" />
          </div>
          
          {/* Right vertical line */}
          <div className="nd-vline-right">
            <img src={imgLine11} alt="" />
          </div>
          
          {/* Date */}
          <p className="nd-date">Thursday , August 28 ,<br></br>2025</p>
          
          {/* Edition */}
          <p className="nd-edition">Edition 1</p>
          
          {/* Page number */}
          <p className="nd-page">1</p>
          
          {/* Bottom horizontal line */}
          <div className="nd-line-bottom">
            <img src={imgLine10} alt="" />
          </div>
          
          {/* Headline */}
          <p className="nd-headline">July 2025 Market Update: Inflation Hits Lowest Level Since 2017</p>
          
          {/* Bar chart */}
          <div className="nd-chart">
            <img src={imgZr30Cls69} alt="" className="nd-chart-img" />
            <img src={imgZr30Cls70} alt="" className="nd-chart-img" />
          </div>
          
          {/* Chart caption */}
          <p className="nd-chart-caption">States with more than 50 lakhs population as per census 2011</p>
          
          {/* Main image */}
          <div className="nd-image">
            <img src={imgImage11} alt="" />
          </div>
          
          {/* Blue highlight box */}
          <div className="nd-highlight-box">
            <p>Lower inflation boosts hopes for an interest rate cut by the Reserve Bank of India.</p>
          </div>
          
          {/* First paragraph with drop cap */}
          <p className="nd-text-1">
            <span className="nd-dropcap">I</span>
            <span className="nd-text-content">nflation in July 2025 fell sharply, bringing welcome relief. India's headline CPI eased to 1.55%, its lowest since 2017, while food inflation declined further into negative territory at </span>
          </p>
          
          {/* Second paragraph */}
          <div className="nd-text-2">
            <p>–1.76%. Rural areas saw a sharper dip, with food inflation at –1.74%, while urban inflation moderated to 2.05%. Housing inflation remained stable at 3.17%. This marks a turning point, especially as food inflation is at its lowest since 2019. The accompanying graph of CPI & CFPI trends highlights this steady decline.</p>
          </div>
          
          {/* Third paragraph */}
          <p className="nd-text-3">Globally, inflationary trends diverged. In the U.S., tariff-driven costs pushed consumer prices higher, while Europe hit the ECB's 2% target for the first time in four years. Japan, by contrast, continued to face elevated inflation above 3%. Across Asia ex-Japan, inflation pressures were softer, giving some room for policymakers to hold interest rates steady. The state-wise inflation chart further reveals the uneven picture within India, where certain regions still faced higher price pressures.</p>
          
          {/* Fourth paragraph */}
          <p className="nd-text-4">Currency markets were volatile. The U.S. dollar weakened by 10.7% in the first half of 2025, its worst performance in over 50 years, dragged by slower growth, policy uncertainty, and global capital reallocation. Despite this, the dollar's role as the world's primary reserve currency remains intact, even as its share of central bank holdings gradually declines. The Indian Rupee, however, was among Asia's weakest currencies, pressured by renewed U.S. tariff threats. Donald Trump's proposed 25% tariff on Indian exports soured sentiment, pushing </p>
        </div>

        {/* PAGE 2 */}
        <div className="nd-frame nd-frame-2">
          {/* Top horizontal line */}
          <div className="nd2-line-top">
            <img src={imgLine10} alt="" />
          </div>
          
          {/* Date */}
          <p className="nd2-date">Thursday , August 28 , 2025</p>
          
          {/* Edition */}
          <p className="nd2-edition">Edition 1</p>
          
          {/* Page number */}
          <p className="nd2-page">2</p>
          
          {/* Bottom horizontal line */}
          <div className="nd2-line-bottom">
            <img src={imgLine10} alt="" />
          </div>
          
          {/* Small decorative line */}
          <div className="nd2-line-small">
            <img src={imgLine15} alt="" />
          </div>
          
          {/* Text paragraph 1 - top left */}
          <p className="nd2-text-1">the Rupee near record lows. Indian equities also reacted negatively, with the Nifty 50 falling 0.9% immediately after the announcement.</p>
          
          {/* Text paragraph 2 - left middle */}
          <p className="nd2-text-2">On the positive side, India's external buffers strengthened. Forex reserves rose to $698 billion, supported by gains in foreign currency assets and a surge in gold reserves. This resilience offers a cushion against volatility in capital flows and trade shocks.</p>
          
          {/* Text paragraph 3 - left lower */}
          <p className="nd2-text-3">Agriculture provided another bright spot. The Kharif sowing season began strongly, aided by a timely and abundant monsoon, with rainfall exceeding the average by 15%. Paddy planting is up 7.4% compared to last year, while wheat procurement has already surpassed previous records. Global agencies forecast a bumper rice harvest in 2025–26, driven by strong output in India, Bangladesh, Pakistan, and Vietnam. This abundance will keep global rice prices subdued, favouring buyers but weighing on exporters. The crop forecast table from FAO, USDA, and BMI illustrates this trend clearly.</p>
          
          {/* Text paragraph 4 - bottom left */}
          <p className="nd2-text-4">Markets, however, remained under pressure. The Nifty and Sensex both declined nearly 3% during July, dragged by underwhelming earnings. Infosys' weak results hit the IT sector hard, pulling the index down more than 2% in a day. Broader indices also weakened, while Pharma, Healthcare, and FMCG stood out as relative outperformers. </p>
          
          {/* Text paragraph 5 - top right */}
          <p className="nd2-text-5">Consumer Durables and Auto underperformed, slipping by almost 1%. The market performance chart captures this divergence across sectors.</p>
          
          {/* Blue header bar for table with titles inside */}
          <div className="nd2-table-header">
            <span className="nd2-th-index">INDEX</span>
            <span className="nd2-th-date1">01-JULY-2025</span>
            <span className="nd2-th-date2">31-JULY-2025</span>
            <span className="nd2-th-return">RETURN(%)</span>
          </div>
          
          {/* Table vertical lines */}
          <div className="nd2-table-vline nd2-table-vline-1">
            <img src={imgLine23} alt="" />
          </div>
          <div className="nd2-table-vline nd2-table-vline-2">
            <img src={imgLine23} alt="" />
          </div>
          <div className="nd2-table-vline nd2-table-vline-3">
            <img src={imgLine23} alt="" />
          </div>
          
          {/* Image 12 - market chart */}
          <div className="nd2-image-12">
            <img src={imgImage12} alt="" />
          </div>
          
          {/* Image 15 - agriculture photo */}
          <div className="nd2-image-15">
            <img src={imgImage15} alt="" />
          </div>
          
          {/* Text paragraph 6 - right middle */}
          <p className="nd2-text-6">Despite weakness in secondary markets, primary market activity was vibrant. July witnessed 13 SME IPOs, including HDB Financial Services and Anthem Biosciences, with most issues oversubscribed. Investor enthusiasm for new listings remained strong, underscoring appetite for growth companies with robust fundamentals.</p>
          
          {/* Text paragraph 7 - right bottom */}
          <p className="nd2-text-7">On the global stage, the U.S. economy offered mixed signals. Q2 GDP expanded by 3% annualized, but underlying demand was weaker, job growth slowed, and wage gains moderated. Markets now price an 80% chance of a Fed rate cut in September. Europe saw inflation stabilize at target, though growth remained muted. Japan entered a fragile phase, facing weaker exports and political setbacks. Asia ex-Japan displayed divergence: export-heavy economies like South Korea and Taiwan slowed, while domestic demand-driven markets such as India, Indonesia, and the Philippines remained </p>
        </div>

        {/* PAGE 3 */}
        <div className="nd-frame nd-frame-3">
          {/* Top horizontal line */}
          <div className="nd3-line-top">
            <img src={imgLine10} alt="" />
          </div>
          
          {/* Date */}
          <p className="nd3-date">Thursday , August 28 , 2025</p>
          
          {/* Edition */}
          <p className="nd3-edition">Edition 1</p>
          
          {/* Page number */}
          <p className="nd3-page">3</p>
          
          {/* Bottom horizontal line */}
          <div className="nd3-line-bottom">
            <img src={imgLine10} alt="" />
          </div>
          
          {/* Small decorative line */}
          <div className="nd3-line-small">
            <img src={imgLine15} alt="" />
          </div>
          
          {/* Text paragraph 1 - top left */}
          <p className="nd3-text-1">resilient. The IMF also upgraded China's growth forecast to 4.8% on signs of stabilizing sentiment.</p>
          
          {/* Text paragraph 2 - left middle */}
          <p className="nd3-text-2">Together, the inflation, currency, reserves, market, and sectoral graphs/tables from the RBI and global agencies capture a month of contrasts: easing inflation, volatile currencies, resilient agriculture, weak equity earnings, and buoyant IPO markets. July 2025 highlights both challenges and opportunities for investors navigating an evolving global and domestic landscape.</p>
          
          {/* Large blue box with Trump tariff news */}
          <div className="nd3-blue-box">
            <p className="nd3-blue-headline">Trump Imposes 50% Tariffs on Indian Goods Starting August 27</p>
            <div className="nd3-trump-image">
              <img src={imgImage8} alt="" />
            </div>
            <p className="nd3-blue-text-1">Effective August 27th, the Trump administration has introduced a new wave of tariffs, signaling a tougher stance on global trade. These measures are likely to affect key sectors such as manufacturing, technology, and consumer goods, leading to potential cost increases and disruptions </p>
            <p className="nd3-blue-text-2">across supply chains. For investors, this development may trigger short-term volatility in equity markets, particularly in companies with significant international exposure. However, it also presents an opportunity to reassess portfolios, identify resilient sectors, and align investments with shifting trade dynamics. Staying informed and agile will be crucial as markets react to these changes.</p>
            <div className="nd3-quote-container">
              <div className="nd3-quote-mark-open">❝</div>
              <p className="nd3-quote">For too long, other countries have taken advantage of American workers and businesses. Starting August 27th, that ends — tariffs are back, and America comes first.</p>
              <div className="nd3-quote-mark-close">❞</div>
            </div>
            <p className="nd3-quote-author">– Donald Trump</p>
          </div>
          
          {/* Section title */}
          <p className="nd3-section-title">Top gainers and losers in the month of July</p>
          <p className="nd3-gainers-label">TOP GAINERS</p>
          <p className="nd3-losers-label">TOP LOSERS</p>
          
          {/* Gainers */}
          <div className="nd3-gainer-item" style={{top: '281px'}}>
            <div className="nd3-gainer-name-box">Eternal</div>
            <div className="nd3-gainer-percent-box">16.52%</div>
          </div>
          <div className="nd3-gainer-item" style={{top: '302px'}}>
            <div className="nd3-gainer-name-box nd3-small-text">Hindustan Unilever</div>
            <div className="nd3-gainer-percent-box">9.88%</div>
          </div>
          <div className="nd3-gainer-item" style={{top: '322px'}}>
            <div className="nd3-gainer-name-box nd3-small-text" style={{height: '21px'}}>Apollo Hospitals Ent.</div>
            <div className="nd3-gainer-percent-box" style={{height: '21px'}}>3.53%</div>
          </div>
          <div className="nd3-gainer-item" style={{top: '347px'}}>
            <div className="nd3-gainer-name-box">Cipla</div>
            <div className="nd3-gainer-percent-box">3.23%</div>
          </div>
          <div className="nd3-gainer-item" style={{top: '368px'}}>
            <div className="nd3-gainer-name-box">J&W Steel</div>
            <div className="nd3-gainer-percent-box">2.72%</div>
          </div>
          
          {/* Losers */}
          <div className="nd3-loser-item" style={{top: '281px'}}>
            <div className="nd3-loser-name-box">Trent</div>
            <div className="nd3-loser-percent-box">19.29%</div>
          </div>
          <div className="nd3-loser-item" style={{top: '302px'}}>
            <div className="nd3-loser-name-box">HCL Tech</div>
            <div className="nd3-loser-percent-box">15.08%</div>
          </div>
          <div className="nd3-loser-item" style={{top: '323px'}}>
            <div className="nd3-loser-name-box">Tech Mahindra</div>
            <div className="nd3-loser-percent-box">13.24%</div>
          </div>
          <div className="nd3-loser-item" style={{top: '344px'}}>
            <div className="nd3-loser-name-box">TCS</div>
            <div className="nd3-loser-percent-box">12.28%</div>
          </div>
          <div className="nd3-loser-item" style={{top: '365px'}}>
            <div className="nd3-loser-name-box">Axis Bank</div>
            <div className="nd3-loser-percent-box">10.91%</div>
          </div>
          
          {/* Commodities Table */}
          <div className="nd3-table">
            <div className="nd3-table-row nd3-table-header">
              <div className="nd3-table-cell">Name</div>
              <div className="nd3-table-cell">LTP-July 31(₹)</div>
              <div className="nd3-table-cell">CHANGE%</div>
            </div>
            <div className="nd3-table-row">
              <div className="nd3-table-cell">Gold</div>
              <div className="nd3-table-cell">98,068</div>
              <div className="nd3-table-cell nd3-green">2.50%</div>
            </div>
            <div className="nd3-table-row">
              <div className="nd3-table-cell">Silver</div>
              <div className="nd3-table-cell">110,005</div>
              <div className="nd3-table-cell nd3-green">4.05%</div>
            </div>
            <div className="nd3-table-row">
              <div className="nd3-table-cell">Crude oil</div>
              <div className="nd3-table-cell">6,052</div>
              <div className="nd3-table-cell nd3-green">8.25%</div>
            </div>
            <div className="nd3-table-row">
              <div className="nd3-table-cell">Natural gas</div>
              <div className="nd3-table-cell">265</div>
              <div className="nd3-table-cell nd3-red">8.37%</div>
            </div>
          </div>
        </div>
      </div>
      <AboutUsFooter />
    </div>
  );
}

export default NewsletterDetail;
