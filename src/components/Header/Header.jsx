"use client"; 

import { usePathname } from 'next/navigation';
import styles from './header.module.css';
import Link from 'next/link';
export default function Header() {
  const pathname = usePathname();
  const isPhotographePage = pathname.includes('/photographe/'); 
  return (
    <header className={styles.header}>
      <Link 
        href="/"
      >
        <img
          src="/images/logo.svg" 
          className={styles.logo} 
          alt="Fisheye Home page"
        />
      </Link>
      {!isPhotographePage && (
        <h1 className={styles.photographersH1}>
          Nos photographes
        </h1>
      )}
    </header>

  );
}