import Header from '@/components/Header/Header';
import { getAllPhotographers } from './lib/prisma-db';
import PhotographeList from '@/components/PhotographeList/PhotographeList';
import styles from './page.module.css';

export default async function home() {
  const photographers = await getAllPhotographers();
  return (
    <div className={styles.home}>
      <>
        <Header />
        <PhotographeList photographers={photographers} />
      </>
    </div>
  );
}