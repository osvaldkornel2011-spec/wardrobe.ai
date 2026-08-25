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

export const seedItems: WardrobeItem[] = [];

export const seedOutfits: Outfit[] = [];

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
