import axios from "axios";

const API = "http://localhost:8080/api";

export const startFlow = (fullName) => axios.post(`${API}/flow/start`, { fullName });

export const sendOtp = (userId, mobile) => {
  console.log("BODY SENDING:", { userId, mobile });

  return axios.post(`${API}/flow/send-otp`, { userId, mobile });
};

export const verifyOtp = (userId, otp) =>
  axios.post(`${API}/flow/verify-otp`, { userId: String(userId), otp });

export const selectInvestment = (userId, investmentRange) =>
  axios.post(`${API}/flow/investment`, { userId, investmentRange });

export const checkSlot = (date, time) =>
  axios.get(`${API}/flow/check-slot`, { params: { date, time } });

export const createBooking = (payload) =>
  axios.post(`${API}/flow/create-booking`, payload);

export const getBookings = () =>
  axios.get(`${API}/flow/bookings`);

export const sendContactMessage = (payload) => {
  return axios.post(`${API}/contact/receive`, payload);
};

export const ReviewPortfolioSubmit = (fullName, contactNumber, investmentValue, 
  email, agreeToPolicy, recaptchaToken) => 
    axios.post(`${API}/review_portfolio/submit`, 
      { fullName, contactNumber, investmentValue, email, agreeToPolicy, recaptchaToken });


export const getEvents = (payload) => {
  return axios.get(`${API}/events/list`, payload);
}
