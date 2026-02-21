export interface Campus {
  id: string;
  name: string;
  shortName: string;
  lat: number;
  lng: number;
  address: string;
  description: string;
  color: string;
  contact: string;
  departments?: any[];
  services?: any[];
  buildings?: any[];
}
