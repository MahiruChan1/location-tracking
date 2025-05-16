export default async function handler(req, res) {
  const response = await fetch(req.headers.host.startsWith('localhost') ? 'http://localhost:3000/api/track' : 'https://' + req.headers.host + '/api/track');
  const logs = await response.json();

  let html = `<!DOCTYPE html><html><head><title>Admin</title><style>table{width:100%%;border-collapse:collapse}td,th{border:1px solid #ccc;padding:6px}</style></head><body><h2>Data Lokasi</h2><table><tr><th>IP</th><th>Latitude</th><th>Longitude</th><th>Waktu</th></tr>`;
  for (const log of logs) {
    html += `<tr><td>${log.ip}</td><td>${log.latitude}</td><td>${log.longitude}</td><td>${log.date}</td></tr>`;
  }
  html += '</table></body></html>';

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}