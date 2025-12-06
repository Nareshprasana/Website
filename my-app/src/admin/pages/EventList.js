import React, { useState } from "react";
import styles from "./EventList.module.css";
import sampleImg from "../assets/Asset 8 1.jpg"; // replace with event images

function EventList() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Investment Awareness Seminar",
      date: "12 February 2025",
      description: "A seminar focusing on investment strategies and wealth planning.",
      image: sampleImg,
    },
    {
      id: 2,
      title: "Mutual Fund Webinar",
      date: "15 March 2025",
      description: "A free online webinar to understand mutual fund structures & risks.",
      image: sampleImg,
    },
  ]);

  const [search, setSearch] = useState("");
  const [filterMonth, setFilterMonth] = useState("");

  // Filter logic
  const filteredEvents = events.filter((event) => {
    const matchSearch = event.title.toLowerCase().includes(search.toLowerCase());
    const matchMonth = filterMonth
      ? event.date.toLowerCase().includes(filterMonth.toLowerCase())
      : true;

    return matchSearch && matchMonth;
  });

  const deleteEvent = (id) => {
    if (window.confirm("Delete this event?")) {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Event List</h1>

      {/* Search + Filter */}
      <div className={styles.topBar}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search Events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className={styles.filterSelect}
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
        >
          <option value="">Filter by Month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>

      {/* Event Cards Grid */}
      <div className={styles.cardGrid}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div className={styles.card} key={event.id}>
              <img src={event.image} alt="Event" className={styles.cardImage} />

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{event.title}</h3>
                <p className={styles.cardDate}>{event.date}</p>

                <p className={styles.cardDescription}>
                  {event.description.slice(0, 80)}...
                </p>

                <div className={styles.cardActions}>
                  <button className={styles.editBtn}>Edit</button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => deleteEvent(event.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.emptyMessage}>No events found.</p>
        )}
      </div>
    </div>
  );
}

export default EventList;
