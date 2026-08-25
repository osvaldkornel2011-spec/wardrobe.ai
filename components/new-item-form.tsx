'use client';

import Link from 'next/link';
import { ChangeEvent, DragEvent, useState } from 'react';
import { ArrowLeft, Check, ImageIcon, Sparkles, Upload, X } from '@/components/icons';
import { useWardrobe } from '@/components/state';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const initialForm = { name: '', category: 'Felső', subcategory: 'Póló', material: '', size: 'M', color: '', styleTags: 'casual, minimal', season: 'Mind', occasion: 'Mindennapi', fit: 'Regular', brand: '', notes: '' };

export function NewItemForm() {
  const router = useRouter();
  const { addItem } = useWardrobe();
  const [form, setForm] = useState(initialForm);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [dragging, setDragging] = useState(false);
  const [autoFilling, setAutoFilling] = useState(false);
  const [status, setStatus] = useState('');

  const update = (key: keyof typeof initialForm, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const processFile = (file?: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    if (file.size > 8 * 1024 * 1024) { setStatus('A kép mérete legfeljebb 8 MB lehet.'); return; }
    const reader = new FileReader();
    reader.onload = () => { setPreview(reader.result as string); setFileName(file.name); };
    reader.readAsDataURL(file);
  };
  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => processFile(event.target.files?.[0]);
  const onDrop = (event: DragEvent<HTMLLabelElement>) => { event.preventDefault(); setDragging(false); processFile(event.dataTransfer.files?.[0]); };
  const autoFill = () => {
    setAutoFilling(true);
    window.setTimeout(() => { setForm((current) => ({ ...current, name: 'Fehér pamut póló', material: '100% organikus pamut', color: 'Fehér', styleTags: 'casual, minimal' })); setAutoFilling(false); }, 850);
  };
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name || !form.material || !form.color) { setStatus('Kérlek, töltsd ki a csillaggal jelölt mezőket.'); return; }
    addItem({ id: `item-${Date.now()}`, name: form.name, category: form.category, subcategory: form.subcategory, material: form.material, size: form.size, color: form.color, styleTags: form.styleTags.split(',').map((tag) => tag.trim()).filter(Boolean), season: [form.season], occasion: [form.occasion], fit: form.fit, brand: form.brand, notes: form.notes, imageData: preview || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85' });
    router.push('/wardrobe');
  };

  return <div className="animate-float-in max-w-[1080px]">
    <Link href="/wardrobe" className="mb-7 inline-flex items-center gap-2 text-xs font-semibold text-[#817e76] transition hover:text-[#1d1d1b]"><ArrowLeft size={14} /> Vissza a gardróbhoz</Link>
    <div className="mb-8"><p className="eyebrow mb-3">Gardrób bővítése</p><h1 className="font-display text-[42px] leading-none tracking-[-0.04em]">Új darab hozzáadása</h1><p className="mt-3 max-w-lg text-sm leading-6 text-[#85827b]">Fotózd le vagy töltsd fel a kedvenc ruhadarabod. A részletek segítenek az AI-nak tökéletesebb szetteket készíteni.</p></div>
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[0.9fr_1.2fr]">
      <div className="space-y-4">
        <label onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={onDrop} className={cn('relative flex aspect-[0.94] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed transition', dragging ? 'border-[#b77870] bg-[#fae9e5]' : 'border-[#d4d0c7] bg-[#f1eee8] hover:border-[#9d9990] hover:bg-[#ede9e1]')}>
          {preview ? <><img src={preview} alt="Feltöltött ruha előnézete" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-4 opacity-0 transition hover:opacity-100"><span className="rounded-full bg-white px-3 py-2 text-[11px] font-bold">Kép cseréje</span></div></> : <div className="flex flex-col items-center px-8 text-center"><div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#a49e94] shadow-sm"><Upload size={21} strokeWidth={1.6} /></div><p className="text-sm font-semibold">Húzd ide a képet</p><p className="mt-2 text-xs leading-5 text-[#99958c]">vagy kattints a tallózáshoz<br />PNG, JPG · maximum 8 MB</p><span className="mt-5 flex items-center gap-2 rounded-full border border-[#d9d4cb] bg-white px-4 py-2 text-[11px] font-bold"><ImageIcon size={14} /> Kép kiválasztása</span></div>}
          <input type="file" accept="image/png,image/jpeg,image/webp" capture="environment" onChange={onFileChange} className="sr-only" />
        </label>
        {fileName && <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2.5 text-xs"><span className="flex min-w-0 items-center gap-2 truncate"><Check size={14} className="shrink-0 text-[#77876d]" /> <span className="truncate">{fileName}</span></span><button type="button" onClick={() => { setPreview(null); setFileName(''); }} className="text-[#aaa69e] hover:text-[#9d6962]"><X size={14} /></button></div>}
        <button type="button" onClick={autoFill} disabled={autoFilling} className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#e1cbc6] bg-[#fbefec] px-4 py-3 text-[11px] font-bold text-[#8f5d57] transition hover:bg-[#f8e2de] disabled:opacity-60"><Sparkles size={14} /> {autoFilling ? 'Elemzés folyamatban…' : 'Automatikus kitöltés AI-val'}</button>
        <p className="px-1 text-[10px] leading-4 text-[#aaa69e]">Az AI-javaslatokat mentés előtt mindig ellenőrizheted és módosíthatod.</p>
      </div>
      <div className="soft-card p-5 sm:p-7">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2"><label className="label">A darab neve <span className="text-[#b77c74]">*</span></label><input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="pl. Kedvenc fehér pólóm" className="field" /></div>
          <div><label className="label">Kategória <span className="text-[#b77c74]">*</span></label><select value={form.category} onChange={(e) => update('category', e.target.value)} className="field"><option>Felső</option><option>Alsó</option><option>Ruha</option><option>Kabát</option><option>Cipő</option><option>Kiegészítő</option></select></div>
          <div><label className="label">Altípus</label><select value={form.subcategory} onChange={(e) => update('subcategory', e.target.value)} className="field"><option>Póló</option><option>Ing</option><option>Blúz</option><option>Nadrág</option><option>Szoknya</option><option>Blézer</option><option>Más</option></select></div>
          <div><label className="label">Anyag <span className="text-[#b77c74]">*</span></label><input value={form.material} onChange={(e) => update('material', e.target.value)} placeholder="pl. 100% pamut" className="field" /></div>
          <div><label className="label">Méret</label><select value={form.size} onChange={(e) => update('size', e.target.value)} className="field"><option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option><option>W32 / L32</option><option>Egy méret</option></select></div>
          <div><label className="label">Főszín <span className="text-[#b77c74]">*</span></label><div className="relative"><input value={form.color} onChange={(e) => update('color', e.target.value)} placeholder="pl. törtfehér (#f5f1e8)" className="field pr-11" /><span className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border border-[#d4d0c7] bg-[#f2eee5]" /></div></div>
          <div><label className="label">Illeszkedés</label><select value={form.fit} onChange={(e) => update('fit', e.target.value)} className="field"><option>Regular</option><option>Szűk</option><option>Laza</option><option>Oversize</option></select></div>
          <div><label className="label">Évszak</label><select value={form.season} onChange={(e) => update('season', e.target.value)} className="field"><option>Mind</option><option>Tavasz</option><option>Nyár</option><option>Ősz</option><option>Tél</option></select></div>
          <div><label className="label">Alkalom</label><select value={form.occasion} onChange={(e) => update('occasion', e.target.value)} className="field"><option>Mindennapi</option><option>Munka</option><option>Randi</option><option>Utazás</option><option>Buli</option><option>Sport</option></select></div>
          <div><label className="label">Stíluscímkék</label><input value={form.styleTags} onChange={(e) => update('styleTags', e.target.value)} placeholder="casual, minimal" className="field" /><p className="mt-1.5 text-[10px] text-[#aaa69e]">Vesszővel válaszd el a címkéket.</p></div>
          <div><label className="label">Márka</label><input value={form.brand} onChange={(e) => update('brand', e.target.value)} placeholder="pl. COS" className="field" /></div>
          <div className="sm:col-span-2"><label className="label">Megjegyzés</label><textarea value={form.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Van valami, amit az AI stylistnak tudnia kell?" rows={3} className="field resize-none" /></div>
        </div>
        {status && <p className="mt-4 rounded-lg bg-[#fff0ed] px-3 py-2 text-xs text-[#995f58]">{status}</p>}
        <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#eeeae3] pt-5 sm:flex-row sm:justify-end"><Link href="/wardrobe" className="flex h-11 items-center justify-center rounded-full px-5 text-xs font-bold text-[#77746d] hover:bg-[#f6f4ef]">Mégse</Link><button type="submit" className="flex h-11 items-center justify-center gap-2 rounded-full bg-[#1d1d1b] px-6 text-xs font-bold text-white transition hover:bg-[#393936]"><Check size={15} /> Darab mentése</button></div>
      </div>
    </form>
  </div>;
}
