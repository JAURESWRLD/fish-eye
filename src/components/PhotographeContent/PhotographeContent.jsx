'use client';
import { useState } from 'react';
import SortDropdown from "@/components/SortDropdown/SortDropdown";
import PhotographeBanner from "@/components/PhotographeBanner/PhotographeBanner";
import { handleLikeUpdate } from '@/app/actions';

export default function PhotographeContent({ initialMedias, price }) {
    const [medias, setMedias] = useState(initialMedias);

    const handleLike = async (id, isLiked) => {
        // Find the specific media item to calculate the new count
        const target = medias.find(m => m.id === id);
        const newCount = isLiked ? target.likes + 1 : target.likes - 1;

        // 1. Optimistic Update (Update UI immediately)
        setMedias(prev => prev.map(m => 
            m.id === id ? { ...m, likes: newCount } : m
        ));
        // 2. Sync with Server
        const result = await handleLikeUpdate(id, newCount, isLiked);
        
        if (!result.success) {
            setMedias(initialMedias);
            alert("Could not sync likes. Please try again.");
        }
    };

  return (
    <>
      <SortDropdown medias={medias} onLike={handleLike}  />
      <PhotographeBanner medias={medias} price={price} />
    </>
  );
}