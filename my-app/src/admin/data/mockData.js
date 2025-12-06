// Shared mock data used across pages so Dashboard can show counts
export const callBookings = [
  {
    id: "1",
    fullName: "Naresh",
    mobile: "9751523487",
    email: "nareshprasanna965@gmail.com",
    guestEmail: "guest@gmail.com",
    message: "Test",
    investmentRange: "50-2cr",
    date: "2025-11-29",
    time: "07:30",
    status: "Pending",
  },
  {
    id: "2",
    fullName: "Arjun",
    mobile: "9876543210",
    email: "arjun@gmail.com",
    guestEmail: "guest2@gmail.com",
    message: "Call back",
    investmentRange: "10-50L",
    date: "2025-11-26",
    time: "03:15",
    status: "Completed",
  },
];

export const contactMessages = [
  {
    id: "1",
    name: "Harshita",
    email: "lavaniaharshita05@gmail.com",
    subject: "Test Message",
    message: "Bhai backend ka test kar rahi hu!",
    status: "Pending",
  },
];

export const reviewPortfolio = [
  {
    id: "1",
    fullName: "Harshita",
    contactNumber: "7668734212",
    investmentValue: "25L-50L",
    email: "lavaniaharshita05@gmail.com",
    agreeToPolicy: true,
  },
  {
    id: "2",
    fullName: "Rohit",
    contactNumber: "9876543210",
    investmentValue: "10L-25L",
    email: "rohit@gmail.com",
    agreeToPolicy: true,
  },
];

export const events = [
  { id: "e1", title: "Open House Webinar", date: "2025-12-10" },
  { id: "e2", title: "Investor Meetup", date: "2025-12-18" },
  { id: "e3", title: "Portfolio Review Session", date: "2026-01-05" },
];

export const participants = [
  { id: "p1", eventId: "e1", fullName: "Anita Sharma", email: "anita@example.com", mobile: "9876501234", investmentValue: "25L-50L", registeredAt: "2025-11-20", status: "Confirmed" },
  { id: "p2", eventId: "e1", fullName: "Karan Patel", email: "karan@example.com", mobile: "9876505678", investmentValue: "0-25L", registeredAt: "2025-11-21", status: "Pending" },
  { id: "p3", eventId: "e2", fullName: "Riya Singh", email: "riya@example.com", mobile: "9876509101", investmentValue: "50L-2Cr", registeredAt: "2025-11-25", status: "Confirmed" },
];

export default {
  callBookings,
  contactMessages,
  reviewPortfolio,
  events,
  participants,
};
