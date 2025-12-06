import React, { useState, useEffect } from "react";
import styles from "./ContactUs.module.css";
import api from "../api/axios";

function ContactUs() {
  const [messages, setMessages] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  // Modals
  const [viewData, setViewData] = useState(null);
  const [editData, setEditData] = useState(null);

  const emptyForm = {
    name: "",
    email: "",
    subject: "",
    message: "",
    status: "Pending",
  };

  /* ------------------------------
     LOAD INITIAL SAMPLE MESSAGE
  ------------------------------- */
  /* ------------------------------
     LOAD REAL MESSAGES
  ------------------------------- */
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await api.get("/contact/all");
      setMessages(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  };

  /* ------------------------------
     SEARCH FILTER
  ------------------------------- */
  useEffect(() => {
    let data = messages;

    if (search) {
      data = data.filter((msg) =>
        Object.values(msg)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    setFiltered(data);
    setPage(1);
  }, [search, messages]);

  /* ------------------------------
     UPDATE STATUS
  ------------------------------- */
  const updateStatus = async (id, status) => {
    try {
      await api.put(`/contact/update/${id}`, { status });
      const updated = messages.map((msg) =>
        msg.id === id ? { ...msg, status } : msg
      );
      setMessages(updated);
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Status update failed");
    }
  };

  /* ------------------------------
     EDIT MESSAGE
  ------------------------------- */
  const saveEdit = async () => {
    try {
      await api.put(`/contact/update/${editData.id}`, editData);

      const updated = messages.map((msg) =>
        msg.id === editData.id ? editData : msg
      );

      setMessages(updated);
      setEditData(null);
    } catch (err) {
      console.error("Failed to update message", err);
      alert("Update failed");
    }
  };

  /* ------------------------------
     DELETE MESSAGE
  ------------------------------- */
  const deleteMessage = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await api.delete(`/contact/delete/${id}`);
        setMessages(messages.filter((msg) => msg.id !== id));
      } catch (err) {
        console.error("Failed to delete", err);
        alert("Delete failed");
      }
    }
  };

  /* ------------------------------
     PAGINATION
  ------------------------------- */
  const paginated = filtered.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const totalPages = Math.ceil(filtered.length / rowsPerPage);

  return (
    <div className={styles.pageContainer}>
      <h1>Contact Messages</h1>

      {/* SEARCH FILTER */}
      <input
        type="text"
        placeholder="Search here..."
        className={styles.input}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <div className={styles.tableWrapper}>
        <table className={styles.mainTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((msg) => (
              <tr key={msg.id}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.subject}</td>
                <td>{msg.message}</td>

                <td>
                  <select
                    value={msg.status}
                    onChange={(e) => updateStatus(msg.id, e.target.value)}
                    className={styles.statusSelect}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>

                <td>
                  <button
                    className={styles.viewBtn}
                    onClick={() => setViewData(msg)}
                  >
                    View
                  </button>

                  <button
                    className={styles.editBtn}
                    onClick={() => setEditData({ ...msg })}
                  >
                    Edit
                  </button>

                  <button
                    className={styles.deleteBtn}
                    onClick={() => deleteMessage(msg.id)}
                  >
                    Delete
                  </button>
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

      {/* --------------------------
          VIEW MODAL
      --------------------------- */}
      {viewData && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h2>Message Details</h2>

            <p><b>Name:</b> {viewData.name}</p>
            <p><b>Email:</b> {viewData.email}</p>
            <p><b>Subject:</b> {viewData.subject}</p>
            <p><b>Message:</b> {viewData.message}</p>
            <p><b>Status:</b> {viewData.status}</p>

            <button
              className={styles.closeBtn}
              onClick={() => setViewData(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* --------------------------
          EDIT MODAL
      --------------------------- */}
      {editData && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h2>Edit Message</h2>

            {Object.keys(emptyForm).map((key) =>
              key !== "status" ? (
                <input
                  key={key}
                  type="text"
                  placeholder={key}
                  value={editData[key]}
                  onChange={(e) =>
                    setEditData({ ...editData, [key]: e.target.value })
                  }
                  className={styles.modalInput}
                />
              ) : null
            )}

            {/* STATUS INSIDE EDIT MODAL */}
            <select
              className={styles.modalInput}
              value={editData.status}
              onChange={(e) =>
                setEditData({ ...editData, status: e.target.value })
              }
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>

            <button className={styles.saveBtn} onClick={saveEdit}>
              Update
            </button>

            <button
              className={styles.closeBtn}
              onClick={() => setEditData(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactUs;
