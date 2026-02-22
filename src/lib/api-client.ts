import { supabase } from "./supabase";
import { Campus } from "@/types/campus";

export async function getCampuses(): Promise<Campus[]> {
  const { data, error } = await supabase
    .from('campuses')
    .select('*');
  
  if (error) {
    console.error("Supabase error fetching campuses:", error);
    return [];
  }
  
  return data as Campus[];
}

export async function getCampusById(id: string): Promise<Campus | null> {
  const { data: campus, error: campusError } = await supabase
    .from('campuses')
    .select('*')
    .eq('id', id)
    .single();

  if (campusError || !campus) {
    console.error("Supabase error fetching campus:", campusError);
    return null;
  }

  const { data: departments } = await supabase
    .from('departments')
    .select('*')
    .eq('campus_id', id);

  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('campus_id', id);

  const { data: buildings } = await supabase
    .from('buildings')
    .select('*')
    .eq('campus_id', id);

  return { 
    ...campus, 
    departments: departments || [], 
    services: services || [], 
    buildings: buildings || [] 
  } as Campus;
}

export async function searchGalaxy(query: string) {
  // Supabase doesn't easily support UNION across different tables in a single simple query via the JS client
  // for a global search. We'll do multiple queries or just search campuses for now.
  // In a real app, you might use a RPC or a more complex query.
  
  const { data: campuses } = await supabase
    .from('campuses')
    .select('id, name, description')
    .ilike('name', `%${query}%`);

  const { data: departments } = await supabase
    .from('departments')
    .select('campus_id, name, type')
    .ilike('name', `%${query}%`);

  const results = [
    ...(campuses?.map(c => ({ type: 'campus', id: c.id, title: c.name, subtitle: c.description })) || []),
    ...(departments?.map(d => ({ type: 'department', id: d.campus_id, title: d.name, subtitle: d.type })) || [])
  ];

  return results;
}
