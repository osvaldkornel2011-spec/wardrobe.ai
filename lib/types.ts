export type WardrobeItem = {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  material: string;
  size: string;
  color: string;
  styleTags: string[];
  season: string[];
  occasion: string[];
  fit?: string;
  brand?: string;
  notes?: string;
  imageData: string;
  createdAt?: string;
};

export type Outfit = {
  id: string;
  title: string;
  itemIds: string[];
  reasoning: string;
  visualDescription: string;
  occasion?: string;
  temperature?: string;
  palette?: string[];
  tryOnImage?: string;
  rating?: number;
};

export type BodyProfile = {
  heightCm: number;
  weightKg: number;
  chestCm?: number;
  underBustCm?: number;
  waistCm?: number;
  hipCm?: number;
  shoulderCm?: number;
  inseamCm?: number;
  gender: string;
  bodyShape?: string;
  skinTone?: string;
  hairColor?: string;
  ageRange?: string;
  avatarImageBase?: string;
  avatarOptions?: string[];
};
