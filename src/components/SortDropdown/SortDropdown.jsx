'use client';
import { useState } from 'react';
import styles from './SortDropdown.module.css';
import MediaGrid from '@/components/MediaGrid/MediaGrid';

const SORT_OPTIONS = [
  { label: 'Popularité', value: 'likes' },
  { label: 'Date', value: 'date' },
  { label: 'Titre', value: 'title' },
];

export default function SortDropdown({ medias }) {
  const [sortBy, setSortBy] = useState('likes');
  const [isOpen, setIsOpen] = useState(false);

  const currentLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label;

  const sortedMedias = [...medias].sort((a, b) => {
    if (sortBy === 'likes') return b.likes - a.likes;
    if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  const handleSelect = (value) => {
    setSortBy(value);
    setIsOpen(false);
  };

  return (
    <div>
      <div className={styles.sortBar}>
        <span className={styles.label}>Trier par</span>
        <div className={styles.dropdown}>
          <button
            className={styles.toggle}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
          >
            {currentLabel}
            <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
          </button>
          {isOpen && (
            <ul className={styles.menu} role="listbox">
              {SORT_OPTIONS.map((option) => (
                <li
                  key={option.value}
                  className={`${styles.option} ${sortBy === option.value ? styles.active : ''}`}
                  onClick={() => handleSelect(option.value)}
                  role="option"
                  aria-selected={sortBy === option.value}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <MediaGrid medias={sortedMedias} />
    </div>
  );
}