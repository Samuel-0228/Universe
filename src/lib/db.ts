import Database from "better-sqlite3";
import path from "path";

const db = new Database("savvy_aau.db");

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
    FOREIGN KEY(campus_id) REFERENCES campuses(id)
  );

  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    campus_id TEXT,
    name TEXT,
    description TEXT,
    icon TEXT,
    FOREIGN KEY(campus_id) REFERENCES campuses(id)
  );

  CREATE TABLE IF NOT EXISTS buildings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    campus_id TEXT,
    name TEXT,
    lat REAL,
    lng REAL,
    details TEXT,
    FOREIGN KEY(campus_id) REFERENCES campuses(id)
  );
`);

export default db;
