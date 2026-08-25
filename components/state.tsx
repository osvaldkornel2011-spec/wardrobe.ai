'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { defaultProfile, seedItems, seedOutfits } from '@/lib/data';
import { BodyProfile, Outfit, WardrobeItem } from '@/lib/types';

type WardrobeContextValue = {
  items: WardrobeItem[];
  outfits: Outfit[];
  profile: BodyProfile;
  addItem: (item: WardrobeItem) => void;
  removeItem: (id: string) => void;
  saveProfile: (profile: BodyProfile) => void;
  saveOutfit: (outfit: Outfit) => void;
};

const WardrobeContext = createContext<WardrobeContextValue | null>(null);

export function WardrobeProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState(seedItems);
  const [outfits, setOutfits] = useState(seedOutfits);
  const [profile, setProfile] = useState(defaultProfile);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('wardrobe-ai-state');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.items) setItems(parsed.items);
        if (parsed.outfits) setOutfits(parsed.outfits);
        if (parsed.profile) setProfile({ ...defaultProfile, ...parsed.profile });
      }
    } catch (error) {
      console.warn('Could not restore wardrobe state', error);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem('wardrobe-ai-state', JSON.stringify({ items, outfits, profile }));
  }, [items, outfits, profile, hydrated]);

  const value = useMemo(() => ({
    items,
    outfits,
    profile,
    addItem: (item: WardrobeItem) => setItems((current) => [item, ...current]),
    removeItem: (id: string) => setItems((current) => current.filter((item) => item.id !== id)),
    saveProfile: (nextProfile: BodyProfile) => setProfile(nextProfile),
    saveOutfit: (outfit: Outfit) => setOutfits((current) => [outfit, ...current.filter((item) => item.id !== outfit.id)])
  }), [items, outfits, profile]);

  return <WardrobeContext.Provider value={value}>{children}</WardrobeContext.Provider>;
}

export function useWardrobe() {
  const value = useContext(WardrobeContext);
  if (!value) throw new Error('useWardrobe must be used inside WardrobeProvider');
  return value;
}
