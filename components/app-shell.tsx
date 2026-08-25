'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, CircleHelp, LayoutDashboard, Shirt, Sparkles, UserRound } from '@/components/icons';
import { cn } from '@/lib/utils';
import { useWardrobe } from '@/components/state';

const navItems = [
  { href: '/', label: 'Áttekintés', icon: LayoutDashboard },
  { href: '/wardrobe', label: 'Gardrób', icon: Shirt, count: 9 },
  { href: '/stylist', label: 'AI sztylista', icon: Sparkles, badge: 'AI' },
  { href: '/body', label: 'Testprofil', icon: UserRound }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { items } = useWardrobe();
  const isTryOn = pathname.startsWith('/tryon');

  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[238px] flex-col bg-[#1d1d1b] px-5 py-7 text-white lg:flex">
        <Link href="/" className="mb-14 flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#d7a19a] text-[#1d1d1b]">
            <Sparkles size={16} strokeWidth={2.2} />
          </div>
          <span className="font-display text-[22px] tracking-[-0.04em]">Wardrobe<span className="text-[#d7a19a]">AI</span></span>
        </Link>

        <div className="px-2 pb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#75746f]">Felfedezés</div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className={cn('group flex h-11 items-center justify-between rounded-xl px-3 text-[13px] transition-colors', active ? 'bg-white text-[#1d1d1b]' : 'text-[#a8a6a0] hover:bg-white/10 hover:text-white')}>
                <span className="flex items-center gap-3"><Icon size={17} strokeWidth={active ? 2.2 : 1.8} /><span>{item.label}</span></span>
                {item.count && <span className={cn('text-[11px]', active ? 'text-[#8e8b84]' : 'text-[#6e6d68]')}>{item.href === '/wardrobe' ? items.length : item.count}</span>}
                {item.badge && <span className={cn('rounded-md px-1.5 py-0.5 text-[8px] font-bold tracking-wider', active ? 'bg-[#d7a19a] text-[#1d1d1b]' : 'bg-[#343431] text-[#a8a6a0]')}>{item.badge}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto">
          <div className="mb-5 rounded-2xl bg-[#2a2a27] p-4">
            <div className="mb-3 flex items-center justify-between"><span className="eyebrow text-[#8d8c86]">Gardrób állapot</span><span className="text-xs text-[#d7a19a]">{items.length} db</span></div>
            <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-[#44433f]"><div className="h-full rounded-full bg-[#d7a19a] transition-all" style={{ width: `${Math.min(items.length * 8, 100)}%` }} /></div>
            <p className="text-[11px] leading-5 text-[#aaa8a1]">{items.length === 0 ? 'A gardróbod még üres. Kezdd el a saját kollekcióddal.' : 'Már csak néhány alapdarab hiányzik a sokoldalúbb szettekhez.'}</p>
            <Link href="/wardrobe/new" className="mt-3 inline-flex text-[11px] font-bold text-white underline decoration-[#d7a19a] underline-offset-4">{items.length === 0 ? 'Első darab hozzáadása' : 'Új darab hozzáadása'}</Link>
          </div>
          <div className="flex items-center gap-3 border-t border-white/10 px-2 pt-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c8d0c0] text-sm font-semibold text-[#425041]">N</div>
            <div className="min-w-0"><p className="truncate text-xs font-semibold">Nóra Varga</p><p className="mt-0.5 text-[10px] text-[#85837e]">Személyes fiók</p></div>
            <CircleHelp className="ml-auto text-[#77756f]" size={15} />
          </div>
        </div>
      </aside>

      <div className="lg:pl-[238px]">
        <header className="flex h-[74px] items-center justify-between border-b border-[#e6e3dc] px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 lg:hidden"><div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#1d1d1b] text-[#d7a19a]"><Sparkles size={15} /></div><span className="font-display text-xl">Wardrobe<span className="text-[#b77d76]">AI</span></span></div>
          <div className="hidden text-[12px] text-[#918e86] sm:block">2024. október 18. <span className="mx-2 text-[#d0cdc5]">/</span> Péntek</div>
          <div className="ml-auto flex items-center gap-3">
            <button aria-label="Értesítések" className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#e1ded7] text-[#77756f] transition hover:border-[#1d1d1b] hover:text-[#1d1d1b]"><Bell size={16} strokeWidth={1.8} /><span className="absolute right-[8px] top-[7px] h-1.5 w-1.5 rounded-full bg-[#c98278]" /></button>
            <div className="hidden h-7 w-px bg-[#e5e2db] sm:block" />
            <Link href="/body" className="flex items-center gap-2 text-left"><div className="h-8 w-8 overflow-hidden rounded-full border border-white bg-[#dcc7bd]"><img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&q=80" alt="Nóra" className="h-full w-full object-cover" /></div><span className="hidden text-xs font-semibold text-[#33322f] md:block">Nóra</span></Link>
          </div>
        </header>
        <main className={cn('min-h-[calc(100vh-74px)] px-5 pb-28 pt-8 sm:px-8 lg:px-12 lg:pb-12 lg:pt-10', isTryOn ? 'max-w-[1500px]' : 'max-w-[1500px]')}>{children}</main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-[68px] items-center justify-around border-t border-[#e2dfd7] bg-[#f7f5f0]/95 px-3 backdrop-blur lg:hidden">
        {navItems.slice(0, 4).map((item) => { const Icon = item.icon; const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href); return <Link key={item.href} href={item.href} className={cn('flex flex-col items-center gap-1 text-[9px] font-medium', active ? 'text-[#1d1d1b]' : 'text-[#9b9890]')}><Icon size={18} strokeWidth={active ? 2.2 : 1.7} />{item.label}</Link>; })}
      </nav>
    </div>
  );
}
