import { useEffect, useState } from "react";
import { getBookings } from "../api/flowApi";
import styles from "./BookingList.module.css";

export default function BookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function loadBookings() {
      try {
        const res = await getBookings();
        setBookings(res.data);
      } catch (err) {
        console.error("Error loading bookings", err);
      }
    }

    loadBookings();
  }, []);

  return (
    <div className={styles.bookingContainer}>
      <h2 className={styles.bookingTitle}>All Bookings</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.bookingTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Guest Email</th>
              <th>Message</th>
              <th>Investment</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="9" className={styles.emptyState}>
                  No bookings found
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.fullName}</td>
                  <td>{b.mobile}</td>
                  <td>{b.email}</td>
                  <td>{b.guestEmail || "-"}</td>
                  <td>{b.message || "-"}</td>
                  <td>{b.investmentRange}</td>
                  <td>{b.date}</td>
                  <td>{b.time}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
