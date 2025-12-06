import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import EventsPage from './pages/EventsPage';
import AboutUs from './pages/AboutUs';
import TeamPage from './pages/TeamPage';
import ContactUs from './pages/ContactUs';
import FAQPage from './pages/FAQPage';
import LearnWhy from './pages/LearnWhy';
import Newsletter from './pages/Newsletter';
import NewsletterDetail from './pages/NewsletterDetail';
import RefundPolicy from './pages/RefundPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Disclaimer from './pages/Disclaimer';
import TermsConditions from './pages/TermsConditions';

//wealth tracker page import
import WealthTracker from './components/WealthTracker';

// CallSchedule flow components
import Information from './components/Information';
import NameDetails from './components/NameDetails';
import VerifyOtp from './components/VerifyOtp';
import Vision from './components/Vision';
import ContactDetails from './components/ContactDetails';
import InvestmentDetails from './components/InvestmentDetails';
import { ConfirmationPageWrapper } from './components/ConfirmationPageWrapper';
import ScheduleComponent from './components/ScheduleComponent';
import EmailDetails from './components/EmailDetails';
import BookingList from './components/BookingList';
import Page from './components/Page';

// Contexts
import { DetailsContext } from './components/contexts/Details';
import { OtpVerification } from './components/contexts/OtpVerification';
import { userDetails } from './components/contexts/userDetails';

// Assets
import AdnanKhan from './assets/Adnan-Khan.webp';
import AnkitMehta from './assets/Ankit-Mehta.webp';

import './App.css';
import ShowQR from './components/ShowQR';
import AdminApp from './admin/AdminApp';

// ScrollToTop component to reset scroll position on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [data, setData] = useState({
    date: '',
    time: '',
    duration: '45 minutes',
    email: '',
    guestEmail: '',
    timezone: 'Indian Standard Time (IST)',
  });

  const [userData, setUserData] = useState({
    userId: '',
    userName: '',
    userPhone: '',
    otp: '',
    date: '',
    time: '',
    email: '',
    guestEmail: '',
    message: '',
  });

  const [isOTPVerified, setIsOTPVerified] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('userData');
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(data));
  }, [data]);

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <userDetails.Provider value={{ userData, setUserData }}>
          <OtpVerification.Provider value={{ isOTPVerified, setIsOTPVerified }}>
            <DetailsContext.Provider value={{ data, setData }}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/learn-why" element={<LearnWhy />} />
                <Route path="/newsletter" element={<Newsletter />} />
                <Route path="/newsletter/:id" element={<NewsletterDetail />} />
                <Route path="/refund" element={<RefundPolicy />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/terms" element={<TermsConditions />} />
                <Route path="/wealth-tracker" element={<WealthTracker />} />

                {/* CallSchedule flow routes */}
                <Route
                  path="/schedule-call"
                  element={<Page Left={<Information />} Right={<NameDetails />} />}
                />
                <Route
                  path="/contactDetails"
                  element={
                    <Page
                      Left={
                        <Vision
                          authorName={'Mr. Adnan Khan'}
                          authorTestimony={`What I appreciate most about Investza is the transparency. I know where my money is, why it's there and what to expect next.`}
                          authorTitle={'Actor'}
                          authorImage={AdnanKhan}
                        />
                      }
                      Right={<ContactDetails />}
                    />
                  }
                />
                <Route path="/verification" element={<VerifyOtp />} />
                <Route
                  path="/investmentDetails"
                  element={
                    <Page
                      Left={
                        <Vision
                          authorName={`Mr. Ankit Mehta`}
                          authorTestimony={`With Investza, I feel like I have real partner – not just an advisor. They've helped me build wealth with clarity and confidence.`}
                          authorTitle={'MD at Chemkart LTD'}
                          authorImage={AnkitMehta}
                        />
                      }
                      Right={<InvestmentDetails />}
                    />
                  }
                />
                <Route
                  path="/scheduleCall"
                  element={<Page Left={<Information />} Right={<ScheduleComponent />} />}
                />
                <Route
                  path="/emailDetails"
                  element={<Page Left={<Information />} Right={<EmailDetails />} />}
                />
                <Route path="/confirmation" element={<ConfirmationPageWrapper />} />
                <Route path="/bookings" element={<BookingList />} />

                <Route path='/showQR' element={<ShowQR />} />
                <Route path="/adminlogin/*" element={<AdminApp />} />
              </Routes>
            </DetailsContext.Provider>
          </OtpVerification.Provider>
        </userDetails.Provider>
      </div>

    </Router>
  );
}

export default App;