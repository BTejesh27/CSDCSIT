// src/types.ts
export interface NewsItemType {
    id?: string;
    date: string;
    title: string;
    description: string;
    image: string;
    fullContent: string;
  }
  
  export interface EventItemType {
    month: string;
    day: string;
    title: string;
    description: string;
    image: string;
    fullContent: string;
  }
  
  export interface QuickLinkType {
    name: string;
    url: string;
    internal: boolean;
  }
  
  export interface ContactInfoType {
    address: string;
    email: string;
    phone: string;
    whatsapp: string;
    mapUrl: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  }