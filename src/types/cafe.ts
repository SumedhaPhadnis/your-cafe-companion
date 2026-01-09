export interface Cafe {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  distance: string;
  priceRange: 1 | 2 | 3;
  address: string;
  tags: string[];
  ambience: string[];
  hasWifi: boolean;
  hasVeganOptions: boolean;
  openingHours: string;
  description: string;
  menuHighlights: string[];
  isFavorite?: boolean;
}

export interface UserPreferences {
  coffeeTypes: string[];
  mood: string;
  budgetRange: [number, number];
  requireWifi: boolean;
  requireVegan: boolean;
}

export interface Review {
  id: string;
  cafeId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
}
