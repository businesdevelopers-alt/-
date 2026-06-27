export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  icon: string; // Name of Lucide icon
  color: string; // Tailwind color class
  bgGradient: string; // Tailwind gradient background
  estimatedTime: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'management' | 'planning' | 'arbitration' | 'startups' | 'apps';
  client: string;
  description: string;
  tags: string[];
  image: string; // We can use elegant SVG backgrounds or styled gradient cards
  year: string;
  results: string[];
}

export interface Solution {
  id: string;
  title: string;
  subtitle: string;
  target: string;
  features: string[];
  icon: string;
  priceEstimate: string;
}

export interface Inquiry {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  serviceId: string;
  message: string;
  date: string;
  status: 'pending' | 'reviewed';
  requiresVideoCall?: boolean;
  preferredDate?: string;
  preferredTimeSlot?: string;
}
