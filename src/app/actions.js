// src/app/actions.js
'use server'

import { updateNumberOfLikes } from './lib/prisma-db';
import { revalidatePath } from 'next/cache';

export async function handleLikeUpdate(mediaId, newCount, isLiked) {
  try {
    await updateNumberOfLikes(mediaId, newCount, isLiked);
    
    // This clears the Next.js cache so the server data stays in sync
    revalidatePath('/photographer/[id]', 'page'); 
    
    return { success: true };
  } catch (error) {
    console.error("Database update failed:", error);
    return { success: false };
  }
}
