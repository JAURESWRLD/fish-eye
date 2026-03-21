'use client';
import styles from './MediaCard.module.css';
import Image from 'next/image';
import { useState } from 'react';

export default function MediaCard({ media, onOpen }) {
  const { title, image, video, likes } = media;
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <article className={styles.card} onClick={onOpen}>
      <div className={styles.media}>
        {image ? (
          <Image
            src={`/images/${image}`}
            alt={title}
            width={350}
            height={250}
            className={styles.image}
          />
        ) : (
          <video className={styles.video} src={`/images/${video}`} muted />
        )}
      </div>
      <div className={styles.footer}>
        <p className={styles.title}>{title}</p>
        <div className={styles.likes}>
          <span>{likeCount}</span>
          <button
            className={`${styles.likeBtn} ${liked ? styles.liked : ''}`}
            onClick={handleLike}
            aria-label={`Aimer ${title}`}
          >
            ♥
          </button>
        </div>
      </div>
    </article>
  );
}