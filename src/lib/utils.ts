import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateGoogleMapsLink(origin: { lat: number, lng: number } | string, destination: { lat: number, lng: number }, mode: string = 'driving') {
  const destStr = `${destination.lat},${destination.lng}`;
  const originStr = typeof origin === 'string' ? origin : `${origin.lat},${origin.lng}`;
  return `https://www.google.com/maps/dir/?api=1&origin=${originStr}&destination=${destStr}&travelmode=${mode}`;
}