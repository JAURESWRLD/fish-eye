'use client';
import { useState } from 'react';
import styles from './ContactModal.module.css';

export default function ContactModal({ photographerName, onClose }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', form);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <h2>Contactez-moi</h2>
            <h2>{photographerName}</h2>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Fermer">
            ✕
          </button>
        </div>

        <div className={styles.fields}>
          <label>
            Prénom
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />
          </label>

          <label>
            Nom
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </label>

          <label>
            Votre message
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
            />
          </label>
        </div>

        <button className={styles.submitBtn} onClick={handleSubmit}>
          Envoyer
        </button>
      </div>
    </div>
  );
}