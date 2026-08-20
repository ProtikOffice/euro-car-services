export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  iconName: string;
  popular?: boolean;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  description: string;
  googleMapsUrl: string;
  imageUrl: string;
  tag: string;
}

export interface BusinessHoursDay {
  day: string;
  hours: string;
  isOpen: boolean;
  openTime?: string;
  closeTime?: string;
}

export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  vehicleMakeModel: string;
  vehicleYear: string;
  serviceNeeded: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}
