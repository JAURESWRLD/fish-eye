"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import styles from "./SortDropdown.module.css";
import MediaGrid from "@/components/MediaGrid/MediaGrid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const SORT_OPTIONS = [
  { label: "Popularité", value: "likes" },
  { label: "Date", value: "date" },
  { label: "Titre", value: "title" },
];

export default function SortDropdown({ medias, onLike }) {
  const [sortBy, setSortBy] = useState("likes");
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const toggleRef = useRef(null);

  const currentLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label;
  const activeDescendantId = isOpen
    ? `option-${SORT_OPTIONS[focusedIndex].value}`
    : undefined;

  const sortedMedias = useMemo(() => {
    const data = [...medias];
    if (sortBy === "likes") return data.sort((a, b) => b.likes - a.likes);
    if (sortBy === "date")
      return data.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sortBy === "title")
      return data.sort((a, b) => a.title.localeCompare(b.title));
    return data;
  }, [medias, sortBy]);

  const handleSelect = (value) => {
    setSortBy(value);
    setIsOpen(false);
    toggleRef.current?.focus();
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (isOpen) {
        handleSelect(SORT_OPTIONS[focusedIndex].value);
      } else {
        setIsOpen(true);
        setFocusedIndex(SORT_OPTIONS.findIndex((o) => o.value === sortBy));
      }
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setFocusedIndex(SORT_OPTIONS.findIndex((o) => o.value === sortBy));
      } else {
        setFocusedIndex((prev) => (prev + 1) % SORT_OPTIONS.length);
      }
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setFocusedIndex(SORT_OPTIONS.findIndex((o) => o.value === sortBy));
      } else {
        setFocusedIndex(
          (prev) => (prev - 1 + SORT_OPTIONS.length) % SORT_OPTIONS.length,
        );
      }
    }
    if (e.key === "Escape") {
      setIsOpen(false);
      toggleRef.current?.focus();
    }
    if (e.key === "Tab") {
      setIsOpen(false);
    }
  };

  // Fermer si clic en dehors
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("[data-dropdown]")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <div className={styles.sortBar}>
        <span className={styles.label} id="order-label">
          Trier par
        </span>
        <div className={styles.dropdown} data-dropdown>
          <button
            ref={toggleRef}
            id="order-toggle"
            className={styles.toggle}
            onClick={() => setIsOpen(!isOpen)}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-labelledby="order-label"
            aria-activedescendant={activeDescendantId} // ← ici
            onKeyDown={handleKeyDown}
          >
            {currentLabel}
            <span className={styles.arrow}>
              <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
            </span>
          </button>
          {isOpen && (
            <ul
              className={styles.menu}
              role="listbox"
              aria-labelledby="order-label order-toggle"
            >
              {SORT_OPTIONS.map((option, index) => (
                <li
                  key={option.value}
                  id={`option-${option.value}`}
                  className={`${styles.option} ${focusedIndex === index ? styles.focused : ""} ${sortBy === option.value ? styles.active : ""}`}
                  onClick={() => handleSelect(option.value)}
                  aria-selected={sortBy === option.value}
                  role="option"
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <MediaGrid medias={sortedMedias} onLike={onLike} />
    </div>
  );
}
