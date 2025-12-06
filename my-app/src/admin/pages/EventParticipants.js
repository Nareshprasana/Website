import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import styles from "./EventParticipants.module.css";
import { events as initialEvents, participants as initialParticipants } from "../data/mockData";

function EventParticipants() {
  const [events] = useState(initialEvents || []);
  const [participants, setParticipants] = useState(initialParticipants || []);
  const [selectedEvent, setSelectedEvent] = useState(events.length ? events[0].id : "");

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  useEffect(() => {
    if (!selectedEvent && events.length) setSelectedEvent(events[0].id);
    setPage(1);
  }, [selectedEvent, events]);

  const filtered = participants.filter((p) => p.eventId === selectedEvent && (
    !search || [p.fullName, p.email, p.mobile, p.investmentValue, p.status].join(" ").toLowerCase().includes(search.toLowerCase())
  ));

  const paginated = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filtered);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Participants");
    XLSX.writeFile(wb, `participants_${selectedEvent}.xlsx`);
  };

  const deleteParticipant = (id) => {
    if (!window.confirm("Delete this participant?")) return;
    setParticipants(participants.filter((p) => p.id !== id));
  };

  return (
    <div className={styles.pageContainer}>
      <h1>Event Participants</h1>

      <div className={styles.controlsRow}>
        <select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)} className={styles.select}>
          {events.map((ev) => (
            <option key={ev.id} value={ev.id}>{ev.title} — {ev.date}</option>
          ))}
        </select>

        <input type="text" placeholder="Search participants..." value={search} onChange={(e) => setSearch(e.target.value)} className={styles.input} />

        <button className={styles.exportBtn} onClick={exportExcel}>Export</button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.mainTable}>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Mobile Number</th>
              <th>Investment Value</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.noData}>No participants for this event.</td>
              </tr>
            ) : (
              paginated.map((p) => (
                <tr key={p.id}>
                  <td>{p.fullName}</td>
                  <td>{p.mobile}</td>
                  <td>{p.investmentValue}</td>
                  <td>{p.email}</td>
                  <td>
                    <button className={styles.deleteBtn} onClick={() => deleteParticipant(p.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className={styles.prevBtn}>⬅ Prev</button>
        <div className={styles.pageNumbers}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pnum) => (
            <button key={pnum} className={`${styles.pageBtn} ${page === pnum ? styles.active : ""}`} onClick={() => setPage(pnum)}>{pnum}</button>
          ))}
        </div>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className={styles.nextBtn}>Next ➡</button>
      </div>
    </div>
  );
}

export default EventParticipants;
