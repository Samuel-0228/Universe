
export interface Campus {
  id: string;
  name: string;
  shortName: string;
  description: string;
  address: string;
  coordinates: { lat: number; lng: number };
  landmarks: string[];
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  colleges: College[];
  services: Service[];
  orbitRadius: number;
  orbitDuration: string;
  planetColor: string;
}

export interface College {
  name: string;
  departments: string[];
}

export interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
  status: 'Open' | 'Closed' | 'Limited';
}

export interface TransportMode {
  id: string;
  name: string;
  icon: string;
  speed: number; // km/h
}

export interface SearchResult {
  type: 'campus' | 'department' | 'service';
  title: string;
  subtitle: string;
  id: string;
  campusId?: string;
}
