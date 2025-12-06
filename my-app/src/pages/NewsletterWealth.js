import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Header from '../components/Header';
import AboutUsFooter from './AboutUsFooter';
import './NewsletterWealth.css';

function NewsletterWealth() {
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
    <div className="newsletter-wealth-page">
      <Header />
      
      <div className="wealth-content">
        <div className="wealth-container">
          <div className="wealth-spacer"></div>
          
          <h1 className="wealth-main-title">Do You Really Need a Wealth Manager?</h1>
          
          <div className="wealth-intro">
            <p>I recently met one of my close friends who had just run into some good fortune. He sold a part of his business and received ₹20 crores in an all-cash deal.</p>
            
            <p>I had expected him to be happy, maybe even celebratory. But he wasn't. When he called me, he sounded overwhelmed.</p>

            <p>Despite years of running his business, he wasn't sure how to manage this money. Should he put it into equities? Buy more real estate or gold? In that moment of uncertainty, he decided to start investing on his own.</p>

            <p>He went with what he knew, picked up some tips from his friends, followed a few finfluencers, and jumped in.</p>

            <p>But after a few months, he realised it wasn't working. The returns were underwhelming.</p>

            <p>That's when he finally reached out for professional help.</p>

            <p>This isn't rare. In my experience, most serious financial mistakes don't happen because someone picked a bad investment. They happen because the person waited too long to seek advice.</p>

            <p>Wealth management has many layers — from choosing the right asset allocation to building a portfolio that aligns with your life goals.</p>

            <p>In this edition, I'll break down:</p>

            <ul className="wealth-list">
              <li>A little context on the wealth management industry</li>
              <li>Who wealth managers are</li>
              <li>When you should consider professional wealth management</li>
              <li>And what that relationship looks like in practice</li>
            </ul>

            <p>If you've ever wondered whether it's time to get more structured with your money, this should help. Let's begin.</p>
          </div>

          <h2 className="wealth-section-title">A little context on the wealth management industry</h2>
          
          <p>India's wealth management industry is at a critical inflection point. It's growing consistently, and through SIPs and mutual funds, more and more people are getting exposure to capital markets.</p>

          <p>According to Deloitte India's report, Financial Wealth Management Services in India, the industry, driven by a booming economy and rising affluence, is expected to grow at 15% annually.</p>

          <p>So what's fuelling this growth?</p>

          <p>It comes down to a structural shift in investor behaviour.</p>

          <p>HNIs in India are moving away from traditional preferences like gold and real estate. Instead, they're building more balanced, diversified portfolios.</p>

          <p>The share of equities in HNI portfolios has more than doubled in the last decade, from 2.2% to 4.7%. Allocations to PMS, AIFs, and private equity are also on the rise.</p>

          <p>This leads to a Triple Multiplier Effect:</p>

          <ul className="wealth-list">
            <li><strong>Higher savings from income growth:</strong> As incomes rise, savings increase, adding more fuel to the industry's growth.</li>
            <li><strong>A growing HNI base:</strong> Industry estimates say India will have 1.67 million HNIs by 2027, growing at 16% annually.</li>
            <li><strong>Financial asset appreciation:</strong> In the last 10 years, all major indices have delivered a consistent 12.4–12.7% CAGR.</li>
          </ul>

          <p>To put it simply: more money, more investors, more options.</p>

          <p>And that's changing the role of wealth managers. They're no longer just product distributors — they're becoming essential partners in helping investors navigate an increasingly complex financial landscape.</p>

          <p>So, who are these wealth managers, and what do they actually do?</p>

          <p>Most people have a basic understanding of what wealth management encompasses: investment advice, tax planning, insurance, and estate planning, all under one roof.</p>

          <p>But here's the real question: when does it become necessary?</p>

          <p>A lot of people try the DIY route. They start with mutual funds, read a few blogs, follow market news, and sometimes take advice from family or influencers. But over time, two things usually show up: underwhelming returns and overwhelming complexity.</p>

          <p>In my experience, that's the tipping point.</p>

          <p>It's when your finances stop being straightforward. You're no longer just investing in SIPs or saving tax.</p>

          <p>You're navigating ESOPs, business exits, property sales, inheritance, children's education, changing tax laws, or succession planning. There are too many moving parts, and no clear way to connect them.</p>

          <p>That's where a good wealth manager steps in.</p>

          <p>They look at your full picture: assets, liabilities, financial goals, milestones, and risk. Then they build a strategy that actually fits your life. It's not just about generating returns; it's about making sure your money works the way you need it to.</p>

          <p>That's why the role is evolving. Wealth management has shifted from being product-driven to becoming deeply advisory.</p>

          <p>Investors want more than access. They want structure, control, and long-term alignment. They want someone who understands the big picture and stays with them as life shifts.</p>

          <h2 className="wealth-section-title">When should you consider professional wealth management?</h2>

          <p>Most people don't wake up one day and decide they need a wealth manager. It usually starts with a shift. Something changes in your life or your money, and suddenly the old way of managing things doesn't feel enough.</p>

          <p>Here are some of the most common triggers:</p>

          <h3 className="wealth-subsection-title">1. You come into sudden money</h3>
          
          <p>Selling your company stake. A large ESOP payout. An insurance claim. A real estate sale. It sounds exciting, but it also creates pressure.</p>

          <p>Where do you park the money? What about taxes? Should you invest now or wait? These are high-stakes decisions, and many people realise they need help getting them right.</p>

          <h3 className="wealth-subsection-title">2. Markets move and you feel stuck</h3>
          
          <p>A crash makes you nervous. A rally makes you greedy. Both make you question your plan. Do you exit? Add more? Stay put?</p>

          <p>This is when you need someone who helps you think clearly, not just react.</p>

          <h3 className="wealth-subsection-title">3. Life changes and so do your priorities</h3>
          
          <p>Marriage. Divorce. Having children. Their education. Life evolves, and with it, your financial needs change. That's when structured guidance starts to matter. You need a more objective and rational approach to your finances.</p>

          <h3 className="wealth-subsection-title">4. You're planning to transfer wealth</h3>
          
          <p>Inheritance, trusts, estate planning. It all sounds far off until it isn't. Then there's legal, tax, and emotional complexity in passing on wealth. If done right, it protects your legacy and avoids conflict.</p>

          <h3 className="wealth-subsection-title">5. You're not happy with your current setup</h3>
          
          <p>Maybe your portfolio isn't performing. Maybe DIY isn't working. Maybe your advisor only gets in touch when there's something to sell. Or maybe you're simply unsure whether they truly understand you. That discomfort often leads to a search for a better, more aligned partner.</p>

          <h2 className="wealth-section-title">When do you not need a wealth manager?</h2>

          <p>While these are times when professional wealth management matters, there can be situations where it might not feel essential, at least for now. If you love managing your own money and are confident that you can objectively construct a well-balanced portfolio, then you may not need active guidance at this stage.</p>

          <p>Here's when going solo can actually work:</p>

          <h3 className="wealth-subsection-title">1. You have the time</h3>
          
          <p>You're willing to spend hours reading, analysing, and updating your portfolio. You're not looking to delegate because you enjoy the process and have built discipline around it.</p>

          <h3 className="wealth-subsection-title">2. You have the expertise</h3>
          
          <p>You understand asset classes, tax structures, and how markets work. You're comfortable making complex financial decisions independently.</p>

          <h3 className="wealth-subsection-title">3. You enjoy the research</h3>
          
          <p>You track macroeconomic shifts, evaluate fund manager performance, and stay updated on regulatory changes. Your decisions are driven by data, not noise.</p>

          <h3 className="wealth-subsection-title">4. You've seen many market cycles before</h3>
          
          <p>You've managed your portfolio through periods of volatility and growth. You understand how markets behave across time and act with objectivity. In such cases, external advice may add limited value — especially if your financial strategy is already structured, consistent, and aligned with your long-term goals.</p>

          <p>But it's still worth re-evaluating. As wealth grows, even the most skilled investors reach a point where having a second pair of eyes and a steady partner can add clarity and confidence.</p>

          <p>Not needing a wealth manager is a decision too. The key is knowing when that decision continues to serve you well.</p>

          <h2 className="wealth-section-title">What it's like to work with a wealth manager</h2>

          <p>Working with a wealth manager isn't about handing over control. It's about building a system that fits your life, with someone who understands the full picture and keeps you anchored when things get messy.</p>

          <p>Here's how it usually starts:</p>

          <ul className="wealth-list">
            <li><strong>We ask a lot of questions:</strong> Not just about your assets and returns, but about your goals, fears, lifestyle, family responsibilities, and how you think about risk. Our job isn't just to invest your money; it's to understand what that money is meant to do for you.</li>
            <li><strong>We build a real plan:</strong> We map out your short- and long-term goals, decide how much risk makes sense, incorporate tax strategy, and ensure your investments serve your life — not the other way around.</li>
            <li><strong>We invest with purpose:</strong> No templated portfolios. No flavour-of-the-month bets or 'tips'. Your capital is deployed with clarity, across equity, debt, and alternatives, based on what's right for you.</li>
            <li><strong>We keep your taxes efficient:</strong> High income often brings high tax liabilities. We structure things so you can keep more of what you earn and avoid surprises later.</li>
            <li><strong>We protect the downside:</strong> From insurance to contingency planning, we prepare for what can go wrong, so you don't lose sleep over it.</li>
            <li><strong>We stay with you:</strong> This isn't a one-time report or an annual meeting. We check in regularly and update the plan as life shifts — career moves, family changes, liquidity events, succession. Your financial strategy evolves with you.</li>
          </ul>

          <p>A good wealth manager gives you more than just returns — they give you direction. And sometimes, that's the difference between being invested and being in control.</p>

          <h2 className="wealth-section-title">Conclusion</h2>

          <p>As more people embrace long-term investing and the power of the capital markets, India's wealth management industry is evolving rapidly. So is the role and responsibility of wealth managers, who are now essential partners in helping investors navigate complexity with confidence.</p>

          <p>Just like doctors are essential for your physical health, wealth managers are essential for your financial health — helping you stay disciplined, protected, and on track, no matter what life brings.</p>

          <p>On that note, I'm offering a complimentary portfolio review to help you take the next step in your financial journey with clarity.</p>

          <div className="wealth-conclusion">
            <h3 className="wealth-subsection-title">Podcast: Wealth Insights</h3>

            <p>Before I sign off for the week, I also wanted to share something we're doing at Investza.</p>

            <p>We recently launched a podcast series, <strong>Wealth Insights</strong>, where I speak with India's top fund managers. They share their journeys, their views on wealth, and how investors should think about wealth creation.</p>

            <p>I began this series with the legendary <a href="https://www.youtube.com/watch?v=sP6w2yj3y84" target="_blank" rel="noopener noreferrer">Radhika Gupta</a>, CEO at Edelweiss Mutual Fund, followed by our industry veteran <a href="https://www.youtube.com/watch?v=aH2AlHCYWW0&t=47s" target="_blank" rel="noopener noreferrer">Kalpen Parekh</a>, CEO & MD at DSP Mutual Fund.</p>

            <p>In the latest episode, I sit down with Vijay Mantri, Co-Founder and Chief Investment Strategist at JRL Money.</p>

            <p>Vijay candidly shares:</p>

            <ol className="wealth-list">
              <li>How young investors should view money, risk, and wealth</li>
              <li>Why equity is the most misunderstood yet essential asset</li>
              <li>The critical role of financial advisors in wealth management</li>
              <li>Simple yet powerful personal finance principles</li>
            </ol>

            <p><strong>Check out the episode now!</strong></p>

            <div className="wealth-video-section">
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

            <p><strong>Disclaimer:</strong> The information contained herein is for informational purposes and should not be interpreted as soliciting, advertising, or providing any advice. Securities investments are subject to market risks, please consult a professional before making investment decisions.</p>
          </div>
        </div>
      </div>

      <AboutUsFooter />
    </div>
  );
}

export default NewsletterWealth;
