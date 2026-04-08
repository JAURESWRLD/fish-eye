
import styles from './PhotographeBanner.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'; 

export default function PhotographerBanner({ medias, price }) {
  const totalLikes = medias.reduce((acc, media) => acc + media.likes, 0);

  return (
    <div className={styles.banner}>
      <span className={styles.likes}>
        {totalLikes}
        <FontAwesomeIcon icon={faHeart} />
      </span>
      <span className={styles.price}>
        {price}€ / jour
      </span>
    </div>
  );
}