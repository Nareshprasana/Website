import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import styles from "./CallBooking.module.css";
import api from "../api/axios";

function CallBooking() {
  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // VIEW / EDIT MODALS
  const [viewBooking, setViewBooking] = useState(null);
  const [editBooking, setEditBooking] = useState(null);

  // NEW BOOKING FORM
  const emptyForm = {
    fullName: "",
    mobile: "",
    email: "",
    guestEmail: "",
    message: "",
    investmentRange: "",
    date: "",
    time: "",
    status: "Pending",
  };

  /* ----------------------------
     LOAD DUMMY DATA
  ----------------------------- */
  /* ----------------------------
     LOAD REAL DATA
  ----------------------------- */
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/flow/bookings");
      setBookings(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    }
  };

  /* ----------------------------
     SEARCH + FILTER
  ----------------------------- */
  useEffect(() => {
    let data = bookings;

    if (search) {
      data = data.filter((b) =>
        Object.values(b).join(" ").toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      data = data.filter((b) => b.status === statusFilter);
    }

    if (dateFilter) {
      data = data.filter((b) => b.date === dateFilter);
    }

    setFiltered(data);
    setPage(1);
  }, [search, statusFilter, dateFilter, bookings]);

  /* ----------------------------
     UPDATE STATUS
  ----------------------------- */
  const updateStatus = async (id, status) => {
    try {
      await api.post(`/flow/booking/status/${id}`, { status });

      // Update local state
      const updated = bookings.map((b) =>
        b.id === id ? { ...b, status } : b
      );
      setBookings(updated);
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update status");
    }
  };

  /* ----------------------------
     EDIT BOOKING
  ----------------------------- */
  const saveEdit = () => {
    const updated = bookings.map((b) =>
      b.id === editBooking.id ? editBooking : b
    );

    setBookings(updated);
    setEditBooking(null);
  };

  /* ----------------------------
     DELETE BOOKING
  ----------------------------- */
  const deleteBooking = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await api.delete(`/flow/booking/${id}`);
        setBookings(bookings.filter((b) => b.id !== id));
      } catch (err) {
        console.error("Failed to delete booking", err);
        alert("Failed to delete booking");
      }
    }
  };

  /* ----------------------------
     PAGINATION
  ----------------------------- */
  const paginated = filtered.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const totalPages = Math.ceil(filtered.length / rowsPerPage);

  /* ----------------------------
     EXPORT EXCEL
  ----------------------------- */
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filtered);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Call Bookings");
    XLSX.writeFile(wb, "call_bookings.xlsx");
  };

  return (
    <div className={styles.pageContainer}>
      <h1>Call Booking</h1>

      {/* FILTERS */}
      <div className={styles.filtersRow}>
        <input
          type="text"
          placeholder="Search by name, mobile..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.input}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={styles.input}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className={styles.input}
        />

        <button onClick={exportExcel} className={styles.exportBtn}>
          Export Excel
        </button>
      </div>

      {/* TABLE */}
      <div className={styles.tableWrapper}>
        <table className={styles.bookingTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Guest Email</th>
              <th>Message</th>
              <th>Asset Value</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((b) => (
              <tr key={b.id}>
                <td>{b.fullName}</td>
                <td>{b.mobile}</td>
                <td>{b.email}</td>
                <td>{b.guestEmail}</td>
                <td>{b.message}</td>
                <td>{b.investmentRange}</td>
                <td>{b.date}</td>
                <td>{b.time}</td>

                <td>
                  <select
                    value={b.status}
                    onChange={(e) => updateStatus(b.id, e.target.value)}
                    className={styles.statusSelect}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>

                <td>
                  <div className={styles.actionGroup}>
                    <button
                      className={styles.viewBtn}
                      onClick={() => setViewBooking(b)}
                    >
                      View
                    </button>
                    <button
                      className={styles.editBtn}
                      onClick={() => setEditBooking({ ...b })}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => deleteBooking(b.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* PAGINATION */}
      <div className={styles.pagination}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={styles.prevBtn}
        >
          ⬅ Prev
        </button>

        <div className={styles.pageNumbers}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              className={`${styles.pageBtn} ${page === pageNum ? styles.active : ""}`}
              onClick={() => setPage(pageNum)}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className={styles.nextBtn}
        >
          Next ➡
        </button>
      </div>

      {/* ----------------------
          VIEW MODAL
      ----------------------- */}
      {viewBooking && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h2>Booking Details</h2>

            <p><b>Name:</b> {viewBooking.fullName}</p>
            <p><b>Mobile:</b> {viewBooking.mobile}</p>
            <p><b>Email:</b> {viewBooking.email}</p>
            <p><b>Guest Email:</b> {viewBooking.guestEmail}</p>
            <p><b>Message:</b> {viewBooking.message}</p>
            <p><b>Investment Range:</b> {viewBooking.investmentRange}</p>
            <p><b>Date:</b> {viewBooking.date}</p>
            <p><b>Time:</b> {viewBooking.time}</p>
            <p><b>Status:</b> {viewBooking.status}</p>

            <button className={styles.closeBtn} onClick={() => setViewBooking(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* ----------------------
          EDIT MODAL
      ----------------------- */}
      {editBooking && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h2>Edit Booking</h2>

            {Object.keys(emptyForm).map((key) => (
              <input
                key={key}
                type="text"
                placeholder={key}
                value={editBooking[key]}
                onChange={(e) =>
                  setEditBooking({ ...editBooking, [key]: e.target.value })
                }
                className={styles.input}
              />
            ))}

            <button className={styles.saveBtn} onClick={saveEdit}>
              Update
            </button>
            <button className={styles.closeBtn} onClick={() => setEditBooking(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default CallBooking;
