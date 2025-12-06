import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import api from "../api/axios";

// React Icons
import { FaClock, FaCheckCircle } from "react-icons/fa";

function Dashboard() {
  const [stats, setStats] = useState({
    callBookings: [],
    contactMessages: [],
    reviewPortfolio: [],
    users: [],
    events: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, contactRes, portfolioRes, usersRes, eventsRes] = await Promise.all([
          api.get("/flow/bookings"),
          api.get("/contact/all"),
          api.get("/review_portfolio/list"),
          api.get("/auth/user/list"),
          api.get("/events/list")
        ]);

        setStats({
          callBookings: bookingsRes.data || [],
          contactMessages: contactRes.data || [],
          reviewPortfolio: portfolioRes.data || [],
          users: usersRes.data || [],
          events: eventsRes.data || []
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className={styles.dashboardContainer}>Loading...</div>;
  }

  const { callBookings, contactMessages, reviewPortfolio, users, events } = stats;

  const total = callBookings.length + contactMessages.length + reviewPortfolio.length;

  // status breakdowns
  const cbPending = Array.isArray(callBookings)
    ? callBookings.filter((c) => String(c.status || "").toLowerCase() === "pending").length
    : 0;
  const cbCompleted = Array.isArray(callBookings)
    ? callBookings.filter((c) => String(c.status || "").toLowerCase() === "completed").length
    : 0;

  const cmPending = Array.isArray(contactMessages)
    ? contactMessages.filter((m) => String(m.status || "").toLowerCase() === "pending").length
    : 0;
  const cmCompleted = Array.isArray(contactMessages)
    ? contactMessages.filter((m) => String(m.status || "").toLowerCase() === "completed").length
    : 0;

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardContent}>
        <h1>Welcome to Dashboard</h1>
        <p>Overview of your application data.</p>

        <div className={styles.statsGrid}>

          {/* Total */}
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{total}</div>
            <div className={styles.statLabel}>Total Entries</div>
          </div>

          {/* Call Bookings */}
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{callBookings.length}</div>
            <div className={styles.statLabel}>Call Bookings</div>
            <div className={styles.statusBadges}>
              <span className={`${styles.badge} ${styles.pending}`}>
                <FaClock size={14} /> {cbPending} Pending
              </span>
              <span className={`${styles.badge} ${styles.completed}`}>
                <FaCheckCircle size={14} /> {cbCompleted} Completed
              </span>
            </div>
          </div>

          {/* Contact Messages */}
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{contactMessages.length}</div>
            <div className={styles.statLabel}>Contact Messages</div>
            <div className={styles.statusBadges}>
              <span className={`${styles.badge} ${styles.pending}`}>
                <FaClock size={14} /> {cmPending} Pending
              </span>
              <span className={`${styles.badge} ${styles.completed}`}>
                <FaCheckCircle size={14} /> {cmCompleted} Completed
              </span>
            </div>
          </div>

          {/* Review Portfolio */}
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{reviewPortfolio.length}</div>
            <div className={styles.statLabel}>Review Portfolio</div>
          </div>

          {/* Users */}
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{users.length}</div>
            <div className={styles.statLabel}>Registered Users</div>
          </div>

          {/* Events */}
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{events.length}</div>
            <div className={styles.statLabel}>Events</div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
