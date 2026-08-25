'use client';

import Link from 'next/link';
import { ArrowUpRight, Heart, MoreHorizontal, Sparkles } from '@/components/icons';
import { useWardrobe } from '@/components/state';
import { Outfit } from '@/lib/types';
import { cn } from '@/lib/utils';

export function OutfitCard({ outfit, compact = false }: { outfit: Outfit; compact?: boolean }) {
  const { items } = useWardrobe();
  const outfitItems = outfit.itemIds.map((id) => items.find((item) => item.id === id)).filter(Boolean);
  return (
    <article className={cn('group soft-card overflow-hidden transition hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(30,29,25,0.08)]', compact ? '' : 'min-w-0')}>
      <div className={cn('relative bg-[#eeeae2]', compact ? 'h-[180px]' : 'h-[214px]')}>
        {outfit.tryOnImage ? <img src={outfit.tryOnImage} alt={outfit.title} className="h-full w-full object-cover object-top" /> : <div className="h-full w-full bg-gradient-to-br from-[#dad4ca] to-[#f2eee7]" />}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
          <span className="rounded-full bg-white/85 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.13em] text-[#595751] backdrop-blur">AI ajánlás</span>
          <button aria-label="Kedvencekhez adás" className="flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-[#4e4d48] backdrop-blur transition hover:bg-white"><Heart size={14} strokeWidth={1.8} /></button>
        </div>
        <Link href={`/tryon/${outfit.id}`} className="absolute bottom-3 right-3 flex h-8 w-8 translate-y-2 items-center justify-center rounded-full bg-[#1d1d1b] text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"><ArrowUpRight size={15} /></Link>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2"><div><p className="font-display text-[19px] leading-5">{outfit.title}</p><p className="mt-1 text-[11px] text-[#99968e]">{outfit.occasion || 'Mindennapi'} <span className="mx-1">·</span> {outfit.temperature || '14°'}</p></div><button className="text-[#aaa79f]"><MoreHorizontal size={16} /></button></div>
        {!compact && <p className="mt-3 line-clamp-2 text-xs leading-5 text-[#77756e]">{outfit.reasoning}</p>}
        <div className="mt-4 flex items-center justify-between"><div className="flex -space-x-2">{outfitItems.slice(0, 4).map((item) => item && <div key={item.id} className="h-7 w-7 overflow-hidden rounded-full border-2 border-white bg-[#eeeae2]"><img src={item.imageData} alt="" className="h-full w-full object-cover" /></div>)} </div><Link href={`/tryon/${outfit.id}`} className="text-[11px] font-bold text-[#3d3b36] underline decoration-[#d7a19a] underline-offset-4">Felpróbálom</Link></div>
      </div>
    </article>
  );
}

export function ItemStrip({ outfit }: { outfit: Outfit }) {
  const { items } = useWardrobe();
  const outfitItems = outfit.itemIds.map((id) => items.find((item) => item.id === id)).filter(Boolean);
  return <div className="flex gap-2">{outfitItems.map((item) => item && <div key={item.id} className="group/item relative h-14 w-14 overflow-hidden rounded-xl bg-[#f0ede7]"><img src={item.imageData} alt={item.name} className="h-full w-full object-cover transition group-hover/item:scale-105" /></div>)}</div>;
}
