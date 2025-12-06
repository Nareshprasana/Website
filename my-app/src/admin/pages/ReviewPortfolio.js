import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import styles from "./ReviewPortfolio.module.css";
import api from "../api/axios";

function ReviewPortfolio() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);

  const rowsPerPage = 6;

  // Modal States
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // Load Data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("/review_portfolio/list");
      // Ensure status is present
      const processed = res.data.map(item => ({
        ...item,
        status: item.status || "Pending"
      }));
      setData(processed);
      setFiltered(processed);
    } catch (err) {
      console.error("Failed to fetch review portfolio requests", err);
    }
  };

  // SEARCH + STATUS FILTER
  useEffect(() => {
    let result = data;

    if (search.trim() !== "") {
      result = result.filter((item) =>
        Object.values(item).join(" ").toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      result = result.filter((item) => item.status === statusFilter);
    }

    setFiltered(result);
    setPage(1);
  }, [search, statusFilter, data]);

  // PAGINATION
  const paginated = filtered.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const totalPages = Math.ceil(filtered.length / rowsPerPage);

  // EXPORT EXCEL
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filtered);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Review Portfolio");
    XLSX.writeFile(wb, "review_portfolio.xlsx");
  };

  // DELETE
  const deleteRecord = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await api.delete(`/review_portfolio/${id}`);
        setData(data.filter((item) => item.id !== id));
      } catch (err) {
        console.error("Failed to delete", err);
        alert("Failed to delete record");
      }
    }
  };

  // UPDATE RECORD (from modal)
  const updateRecord = async () => {
    try {
      await api.put(`/review_portfolio/${editItem.id}`, editItem);

      const updated = data.map((item) =>
        item.id === editItem.id ? editItem : item
      );
      setData(updated);
      setShowEditModal(false);
    } catch (err) {
      console.error("Failed to update record", err);
      alert("Failed to update record");
    }
  };

  // STATUS CHANGE FROM TABLE
  const updateStatus = async (id, newStatus) => {
    try {
      // Backend expects status as query param: /api/review_portfolio/{id}/status?status=...
      await api.patch(`/review_portfolio/${id}/status?status=${newStatus}`);

      const updated = data.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      );
      setData(updated);
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update status");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1>Review Portfolio</h1>

      {/* FILTERS */}
      <div className={styles.filtersRow}>
        <input
          type="text"
          placeholder="Search name, email, contact..."
          value={search}
          className={styles.input}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Status Filter */}
        <select
          className={styles.input}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <button className={styles.exportBtn} onClick={exportExcel}>
          Export Excel
        </button>
      </div>

      {/* TABLE */}
      <div className={styles.tableWrapper}>
        <table className={styles.reviewTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Number</th>
              <th>Investment Value</th>
              <th>Email</th>
              <th>Agreed?</th>
              <th>Status</th> {/* NEW COLUMN */}
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((item) => (
              <tr key={item.id} className={styles.rowHover}>
                <td>{item.fullName}</td>
                <td>{item.contactNumber}</td>
                <td>{item.investmentValue}</td>
                <td>{item.email}</td>
                <td>
                  {item.agreeToPolicy ? (
                    <span className={styles.yesBadge}>Yes</span>
                  ) : (
                    <span className={styles.noBadge}>No</span>
                  )}
                </td>

                {/* STATUS DROPDOWN */}
                <td>
                  <select
                    className={styles.statusSelect}
                    value={item.status}
                    onChange={(e) => updateStatus(item.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>

                <td className={styles.actions}>
                  <button
                    className={styles.editBtn}
                    onClick={() => {
                      setEditItem(item);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className={styles.deleteBtn}
                    onClick={() => deleteRecord(item.id)}
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

      {/* EDIT MODAL */}
      {showEditModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Edit Record</h2>

            <input
              type="text"
              value={editItem.fullName}
              onChange={(e) =>
                setEditItem({ ...editItem, fullName: e.target.value })
              }
            />

            <input
              type="text"
              value={editItem.contactNumber}
              onChange={(e) =>
                setEditItem({ ...editItem, contactNumber: e.target.value })
              }
            />

            <input
              type="text"
              value={editItem.investmentValue}
              onChange={(e) =>
                setEditItem({
                  ...editItem,
                  investmentValue: e.target.value,
                })
              }
            />

            <input
              type="email"
              value={editItem.email}
              onChange={(e) =>
                setEditItem({ ...editItem, email: e.target.value })
              }
            />

            <label>
              <input
                type="checkbox"
                checked={editItem.agreeToPolicy}
                onChange={(e) =>
                  setEditItem({
                    ...editItem,
                    agreeToPolicy: e.target.checked,
                  })
                }
              />
              Agree to Policy
            </label>

            {/* STATUS INSIDE MODAL */}
            <select
              value={editItem.status}
              onChange={(e) =>
                setEditItem({ ...editItem, status: e.target.value })
              }
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>

            <div className={styles.modalActions}>
              <button onClick={() => setShowEditModal(false)}>Cancel</button>
              <button className={styles.saveBtn} onClick={updateRecord}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewPortfolio;
