'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Check, Info, LoaderCircle, RefreshCw, Save, Sparkles, Star } from '@/components/icons';
import { useWardrobe } from '@/components/state';
import { cn } from '@/lib/utils';

export function TryOnView() {
  const params = useParams<{ outfitId: string }>();
  const { outfits, items, profile, saveOutfit } = useWardrobe();
  const outfit = outfits.find((entry) => entry.id === params.outfitId) || outfits[0];
  const [image, setImage] = useState(outfit?.tryOnImage || '');
  const [generating, setGenerating] = useState(false);
  const [saved, setSaved] = useState(false);
  const [rating, setRating] = useState(outfit?.rating || 0);

  if (!outfit) return <div>Nem található ez a szett.</div>;
  const outfitItems = outfit.itemIds.map((id) => items.find((item) => item.id === id)).filter(Boolean);
  const runTryOn = async () => {
    setGenerating(true);
    setSaved(false);
    try {
      const response = await fetch('/api/tryon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatarImage: profile.avatarImageBase, clothingImages: outfitItems.map((item) => item?.imageData), visualDescription: outfit.visualDescription })
      });
      const payload = await response.json();
      setImage(payload.imageData || outfit.tryOnImage || 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=90');
    } catch {
      setImage(outfit.tryOnImage || 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=90');
    } finally {
      setGenerating(false);
    }
  };
  const save = () => { saveOutfit({ ...outfit, tryOnImage: image, rating }); setSaved(true); };
  return <div className="animate-float-in">
    <Link href="/stylist" className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-[#817e76] transition hover:text-[#1d1d1b]"><ArrowLeft size={14} /> Vissza a szettötletekhez</Link>
    <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow mb-3">Virtuális tükör <span className="mx-2 text-[#c7c3ba]">/</span> {outfit.occasion || 'AI szett'}</p><h1 className="font-display text-[40px] leading-none tracking-[-0.04em]">{outfit.title}</h1></div><div className="flex items-center gap-2 text-[11px] text-[#89867e]"><span className="h-2 w-2 rounded-full bg-[#89a17e]" /> Avatarod: {profile.bodyShape || 'beállítva'} · {profile.heightCm} cm</div></div>
    <div className="grid gap-6 xl:grid-cols-[1.22fr_0.78fr]">
      <section className="relative min-h-[550px] overflow-hidden rounded-2xl bg-[#d8d0c4] sm:min-h-[650px]">{image && <img src={image} alt="AI által generált virtuális felpróbálás" className={cn('absolute inset-0 h-full w-full object-cover object-top', generating && 'opacity-50')} />}{!image && !generating && <div className="absolute inset-0 flex flex-col items-center justify-center text-center"><div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/70 text-[#8a8176]"><Sparkles size={25} /></div><p className="font-display text-2xl">Készen áll a virtuális tükör</p><p className="mt-2 text-xs text-[#746e65]">Nézd meg, hogyan áll rajtad ez a szett.</p></div>}{generating && <div className="absolute inset-0 flex flex-col items-center justify-center text-white"><div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1d1d1b]/80"><LoaderCircle size={23} className="animate-spin text-[#d7a19a]" /></div><p className="mt-4 text-sm font-semibold">Az avatarodra igazítjuk…</p><p className="mt-1 text-[11px] text-white/70">A Gemini AI épp megrajzolja a részleteket</p></div>}<div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-[#1d1d1b]/75 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur"><Sparkles size={12} className="text-[#d7a19a]" /> AI által generált</div><div className="absolute bottom-5 left-5 right-5 flex items-end justify-between"><div className="rounded-xl bg-white/85 px-3 py-2 backdrop-blur"><p className="text-[10px] font-bold uppercase tracking-wider text-[#5d5a54]">Virtuális felpróbálás</p><p className="mt-0.5 text-[10px] text-[#858179]">Szintetikus kép · Nem valódi fotó</p></div><button onClick={runTryOn} disabled={generating} className="flex h-10 items-center gap-2 rounded-full bg-[#1d1d1b] px-4 text-[11px] font-bold text-white shadow-lg transition hover:bg-[#383834] disabled:opacity-70"><RefreshCw size={14} className={generating ? 'animate-spin' : ''} /> {image ? 'Újragenerálás' : 'Felpróbálom'}</button></div></section>
      <aside className="space-y-5"><section className="soft-card p-5 sm:p-6"><div className="flex items-start justify-between"><div><p className="eyebrow mb-2">A szett darabjai</p><h2 className="font-display text-[25px]">Ezt viseli az avatarod</h2></div><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f4e6e2] text-[#a87069]"><Check size={14} /></span></div><div className="mt-5 space-y-3">{outfitItems.map((item) => item && <div key={item.id} className="flex items-center gap-3 rounded-xl bg-[#f7f5f0] p-2"><div className="h-14 w-14 overflow-hidden rounded-lg bg-white"><img src={item.imageData} alt={item.name} className="h-full w-full object-cover" /></div><div className="min-w-0"><p className="text-xs font-semibold text-[#373530]">{item.name}</p><p className="mt-1 text-[10px] text-[#98948c]">{item.color} · {item.material}</p></div><span className="ml-auto h-3 w-3 shrink-0 rounded-full border border-[#d1ccc2]" style={{ background: item.color.toLocaleLowerCase().includes('fehér') ? '#f5f1e8' : item.color.toLocaleLowerCase().includes('fekete') ? '#202020' : item.color.toLocaleLowerCase().includes('bordó') ? '#6b1f2a' : '#b3a18b' }} /></div>)}</div></section><section className="soft-card p-5 sm:p-6"><p className="eyebrow mb-3">Miért működik?</p><p className="text-sm leading-6 text-[#69665e]">{outfit.reasoning}</p><div className="mt-5 flex flex-wrap gap-2">{['Színharmónia', 'Jó rétegezés', 'Illik az alkalomhoz'].map((tag) => <span key={tag} className="pill bg-[#faf9f6]">{tag}</span>)}</div></section><section className="soft-card p-5 sm:p-6"><div className="flex items-center justify-between"><div><p className="eyebrow mb-2">Hogy tetszik?</p><p className="text-xs text-[#96928a]">Értékelésed segít még jobb tippeket adni.</p></div><div className="flex gap-1">{[1, 2, 3, 4, 5].map((value) => <button key={value} onClick={() => setRating(value)} aria-label={`${value} csillag`} className="transition hover:scale-110"><Star size={18} fill={value <= rating ? '#d7a19a' : 'none'} className={value <= rating ? 'text-[#bd8179]' : 'text-[#d0cbc1]'} /></button>)}</div></div><button onClick={save} disabled={!image} className={cn('mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-full text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-40', saved ? 'bg-[#e0eadc] text-[#5e7757]' : 'bg-[#1d1d1b] text-white hover:bg-[#3a3a37]')}>{saved ? <><Check size={15} /> Elmentve a kedvencek közé</> : <><Save size={15} /> Szettem mentése</>}</button></section></aside>
    </div>
    <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#e7e3da] bg-[#fbfaf7] px-4 py-3.5"><Info size={15} className="mt-0.5 shrink-0 text-[#a19c91]" /><p className="text-[10px] leading-5 text-[#8c8981]">A kép generatív AI segítségével készült. Az avatar szintetikus, az eredmény vizuális inspiráció, nem garantált méret- vagy szabásreferencia.</p></div>
  </div>;
}
