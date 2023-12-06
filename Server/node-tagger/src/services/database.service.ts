import sqlite3 = require('sqlite3');

// interface User {
//   id: number;
//   username: string;
//   password: string;
// }

interface Coordinates {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface TagWithCoordinates {
  startX:number;
  startY:number;
  endX:number;
  endY:number;
  tag: string;
}

export class DatabaseService {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database('tagger_db.db', (err) => {
      if (err) {
        console.error('Error opening SQLite database:', err.message);
      } else {
        console.log('Connected to SQLite database');
        this.initializeDatabase();
      }
    });
  }

  private initializeDatabase() {
    // Create the 'users' table if it doesn't exist
    this.db.run(`
      CREATE TABLE IF NOT EXISTS users_tb (
          username TEXT PRIMARY KEY,
          password TEXT,
          is_active INTEGER DEFAULT 0
      );
    `);

    // Create the 'images' table if it doesn't exist
    this.db.run(`
      CREATE TABLE IF NOT EXISTS images_tb (
          username TEXT,
          image_index INTEGER PRIMARY KEY AUTOINCREMENT,
          image BLOB,
          FOREIGN KEY (username) REFERENCES users_tb(username)
      );
    `);

    // Create the 'image_tags' table if it doesn't exist
    this.db.run(`
      CREATE TABLE IF NOT EXISTS image_tags_tb (
          image_index INTEGER,
          list_element_id INTEGER,
          tag_name TEXT,
          x1_coordinate FLOAT,
          y1_coordinate FLOAT,
          x2_coordinate FLOAT,
          y2_coordinate FLOAT,
          PRIMARY KEY (image_index, list_element_id),
          FOREIGN KEY (image_index) REFERENCES images_tb(image_index)
      );
    `);
  }

  async saveImageTags(image: Buffer, tag_name: string, coordinates: Coordinates[]) {
    try {
      const stmtImage = this.db.prepare("INSERT INTO images_tb (image) VALUES (?)");
      stmtImage.run(image);

      // Explicitly define the type for row
      const lastID: number = await new Promise<number>((resolve, reject) => {
        this.db.get('SELECT last_insert_rowid() as lastID', (err, row: { lastID: number }) => {
          if (err) {
            reject(err);
          } else {
            resolve(row?.lastID || 0);
          }
        });
      });

      let list_element_id = 1;
      const stmtTags = this.db.prepare(`
        INSERT INTO image_tags_tb (image_index, list_element_id, tag_name, x1_coordinate, y1_coordinate, x2_coordinate, y2_coordinate)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);

      for (const coord of coordinates) {
        const { x1, y1, x2, y2 } = coord;
        stmtTags.run(lastID, list_element_id, tag_name, x1, y1, x2, y2);
        list_element_id += 1;
      }
    } catch (err) {
      console.error('Error saving image tags:', err.message);
    }
  }

  async saveImage(username: string, imageBuffer: Buffer): Promise<number | null> {
    try {
      const stmt = this.db.prepare("INSERT INTO images_tb (username, image) VALUES (?, ?)");
      stmt.run(username, imageBuffer, (err) => {
        if (err) {
          console.error('Error saving image:', err.message);
        } else {
          console.log('Image saved successfully.');
        }
      });
  
      // Fetch lastID directly from the database connection
      const lastID: number = await new Promise<number>((resolve, reject) => {
        this.db.get('SELECT last_insert_rowid() as lastID', (err, row: { lastID: number }) => {
          if (err) {
            reject(err);
          } else {
            resolve(row?.lastID || 0);
          }
        });
      });
  
      return lastID;
    } catch (err) {
      console.error('Error saving image:', err.message);
      return null;
    }
  }

  async saveImageTag(tagWithCoordinates: TagWithCoordinates, image_index_row_db: number, list_element_id: number) {
    try {
      const {startX, startY, endX, endY,tag} = tagWithCoordinates;

      this.db.run(`
        INSERT INTO image_tags_tb (image_index, list_element_id, tag_name, x1_coordinate, y1_coordinate, x2_coordinate, y2_coordinate)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, image_index_row_db, list_element_id, tag, startX, startY, endX, endY);
    } catch (err) {
      console.error('Error saving image tag:', err.message);
    }
  }

  async isUsernameExists(username: string): Promise<boolean> {
    try {
      const result = this.db.get(
        `
          SELECT CASE WHEN EXISTS (SELECT 1 FROM users_tb WHERE username = ?) 
          THEN 1 ELSE 0 END AS username_exists;
        `,
        username
      );
  
      // Check if the 'username_exists' property is 1
      return result && result['username_exists'] === 1;
    } catch (err) {
      console.error('Error checking username existence:', err.message);
      return false;
    }
  }

  async saveNewUser(username: string, password: string): Promise<boolean> {
    try {
      const stmt = this.db.prepare(`
        INSERT INTO users_tb (username, password) VALUES (?, ?)
      `);
  
      // Use await here
      await stmt.run(username, password);
  
      return true;
    } catch (err) {
      console.error('Error saving new user:', err.message);
      return false;
    }
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
      const user = this.db.get(`
        SELECT * FROM users_tb WHERE username = ? AND password = ?
      `, username, password);

      if (user) {
         this.db.run(`
          UPDATE users_tb SET is_active = 1 WHERE username = ?
        `, username);

        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error('Error logging in:', err.message);
      return false;
    }
  }

  // 

  closeConnection() {
    this.db.close();
  }
}