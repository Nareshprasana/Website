import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaSave,
  FaTrashAlt,
  FaCheck,
  FaTimes,
  FaCalendarCheck
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Availability.module.css";

function Availability() {
  // Helper to format Date to YYYY-MM-DD
  const formatDate = (date) => {
    if (!date) return "";
    // Ensure we use local time YYYY-MM-DD
    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60000);
    return local.toISOString().split("T")[0];
  };

  const getValidToday = () => {
    const today = new Date();
    const day = today.getDay(); // 0 = Sunday
    if (day === 0) {
      today.setDate(today.getDate() + 1); // Move to Monday
    }
    return today;
  };

  const [selectedDate, setSelectedDate] = useState(getValidToday());
  const [unavailableSlots, setUnavailableSlots] = useState([]);

  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM"
  ];

  const toggleSlot = (slot) => {
    const dateStr = formatDate(selectedDate);
    const key = `${dateStr}-${slot}`;

    if (unavailableSlots.includes(key)) {
      setUnavailableSlots(unavailableSlots.filter((s) => s !== key));
    } else {
      setUnavailableSlots([...unavailableSlots, key]);
    }
  };

  const isUnavailable = (slot) => {
    const dateStr = formatDate(selectedDate);
    return unavailableSlots.includes(`${dateStr}-${slot}`);
  };

  const handleSave = () => {
    const dateStr = formatDate(selectedDate);
    const selectedDaySlots = unavailableSlots.filter((s) =>
      s.startsWith(dateStr)
    );

    console.log("Saved unavailable slots:", selectedDaySlots);

    alert("Availability saved successfully!");
  };

  const handleClear = () => {
    const dateStr = formatDate(selectedDate);
    setUnavailableSlots(
      unavailableSlots.filter((s) => !s.startsWith(dateStr))
    );

    alert("Cleared unavailable slots for " + dateStr);
  };

  return (
    <div className={styles.availabilityContainer}>
      <h1>
        <FaCalendarCheck className={styles.titleIcon} />
        Availability
      </h1>

      {/* DATE PICKER */}
      <div className={styles.datePickerWrapper}>
        <FaCalendarAlt className={styles.calendarIcon} />
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          filterDate={(date) => date.getDay() !== 0} // Disable Sundays
          minDate={new Date()}
          maxDate={new Date(new Date().setMonth(new Date().getMonth() + 1))}
          className={styles.datePicker}
          dateFormat="yyyy-MM-dd"
        />
      </div>

      <div className={styles.slotsContainer}>
        <h3 className={styles.slotsTitle}>
          <FaCalendarAlt className={styles.slotTitleIcon} />
          Select unavailable time slots for {formatDate(selectedDate)}
        </h3>

        <div className={styles.slotsGrid}>
          {timeSlots.map((slot) => (
            <button
              key={slot}
              className={`${styles.slotBtn} ${isUnavailable(slot) ? styles.unavailable : ""
                }`}
              onClick={() => toggleSlot(slot)}
            >
              {slot}
              {isUnavailable(slot) ? (
                <FaTimes className={styles.slotStatusIcon} />
              ) : (
                <FaCheck className={styles.slotStatusIcon} />
              )}
            </button>
          ))}
        </div>

        {/* ACTION BUTTONS */}
        <div className={styles.actionButtons}>
          <button className={styles.saveBtn} onClick={handleSave}>
            <FaSave className={styles.btnIcon} />
            Save
          </button>

          <button className={styles.clearBtn} onClick={handleClear}>
            <FaTrashAlt className={styles.btnIcon} />
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default Availability;