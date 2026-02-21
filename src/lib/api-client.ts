import db from "./db";

export async function getCampuses() {
  return db.prepare("SELECT * FROM campuses").all();
}

export async function getCampusById(id: string) {
  const campus = db.prepare("SELECT * FROM campuses WHERE id = ?").get(id);
  if (!campus) return null;

  const departments = db.prepare("SELECT * FROM departments WHERE campus_id = ?").all();
  const services = db.prepare("SELECT * FROM services WHERE campus_id = ?").all();
  const buildings = db.prepare("SELECT * FROM buildings WHERE campus_id = ?").all();

  return { ...campus, departments, services, buildings };
}

export async function searchGalaxy(query: string) {
  const q = `%${query}%`;
  return db.prepare(`
    SELECT 'campus' as type, id, name as title, description as subtitle FROM campuses WHERE name LIKE ? OR description LIKE ?
    UNION
    SELECT 'department' as type, campus_id as id, name as title, type as subtitle FROM departments WHERE name LIKE ?
    UNION
    SELECT 'service' as type, campus_id as id, name as title, description as subtitle FROM services WHERE name LIKE ?
  `).all(q, q, q, q);
}
