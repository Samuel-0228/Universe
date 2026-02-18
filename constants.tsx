
import React from 'react';
import { Campus, TransportMode } from './types';

export const TRANSPORT_MODES: TransportMode[] = [
  { id: 'walking', name: 'Walking', icon: '🚶', speed: 5 },
  { id: 'taxi', name: 'Taxi', icon: '🚕', speed: 30 },
  { id: 'bus', name: 'Public Transport', icon: '🚌', speed: 15 },
];

export const AAU_CAMPUSES: Campus[] = [
  {
    id: '6-kilo',
    name: 'Main Campus (6 Kilo)',
    shortName: '6 Kilo',
    description: 'The historic heart of Addis Ababa University, housing the central administration and humanities.',
    address: 'Entoto St, Addis Ababa, Ethiopia',
    coordinates: { lat: 9.0441, lng: 38.7618 },
    landmarks: ['Kennedy Library', 'Ethiopian Studies Museum'],
    contact: { phone: '+251 11 123 4567', email: 'info@aau.edu.et', website: 'aau.edu.et' },
    orbitRadius: 180,
    orbitDuration: '40s',
    planetColor: '#4F46E5',
    colleges: [
      { name: 'College of Humanities', departments: ['History', 'Linguistics', 'Philosophy'] },
      { name: 'College of Social Sciences', departments: ['Geography', 'Social Work', 'Sociology'] }
    ],
    services: [
      { id: 'lib-1', name: 'Kennedy Library', icon: 'Book', description: 'Central research library', status: 'Open' },
      { id: 'cafe-1', name: 'Main Cafeteria', icon: 'Coffee', description: 'Student and staff dining', status: 'Open' },
      { id: 'bank-1', name: 'CBE Branch', icon: 'CreditCard', description: 'Commercial Bank of Ethiopia', status: 'Open' }
    ]
  },
  {
    id: '5-kilo',
    name: 'Addis Ababa Institute of Technology (5 Kilo)',
    shortName: '5 Kilo',
    description: 'The leading engineering and technology hub of the nation.',
    address: 'King George VI St, Addis Ababa',
    coordinates: { lat: 9.0402, lng: 38.7610 },
    landmarks: ['Samsung Innovation Lab', 'Digital Library'],
    contact: { phone: '+251 11 123 4568', email: 'it.info@aau.edu.et', website: 'aait.edu.et' },
    orbitRadius: 280,
    orbitDuration: '60s',
    planetColor: '#F59E0B',
    colleges: [
      { name: 'School of Electrical & Computer Engineering', departments: ['Computer Engineering', 'Power Systems', 'Communication'] },
      { name: 'School of Civil Engineering', departments: ['Structural Engineering', 'Geotechnical'] }
    ],
    services: [
      { id: 'ict-1', name: 'ICT Center', icon: 'Monitor', description: 'Computing resources', status: 'Open' },
      { id: 'print-1', name: 'Printing Hub', icon: 'Printer', description: 'High-speed student printing', status: 'Open' }
    ]
  },
  {
    id: '4-kilo',
    name: 'College of Natural & Computational Sciences',
    shortName: '4 Kilo',
    description: 'Home to the fundamental sciences and advanced computational research.',
    address: 'Niger St, Addis Ababa',
    coordinates: { lat: 9.0345, lng: 38.7634 },
    landmarks: ['Physics Dept Observatory', 'Botanical Garden'],
    contact: { phone: '+251 11 123 4569', email: 'science@aau.edu.et', website: 'cncs.aau.edu.et' },
    orbitRadius: 380,
    orbitDuration: '80s',
    planetColor: '#10B981',
    colleges: [
      { name: 'School of Earth Sciences', departments: ['Geology', 'Geophysics'] },
      { name: 'Department of Physics', departments: ['Astrophysics', 'Material Science'] }
    ],
    services: [
      { id: 'lab-1', name: 'Central Lab', icon: 'FlaskConical', description: 'Multi-disciplinary research lab', status: 'Open' },
      { id: 'dorm-1', name: 'Grad Dorms', icon: 'Home', description: 'Postgraduate housing', status: 'Limited' }
    ]
  },
  {
    id: 'tikur-anbessa',
    name: 'College of Health Sciences',
    shortName: 'Tikur Anbessa',
    description: 'Ethiopia\'s premier medical school and specialized referral hospital.',
    address: 'Zewditu St, Addis Ababa',
    coordinates: { lat: 9.0211, lng: 38.7512 },
    landmarks: ['Tikur Anbessa Hospital', 'Medical Library'],
    contact: { phone: '+251 11 123 4570', email: 'health@aau.edu.et', website: 'chs.aau.edu.et' },
    orbitRadius: 480,
    orbitDuration: '100s',
    planetColor: '#EF4444',
    colleges: [
      { name: 'School of Medicine', departments: ['Surgery', 'Internal Medicine', 'Pediatrics'] },
      { name: 'School of Pharmacy', departments: ['Clinical Pharmacy', 'Pharmacology'] }
    ],
    services: [
      { id: 'clinic-1', name: 'Student Clinic', icon: 'Stethoscope', description: 'Medical services for AAU students', status: 'Open' },
      { id: 'emerg-1', name: 'ER Center', icon: 'AlertCircle', description: '24/7 Emergency response', status: 'Open' }
    ]
  },
  {
    id: 'lideta',
    name: 'School of Commerce',
    shortName: 'Lideta',
    description: 'Specializing in business, economics, and commercial law.',
    address: 'Sengatera Area, Addis Ababa',
    coordinates: { lat: 9.0155, lng: 38.7455 },
    landmarks: ['NIB Bank HQ Nearby', 'National Bank'],
    contact: { phone: '+251 11 123 4571', email: 'commerce@aau.edu.et', website: 'aausc.edu.et' },
    orbitRadius: 580,
    orbitDuration: '120s',
    planetColor: '#8B5CF6',
    colleges: [
      { name: 'School of Commerce', departments: ['Accounting', 'Marketing', 'Business Management'] }
    ],
    services: [
      { id: 'ict-2', name: 'E-Library', icon: 'Globe', description: 'Digital business archives', status: 'Open' }
    ]
  }
];
