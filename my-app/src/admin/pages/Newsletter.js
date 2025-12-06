import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import styles from "./Newsletter.module.css";

function Newsletter() {
  const [newsletters, setNewsletters] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Filters
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  // Dummy Data (replace with API later)
  useEffect(() => {
    const dummyData = [
      {
        id: "1",
        email: "test@gmail.com",
        date: "2025-12-01"
      },
      {
        id: "2",
        email: "example@yahoo.com",
        date: "2025-12-02"
      },
      {
        id: "3",
        email: "user@domain.com",
        date: "2025-12-03"
      }
    ];
    setNewsletters(dummyData);
    setFiltered(dummyData);
  }, []);

  // Filter Logic
  useEffect(() => {
    let data = newsletters;

    if (search) {
      data = data.filter((n) =>
        n.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (dateFilter) {
      data = data.filter((n) => n.date === dateFilter);
    }

    setFiltered(data);
    setPage(1);
  }, [search, dateFilter, newsletters]);

  // Pagination
  const paginated = filtered.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const totalPages = Math.ceil(filtered.length / rowsPerPage);

  // Export to Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filtered);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Newsletter Data");
    XLSX.writeFile(wb, "newsletter_emails.xlsx");
  };

  return (
    <div className={styles.pageContainer}>
      <h1>Newsletter Subscribers</h1>

      {/* FILTERS */}
      <div className={styles.filtersRow}>
        <input
          type="text"
          placeholder="Search by email..."
          className={styles.input}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="date"
          className={styles.input}
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />

        <button className={styles.exportBtn} onClick={exportExcel}>
          Export Excel
        </button>
      </div>

      {/* TABLE */}
      <div className={styles.tableWrapper}>
        <table className={styles.newsTable}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((item) => (
              <tr key={item.id} className={styles.rowHover}>
                <td>{item.email}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className={styles.pagination}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ⬅ Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}

export default Newsletter;
