// src/components/PhotographerCard/PhotographerCard.jsx
import styles from './PhotographerCard.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function PhotographerCard({ photographer }) {
  const { id, name, city, country, tagline, price, portrait } = photographer;

  return (
    <article>
      <Link
       href={`/photographe/${id}`} 
       className={styles.card} 
       aria-label={name}
      >
        <Image
          src={`/images/${portrait}`}
          alt=''
          width={200}
          height={200}
          className={styles.portrait}
          priority
        />
        <h2 className={styles.name}>{name}</h2>
      </Link>
      <div className={styles.info}>
        <p className={styles.location}>
          {`${city}, ${country}`}
        </p>
        <p className={styles.tagline}>
          {tagline}
        </p>
        <p className={styles.price} >
          {`${price}€/jour`}
        </p>
      </div>
    </article>

  );
}



