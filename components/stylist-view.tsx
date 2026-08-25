'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, CloudRain, CloudSun, LoaderCircle, RefreshCw, Sparkles, SunMedium } from '@/components/icons';
import { useWardrobe } from '@/components/state';
import { OutfitCard } from '@/components/outfit-card';
import { cn } from '@/lib/utils';
import { Outfit } from '@/lib/types';

const quickOccasions = ['Mindennapi', 'Munka', 'Randi', 'Utazás', 'Buli'];

export function StylistView() {
  const { outfits, items } = useWardrobe();
  const [occasion, setOccasion] = useState('Randi');
  const [weather, setWeather] = useState('Enyhe, 18°C');
  const [request, setRequest] = useState('Elegáns, de nem túl dressz péntek esti vacsorára');
  const [loading, setLoading] = useState(false);
  const [hasResults, setHasResults] = useState(true);
  const [runNumber, setRunNumber] = useState(0);
  const [results, setResults] = useState<Outfit[]>(outfits);

  const generate = async () => {
    setLoading(true);
    setHasResults(false);
    try {
      const response = await fetch('/api/stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wardrobe: items, request, occasion, weather })
      });
      const payload = await response.json();
      if (Array.isArray(payload.outfits) && payload.outfits.length) {
        setResults(payload.outfits.map((entry: Partial<Outfit>, index: number) => ({
          id: `ai-${Date.now()}-${index}`,
          title: entry.title || `AI szett ${index + 1}`,
          itemIds: Array.isArray(entry.itemIds) ? entry.itemIds : [],
          reasoning: entry.reasoning || 'A saját gardróbod darabjaiból összeállított harmonikus kombináció.',
          visualDescription: entry.visualDescription || '',
          occasion,
          temperature: weather.match(/\\d+/)?.[0] ? `${weather.match(/\\d+/)?.[0]}°` : weather,
          tryOnImage: outfits[index]?.tryOnImage
        })));
      } else {
        setResults(outfits);
      }
    } catch {
      setResults(outfits);
    } finally {
      setLoading(false);
      setHasResults(true);
      setRunNumber((n) => n + 1);
    }
  };
  return <div className="animate-float-in">
    <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow mb-3">A személyes sztylistod</p><h1 className="font-display text-[42px] leading-none tracking-[-0.04em]">Mit vegyél fel ma?</h1><p className="mt-3 max-w-xl text-sm leading-6 text-[#85827b]">Mondd el, hová mész és milyen hangulatra vágysz. Az AI a saját {items.length} darabodból válogat.</p></div><div className="flex items-center gap-2 text-[11px] text-[#817e76]"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f2e5e1] text-[#aa716a]"><Sparkles size={14} /></span> Powered by WardrobeAI</div></div>
    <section className="overflow-hidden rounded-2xl bg-[#252523] p-5 text-white sm:p-7"><div className="grid gap-8 xl:grid-cols-[1fr_0.85fr] xl:items-end"><div><div className="mb-5 flex items-center gap-2"><span className="rounded-full bg-[#d7a19a] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-[#302524]">Új kérés</span><span className="text-[10px] text-[#888780]">A teljes gardróbod elemzésre kerül</span></div><label className="mb-3 block font-display text-2xl">Mesélj az alkalomról</label><textarea value={request} onChange={(e) => setRequest(e.target.value)} rows={3} className="w-full resize-none rounded-xl border border-white/15 bg-white/[0.07] p-4 text-sm leading-6 text-white outline-none placeholder:text-white/30 focus:border-[#d7a19a]" placeholder="pl. Kényelmes szett egy városi sétához…" /><div className="mt-5"><span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#94938c]">Gyors alkalom</span><div className="flex flex-wrap gap-2">{quickOccasions.map((item) => <button key={item} onClick={() => setOccasion(item)} className={cn('rounded-full border px-3.5 py-2 text-[11px] transition', occasion === item ? 'border-[#d7a19a] bg-[#d7a19a] text-[#302524]' : 'border-white/15 text-[#b3b1ab] hover:border-white/40')}>{item}</button>)}</div></div></div><div><div className="mb-5 grid grid-cols-2 gap-3"><div><label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#94938c]">Időjárás</label><div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.07] px-3 py-3 text-xs"><CloudSun size={17} className="text-[#d7a19a]" /><select value={weather} onChange={(e) => setWeather(e.target.value)} className="w-full bg-transparent text-white outline-none"><option className="text-black">Enyhe, 18°C</option><option className="text-black">Hűvös, 12°C</option><option className="text-black">Meleg, 26°C</option><option className="text-black">Esős, 15°C</option></select></div></div><div><label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#94938c]">Hangulat</label><div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.07] px-3 py-3 text-xs"><SunMedium size={17} className="text-[#d7a19a]" /><select className="w-full bg-transparent text-white outline-none"><option className="text-black">Önbizalmat adó</option><option className="text-black">Laza és kényelmes</option><option className="text-black">Kísérletező</option></select></div></div></div><div className="rounded-xl border border-white/10 bg-white/[0.04] p-4"><div className="flex items-center justify-between text-[11px]"><span className="text-[#9c9a93]">Figyelembe vett szempontok</span><span className="font-bold text-[#d7a19a]">5 / 5</span></div><div className="mt-3 flex flex-wrap gap-2"><span className="rounded-md bg-white/10 px-2 py-1 text-[10px] text-[#c4c2bb]">színtan</span><span className="rounded-md bg-white/10 px-2 py-1 text-[10px] text-[#c4c2bb]">rétegezés</span><span className="rounded-md bg-white/10 px-2 py-1 text-[10px] text-[#c4c2bb]">dress code</span><span className="rounded-md bg-white/10 px-2 py-1 text-[10px] text-[#c4c2bb]">illeszkedés</span></div></div><button onClick={generate} disabled={loading} className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#d7a19a] text-xs font-bold text-[#302524] transition hover:bg-[#e3b3ad] disabled:opacity-60">{loading ? <><LoaderCircle size={15} className="animate-spin" /> A sztylist gondolkodik…</> : <><Sparkles size={15} /> Szettek generálása</>}</button></div></div></section>

    <div className="mt-10 flex items-end justify-between"><div><p className="eyebrow mb-2">{hasResults ? 'A te választásaid' : 'Elemzés folyamatban'}</p><h2 className="font-display text-[29px] tracking-[-0.03em]">{hasResults ? '3 szett, amit neked ajánlunk' : 'Összeállítjuk a legjobb párosításokat…'}</h2></div>{hasResults && <button onClick={generate} className="hidden items-center gap-2 rounded-full border border-[#dedbd3] bg-white px-4 py-2.5 text-[11px] font-bold text-[#66635c] transition hover:border-[#1d1d1b] sm:flex"><RefreshCw size={13} /> Újragenerálom</button>}</div>
    {loading || !hasResults ? <div className="mt-5 grid gap-5 md:grid-cols-3">{[1, 2, 3].map((i) => <div key={i} className="soft-card overflow-hidden"><div className="shimmer h-[210px]" /><div className="space-y-3 p-4"><div className="shimmer h-5 w-3/5 rounded" /><div className="shimmer h-3 w-full rounded" /><div className="shimmer h-3 w-4/5 rounded" /></div></div>)}</div> : <div className="mt-5 grid gap-5 md:grid-cols-3">{results.slice(0, 3).map((outfit) => <OutfitCard key={`${outfit.id}-${runNumber}`} outfit={outfit} />)}</div>}
    {hasResults && <div className="mt-8 flex items-start gap-3 rounded-xl border border-[#e7e3da] bg-[#fbfaf7] px-4 py-3.5"><Sparkles size={15} className="mt-0.5 shrink-0 text-[#bd827a]" /><p className="text-[11px] leading-5 text-[#85827b]">Az ajánlások kizárólag a saját gardróbod darabjaiból készültek. Kattints a <strong className="font-semibold text-[#5d5a53]">Felpróbálom</strong> gombra, hogy lásd őket az avatarodon.</p><Link href="/body" className="ml-auto hidden shrink-0 text-[11px] font-bold text-[#8b5c56] underline underline-offset-4 sm:block">Avatar beállítása <ArrowUpRight size={12} className="inline" /></Link></div>}
  </div>;
}
