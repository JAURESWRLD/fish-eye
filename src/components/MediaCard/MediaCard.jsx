'use client';
import styles from './MediaCard.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

export default function MediaCard({ media, onOpen, onLike }) {
  const { title, image, video, likes, isLiked } = media;
  const [liked, setLiked] = useState(isLiked || false);

  const handleLike = () => {
    const newStatus = !liked;
    setLiked(newStatus);
    onLike(media.id, newStatus);
  };

  return (
    <article className={styles.card}>
      <button
        className={styles.media}
        onClick={onOpen}
        aria-label={`${title}, vue en grand`}
      >
        {image ? (
          <Image
            src={`/images/${image}`}
            alt=""
            width={350}
            height={250}
            className={styles.image}
          />
        ) : (
          <video
            className={styles.video}
            src={`/images/${video}`}
            muted
            aria-hidden="true"
          />
        )}
      </button>

      <div className={styles.footer}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.likes}>
          <button
            className={`${styles.likeBtn} ${liked ? styles.liked : ''}`}
            onClick={handleLike}
            aria-label={`${likes} likes`}
          >
            <span className={styles.count}>{likes}</span>
            <FontAwesomeIcon
              icon={liked ? faHeart : farHeart}
              className={styles.heartIcon}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </article>
  );
}
