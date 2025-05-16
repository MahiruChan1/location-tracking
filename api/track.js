import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const filePath = '/tmp/logs.json';

  if (req.method === 'POST') {
    const { latitude, longitude } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const newData = {
      ip,
      latitude,
      longitude,
      date: new Date().toISOString()
    };

    let logs = [];
    if (fs.existsSync(filePath)) {
      logs = JSON.parse(fs.readFileSync(filePath));
    }
    logs.push(newData);
    fs.writeFileSync(filePath, JSON.stringify(logs, null, 2));
    return res.status(200).json({ status: 'ok' });
  }

  if (req.method === 'GET') {
    if (fs.existsSync(filePath)) {
      const logs = JSON.parse(fs.readFileSync(filePath));
      return res.status(200).json(logs);
    } else {
      return res.status(200).json([]);
    }
  }

  return res.status(405).end();
}