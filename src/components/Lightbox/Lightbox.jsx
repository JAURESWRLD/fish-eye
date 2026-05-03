'use client';
import { useEffect, useRef } from 'react';
import styles from './Lightbox.module.css';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronLeft, 
  faChevronRight, 
  faXmark
} from '@fortawesome/free-solid-svg-icons';

export default function Lightbox({ medias, currentIndex, onClose, onPrev, onNext }) {
  const media = medias[currentIndex];
  const closeBtnRef = useRef(null);
  const overlayRef = useRef(null); 

    useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();

      if (e.key === 'Tab') {
        const focusableElements = overlayRef.current.querySelectorAll('button, video');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) { // Shift + Tab (Reculer)
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else { // Tab (Avancer)
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div className={styles.overlay}
     role="dialog" 
     aria-label="Image en grand" 
     tabIndex='-1' 
     ref={overlayRef}>
      <button className={styles.prev} 
        onClick={onPrev} 
        aria-label="Image précédente"
        >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <div className={styles.content}>

        {media.image ? (
          <Image
            src={`/images/${media.image}`}
            alt={media.title}
            width={800}
            height={600}
            className={styles.media}
            priority
          />
        ) : (
          <video
            src={`/images/${media.video}`}
            className={styles.media}
            controls
            autoPlay
            aria-label={media.title}
          />
        )}

        <p className={styles.title}>
          {media.title}
        </p>
      </div>

      <button
       className={styles.next}
       onClick={onNext} 
       aria-label="Image suivante"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
        <button
         ref={closeBtnRef}
         className={styles.closeBtn} 
         onClick={onClose} 
         aria-label="Fermer la fenêtre"
         >
          <FontAwesomeIcon icon={faXmark} />
        </button>
    </div>
  );
}