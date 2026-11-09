const BASE = '/api';
async function post(path, body) {
  const res = await fetch(`${BASE}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error((await res.json()).error || 'Request failed');
  return res.json();
}
async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error('Request failed');
  return res.json();
}
export const api = {
  submitContact: (data) => post('/contact', data),
  submitLeadGate: (data) => post('/leads', data),
  getChecklist: () => get('/checklist'),
  getCaseFiles: () => get('/casefiles'),
};