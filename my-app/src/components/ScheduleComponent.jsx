import React, { useState, useRef, useEffect, useContext } from "react";
import { ChevronRight, ChevronLeft, Calendar } from "lucide-react";
import styles from "./ScheduleComponent.module.css";
import { useNavigate } from "react-router-dom";
import { DetailsContext } from "./contexts/Details";
import { userDetails } from "./contexts/userDetails";

import { checkSlot } from "../api/flowApi";

const ScheduleComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef(null);
  const navigate = useNavigate();

  const { data, setData } = useContext(DetailsContext);
  const { userData, setUserData } = useContext(userDetails);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time");
      return;
    }

    // Convert date → YYYY-MM-DD for backend
    const backendDate = selectedDate.toISOString().split("T")[0];

    // Convert 12-hour time to 24-hour time
    const convertTo24Hour = (time12h) => {
      let [time, modifier] = time12h.split(" "); // "10:00", "AM"

      let [hours, minutes] = time.split(":");

      if (modifier === "PM" && hours !== "12") {
        hours = String(Number(hours) + 12); // 1 PM → 13
      }

      if (modifier === "AM" && hours === "12") {
        hours = "00"; // 12 AM → 00
      }

      return `${hours}:${minutes}:00`; // add seconds
    };

    const backendTime = convertTo24Hour(selectedTime);
    console.log("Sending to API:", backendDate, backendTime);

    try {
      const res = await checkSlot(backendDate, backendTime);

      if (res.data.available) {
        // Store formatted values in context
        const formattedDate = selectedDate.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        });

        setData((prev) => ({
          ...prev,
          time: selectedTime, // human-readable
          // backendTime: backendTime, // API time
          date: formattedDate,
          // backendDate: backendDate, // API date
        }));

        setUserData((prev) => ({
          ...prev,
          time: backendTime, // human-readable
          // backendTime: backendTime, // API time
          date: backendDate,
          // backendDate: backendDate, // API date
        }));

        navigate("/emailDetails");
      } else {
        alert("Slot full! Choose another time");
      }
    } catch (err) {
      alert("Unable to check slot. Check backend connection.");
      console.error(err);
    }
  };

  // const handleConfirm = () => {
  //   if (!selectedDate) {
  //     alert("Please select a date");
  //     return;
  //   }

  //   const formattedDate = selectedDate.toLocaleDateString("en-US", {
  //     weekday: "short",
  //     month: "short",
  //     day: "numeric",
  //     year: "numeric",
  //   });

  //   setData((prev) => ({
  //     ...prev,
  //     time: selectedTime,
  //     date: formattedDate,
  //   }));

  //   navigate("/emailDetails");
  // };

  const isSunday = (date) => date.getDay() === 0;

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isPast = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i)
      );
    }

    return days;
  };

  const handleDateClick = (date) => {
    if (date && !isSunday(date) && !isPast(date)) {
      setSelectedDate(date);
      setShowCalendar(false);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const calendarDays = generateCalendarDays();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthName = currentMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const formatDate = (date) => {
    if (!date) return null;
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div style={{ width: "100%", backgroundColor: "#1a1a1a" }}>
      <div className={styles["schedule-wrapper"]}>
        <div className={styles.header}>
          <h2>Select date and time</h2>
        </div>

        <div className={styles["date-picker-container"]} ref={calendarRef}>
          <label className={styles["date-label"]}>Select a date:</label>

          <button
            className={`${styles["date-input"]} ${
              showCalendar ? styles.active : ""
            }`}
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <div className={styles["date-input-content"]}>
              <Calendar size={20} className={styles["date-input-icon"]} />
              <span
                className={`${styles["date-input-text"]} ${
                  !selectedDate ? styles.placeholder : ""
                }`}
              >
                {selectedDate ? formatDate(selectedDate) : "Choose your date"}
              </span>
            </div>
            <ChevronRight size={20} className={styles["date-input-arrow"]} />
          </button>

          {showCalendar && (
            <div className={styles["calendar-dropdown"]}>
              <div className={styles["calendar-header"]}>
                <button className={styles["nav-btn"]} onClick={handlePrevMonth}>
                  <ChevronLeft size={18} />
                </button>
                <span className={styles["month-year"]}>{monthName}</span>
                <button className={styles["nav-btn"]} onClick={handleNextMonth}>
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className={styles["day-names-grid"]}>
                {dayNames.map((day) => (
                  <div key={day} className={styles["day-name"]}>
                    {day}
                  </div>
                ))}
              </div>

              <div className={styles["days-grid"]}>
                {calendarDays.map((date, idx) => {
                  const isDisabled = !date || isSunday(date) || isPast(date);
                  const isSelected =
                    selectedDate &&
                    date &&
                    selectedDate.toDateString() === date.toDateString();
                  const isTodayDate = date && isToday(date);

                  return (
                    <button
                      key={idx}
                      className={`${styles.day} ${
                        isTodayDate && !isDisabled ? styles.today : ""
                      } ${isSelected ? styles.selected : ""}`}
                      onClick={() => handleDateClick(date)}
                      disabled={isDisabled}
                    >
                      {date ? date.getDate() : ""}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className={styles["duration-info"]}>
          <div className={styles.dot}></div>
          <span className={styles["duration-text"]}>
            30 min call (Indian Standard Time)
          </span>
        </div>

        <div className={styles["time-section"]}>
          <div className={styles["time-grid"]}>
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`${styles["time-btn"]} ${
                  selectedTime === time ? styles.active : ""
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className={styles["info-box"]}>
          <div className={styles.icon}>💡</div>
          <span className={styles["info-text"]}>
            2,216 users scheduled free meetings with Investza in the past 3
            months
          </span>
        </div>

        <button className={styles["confirm-btn"]} onClick={handleConfirm}>
          Confirm time slot
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ScheduleComponent;
