const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run('CREATE TABLE activities (id TEXT PRIMARY KEY, title TEXT, subtitle TEXT, pending INTEGER)');
});

module.exports = db;
