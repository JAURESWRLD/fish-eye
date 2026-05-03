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
    if (!form.firstName || !form.lastName || !form.email || !form.message) {
      alert('Veuillez remplir tous les champs du formulaire.');
      return;
    }
    console.log('Form submitted:', form);
    alert('Formulaire soumis avec succès !');
    onClose();
  };

  const modalRef = useRef(null);
  // Sauvegarder l'élément qui a ouvert la modale pour y restaurer le focus à la fermeture
  const triggerRef = useRef(null);

  useEffect(() => {
    // Mémoriser l'élément actif avant l'ouverture
    triggerRef.current = document.activeElement;

    const modalElement = modalRef.current;
    const focusableElements = modalElement.querySelectorAll(
      'input, textarea, button, [tabindex]:not([tabindex="-1"])'
    // inputs et textarea listés AVANT button, pour que le focus
    //    initial aille sur le premier champ et non sur le bouton close 
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKeyPress = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    const handleEscKeyPress = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleTabKeyPress);
    window.addEventListener('keydown', handleEscKeyPress);

    // Auto-focus sur le premier champ à l'ouverture
    firstElement?.focus();

    return () => {
      window.removeEventListener('keydown', handleTabKeyPress);
      window.removeEventListener('keydown', handleEscKeyPress);
      //Restaurer le focus sur l'élément déclencheur à la fermeture
      triggerRef.current?.focus();
    };
  }, [onClose]);

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
          <h2 id="contact-title" className={styles.title}>
            Contactez-moi <br /> {photographerName}
          </h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Fermer le formulaire de contact"
          >
            ✕
          </button>
        </div>

        <div className={styles.fields}>
          <div className={styles.field}>
            <label htmlFor="firstName">Prénom</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              aria-required="true"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="lastName">Nom</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              aria-required="true"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              aria-required="true"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="message">Votre message</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              required
              aria-required="true"
            />
          </div>
        </div>

        <button
          className={styles.submitBtn}
          onClick={handleSubmit}
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}
