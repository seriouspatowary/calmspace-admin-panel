'use client';

import { useState } from 'react';
import styles from './EditCounselorModel.module.css';
import useToast from '../../../hooks/useToast';

const EditCounselorModal = ({ counselorData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: counselorData.counselorId.name,
    email: counselorData.counselorId.email,
    age: counselorData.counselorId.age,
    gender: counselorData.counselorId.gender,
    experience: counselorData.experience,
    degree: counselorData.degree,
    expertise: counselorData.expertise,
    therapy: counselorData.therapy,
    info: counselorData.info,
    chatPrice: counselorData.priceId?.chat || '',
    videoPrice: counselorData.priceId?.video || '',
    audioPrice: counselorData.priceId?.audio || '',
    status: counselorData.status,
  });
   const { showSuccess, showError } = useToast();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Add your API call here to update the counselor
      const response = await fetch('/api/counselor', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          counselorId: counselorData._id,
          ...formData
        }),
      });

      if (response.ok) {
        showSuccess('Counselor updated successfully!');
        setIsOpen(false);
        // Optionally refresh the page or update the UI
        window.location.reload();
      } else {
        alert('Failed to update counselor');
      }
    } catch (error) {
      console.error('Error updating counselor:', error);
      alert('An error occurred while updating');
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className={styles.editButton}
      >
        Edit
      </button>

      {isOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Edit Counselor Details</h2>
              <button 
                onClick={() => setIsOpen(false)} 
                className={styles.closeButton}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Experience (years)</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                    <option value="busy">Busy</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Chat Price (₹)</label>
                  <input
                    type="number"
                    name="chatPrice"
                    value={formData.chatPrice}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Video Price (₹)</label>
                  <input
                    type="number"
                    name="videoPrice"
                    value={formData.videoPrice}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Audio Price (₹)</label>
                  <input
                    type="number"
                    name="audioPrice"
                    value={formData.audioPrice}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                  <label>Degree</label>
                  <input
                    type="text"
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                  <label>Expertise</label>
                  <textarea
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleChange}
                    rows="3"
                  />
                </div>

                <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                  <label>Therapy Types</label>
                  <textarea
                    name="therapy"
                    value={formData.therapy}
                    onChange={handleChange}
                    rows="3"
                  />
                </div>

                <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                  <label>About</label>
                  <textarea
                    name="info"
                    value={formData.info}
                    onChange={handleChange}
                    rows="4"
                  />
                </div>
              </div>

              <div className={styles.buttonGroup}>
                <button 
                  type="button" 
                  onClick={() => setIsOpen(false)}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className={styles.saveButton}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditCounselorModal;