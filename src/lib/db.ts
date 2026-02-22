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

  CREATE TABLE IF NOT EXISTS news_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    campus_id TEXT,
    title TEXT NOT NULL,
    content TEXT,
    type TEXT, -- 'News', 'Seminar', 'Cultural', 'Announcement'
    date TEXT,
    image_url TEXT,
    FOREIGN KEY(campus_id) REFERENCES campuses(id)
  );
`);

// Seed news and events if empty
const newsCount = db.prepare("SELECT COUNT(*) as count FROM news_events").get() as { count: number };
if (newsCount.count === 0) {
  const insertNews = db.prepare(`
    INSERT INTO news_events (campus_id, title, content, type, date, image_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const initialNews = [
    ["sidist-kilo", "Annual Research Symposium 2026", "Join us for the flagship academic event of the year at the Main Campus.", "Seminar", "2026-03-15", "https://picsum.photos/seed/symposium/800/600"],
    ["arat-kilo", "New Quantum Computing Lab Opening", "Arat Kilo expands its research capabilities with a state-of-the-art physics lab.", "News", "2026-02-28", "https://picsum.photos/seed/lab/800/600"],
    ["amist-kilo", "AAiT Innovation Week", "Showcasing the best engineering projects from our graduating class.", "Cultural", "2026-04-10", "https://picsum.photos/seed/innovation/800/600"],
    ["tikur-anbessa", "Public Health Awareness Campaign", "Tikur Anbessa Hospital leads a city-wide health initiative.", "Announcement", "2026-03-05", "https://picsum.photos/seed/health/800/600"],
    ["yared-music", "Evening of Ethiopian Jazz", "A special performance by the Yared School of Music ensemble.", "Cultural", "2026-03-20", "https://picsum.photos/seed/jazz/800/600"],
  ];

  for (const item of initialNews) {
    insertNews.run(...item);
  }
}

export default db;
