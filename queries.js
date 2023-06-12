const Tweets = {
  createTable: `
      CREATE TABLE IF NOT EXISTS tweets (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          content TEXT NOT NULL,
          user_id INTEGER NOT NULL,
          created_at DATETIME NOT NULL
      );
  `,
  create: `INSERT INTO tweets (content, user_id, created_at) VALUES (?, ?, ?);`,
  findAll: `SELECT * FROM tweets;`,
  findByUserId: `SELECT * FROM tweets WHERE user_id = ?;`,
};

const Users = {
  createTable: `
      CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          created_at DATETIME NOT NULL
      );
  `,
  create: `INSERT INTO users (name, email, created_at) VALUES (?, ?, ?);`,
  findAll: `SELECT * FROM users;`,
  findById: `SELECT * FROM users WHERE id = ?;`,
  findByTweetId: `SELECT * FROM users WHERE id = (SELECT user_id FROM tweets WHERE id = ?);`,
};

module.exports = {
  Tweets,
  Users,
};
