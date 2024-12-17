const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run('CREATE TABLE joinhas (id TEXT PRIMARY KEY, count INTEGER)');
  db.run('INSERT INTO joinhas (id, count) VALUES ("informativo1", 0), ("informativo2", 0)');
});

export default function handler(req, res) {
  if (req.method === 'GET') {
    db.all('SELECT * FROM joinhas', (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  } else if (req.method === 'POST') {
    const { id } = req.body;
    db.run('UPDATE joinhas SET count = count + 1 WHERE id = ?', [id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Joinha atualizado!' });
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
