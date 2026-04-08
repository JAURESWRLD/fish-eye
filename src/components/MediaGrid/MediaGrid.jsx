'use client';
import styles from './MediaGrid.module.css';
import MediaCard from '@/components/MediaCard/MediaCard';
import { useState } from 'react';
import Lightbox from '../Lightbox/Lightbox';

export default function MediaGrid({ medias, onLike }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const handlePrev = () =>
    setLightboxIndex((prev) => (prev - 1 + medias.length) % medias.length);

  const handleNext = () =>
    setLightboxIndex((prev) => (prev + 1) % medias.length);

  return (
    <section className={styles.grid}>
      {medias.map((media, index) => (
        <MediaCard
         key={media.id} 
         media={media} 
         onOpen={() => setLightboxIndex(index)}
         onLike={onLike}
         />
      ))}
      {lightboxIndex !== null && (
        <Lightbox
          medias={medias}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </section>
  );
}