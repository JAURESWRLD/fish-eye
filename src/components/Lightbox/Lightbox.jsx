'use client';
import { useEffect } from 'react';
import styles from './Lightbox.module.css';
import Image from 'next/image';

export default function Lightbox({ medias, currentIndex, onClose, onPrev, onNext }) {
  const media = medias[currentIndex];

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div className={styles.overlay} role="dialog" aria-label="Lightbox">
      <button className={styles.prev} onClick={onPrev} aria-label="Précédent">
        ‹
      </button>

      <div className={styles.content}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Fermer">
          ✕
        </button>

        {media.image ? (
          <Image
            src={`/images/${media.image}`}
            alt={media.title}
            width={800}
            height={600}
            className={styles.media}
          />
        ) : (
          <video
            src={`/images/${media.video}`}
            className={styles.media}
            controls
            autoPlay
          />
        )}

        <p className={styles.title}>{media.title}</p>
      </div>

      <button className={styles.next} onClick={onNext} aria-label="Suivant">
        ›
      </button>
    </div>
  );
}