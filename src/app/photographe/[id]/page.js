import { getPhotographer, getAllMediasForPhotographer } from '@/app/lib/prisma-db';
import PhotographeHeader from '@/components/PhotographeHeader/PhotographeHeader';
import Header from '@/components/Header/Header';
import PhotographeContent from '@/components/PhotographeContent/PhotographeContent';

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
        <PhotographeContent initialMedias={medias} price={photographer.price} />
      </div>
    </>
  );
}