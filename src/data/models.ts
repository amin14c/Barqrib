export type PlaceType = 'bar' | 'cafe' | 'lounge' | 'store';

export interface Place {
  id?: string;
  name: string;
  type: PlaceType;
  lat: number;
  lng: number;
  address?: string;
  services?: string[];
  openingHours?: string;
  imageUrl?: string;
  averageRating?: number;
  ratingCount?: number;
  createdBy: string;
  createdAt: number;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Review {
  id?: string;
  placeId: string;
  userId: string;
  userName: string;
  rating: number;
  comment?: string;
  createdAt: number;
}

export interface UserProfile {
  uid: string;
  displayName?: string;
  email: string;
  createdAt: number;
}
