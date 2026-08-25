'use client';

import Link from 'next/link';
import { ArrowUpRight, CloudSun, Plus, Shirt, Sparkles, TrendingUp } from '@/components/icons';
import { useWardrobe } from '@/components/state';
import { getGreeting } from '@/lib/utils';
import { OutfitCard, ItemStrip } from './outfit-card';

export function Dashboard() {
  const { items, outfits } = useWardrobe();
  const featured = outfits[0];
  const firstName = 'Nóra';
  const wardrobeProgress = Math.min(items.length * 8, 100);

  return (
    <div className="animate-float-in">
      <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="eyebrow mb-3">Személyes stílusstúdiód</p>
          <h1 className="font-display text-[38px] leading-[0.98] tracking-[-0.04em] text-[#1d1d1b] sm:text-[48px]">
            {getGreeting()}, {firstName} <span className="text-[#c58a82]">✦</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#85827b]">
            {items.length ? 'Készen állsz egy új szettre? A gardróbod ma is tartogat egy jó ötletet.' : 'A személyes ajánlásokhoz először töltsd fel a saját kedvenceidet.'}
          </p>
        </div>
        <Link href={items.length ? '/stylist' : '/wardrobe/new'} className="flex h-11 items-center justify-center gap-2 rounded-full bg-[#1d1d1b] px-5 text-xs font-bold text-white transition hover:bg-[#393936]">
          <Sparkles size={15} className="text-[#d7a19a]" />
          {items.length ? 'Új szett ötlet' : 'Első ruha hozzáadása'}
          <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.7fr_0.9fr]">
        {featured ? (
          <section className="relative min-h-[380px] overflow-hidden rounded-[24px] bg-[#d8d0c4] text-white">
            <img src={featured.tryOnImage} alt="Mai ajánlott szett" className="absolute inset-0 h-full w-full object-cover object-[center_25%] mix-blend-multiply opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#3a3530]/80 via-[#51473e]/25 to-transparent" />
            <div className="relative flex min-h-[380px] flex-col justify-between p-6 sm:p-8">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] backdrop-blur"><span className="h-1.5 w-1.5 rounded-full bg-[#e4b1a9]" /> Mai inspiráció</span>
                <h2 className="mt-24 max-w-[280px] font-display text-[38px] leading-[0.94] tracking-[-0.035em] sm:text-[47px]">{featured.title}</h2>
                <p className="mt-3 max-w-[285px] text-xs leading-5 text-white/75">{featured.reasoning}</p>
              </div>
              <div className="flex items-end justify-between gap-4">
                <ItemStrip outfit={featured} />
                <Link href={`/tryon/${featured.id}`} className="flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[11px] font-bold text-[#272522] transition hover:bg-[#f4e9e5]">Így néznél ki benne <ArrowUpRight size={14} /></Link>
              </div>
            </div>
          </section>
        ) : (
          <section className="relative flex min-h-[380px] flex-col justify-center overflow-hidden rounded-[24px] bg-[#252523] p-7 text-white sm:p-10">
            <div className="absolute -right-10 -top-16 h-64 w-64 rounded-full border border-white/10" />
            <div className="absolute -bottom-24 right-16 h-52 w-52 rounded-full border border-[#d7a19a]/20" />
            <div className="relative max-w-md">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#d7a19a]"><Sparkles size={12} /> A te gardróbod</span>
              <h2 className="mt-6 font-display text-[42px] leading-[0.95] tracking-[-0.04em]">Kezdjük el együtt.</h2>
              <p className="mt-4 max-w-sm text-sm leading-6 text-[#aaa8a1]">A személyes szettjeidhez először adj hozzá néhány ruhadarabot. Minél többet tudunk rólad, annál jobb lesz az ajánlás.</p>
              <Link href="/wardrobe/new" className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-[#d7a19a] px-5 text-xs font-bold text-[#302524] transition hover:bg-[#e5b7b0]">Első ruha hozzáadása <ArrowUpRight size={14} /></Link>
            </div>
          </section>
        )}

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
          <section className="soft-card flex flex-col justify-between p-5">
            <div className="flex items-start justify-between">
              <div><p className="eyebrow">Mai időjárás</p><p className="mt-3 font-display text-3xl">14°<span className="ml-2 text-sm text-[#aaa69e]">/ 8°</span></p><p className="mt-1 text-xs text-[#85827b]">Budapest · Részben felhős</p></div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e9eee5] text-[#73816d]"><CloudSun size={23} strokeWidth={1.5} /></div>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-[#ece9e3] pt-4"><span className="text-[11px] text-[#8c8981]">Ajánlott rétegek</span><span className="text-[11px] font-bold text-[#3f4d40]">2–3 db</span></div>
          </section>
          <section className="soft-card p-5">
            <div className="flex items-center justify-between"><div><p className="eyebrow">Gardróbod</p><p className="mt-2 font-display text-3xl">{items.length}<span className="ml-1 text-base text-[#aaa69e]">darab</span></p></div><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f2e5e1] text-[#a76f68]"><Shirt size={21} strokeWidth={1.6} /></div></div>
            <div className="mt-5 h-1.5 rounded-full bg-[#efede7]"><div className="h-full rounded-full bg-[#d6a09a] transition-all" style={{ width: `${wardrobeProgress}%` }} /></div>
            <div className="mt-3 flex items-center justify-between text-[11px]"><span className="text-[#89867f]">{items.length === 0 ? 'Még üres' : 'Jó alapok'}</span><span className="flex items-center gap-1 font-bold text-[#6d8067]">{items.length === 0 ? 'Kezdd az alapokkal' : <><TrendingUp size={13} /> +3 ezen a héten</>}</span></div>
          </section>
        </div>
      </div>

      <div className="mt-10 flex items-end justify-between"><div><p className="eyebrow mb-2">Neked válogattuk</p><h2 className="font-display text-[29px] tracking-[-0.03em]">Legutóbbi szettjeid</h2></div><Link href="/stylist" className="hidden items-center gap-1 text-[11px] font-bold text-[#77746c] underline decoration-[#d7a19a] underline-offset-4 sm:flex">Összes megtekintése <ArrowUpRight size={13} /></Link></div>
      {outfits.length ? (
        <div className="mt-5 grid gap-5 md:grid-cols-3">{outfits.slice(0, 3).map((outfit) => <OutfitCard key={outfit.id} outfit={outfit} compact />)}</div>
      ) : (
        <div className="mt-5 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#d7d2c8] bg-[#fbfaf7] px-6 py-12 text-center"><div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f2e5e1] text-[#a9756e]"><Shirt size={20} /></div><p className="text-sm font-semibold">Még nincsenek szettjeid</p><p className="mt-1 max-w-xs text-xs leading-5 text-[#918e86]">Adj hozzá pár ruhát, majd kérj személyes outfit-ajánlást az AI sztylistától.</p><Link href="/wardrobe/new" className="mt-4 text-[11px] font-bold text-[#8e5f59] underline decoration-[#d7a19a] underline-offset-4">Ruhát adok hozzá <ArrowUpRight size={12} className="inline" /></Link></div>
      )}

      <section className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl border border-dashed border-[#d7d2c8] bg-[#f3f0e9] px-6 py-5 sm:flex-row sm:items-center"><div className="flex items-center gap-4"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#aa7770]"><Plus size={19} /></div><div><p className="text-sm font-semibold">Építsd tovább a gardróbod</p><p className="mt-1 text-xs text-[#8b8880]">Adj hozzá néhány saját darabot, hogy elindulhasson az ajánlás.</p></div></div><Link href="/wardrobe/new" className="rounded-full border border-[#cfcac0] px-4 py-2.5 text-[11px] font-bold transition hover:bg-white">Ruhát adok hozzá</Link></section>
    </div>
  );
}
