'use client';
import styles from './PhotographeHeader.module.css';
import Image from 'next/image';
import { useState } from 'react';
import ContactModal from '../ContactModal/ContactModal';

export default function PhotographerHeader({ photographer }) {
  const { name, city, country, tagline, price, portrait } = photographer;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.info}>
        <h1 className={styles.name}>{name}</h1>
        <p className={styles.location}>{city}, {country}</p>
        <p className={styles.tagline}>{tagline}</p>
      </div>

      <button className={styles.contactBtn} onClick={() => setIsModalOpen(true)}>
        Contactez-moi
      </button>

      <Image
        src={`/images/${portrait}`}
        alt={name}
        width={200}
        height={200}
        className={styles.portrait}
      />
      {isModalOpen && (
        <ContactModal
          photographerName={name}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </header>
  );
}