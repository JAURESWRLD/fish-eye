'use client';
import { useState } from 'react';
import SortDropdown from "@/components/SortDropdown/SortDropdown";
import PhotographeBanner from "@/components/PhotographeBanner/PhotographeBanner";

export default function PhotographeContent({ initialMedias, price }) {
    const [medias, setMedias] = useState(initialMedias);

    const handleLike = (id, isLiked) => {
        setMedias(prev => prev.map(m => 
        m.id === id ? { ...m, likes: isLiked ? m.likes + 1 : m.likes - 1 } : m
        ));
    };

  return (
    <>
      <SortDropdown medias={medias} onLike={handleLike}  />
      <PhotographeBanner medias={medias} price={price} />
    </>
  );
}