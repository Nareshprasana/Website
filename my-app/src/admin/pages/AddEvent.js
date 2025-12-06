import React, { useState } from "react";
import styles from "./AddEvent.module.css";

function AddEvent() {
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Month options
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Generate year options (current year and next 5 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear + i);

  // Generate day options based on selected month and year
  const getDaysInMonth = () => {
    if (!month || !year) return Array.from({ length: 31 }, (_, i) => i + 1);
    
    const monthIndex = months.indexOf(month);
    const lastDay = new Date(year, monthIndex + 1, 0).getDate();
    return Array.from({ length: lastDay }, (_, i) => i + 1);
  };

  // Handle Multiple Image Uploads
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Limit to 10 images
    if (images.length + files.length > 10) {
      alert("Maximum 10 images allowed");
      return;
    }
    
    setImages((prev) => [...prev, ...files]);
    
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  // Remove one image
  const removeImage = (index) => {
    URL.revokeObjectURL(previews[index]); // Clean up memory
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    
    setImages(updatedImages);
    setPreviews(updatedPreviews);
  };

  // Clear all images
  const clearAllImages = () => {
    previews.forEach(preview => URL.revokeObjectURL(preview));
    setImages([]);
    setPreviews([]);
  };

  // Format date for display
  const formatDate = () => {
    if (!day || !month || !year) return "";
    return `${day} ${month} ${year}`;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate date
    if (!day || !month || !year) {
      setSubmitStatus({
        type: "error",
        message: "Please select day, month, and year"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formattedDate = formatDate();
      const eventData = {
        title,
        date: {
          day: parseInt(day),
          month,
          year: parseInt(year),
          formatted: formattedDate
        },
        description,
        images: images.map((file, index) => ({
          name: file.name,
          size: file.size,
          type: file.type,
          preview: previews[index]
        }))
      };

      console.log("Event Added:", eventData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus({
        type: "success",
        message: "Event added successfully!"
      });

      // Reset fields after successful submission
      setTimeout(() => {
        resetForm();
        setSubmitStatus(null);
      }, 3000);

    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to add event. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setTitle("");
    setDay("");
    setMonth("");
    setYear("");
    setDescription("");
    previews.forEach(preview => URL.revokeObjectURL(preview));
    setImages([]);
    setPreviews([]);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Add New Event</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Event Title *</label>
          <input
            type="text"
            value={title}
            placeholder="Enter event title"
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={100}
          />
          <div className={styles.charCounter}>
            {title.length}/100
          </div>
        </div>

        {/* Date Selection Section */}
        <div className={styles.dateSection}>
          <h3 className={styles.sectionTitle}>Event Date *</h3>
          <div className={styles.dateGrid}>
            {/* Day Selector */}
            <div className={styles.formGroup}>
              <label>Day</label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                required
                className={styles.selectInput}
              >
                <option value="">Select Day</option>
                {getDaysInMonth().map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Month Selector */}
            <div className={styles.formGroup}>
              <label>Month</label>
              <select
                value={month}
                onChange={(e) => {
                  setMonth(e.target.value);
                  // Reset day when month changes
                  if (day) setDay("");
                }}
                required
                className={styles.selectInput}
              >
                <option value="">Select Month</option>
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Selector */}
            <div className={styles.formGroup}>
              <label>Year</label>
              <select
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                  // Reset day when year changes
                  if (day) setDay("");
                }}
                required
                className={styles.selectInput}
              >
                <option value="">Select Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Selected Date Preview */}
          {(day || month || year) && (
            <div className={styles.selectedDate}>
              <span className={styles.dateLabel}>Selected Date:</span>
              <span className={styles.datePreview}>{formatDate()}</span>
            </div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Description *</label>
          <textarea
            rows="4"
            value={description}
            placeholder="Enter event description"
            onChange={(e) => setDescription(e.target.value)}
            required
            maxLength={500}
          ></textarea>
          <div className={`${styles.charCounter} ${description.length > 450 ? styles.warning : ""}`}>
            {description.length}/500
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Upload Images ({images.length}/10)</label>
          <div className={styles.uploadSection}>
            <input 
              type="file" 
              accept="image/*"
              multiple
              onChange={handleImageChange}
              disabled={images.length >= 10}
            />
            {images.length > 0 && (
              <button
                type="button"
                className={styles.clearAllBtn}
                onClick={clearAllImages}
              >
                Clear All
              </button>
            )}
          </div>

          {/* Image Preview Grid */}
          {previews.length > 0 && (
            <>
              <div className={styles.previewGrid}>
                {previews.map((src, index) => (
                  <div key={index} className={styles.previewBox}>
                    <img 
                      src={src} 
                      alt={`Preview ${index + 1}`} 
                      className={styles.preview} 
                    />
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => removeImage(index)}
                      aria-label={`Remove image ${index + 1}`}
                    >
                      ✖
                    </button>
                    <div className={styles.imageInfo}>
                      {images[index]?.name?.substring(0, 15)}...
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.imageCount}>
                {previews.length} image{previews.length !== 1 ? 's' : ''} selected
              </div>
            </>
          )}
        </div>

        {/* Submit Status */}
        {submitStatus && (
          <div className={`${styles.formStatus} ${styles[submitStatus.type]}`}>
            {submitStatus.type === "success" ? "✓" : "✗"} {submitStatus.message}
          </div>
        )}

        <button 
          className={`${styles.submitButton} ${isSubmitting ? styles.loading : ""}`} 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding Event..." : "Add Event"}
        </button>
      </form>
    </div>
  );
}

export default AddEvent;