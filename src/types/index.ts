export interface Campus {
  id: string;
  name: string;
  shortName: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  description: string;
  colleges: College[];
  services: string[];
  infrastructure: string[];
  orbitRadius: number;
  orbitSpeed: number;
}

export interface College {
  name: string;
  departments: string[];
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}