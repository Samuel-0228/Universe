import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
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
    type TEXT, -- 'College', 'School', 'Department'
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

// Seed initial data if empty
const count = db.prepare("SELECT COUNT(*) as count FROM campuses").get() as { count: number };
if (count.count === 0) {
  const insertCampus = db.prepare(`
    INSERT INTO campuses (id, name, shortName, lat, lng, address, description, color, contact)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const initialCampuses = [
    ["sidist-kilo", "Sidist Kilo (Main Campus)", "Main", 9.0444, 38.7611, "Entoto Rd, Addis Ababa", "The historic heart of Addis Ababa University.", "#F27D26", "+251 11 123 4567"],
    ["arat-kilo", "Arat Kilo Campus", "Science", 9.0333, 38.7625, "Arat Kilo, Addis Ababa", "The hub for natural sciences and mathematics.", "#3B82F6", "+251 11 123 4568"],
    ["amist-kilo", "Amist Kilo (AAiT)", "AAiT", 9.0389, 38.7536, "Amist Kilo, Addis Ababa", "Ethiopia's premier institute for engineering.", "#10B981", "+251 11 123 4569"],
    ["cbe-campus", "CBE Campus", "Business", 9.0250, 38.7500, "Near National Theatre, Addis Ababa", "The center for economic research.", "#8B5CF6", "+251 11 123 4570"],
    ["tikur-anbessa", "Tikur Anbessa Campus", "Medicine", 9.0211, 38.7511, "Churchill Ave, Addis Ababa", "The nation's leading medical teaching center.", "#EF4444", "+251 11 123 4571"],
    ["yekatit-12", "Yekatit 12 Campus", "Health", 9.0350, 38.7600, "Near Sidist Kilo", "Specialized campus for nursing.", "#F43F5E", "+251 11 123 4572"],
    ["abune-petros", "Abune Petros Campus", "Law", 9.0300, 38.7550, "Piazza Area", "Strategic location for legal studies.", "#6366F1", "+251 11 123 4573"],
    ["lideta", "Lideta Campus", "Architecture", 9.0150, 38.7400, "Lideta, Addis Ababa", "The creative hub for architecture.", "#F59E0B", "+251 11 123 4574"],
    ["commerce", "Commerce School Campus", "Commerce", 9.0200, 38.7450, "Sengatera Area", "Ethiopia's oldest business school.", "#06B6D4", "+251 11 123 4575"],
    ["yared-music", "Yared School of Music", "Music", 9.0400, 38.7650, "Near Sidist Kilo", "The premier institution for musical education.", "#EC4899", "+251 11 123 4576"],
    ["alle-fine-arts", "Alle School of Fine Arts & Design", "Arts", 9.0420, 38.7630, "Near Sidist Kilo", "The cradle of modern Ethiopian art.", "#84CC16", "+251 11 123 4577"],
    ["akaki", "Akaki Campus", "Akaki", 8.8800, 38.7800, "Akaki Kaliti, Addis Ababa", "Specialized research and graduate studies hub.", "#14B8A6", "+251 11 123 4578"],
    ["bishoftu", "Bishoftu Campus", "Vet", 8.7500, 38.9800, "Bishoftu (Debre Zeit)", "World-class center for veterinary medicine.", "#4ADE80", "+251 11 123 4579"],
    ["salale", "Salale Campus", "Salale", 9.7800, 38.4000, "Fitche, North Shoa", "Expanding AAU's reach to North Shoa.", "#FB923C", "+251 11 123 4580"],
    ["sefere-selam", "Sefere Selam Campus", "Education", 9.0500, 38.7400, "Gullele Area", "Dedicated to education and psychology.", "#A855F7", "+251 11 123 4581"],
  ];

  for (const campus of initialCampuses) {
    insertCampus.run(...campus);
  }

  // Seed some departments
  const insertDept = db.prepare("INSERT INTO departments (campus_id, name, type) VALUES (?, ?, ?)");
  insertDept.run("sidist-kilo", "College of Humanities", "College");
  insertDept.run("sidist-kilo", "School of Law", "School");
  insertDept.run("amist-kilo", "School of Electrical & Computer Engineering", "School");
  insertDept.run("arat-kilo", "Department of Mathematics", "Department");

  // Seed some services
  const insertService = db.prepare("INSERT INTO services (campus_id, name, description, icon) VALUES (?, ?, ?, ?)");
  insertService.run("sidist-kilo", "Kennedy Library", "The main research library of AAU.", "Library");
  insertService.run("sidist-kilo", "Main Clinic", "Health services for students and staff.", "Clinic");
  insertService.run("amist-kilo", "ICT Center", "High-speed internet and computing facilities.", "ICT");
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Routes
  app.get("/api/campuses", (req, res) => {
    const campuses = db.prepare("SELECT * FROM campuses").all();
    res.json(campuses);
  });

  app.get("/api/campuses/:id", (req, res) => {
    const campus = db.prepare("SELECT * FROM campuses WHERE id = ?").get(req.params.id);
    if (!campus) return res.status(404).json({ error: "Campus not found" });

    const departments = db.prepare("SELECT * FROM departments WHERE campus_id = ?").all();
    const services = db.prepare("SELECT * FROM services WHERE campus_id = ?").all();
    const buildings = db.prepare("SELECT * FROM buildings WHERE campus_id = ?").all();

    res.json({ ...campus, departments, services, buildings });
  });

  app.get("/api/search", (req, res) => {
    const q = `%${req.query.q}%`;
    const results = db.prepare(`
      SELECT 'campus' as type, id, name as title, description as subtitle FROM campuses WHERE name LIKE ? OR description LIKE ?
      UNION
      SELECT 'department' as type, campus_id as id, name as title, type as subtitle FROM departments WHERE name LIKE ?
      UNION
      SELECT 'service' as type, campus_id as id, name as title, description as subtitle FROM services WHERE name LIKE ?
    `).all(q, q, q, q);
    res.json(results);
  });

  // Admin Routes (Simplified)
  app.post("/api/admin/campuses", (req, res) => {
    const { id, name, shortName, lat, lng, address, description, color, contact } = req.body;
    try {
      db.prepare(`
        INSERT OR REPLACE INTO campuses (id, name, shortName, lat, lng, address, description, color, contact)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(id, name, shortName, lat, lng, address, description, color, contact);
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Savvy-AAU Server running at http://localhost:${PORT}`);
  });
}

startServer();
