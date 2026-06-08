export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  iconName: string;
  category: 'Roofing' | 'HVAC' | 'Insulation';
  features: string[];
  basePriceRange: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Roofing' | 'HVAC' | 'Insulation';
  location: string;
  imageBefore: string;
  imageAfter: string;
  description: string;
  completionDate: string;
}

export interface ParticipantItem {
  id: string;
  name: string;
  role: string;
  experience: string;
  avatar: string;
  bio: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
  date: string;
  badge?: string;
}

export interface BlogPostItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

export interface EmergencyRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  serviceType: 'Roofing' | 'HVAC' | 'Insulation';
  severity: 'Immediate' | 'Within 24 Hours' | 'Non-Urgent';
  description: string;
  status: 'Received' | 'Dispatched' | 'On The Way' | 'Completed';
  createdAt: string;
}
