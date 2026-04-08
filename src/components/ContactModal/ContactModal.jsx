'use client';
import { useState, useEffect, useRef } from 'react';
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

  const modalRef = useRef(null);

 useEffect(() => {
    const modalElement = modalRef.current;
    // Find all focusable elements inside the modal
    const focusableElements = modalElement.querySelectorAll(
      'button, input, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKeyPress = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) { // If Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus(); // Go to last
        }
      } else { // If Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus(); // Go to first
        }
      }
    };

    const handleEscKeyPress = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleTabKeyPress);
    window.addEventListener('keydown', handleEscKeyPress);
    
    // Auto-focus the first input on open
    firstElement?.focus();

    return () => {
      window.removeEventListener('keydown', handleTabKeyPress);
      window.removeEventListener('keydown', handleEscKeyPress);
    };
  }, [onClose]); 

// ... (imports et useEffect inchangés)

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={modalRef}  
        className={styles.modal} 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="contact-title"
        aria-modal="true"
      >
        <div className={styles.header}>
          <h1 id="contact-title" className={styles.title}>Contactez-moi <br /> {photographerName}</h1>
          <button
            className={styles.closeBtn} 
            onClick={onClose} 
            aria-label="Close Contact form"
          >
            ✕
          </button>
        </div>

        <div className={styles.fields}>
          <div className={styles.field}>
            <label id='first-name-label' htmlFor="firstName">Prénom</label>
            <input
              id="firstName" 
              type="text"
              name="firstName"
              aria-labelledby='first-name-label'
              value={form.firstName}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label id='last-name-label' htmlFor="lastName">Nom</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              aria-labelledby='last-name-label'
              value={form.lastName}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label id='email-label' htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              aria-labelledby='email-label'
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label id='message-label' htmlFor="message">Votre message</label>
            <textarea
              id="message"
              name="message"
              aria-labelledby='message-label'
              value={form.message}
              onChange={handleChange}
              rows={5}
            />
          </div>
        </div>

        <button
          className={styles.submitBtn} 
          onClick={handleSubmit} 
          aria-label="Send"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}