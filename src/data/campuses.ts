import { Type } from "@google/genai";

export interface Campus {
  id: string;
  name: string;
  shortName: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    landmarks: string[];
  };
  colleges: string[];
  schools: string[];
  services: string[];
  infrastructure: {
    buildings: string[];
    offices: string[];
  };
  description: string;
  color: string;
}

export const CAMPUSES: Campus[] = [
  {
    id: "sidist-kilo",
    name: "Sidist Kilo (Main Campus)",
    shortName: "Main",
    location: {
      lat: 9.0444,
      lng: 38.7611,
      address: "Entoto Rd, Addis Ababa",
      landmarks: ["National Museum", "Kennedy Library"],
    },
    colleges: ["College of Humanities", "College of Social Sciences", "College of Natural Sciences"],
    schools: ["School of Journalism", "School of Law"],
    services: ["Main Registrar", "Kennedy Library", "Main Clinic", "Student Union"],
    infrastructure: {
      buildings: ["Nelson Mandela Hall", "NCR Building", "OCR Building"],
      offices: ["President's Office", "Academic VP Office"],
    },
    description: "The historic heart of Addis Ababa University, housing the central administration and core academic colleges.",
    color: "#F27D26",
  },
  {
    id: "arat-kilo",
    name: "Arat Kilo Campus",
    shortName: "Science",
    location: {
      lat: 9.0333,
      lng: 38.7625,
      address: "Arat Kilo, Addis Ababa",
      landmarks: ["Victory Monument", "Ministry of Education"],
    },
    colleges: ["College of Natural and Computational Sciences"],
    schools: ["School of Earth Sciences"],
    services: ["Science Library", "Computer Labs", "Cafeteria"],
    infrastructure: {
      buildings: ["Post Graduate Building", "Freshman Building"],
      offices: ["Dean of Natural Sciences"],
    },
    description: "The hub for natural sciences, mathematics, and computational research.",
    color: "#3B82F6",
  },
  {
    id: "amist-kilo",
    name: "Amist Kilo (AAiT)",
    shortName: "AAiT",
    location: {
      lat: 9.0389,
      lng: 38.7536,
      address: "Amist Kilo, Addis Ababa",
      landmarks: ["St. Mary Church", "National Archives"],
    },
    colleges: ["Addis Ababa Institute of Technology"],
    schools: ["School of Civil & Environmental Engineering", "School of Electrical & Computer Engineering"],
    services: ["Engineering Library", "Workshops", "ICT Center"],
    infrastructure: {
      buildings: ["Samsung Lab", "Main Workshop", "Lecture Halls"],
      offices: ["AAiT Director Office"],
    },
    description: "Ethiopia's premier institute for engineering and technological innovation.",
    color: "#10B981",
  },
  {
    id: "cbe-campus",
    name: "CBE Campus",
    shortName: "Business",
    location: {
      lat: 9.0250,
      lng: 38.7500,
      address: "Near National Theatre, Addis Ababa",
      landmarks: ["National Theatre", "Central Bank"],
    },
    colleges: ["College of Business and Economics"],
    schools: ["School of Commerce", "School of Graduate Studies in Business"],
    services: ["Business Library", "Career Center"],
    infrastructure: {
      buildings: ["CBE Tower", "Lecture Block A"],
      offices: ["Registrar Business"],
    },
    description: "The center for economic research and business leadership training.",
    color: "#8B5CF6",
  },
  {
    id: "tikur-anbessa",
    name: "Tikur Anbessa Campus",
    shortName: "Medicine",
    location: {
      lat: 9.0211,
      lng: 38.7511,
      address: "Churchill Ave, Addis Ababa",
      landmarks: ["Tikur Anbessa Hospital", "Black Lion"],
    },
    colleges: ["College of Health Sciences"],
    schools: ["School of Medicine", "School of Pharmacy", "School of Public Health"],
    services: ["Teaching Hospital", "Medical Library", "Specialized Clinics"],
    infrastructure: {
      buildings: ["Hospital Wing", "Research Lab", "Oxygen Plant"],
      offices: ["Hospital Administration"],
    },
    description: "The nation's leading medical teaching and referral center.",
    color: "#EF4444",
  },
  {
    id: "yekatit-12",
    name: "Yekatit 12 Campus",
    shortName: "Health",
    location: {
      lat: 9.0350,
      lng: 38.7600,
      address: "Near Sidist Kilo",
      landmarks: ["Yekatit 12 Hospital"],
    },
    colleges: ["College of Health Sciences (Extension)"],
    schools: ["School of Nursing and Midwifery"],
    services: ["Clinical Training Center"],
    infrastructure: {
      buildings: ["Nursing School Block"],
      offices: ["Dean's Office"],
    },
    description: "Specialized campus for nursing and allied health sciences.",
    color: "#F43F5E",
  },
  {
    id: "abune-petros",
    name: "Abune Petros Campus",
    shortName: "Law",
    location: {
      lat: 9.0300,
      lng: 38.7550,
      address: "Piazza Area",
      landmarks: ["Abune Petros Statue"],
    },
    colleges: ["College of Law and Governance"],
    schools: ["School of Law (Piazza Branch)"],
    services: ["Legal Aid Center"],
    infrastructure: {
      buildings: ["Old Court Building"],
      offices: ["Legal Clinic"],
    },
    description: "Strategic location for legal studies and governance research.",
    color: "#6366F1",
  },
  {
    id: "lideta",
    name: "Lideta Campus",
    shortName: "Architecture",
    location: {
      lat: 9.0150,
      lng: 38.7400,
      address: "Lideta, Addis Ababa",
      landmarks: ["Lideta Church", "Federal Court"],
    },
    colleges: ["Ethiopian Institute of Architecture, Building Construction and City Development (EiABC)"],
    schools: ["School of Architecture", "School of Urban Planning"],
    services: ["Design Studios", "Material Labs"],
    infrastructure: {
      buildings: ["Design Block", "Exhibition Hall"],
      offices: ["EiABC Director"],
    },
    description: "The creative hub for architecture and urban development.",
    color: "#F59E0B",
  },
  {
    id: "commerce",
    name: "Commerce School Campus",
    shortName: "Commerce",
    location: {
      lat: 9.0200,
      lng: 38.7450,
      address: "Sengatera Area",
      landmarks: ["Sengatera", "Financial District"],
    },
    colleges: ["College of Business and Economics"],
    schools: ["Addis Ababa School of Commerce"],
    services: ["Commerce Library", "Placement Office"],
    infrastructure: {
      buildings: ["Main Commerce Block"],
      offices: ["School Director"],
    },
    description: "Ethiopia's oldest and most prestigious business school.",
    color: "#06B6D4",
  },
  {
    id: "yared-music",
    name: "Yared School of Music",
    shortName: "Music",
    location: {
      lat: 9.0400,
      lng: 38.7650,
      address: "Near Sidist Kilo",
      landmarks: ["Yared Music Hall"],
    },
    colleges: ["College of Performing and Visual Arts"],
    schools: ["Yared School of Music"],
    services: ["Recording Studio", "Performance Hall"],
    infrastructure: {
      buildings: ["Music Practice Rooms"],
      offices: ["School Head"],
    },
    description: "The premier institution for musical education and research in Ethiopia.",
    color: "#EC4899",
  },
  {
    id: "alle-fine-arts",
    name: "Alle School of Fine Arts & Design",
    shortName: "Arts",
    location: {
      lat: 9.0420,
      lng: 38.7630,
      address: "Near Sidist Kilo",
      landmarks: ["Fine Arts Gallery"],
    },
    colleges: ["College of Performing and Visual Arts"],
    schools: ["Alle School of Fine Arts & Design"],
    services: ["Art Studios", "Gallery"],
    infrastructure: {
      buildings: ["Painting Studio", "Sculpture Workshop"],
      offices: ["Dean of Arts"],
    },
    description: "The cradle of modern Ethiopian art and design.",
    color: "#84CC16",
  },
  {
    id: "akaki",
    name: "Akaki Campus",
    shortName: "Akaki",
    location: {
      lat: 8.8800,
      lng: 38.7800,
      address: "Akaki Kaliti, Addis Ababa",
      landmarks: ["Akaki River"],
    },
    colleges: ["College of Education and Behavioral Studies"],
    schools: ["School of Graduate Studies (Extension)"],
    services: ["Research Center"],
    infrastructure: {
      buildings: ["Akaki Research Block"],
      offices: ["Campus Coordinator"],
    },
    description: "A specialized research and graduate studies hub in the southern industrial zone.",
    color: "#14B8A6",
  },
  {
    id: "bishoftu",
    name: "Bishoftu Campus",
    shortName: "Vet",
    location: {
      lat: 8.7500,
      lng: 38.9800,
      address: "Bishoftu (Debre Zeit)",
      landmarks: ["Lake Bishoftu"],
    },
    colleges: ["College of Veterinary Medicine and Agriculture"],
    schools: ["School of Veterinary Medicine"],
    services: ["Veterinary Hospital", "Animal Farm"],
    infrastructure: {
      buildings: ["Clinical Block", "Research Farm"],
      offices: ["Dean of Veterinary Medicine"],
    },
    description: "World-class center for veterinary medicine and agricultural research.",
    color: "#4ADE80",
  },
  {
    id: "salale",
    name: "Salale Campus",
    shortName: "Salale",
    location: {
      lat: 9.7800,
      lng: 38.4000,
      address: "Fitche, North Shoa",
      landmarks: ["Fitche Town"],
    },
    colleges: ["Salale University (Affiliated)"],
    schools: ["School of Agriculture", "School of Health Sciences"],
    services: ["Regional Library", "Dormitories"],
    infrastructure: {
      buildings: ["Main Academic Block"],
      offices: ["Campus Admin"],
    },
    description: "Expanding AAU's reach to the North Shoa region with a focus on agriculture and health.",
    color: "#FB923C",
  },
  {
    id: "sefere-selam",
    name: "Sefere Selam Campus",
    shortName: "Education",
    location: {
      lat: 9.0500,
      lng: 38.7400,
      address: "Gullele Area",
      landmarks: ["Gullele Botanical Garden"],
    },
    colleges: ["College of Education and Behavioral Studies"],
    schools: ["School of Psychology"],
    services: ["Counseling Center"],
    infrastructure: {
      buildings: ["Education Block"],
      offices: ["Department of Psychology"],
    },
    description: "Dedicated to the study of education, psychology, and behavioral sciences.",
    color: "#A855F7",
  },
];
