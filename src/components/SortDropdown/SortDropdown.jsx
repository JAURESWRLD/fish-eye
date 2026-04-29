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
  const activeId = `option-${SORT_OPTIONS[focusedIndex].value}`;

  const sortedMedias = useMemo(() => {
    const data = [...medias];
    if (sortBy === "likes") return data.sort((a, b) => b.likes - a.likes);
    if (sortBy === "date") return data.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sortBy === "title") return data.sort((a, b) => a.title.localeCompare(b.title));
    return data;
  }, [medias, sortBy]);

  const handleSelect = (value) => {
    setSortBy(value);
    setIsOpen(false);
    toggleRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      toggleRef.current?.focus();
      return;
    }

    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(SORT_OPTIONS.findIndex((o) => o.value === sortBy));
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev + 1) % SORT_OPTIONS.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev - 1 + SORT_OPTIONS.length) % SORT_OPTIONS.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect(SORT_OPTIONS[focusedIndex].value);
    } else if (e.key === "Tab") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("[data-dropdown]")) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <div className={styles.sortBar}>
        <span className={styles.label} id="order-label">Trier par</span>
        <div className={styles.dropdown} data-dropdown>
          <button
            ref={toggleRef}
            id="order-toggle"
            className={styles.toggle}
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            role="combobox"
            aria-controls="sort-listbox"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-labelledby="order-label order-toggle"
            aria-activedescendant={isOpen ? activeId : undefined}
          >
            {currentLabel}
            <span className={styles.arrow}>
              <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} aria-hidden="true" />
            </span>
          </button>
          {isOpen && (
            <ul
              id="sort-listbox"
              className={styles.menu}
              role="listbox"
            >
              {SORT_OPTIONS.map((option, index) => (
                <li
                  key={option.value}
                  id={`option-${option.value}`}
                  role="option"
                  aria-selected={focusedIndex === index}
                  className={`${styles.option} ${focusedIndex === index ? styles.focused : ""} ${sortBy === option.value ? styles.active : ""}`}
                  onClick={() => handleSelect(option.value)}
                  onMouseEnter={() => setFocusedIndex(index)}
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
