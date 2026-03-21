import { getPhotographer, getAllMediasForPhotographer } from '@/app/lib/prisma-db';
import PhotographeHeader from '@/components/PhotographeHeader/PhotographeHeader';
import Header from '@/components/Header/Header';
import SortDropdown from '@/components/SortDropdown/SortDropdown';
import PhotographeBanner from '@/components/PhotographeBanner/PhotographeBanner';

export default async function PhotographePage({ params }) {
  const { id } = await params;
  const photographer = await getPhotographer(Number(id));
  const medias = await getAllMediasForPhotographer(Number(id));

  if (!photographer) return <p>Photographe introuvable.</p>;

  return (
    <>
       <Header />
      <div>
        <PhotographeHeader photographer={photographer} />
        <SortDropdown medias={medias} />
        <PhotographeBanner medias={medias} price={photographer.price} />
      </div>
    </>
  );
}