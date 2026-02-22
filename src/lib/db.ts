import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve(process.cwd(), "savvy_aau.db");
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS campuses (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    shortName TEXT,
    lat REAL,
    lng REAL,
    address TEXT,
    description TEXT,
    color TEXT,
    contact TEXT
  );

  CREATE TABLE IF NOT EXISTS departments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    campus_id TEXT,
    name TEXT,
    type TEXT,
    FOREIGN KEY(campus_id) REFERENCES campuses(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    campus_id TEXT,
    name TEXT,
    description TEXT,
    icon TEXT,
    FOREIGN KEY(campus_id) REFERENCES campuses(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS buildings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    campus_id TEXT,
    name TEXT,
    lat REAL,
    lng REAL,
    details TEXT,
    FOREIGN KEY(campus_id) REFERENCES campuses(id) ON DELETE CASCADE
  );
`);

// Seed Data if empty
const campusCount = db.prepare("SELECT COUNT(*) as count FROM campuses").get() as { count: number };

if (campusCount.count === 0) {
  const insertCampus = db.prepare(`
    INSERT OR IGNORE INTO campuses (id, name, shortName, lat, lng, address, description, color, contact)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const campuses = [
    ['main', 'Main Campus (6 Kilo)', 'MAIN', 9.0384, 38.7619, '6 Kilo, Addis Ababa', 'The historic heart of AAU, housing the central administration and social sciences.', '#D4AF37', '+251 11 123 4567'],
    ['science', 'College of Natural Sciences', 'CNS', 9.0347, 38.7625, '4 Kilo, Addis Ababa', 'Home to the Faculty of Science and the National Herbarium.', '#4A90E2', '+251 11 123 4568'],
    ['technology', 'AAiT (5 Kilo)', 'AAIT', 9.0300, 38.7500, '5 Kilo, Addis Ababa', 'Addis Ababa Institute of Technology, the premier engineering hub.', '#E94E77', '+251 11 123 4569'],
    ['health', 'CHMS (Black Lion)', 'CHMS', 9.0180, 38.7480, 'Tikur Anbessa, Addis Ababa', 'College of Health Sciences and the Black Lion Specialized Hospital.', '#50E3C2', '+251 11 123 4570'],
    ['business', 'CBE (6 Kilo)', 'CBE', 9.0400, 38.7600, '6 Kilo, Addis Ababa', 'College of Business and Economics.', '#F5A623', '+251 11 123 4571']
  ];

  for (const c of campuses) {
    insertCampus.run(...c);
  }

  // Seed some departments
  const insertDept = db.prepare("INSERT OR IGNORE INTO departments (campus_id, name, type) VALUES (?, ?, ?)");
  insertDept.run('main', 'Department of History', 'Social Sciences');
  insertDept.run('main', 'School of Law', 'Law');
  insertDept.run('technology', 'School of Electrical Engineering', 'Engineering');
  insertDept.run('science', 'Department of Physics', 'Natural Sciences');
}

export default db;
