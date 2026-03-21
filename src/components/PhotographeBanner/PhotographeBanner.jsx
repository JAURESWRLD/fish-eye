'use client';
import styles from './PhotographeBanner.module.css';
import { useState } from 'react';

export default function PhotographerBanner({ medias, price }) {
  const totalLikes = medias.reduce((acc, media) => acc + media.likes, 0);

  return (
    <div className={styles.banner}>
      <span className={styles.likes}>
        {totalLikes} ♥
      </span>
      <span className={styles.price}>
        {price}€ / jour
      </span>
    </div>
  );
}