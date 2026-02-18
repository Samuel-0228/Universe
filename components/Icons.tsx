
import { 
  Search, MapPin, Navigation, Book, Coffee, CreditCard, 
  Monitor, Printer, FlaskConical, Home, Stethoscope, 
  AlertCircle, Globe, Phone, Mail, ExternalLink, ArrowRight,
  Info, Menu, X, ChevronRight, User, Settings, Layers,
  Compass, Zap, Share2
} from 'lucide-react';
import React from 'react';

const icons = {
  Search, MapPin, Navigation, Book, Coffee, CreditCard, 
  Monitor, Printer, FlaskConical, Home, Stethoscope, 
  AlertCircle, Globe, Phone, Mail, ExternalLink, ArrowRight,
  Info, Menu, X, ChevronRight, User, Settings, Layers,
  Compass, Zap, Share2
};

export type IconName = keyof typeof icons;

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className, size = 20 }) => {
  const LucideIcon = icons[name as IconName] || icons.Info;
  return <LucideIcon className={className} size={size} />;
};
