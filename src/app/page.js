import Header from '@/components/Header/Header';
import { getAllPhotographers } from './lib/prisma-db';
import PhotographeList from '@/components/PhotographeList/PhotographeList';
import styles from './page.module.css';
import { Suspense } from 'react';

export default async function home() {
  const photographers = await getAllPhotographers();
  return (
    <div className={styles.home}>
      <>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <PhotographeList photographers={photographers} />
        </Suspense>

      </>
    </div>
  );
}