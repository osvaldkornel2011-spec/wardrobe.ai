import { BodyProfile, Outfit, WardrobeItem } from './types';

export const itemImages = {
  linenShirt: 'https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=800&q=85',
  denim: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=85',
  whiteSneakers: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85',
  trench: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=85',
  blackTee: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85',
  woolCardigan: 'https://images.unsplash.com/photo-1614975059251-992f11792571?auto=format&fit=crop&w=800&q=85',
  satinSkirt: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d27?auto=format&fit=crop&w=800&q=85',
  leatherBag: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85',
  loafers: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=85'
};

export const seedItems: WardrobeItem[] = [
  { id: 'item-linen', name: 'Len ing', category: 'Felső', subcategory: 'Ing', material: '100% len', size: 'M', color: 'Törtfehér', styleTags: ['minimal', 'smart casual'], season: ['Tavasz', 'Nyár'], occasion: ['Munka', 'Mindennapi'], fit: 'Regular', brand: 'Arket', imageData: itemImages.linenShirt },
  { id: 'item-denim', name: 'Vintage farmer', category: 'Alsó', subcategory: 'Nadrág', material: '100% pamut denim', size: 'W32 / L32', color: 'Indigókék', styleTags: ['casual', 'vintage'], season: ['Mind'], occasion: ['Mindennapi', 'Utazás'], fit: 'Egyenes szárú', brand: 'Levi’s', imageData: itemImages.denim },
  { id: 'item-sneaker', name: 'Fehér bőr sneaker', category: 'Cipő', subcategory: 'Sneaker', material: 'Bőr', size: '42', color: 'Fehér', styleTags: ['minimal', 'casual'], season: ['Mind'], occasion: ['Mindennapi', 'Utazás'], fit: 'Regular', brand: 'Veja', imageData: itemImages.whiteSneakers },
  { id: 'item-trench', name: 'Klasszikus trench coat', category: 'Kabát', subcategory: 'Trench', material: 'Pamut gabardin', size: 'M', color: 'Kőszín', styleTags: ['classic', 'minimal'], season: ['Tavasz', 'Ősz'], occasion: ['Munka', 'Mindennapi'], fit: 'Oversize', brand: 'COS', imageData: itemImages.trench },
  { id: 'item-tee', name: 'Organikus fekete póló', category: 'Felső', subcategory: 'Póló', material: '100% organikus pamut', size: 'M', color: 'Fekete', styleTags: ['minimal', 'casual'], season: ['Mind'], occasion: ['Mindennapi', 'Utazás'], fit: 'Regular', brand: 'Uniqlo U', imageData: itemImages.blackTee },
  { id: 'item-cardigan', name: 'Puha gyapjú kardigán', category: 'Felső', subcategory: 'Kardigán', material: 'Merinó gyapjú', size: 'M', color: 'Zsályazöld', styleTags: ['soft tailoring', 'minimal'], season: ['Ősz', 'Tél'], occasion: ['Mindennapi', 'Munka'], fit: 'Laza', brand: 'Studio Nicholson', imageData: itemImages.woolCardigan },
  { id: 'item-skirt', name: 'Szatén midi szoknya', category: 'Alsó', subcategory: 'Szoknya', material: 'Újrahasznosított szatén', size: 'M', color: 'Csokoládébarna', styleTags: ['elegáns', 'feminine'], season: ['Mind'], occasion: ['Randi', 'Buli'], fit: 'Szűkített', brand: '& Other Stories', imageData: itemImages.satinSkirt },
  { id: 'item-bag', name: 'Strukturált bőrtáska', category: 'Kiegészítő', subcategory: 'Táska', material: 'Bőr', size: 'Egy méret', color: 'Bordó', styleTags: ['classic', 'elegáns'], season: ['Mind'], occasion: ['Munka', 'Randi'], fit: 'Regular', brand: 'Loewe', imageData: itemImages.leatherBag },
  { id: 'item-loafer', name: 'Bordó loafer', category: 'Cipő', subcategory: 'Loafer', material: 'Bőr', size: '42', color: 'Bordó', styleTags: ['classic', 'smart casual'], season: ['Mind'], occasion: ['Munka', 'Randi'], fit: 'Regular', brand: 'G.H. Bass', imageData: itemImages.loafers }
];

export const seedOutfits: Outfit[] = [
  { id: 'outfit-dinner', title: 'Péntek esti vacsora', itemIds: ['item-tee', 'item-skirt', 'item-loafer', 'item-bag'], reasoning: 'A fekete és csokoládébarna monokróm alap elegáns, mégsem túl merev. A bordó loafer és táska finom színfoltként köti össze az összeállítást.', visualDescription: 'Fekete, regular fit organikus pamut póló csokoládébarna szatén midi szoknyával. Bordó bőr loafer és hozzá illő strukturált táska teszi teljessé.', occasion: 'Randi', temperature: '18°', palette: ['#202020', '#765044', '#6b1f2a'], tryOnImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=90' },
  { id: 'outfit-office', title: 'Kreatív irodai nap', itemIds: ['item-linen', 'item-denim', 'item-loafer', 'item-trench'], reasoning: 'A törtfehér len ing világosítja az indigó farmert, a kőszínű trench pedig strukturált, rétegezett sziluettet ad.', visualDescription: 'Törtfehér, laza len ing félig betűrve egyenes szárú indigó farmerbe. Kőszínű trench coat-tal és bordó loaferrel rétegezve.', occasion: 'Munka', temperature: '16°', palette: ['#f1eee5', '#273c5c', '#b8a98b'], tryOnImage: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1200&q=90' },
  { id: 'outfit-weekend', title: 'Lassú hétvége', itemIds: ['item-cardigan', 'item-tee', 'item-denim', 'item-sneaker'], reasoning: 'A zsályazöld kardigán és a fekete póló nyugodt, neutrális alapot ad. A farmer és a fehér sneaker kényelmes, városi lezárás.', visualDescription: 'Zsályazöld puha gyapjú kardigán fekete póló fölött, indigókék egyenes szárú farmerrel és fehér bőr sneakerrel.', occasion: 'Mindennapi', temperature: '14°', palette: ['#b5c0ad', '#222222', '#273c5c'], tryOnImage: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=90' }
];

export const defaultProfile: BodyProfile = {
  heightCm: 173,
  weightKg: 64,
  chestCm: 88,
  waistCm: 70,
  hipCm: 96,
  shoulderCm: 39,
  inseamCm: 80,
  gender: 'Nő',
  bodyShape: 'Körte',
  skinTone: 'Világos, meleg tónus',
  hairColor: 'Barna',
  ageRange: '25–30',
  avatarImageBase: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=90'
};

export const categoryLabels = ['Összes', 'Felső', 'Alsó', 'Kabát', 'Cipő', 'Kiegészítő'];
export const occasions = ['Mindennapi', 'Munka', 'Randi', 'Utazás', 'Buli', 'Sport'];
