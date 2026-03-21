// src/components/PhotographeList/PhotographeList.jsx
import styles from './PhotographeList.module.css';
import PhotographerCard from '@/components/PhotographeCard/PhotographeCard';

export default function PhotographeList({ photographers }) {
  if (!photographers || photographers.length === 0) {
    return <p className={styles.erreur}>Aucun photographe trouvé.</p>;
  }

  return (
    <main className={styles.container}>
      <ul className={styles.list}>
        {photographers.map((photographer) => (
          <li key={photographer.id}>
            <PhotographerCard photographer={photographer} />
          </li>
        ))}
      </ul>
    </main>
  );
}