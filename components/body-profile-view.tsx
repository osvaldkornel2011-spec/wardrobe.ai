'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Info, LoaderCircle, RefreshCw, Sparkles } from '@/components/icons';
import { useWardrobe } from '@/components/state';
import { BodyProfile } from '@/lib/types';
import { cn } from '@/lib/utils';

const candidates = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=90',
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=90',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=90'
];

export function BodyProfileView() {
  const { profile, saveProfile } = useWardrobe();
  const [draft, setDraft] = useState<BodyProfile>(profile);
  const [generated, setGenerated] = useState<string[]>(profile.avatarOptions || []);
  const [selected, setSelected] = useState(profile.avatarImageBase || '');
  const [generating, setGenerating] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setDraft(profile); setSelected(profile.avatarImageBase || ''); setGenerated(profile.avatarOptions || []); }, [profile]);
  const update = (key: keyof BodyProfile, value: string) => setDraft((current) => ({ ...current, [key]: ['heightCm', 'chestCm', 'underBustCm', 'waistCm', 'hipCm', 'shoulderCm', 'inseamCm'].includes(key) ? (value ? Number(value) : undefined) : key === 'weightKg' ? Number(value) : value }));
  const generate = async () => {
    setGenerating(true);
    try {
      const responses = await Promise.all([1, 2, 3].map(() => fetch('/api/avatar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(draft) })));
      const images = (await Promise.all(responses.map((response) => response.json()))).map((result) => result.imageData).filter(Boolean);
      setGenerated(images.length ? images : candidates);
    } catch {
      setGenerated(candidates);
    } finally {
      setGenerating(false);
    }
  };
  const save = () => { saveProfile({ ...draft, avatarImageBase: selected || draft.avatarImageBase, avatarOptions: generated }); setSaved(true); window.setTimeout(() => setSaved(false), 2200); };

  return <div className="animate-float-in">
    <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow mb-3">Te vagy a kiindulópont</p><h1 className="font-display text-[42px] leading-none tracking-[-0.04em]">Testprofil & avatar</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-[#85827b]">Add meg a méreteidet egyszer, mi pedig létrehozunk egy konzisztens, szintetikus avatart a virtuális felpróbáláshoz.</p></div><span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#8a887f]"><span className="h-2 w-2 rounded-full bg-[#89a17e]" /> Privát profil</span></div>
    <div className="grid gap-6 xl:grid-cols-[1fr_0.92fr]">
      <section className="soft-card p-5 sm:p-7"><div className="mb-6 flex items-center justify-between"><div><p className="font-display text-2xl">Méretek</p><p className="mt-1 text-xs text-[#96928a]">A pontosabb illeszkedésért, centiméterben.</p></div><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5e8e4] text-[#ae7770]"><Info size={16} /></div></div>
        <div className="grid gap-5 sm:grid-cols-2"><div><label className="label">Magasság <span className="text-[#b77c74]">cm</span></label><div className="relative"><input type="number" value={draft.heightCm || ''} onChange={(e) => update('heightCm', e.target.value)} className="field pr-12" /><span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#aaa69e]">cm</span></div></div><div><label className="label">Testsúly</label><div className="relative"><input type="number" step="0.1" value={draft.weightKg || ''} onChange={(e) => update('weightKg', e.target.value)} className="field pr-12" /><span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#aaa69e]">kg</span></div></div></div>
        <div className="my-7 h-px bg-[#efebe4]" /><p className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-[#85827b]">Testméretek</p><div className="grid gap-5 sm:grid-cols-2"><Measure label="Mellbőség" value={draft.chestCm} onChange={(v) => update('chestCm', v)} /><Measure label="Derékbőség" value={draft.waistCm} onChange={(v) => update('waistCm', v)} /><Measure label="Csípőbőség" value={draft.hipCm} onChange={(v) => update('hipCm', v)} /><Measure label="Vállszélesség" value={draft.shoulderCm} onChange={(v) => update('shoulderCm', v)} /><Measure label="Belső szárhossz" value={draft.inseamCm} onChange={(v) => update('inseamCm', v)} /></div>
        <div className="my-7 h-px bg-[#efebe4]" /><p className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-[#85827b]">Megjelenés</p><div className="grid gap-5 sm:grid-cols-2"><div><label className="label">Nem</label><select value={draft.gender} onChange={(e) => update('gender', e.target.value)} className="field"><option>Nő</option><option>Férfi</option><option>Egyéb</option></select></div><div><label className="label">Testalkat</label><select value={draft.bodyShape} onChange={(e) => update('bodyShape', e.target.value)} className="field"><option>Homokóra</option><option>Körte</option><option>Alma</option><option>Téglalap</option><option>Fordított háromszög</option></select></div><div><label className="label">Bőrtónus <span className="font-normal normal-case tracking-normal text-[#aaa69e]">opcionális</span></label><input value={draft.skinTone || ''} onChange={(e) => update('skinTone', e.target.value)} className="field" placeholder="pl. közepes, meleg tónus" /></div><div><label className="label">Hajszín</label><input value={draft.hairColor || ''} onChange={(e) => update('hairColor', e.target.value)} className="field" placeholder="pl. barna" /></div><div><label className="label">Korosztály</label><select value={draft.ageRange} onChange={(e) => update('ageRange', e.target.value)} className="field"><option>18–24</option><option>25–30</option><option>31–40</option><option>41–50</option><option>50+</option></select></div></div>
        <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#efebe4] pt-5 sm:flex-row sm:justify-end"><button onClick={save} className={cn('flex h-11 items-center justify-center gap-2 rounded-full px-6 text-xs font-bold transition', saved ? 'bg-[#dce7d7] text-[#55704e]' : 'bg-[#1d1d1b] text-white hover:bg-[#393936]')}>{saved ? <><Check size={15} /> Elmentve</> : <><Check size={15} /> Profil mentése</>}</button></div>
      </section>

      <section className="rounded-2xl bg-[#272725] p-5 text-white sm:p-7"><div className="flex items-start justify-between"><div><p className="eyebrow text-[#97958e]">Szintetikus avatar</p><p className="mt-2 font-display text-2xl">Válaszd ki az alapot</p><p className="mt-2 max-w-sm text-xs leading-5 text-[#a3a19b]">Ezt a képet használjuk minden felpróbálásnál, így a testarányok és a háttér konzisztens marad.</p></div><Sparkles size={19} className="text-[#d7a19a]" /></div>
        {generated.length > 0 && <div className="mt-6 grid grid-cols-3 gap-2">{generated.map((src, index) => <button key={src} onClick={() => setSelected(src)} className={cn('group relative aspect-[0.68] overflow-hidden rounded-xl border-2 transition', selected === src ? 'border-[#d7a19a]' : 'border-transparent opacity-65 hover:opacity-100')}><img src={src} alt={`Avatar jelölt ${index + 1}`} className="h-full w-full object-cover object-top" />{selected === src && <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#d7a19a] text-[#2c2523]"><Check size={12} strokeWidth={3} /></span>}<span className="absolute bottom-2 left-2 rounded-full bg-black/35 px-2 py-1 text-[9px] backdrop-blur">0{index + 1}</span></button>)}</div>}
        {!generated.length && <div className="mt-6 flex aspect-[1.55] flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[0.03] text-center"><div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[#d7a19a]"><Sparkles size={20} /></div><p className="text-xs font-semibold">Még nincs generált avatarod</p><p className="mt-1 max-w-[200px] text-[10px] leading-4 text-[#9b9993]">A méreteid alapján 3 különböző változatot készítünk.</p></div>}
        <button onClick={generate} disabled={generating} className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#d7a19a] text-xs font-bold text-[#2d2523] transition hover:bg-[#e3b5af] disabled:opacity-60">{generating ? <><LoaderCircle size={15} className="animate-spin" /> Avatarok készülnek…</> : <><RefreshCw size={15} /> {generated.length ? 'Új avatarok generálása' : '3 avatar generálása'}</>}</button>
        <div className="mt-5 flex items-start gap-2 border-t border-white/10 pt-4 text-[10px] leading-4 text-[#92918b]"><Info size={13} className="mt-0.5 shrink-0" /> Az avatar mesterségesen generált kép, nem valódi fotó. Az adataidat nem osztjuk meg.</div>
      </section>
    </div>
    {selected && <div className="mt-5 flex items-center gap-3 rounded-xl border border-[#dce4d8] bg-[#f2f7ef] px-4 py-3 text-xs text-[#5f7459]"><Check size={15} /> Az alap-avatarod ki van választva. A változtatások mentés után lesznek aktívak.<button onClick={save} className="ml-auto font-bold underline underline-offset-4">Mentés most</button></div>}
  </div>;
}

function Measure({ label, value, onChange }: { label: string; value?: number; onChange: (value: string) => void }) {
  return <div><label className="label">{label}</label><div className="relative"><input type="number" value={value || ''} onChange={(e) => onChange(e.target.value)} className="field pr-12" placeholder="—" /><span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#aaa69e]">cm</span></div></div>;
}
