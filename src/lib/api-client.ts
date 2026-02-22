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

export async function getNewsEvents(campusId?: string, type?: string) {
  let query = "SELECT n.*, c.name as campus_name FROM news_events n JOIN campuses c ON n.campus_id = c.id";
  const params: any[] = [];

  const conditions: string[] = [];
  if (campusId) {
    conditions.push("n.campus_id = ?");
    params.push(campusId);
  }
  if (type) {
    conditions.push("n.type = ?");
    params.push(type);
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  query += " ORDER BY n.date DESC";

  return db.prepare(query).all(...params);
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
