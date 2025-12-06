import React from "react";
import { Routes, Route } from "react-router-dom";

import "./Admin.css";
import Dashboard from "./pages/Dashboard";
import AddEvent from "./pages/AddEvent";
import EventList from "./pages/EventList";
import CallBooking from "./pages/CallBooking";
import Newsletter from "./pages/Newsletter";
import ReviewPortfolio from "./pages/ReviewPortfolio";
import ContactUs from "./pages/ContactUs";
import EventParticipants from "./pages/EventParticipants";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Availability from "./pages/Availability";

function AdminApp() {
    return (
        <Routes>
            {/* LOGIN ROUTE */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />

            {/* ADMIN ROUTES */}
            <Route
                path="dashboard"
                element={
                    <Layout>
                        <Dashboard />
                    </Layout>
                }
            />

            <Route
                path="add-event"
                element={
                    <Layout>
                        <AddEvent />
                    </Layout>
                }
            />

            <Route
                path="event-list"
                element={
                    <Layout>
                        <EventList />
                    </Layout>
                }
            />

            <Route
                path="call-booking"
                element={
                    <Layout>
                        <CallBooking />
                    </Layout>
                }
            />

            <Route
                path="newsletter"
                element={
                    <Layout>
                        <Newsletter />
                    </Layout>
                }
            />

            {/* ❗ FIXED THIS ROUTE */}
            <Route
                path="review-portfolio"
                element={
                    <Layout>
                        <ReviewPortfolio />
                    </Layout>
                }
            />

            <Route
                path="contact-us"
                element={
                    <Layout>
                        <ContactUs />
                    </Layout>
                }
            />

            <Route
                path="event-participants"
                element={
                    <Layout>
                        <EventParticipants />
                    </Layout>
                }
            />

            <Route
                path="users"
                element={
                    <Layout>
                        <Users />
                    </Layout>
                }
            />

            <Route
                path="availability"
                element={
                    <Layout>
                        <Availability />
                    </Layout>
                }
            />

            {/* FALLBACK */}
            <Route path="*" element={<Login />} />
        </Routes>
    );
}

export default AdminApp;
