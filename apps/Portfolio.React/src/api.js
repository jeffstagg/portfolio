const API_BASE = "/api";

export async function apiFetch(path, opts = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...opts.headers },
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`);
  return res.json();
}

// Experiences
export const getExperiences    = ()          => apiFetch("/experiences");
export const getExperience     = (id)        => apiFetch(`/experiences/${id}`);
export const createExperience  = (body)      => apiFetch("/experiences",      { method: "POST", body });
export const updateExperience  = (id, body)  => apiFetch(`/experiences/${id}`, { method: "PUT",  body });
export const deleteExperience  = (id)        => apiFetch(`/experiences/${id}`, { method: "DELETE" });

// Projects
export const getProject        = (eid, pid)        => apiFetch(`/experiences/${eid}/projects/${pid}`);
export const createProject     = (eid, body)        => apiFetch(`/experiences/${eid}/projects`,           { method: "POST", body });
export const updateProject     = (eid, pid, body)   => apiFetch(`/experiences/${eid}/projects/${pid}`,    { method: "PUT",  body });
export const deleteProject     = (eid, pid)         => apiFetch(`/experiences/${eid}/projects/${pid}`,    { method: "DELETE" });
