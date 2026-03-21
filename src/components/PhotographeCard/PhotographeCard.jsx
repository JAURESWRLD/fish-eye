// src/components/PhotographerCard/PhotographerCard.jsx
import styles from './PhotographerCard.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function PhotographerCard({ photographer }) {
  const { id, name, city, country, tagline, price, portrait } = photographer;

  return (
    <article>
      <Link href={`/photographe/${id}`} className={styles.card} aria-label={`Voir le profil de ${name}`}>
        <Image
          src={`/images/${portrait}`}
          alt=''
          width={200}
          height={200}
          className={styles.portrait}
        />
        <h2 className={styles.name}>{name}</h2>
      </Link>
      <div className={styles.info}>
        <p className={styles.location} tabIndex="0">
          <span className={styles.srOnly}>Lieu : </span>
          {`${city}, ${country}`}
        </p>
        <p className={styles.tagline} tabIndex="0">
          <span className={styles.srOnly}>Accroche : </span>
          {tagline}
        </p>
        <p className={styles.price} tabIndex="0">
          <span className={styles.srOnly}>Prix : </span>
          {`${price}€/jour`}
        </p>
      </div>
    </article>

  );
}



