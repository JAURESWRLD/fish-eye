"use client"; 

import { usePathname } from 'next/navigation';
import styles from './header.module.css';
import Link from 'next/link';
export default function Header() {
  const pathname = usePathname();
  const isPhotographePage = pathname.includes('/photographe/'); 
  return (
    <header role="banner" className={styles.header}>
        <Link href="/" aria-label="Fisheye - Retour à l'accueil">
            <img src="/images/logo.svg" className={styles.logo} alt="" />
        </Link>
        {!isPhotographePage && (
        <h1>
          <a href="#main" className={styles.photographersLink}>
              Nos photographes
          </a>
        </h1>
        )}
    </header>

  );
}