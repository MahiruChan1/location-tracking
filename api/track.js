let database = []

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { latitude, longitude } = req.body
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const waktu = new Date().toLocaleString('id-ID')

    database.push({ ip, latitude, longitude, waktu })
    res.status(200).json({ message: 'Lokasi tersimpan' })
  } else if (req.method === 'GET') {
    res.status(200).json(database)
  } else {
    res.status(405).end()
  }
}
