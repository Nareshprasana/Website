import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Header from '../components/Header';
import AboutUsFooter from './AboutUsFooter';
import './NewsletterRBI.css';

function NewsletterRBI() {
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
    <div className="newsletter-rbi-page">
      <Header />
      
      <div className="rbi-content">
        <div className="rbi-container">
          <div className="rbi-spacer"></div>
          
          <h1 className="rbi-main-title">The RBI's Rate Cut: What You Need to Know</h1>
          
          <div className="rbi-intro">
            <p>I'm sure you've heard by now. The Reserve Bank of India (RBI) has slashed the repo rate by 50 basis points (bps) to 5.5%. It has also reduced the Cash Reserve Ratio (CRR) by 100 bps to 3%. This brings the cumulative repo rate cut to 100 bps since February 2025, marking the most aggressive easing phase in recent years.</p>
            
            <p>For borrowers, this comes as a major relief. Their EMI amounts will reduce, their loan tenures will shorten, and they'll have more spending capacity, giving much-needed breathing room to urban and mid-income households.</p>

            <p>This move comes amid a strong monsoon and a benign inflation environment, which gives the RBI room to focus on growth. Inflation for FY2025-26 is now expected to be around 3.7%, comfortably within the 4% target.</p>

            <p>In this newsletter, I thought I'd break down how repo rates actually work and impact the economy. We'll explore:</p>

            <ul className="rbi-list">
              <li>Why the RBI reduced the repo rate</li>
              <li>How rate cuts stimulate growth</li>
              <li>How rate cuts have worked in the past</li>
              <li>Key sectors impacted by the rate cut</li>
            </ul>

            <p>Let's begin.</p>
          </div>

          <h2 className="rbi-section-title">Why did the RBI reduce the Repo Rate</h2>
          
          <p>The RBI has now cut rates across three consecutive meetings in 2025, starting with a quarter-point reduction in February, then 50 basis points in April, and the same once again.</p>

          <div className="rbi-image-section">
            <img src="https://investza.in/wp-content/uploads/image-5.png" alt="RBI Rate Cut Chart" className="rbi-main-image" />
          </div>

          <p>The RBI's decision is closely tied to India's current economic picture.</p>

          <h3 className="rbi-subsection-title">On the domestic front:</h3>
          
          <p>Rural and agricultural conditions look promising. Harvests of kharif and rabi crops have been strong, reservoir levels are healthy, and food grain stocks are comfortable. The early monsoon rains this year have also been promising and are expected to be above normal. All this has helped keep food inflation in check and supported rural incomes.</p>

          <p>RBI data shows food inflation is actually low, sometimes even negative, with the Consumer Price Index (CPI) at 3.2% in April 2025, the lowest it has been in years. Even fuel prices have remained stable, and core inflation is moderate. For FY2025-26, overall CPI is projected at 3.7%, which is comfortably within the RBI's target.</p>

          <h3 className="rbi-subsection-title">On private consumption:</h3>

          <p>India has been holding up well. This is reflected by increasing GST collections, discretionary spending, and steady rural demand. Private consumption and investment grew at 7 to 9% in the last quarter of FY2024-25.</p>

          <p>Overall, the economy looks healthy, with strong bank and corporate balance sheets, rising capital spending, and steady consumer demand, even though industrial growth is still picking up pace.</p>

          <h3 className="rbi-subsection-title">On the global front:</h3>

          <p>The picture is less encouraging. Major forecasters have cut growth projections for 2025 to around 2.8 to 2.9%, and world trade volumes may even shrink. Geopolitical tensions and trade uncertainties remain high.</p>

          <p>In this context, the RBI decided that supporting domestic demand was the right move. With inflation low and the domestic economy on solid footing, the RBI saw a window to ease policy and keep growth on track despite global challenges.</p>

          <h2 className="rbi-section-title">How rate cuts stimulate growth</h2>

          <p>When the central bank cuts its policy rate, it lowers the cost of borrowing across the economy. Banks get cheaper funds from both the RBI and the wholesale market, so they can cut lending rates on loans and mortgages.</p>

          <p>Consumers who take loans for major purchases like houses, cars, or even appliances suddenly find that loans are more affordable and EMI options are better, making them more willing to buy.</p>

          <p>Similarly, businesses often find that projects with marginal returns become profitable when loan rates fall. At a macro level, lower rates encourage both consumption and investment.</p>

          <p>The money multiplier amplifies this effect. When a bank receives ₹1 crore from the RBI, it keeps a small fraction, say 3% as reserve, and lends out the rest. That ₹0.97 crore loan then gets deposited in another bank, which again keeps a small reserve and lends the rest.</p>

          <p>This process multiplies the original ₹1 crore into many crores of deposits and loans. A rate cut that injects liquidity can, therefore, create a much larger spending impact on the economy.</p>

          <p>In India's case, the RBI cut the CRR from 4% to 3% by the end of 2025. This means banks now hold only 3% of deposits as reserves. This reduction shows that lower reserves mean more potential lending.</p>

          <p>The RBI's own statements show that this easing is already feeding through the system. Short-term money rates, like the weighted average call rate (WACR), are trading well below the policy rate.</p>

          <p>Bank lending rates on fresh loans have started to decline, with the weighted average lending rate (WALR) down by 6 basis points between February and April 2025. All this confirms that lending is indeed getting cheaper.</p>

          <p>Over time, cheaper credit should translate into higher credit growth, as banks lend more, and ultimately into higher GDP growth. Past easing cycles show that credit growth often picks up by year-end and GDP sometimes overshoots the initial forecasts.</p>

          <p>Of course, this transmission does not happen overnight. Banks need time to reprice their loans. However, this time the transmission is already well underway.</p>

          <h2 className="rbi-section-title">Historical precedents</h2>

          <p>Looking back, India's economy has seen several easing cycles in response to shocks.</p>

          <p>After the 2008 global crisis, India's repo rate peaked at 9% in mid-2008 and was cut to 4.75% by April 2009. The economy slowed in 2008-09, but after those cuts, growth rebounded strongly. GDP was back near 8% by 2010.</p>

          <p>Similarly, in 2019-20, the RBI moved aggressively during the COVID shock. Between February and May 2020, the repo rate fell from 5.15% to 4.00%, along with moratoriums and liquidity measures. These steps helped stabilise the financial system. By late 2020-21, growth was recovering even as fiscal stimulus worked in tandem.</p>

          <p>In each easing cycle, two patterns emerge. First, credit growth usually picks up with a lag of a few quarters. Banks are initially cautious but eventually respond to higher loan demand. Second, inflation tends to stay subdued in the interim because demand is often weak.</p>

          <p>Also, by considering past trends, we have observed that equity markets have typically rallied, especially finance shares, and bond yields have fallen. We are expecting to see the same trend this time as well.</p>

          <h2 className="rbi-section-title">Sectors that will be impacted</h2>

          <p>Rate cuts do not affect all sectors equally. Four sectors in particular will see pronounced effects in the short to medium term:</p>

          <h3 className="rbi-subsection-title">1. NBFCs</h3>

          <p>These companies borrow heavily in the market through commercial paper (CP) and bonds rather than collecting deposits. A lower repo rate usually pushes down market interest rates. A drop in borrowing rates means NBFCs can cut their lending rates on vehicle loans, personal loans, and microfinance by roughly 25 to 30 basis points while maintaining their margins.</p>

          <p>RBI data shows NBFC CP yields have also dropped after the cut. At the same time, their cost of funds declines. Since many NBFC loans are fixed-rate while their borrowings are floating-rate, lower borrowing costs directly widen their net interest margins.</p>

          <p>RBI's stability report highlights that NBFC sector indicators are sound, with comfortable capital and falling NPAs. This means NBFCs are well-positioned to benefit from cheaper credit. We can expect NBFC stocks to rally and NBFC-led credit, like vehicle and small business loans, to rise.</p>

          <h3 className="rbi-subsection-title">2. Consumer Durables</h3>

          <p>In India, big-ticket home appliances like TVs, refrigerators, and ACs often depend on cheap EMIs. Consumer durables are interest rate-sensitive because they are usually bought on EMIs. Lower borrowing costs make these purchases more affordable and boost demand.</p>

          <p>We can expect durables sales to be 5 – 7% higher in June than projected, and some momentum in the Nifty Consumer Durables index.</p>

          <p>Beyond the immediate demand bump, easier financing lifts consumer sentiment. When loans are cheaper, people often feel more confident to spend rather than save. For retail consumers, this might mean increasing EMIs on loans or buying new products on credit.</p>

          <p>Over the medium term, durable-goods manufacturers should see sales volumes rise and profits grow. Rural consumption could also get a boost as easier credit circulates.</p>

          <h3 className="rbi-subsection-title">3. Automobile Industry</h3>

          <p>Similar to consumer durables, lower borrowing costs should ease EMIs on entry-level cars, improving affordability for first-time buyers. Demand for tractors and two-wheelers is also expected to rebound in rural areas as liquidity improves.</p>

          <p>According to data from the Federation of Automobile Dealers Associations, passenger vehicle bookings rose 11% year-on-year following the previous rate cut in April.</p>

          <p>With the latest rate cut, auto dealers and manufacturers are expecting further growth in sales, especially as consumers respond to the more affordable loan rates.</p>

          <h3 className="rbi-subsection-title">4. Housing Finance and Real Estate</h3>

          <p>This sector is very sensitive to interest rates because mortgages make up a large part of housing demand. A repo rate cut typically leads to lower home loan rates from banks. Lower EMIs make buying or building a home more affordable for many families.</p>

          <p>Here's a representation on the impact of the rate cut on home loans –</p>

          <div className="rbi-image-section">
            <img src="https://investza.in/wp-content/uploads/image-7.png" alt="Impact of Rate Cut on Home Loans" className="rbi-main-image" />
          </div>

          <p>Early evidence already shows banks and housing finance companies lowered their prime lending rates after June 6, which will translate into a 5 to 10% drop in home loan EMIs for a typical borrower.</p>

          <p>With the lowest home loan rates already touching 7.85% for top credit-score borrowers, experts say the sub-8% interest rate mark could become more mainstream.</p>

          <p>Here's a list of some major banks' home loan interest rates-</p>

          <div className="rbi-image-section">
            <img src="https://investza.in/wp-content/uploads/image-8.png" alt="Major Banks Home Loan Interest Rates" className="rbi-main-image" />
          </div>

          <p>Lower EMIs also help avoid loan defaults. Borrowers struggling with high EMIs will find their debt burdens easing. This will reduce delinquencies because EMIs become more manageable. So, not only does demand pick up, but loan quality also improves, meaning banks face less risk.</p>

          <p>Historically, past easing cycles, like the 2019-20 cuts, led to higher home sales and new project launches by year-end. Developers often run promotional home finance schemes right after a cut, accelerating demand further.</p>

          <h2 className="rbi-section-title">Conclusion</h2>

          <p>To sum up, the RBI's recent rate cuts are set to have a broad impact across the economy.</p>

          <p>For the economy as a whole, we expect a gradual pick-up in credit growth and consumption. Sectors that depend on credit and discretionary spending are likely to feel the impact first. Banks and NBFCs should see their loan books expand.</p>

          <p>The RBI's efforts to support economic growth through increased liquidity and promoting consumption are a strong way to boost the economy, without relying on foreign players.</p>

          <p>Investors may need to reassess their portfolios, especially with the possibility of lower fixed deposit returns.</p>

          <div className="rbi-conclusion">
            <h3 className="rbi-subsection-title">Podcast: Wealth Insights</h3>

            <p>Before I sign off for the week, I also wanted to share something we're doing at Investza.</p>

            <p>We recently launched a podcast series, <strong>Wealth Insights</strong>, where I speak with India's top fund managers. They share their journeys, their views on wealth, and how investors should think about wealth creation.</p>

            <p>I began this series with the legendary <a href="https://www.youtube.com/watch?v=sP6w2yj3y84" target="_blank" rel="noopener noreferrer">Radhika Gupta</a>, CEO at Edelweiss Mutual Fund, followed by our industry veteran <a href="https://www.youtube.com/watch?v=aH2AlHCYWW0&t=47s" target="_blank" rel="noopener noreferrer">Kalpen Parekh</a>, CEO & MD at DSP Mutual Fund.</p>

            <p>In the latest episode, I sit down with Vijay Mantri, Co-Founder and Chief Investment Strategist at JRL Money.</p>

            <p>Vijay candidly shares:</p>

            <ol className="rbi-list">
              <li>How young investors should view money, risk, and wealth</li>
              <li>Why equity is the most misunderstood yet essential asset</li>
              <li>The critical role of financial advisors in wealth management</li>
              <li>Simple yet powerful personal finance principles</li>
            </ol>

            <p><strong>Check out the episode now!</strong></p>

            <div className="rbi-video-section">
              <iframe 
                width="100%" 
                height="450" 
                src="https://www.youtube.com/embed/7m4pLSaKwWs" 
                title="Ep.3 with Vijai Mantri | Co-Founder & Chief Investment Strategist at JRL Money" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>

            <p><strong>Disclaimer: </strong>The information contained herein is for informational purposes and should not be interpreted as soliciting, advertising, or providing any advice. Securities investments are subject to market risks, please consult a professional before making investment decisions.</p>
          </div>
        </div>
      </div>

      <AboutUsFooter />
    </div>
  );
}

export default NewsletterRBI;
